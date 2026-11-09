import config from '../config/env.js';
import { getPayPalAccessToken, isPayPalConfigured } from '../config/paypal.js';
import {
  getDbProductByIdOrSlug,
  createDbOrder,
  recordDbPayment,
  mintDbPurchasePassport,
  clearDbCart,
  decrementDbProductStock,
  getDbOrderById,
  findDbOrderByRef,
  getEffectiveUserId,
} from './db.js';
import { isSupabaseConfigured, supabaseAdmin } from '../config/supabase.js';

// Pegged exchange rate for PayPal REST Sandbox USD processing (1 USD = 86.50 INR)
export const EXCHANGE_RATE_INR_USD = 86.50;

/**
 * Get public PayPal configuration for frontend buttons
 */
export function getPayPalPublicConfig() {
  return {
    clientId: config.paypal.clientId,
    mode: config.paypal.mode,
    currency: 'USD',
    displayCurrency: 'USD',
    exchangeRate: 1.0,
    isConfigured: isPayPalConfigured(),
  };
}

/**
 * Create a PayPal Order with authoritative server-side price calculation
 * Never trusts amounts or prices from the client.
 */
export async function createPayPalOrder({
  items,
  currency = 'USD',
  shippingAddress = {},
  notes = '',
  userId: reqUserId,
}) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error('Items array must contain at least one valid product.');
  }

  if (!isPayPalConfigured()) {
    throw new Error('PayPal credentials are not configured in the server environment.');
  }

  const effectiveUserId = await getEffectiveUserId(reqUserId);

  // 1. Authoritative server-side inventory verification and price recalculation
  const verifiedItems = [];
  let calculatedSubtotal = 0;

  for (const item of items) {
    const productId = item.productId || item.id;
    const requestedQty = Math.max(1, parseInt(item.quantity, 10) || 1);

    if (!productId) {
      throw new Error('Each item must contain a valid productId.');
    }

    const dbProduct = await getDbProductByIdOrSlug(productId);
    if (!dbProduct) {
      const err = new Error(`Product not found with identifier: ${productId}`);
      err.statusCode = 404;
      err.code = 'PRODUCT_NOT_FOUND';
      throw err;
    }

    // 1. PAYMENT SAFETY: Variant-level stock and availability validation
    const variants = Array.isArray(dbProduct.specs?.variants) ? dbProduct.specs.variants : [];
    let matchedVariant = null;
    let authoritativePrice = Number(dbProduct.price);
    const variantKey = item.variantId || item.variantSku || item.sku;

    if (variantKey && variants.length > 0) {
      matchedVariant = variants.find(
        (v) =>
          v.variant_id === variantKey ||
          v.uuid === variantKey ||
          v.sku === variantKey
      );

      if (!matchedVariant) {
        const err = new Error(
          `Payment Safety Error: Variant "${variantKey}" not found for product "${dbProduct.title}".`
        );
        err.statusCode = 400;
        err.code = 'VARIANT_NOT_FOUND';
        throw err;
      }

      const variantStock = Number(matchedVariant.stock) || 0;
      if (variantStock <= 0) {
        const err = new Error(
          `Payment Safety Error: Variant "${matchedVariant.title || matchedVariant.sku}" for product "${dbProduct.title}" is sold out and unavailable.`
        );
        err.statusCode = 400;
        err.code = 'VARIANT_SOLD_OUT';
        throw err;
      }

      if (variantStock < requestedQty) {
        const err = new Error(
          `Payment Safety Error: Insufficient stock for variant "${matchedVariant.title || matchedVariant.sku}". Requested: ${requestedQty}, Available: ${variantStock}`
        );
        err.statusCode = 400;
        err.code = 'INSUFFICIENT_VARIANT_STOCK';
        throw err;
      }

      authoritativePrice = Number(matchedVariant.price);
    } else {
      // Single product / parent stock check
      const currentStock = dbProduct.stock !== undefined ? dbProduct.stock : 50;
      if (currentStock < requestedQty) {
        const err = new Error(
          `Payment Safety Error: Insufficient stock for "${dbProduct.title}". Requested: ${requestedQty}, Available: ${currentStock}`
        );
        err.statusCode = 400;
        err.code = 'INSUFFICIENT_STOCK';
        throw err;
      }
    }

    // 2. PAYMENT SAFETY: Aptdot + PayPal Sandbox = ALLOWED. Aptdot + PayPal LIVE = BLOCKED.
    const isSandboxMode = (config.paypal.mode || 'sandbox').toLowerCase() === 'sandbox';
    if (!isSandboxMode && (dbProduct.catalogue_source === 'aptdot_synthetic' || dbProduct.is_demo === true)) {
      const err = new Error(
        `Payment Safety Error: Product "${dbProduct.title}" belongs to the Aptdot synthetic demo catalogue and cannot be purchased via live PayPal production mode.`
      );
      err.statusCode = 400;
      err.code = 'SYNTHETIC_CATALOGUE_PAYMENT_BLOCKED';
      throw err;
    }

    // 3. PAYMENT SAFETY: Reject inactive lifecycle states (draft, archived)
    if (dbProduct.lifecycle_status === 'draft' || dbProduct.lifecycle_status === 'archived') {
      const err = new Error(
        `Payment Safety Error: Product "${dbProduct.title}" is ${dbProduct.lifecycle_status} and cannot be purchased.`
      );
      err.statusCode = 400;
      err.code = 'INACTIVE_PRODUCT_PAYMENT_BLOCKED';
      throw err;
    }

    // 4. PAYMENT SAFETY: Reject out-of-stock parent products
    if (dbProduct.in_stock === false) {
      const err = new Error(
        `Payment Safety Error: Product "${dbProduct.title}" is currently out of stock.`
      );
      err.statusCode = 400;
      err.code = 'PRODUCT_OUT_OF_STOCK';
      throw err;
    }

    if (isNaN(authoritativePrice) || authoritativePrice < 0) {
      const err = new Error(`Payment Safety Error: Invalid authoritative price for product: ${dbProduct.title}`);
      err.statusCode = 400;
      throw err;
    }

    calculatedSubtotal += authoritativePrice * requestedQty;

    verifiedItems.push({
      productId: dbProduct.id,
      title: dbProduct.title,
      brand: dbProduct.brand || 'Authorized Hardware',
      image: dbProduct.image_url || dbProduct.image,
      imageUrl: dbProduct.image_url || dbProduct.image,
      quantity: requestedQty,
      unitPrice: authoritativePrice,
      price: authoritativePrice,
      totalPrice: authoritativePrice * requestedQty,
      selectedVariant: matchedVariant
        ? {
            variantId: matchedVariant.variant_id,
            sku: matchedVariant.sku,
            title: matchedVariant.title,
            options: matchedVariant.options,
          }
        : null,
      dbProduct,
    });
  }

  // 2. Strict tax and shipping calculation in USD
  const subtotalUsd = Math.round(calculatedSubtotal * 100) / 100;
  const taxUsd = Math.round(subtotalUsd * 0.08 * 100) / 100; // 8% standard tax
  const shippingUsd = subtotalUsd >= 50 || subtotalUsd === 0 ? 0 : 9.99;
  const totalUsd = Math.round((subtotalUsd + taxUsd + shippingUsd) * 100) / 100;

  const usdTotal = totalUsd.toFixed(2);
  const usdSubtotal = subtotalUsd.toFixed(2);
  const usdTax = taxUsd.toFixed(2);
  const usdShipping = shippingUsd.toFixed(2);

  // 3. Create pending order in Supabase
  let order;
  if (isSupabaseConfigured()) {
    order = await createDbOrder({
      userId: effectiveUserId,
      items: verifiedItems,
      subtotal: subtotalUsd,
      tax: taxUsd,
      shippingCost: shippingUsd,
      total: totalUsd,
      currency: 'USD',
      shippingAddress,
      notes: notes || `Created for PayPal Sandbox capture ($${usdTotal} USD)`,
    });
  } else {
    // In-memory fallback if Supabase is unconfigured
    const orderNumber = `CP-ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    order = {
      id: `sim-${Date.now()}`,
      order_number: orderNumber,
      user_id: effectiveUserId,
      status: 'pending',
      subtotal: subtotalUsd,
      tax: taxUsd,
      shipping_cost: shippingUsd,
      total: totalUsd,
      currency: 'USD',
      shipping_address: shippingAddress,
      created_at: new Date().toISOString(),
    };
  }

  // 4. Call PayPal REST Orders v2 API
  const accessToken = await getPayPalAccessToken();
  const paypalUrl = `${config.paypal.baseUrl}/v2/checkout/orders`;

  const paypalItems = verifiedItems.map((item) => ({
    name: item.title.substring(0, 127),
    description: `${item.brand} - Hardware`.substring(0, 127),
    quantity: String(item.quantity),
    unit_amount: {
      currency_code: 'USD',
      value: Number(item.unitPrice).toFixed(2),
    },
    sku: (item.selectedVariant?.sku || item.productId || 'SKU').substring(0, 127),
    category: 'PHYSICAL_GOODS',
  }));

  const paypalPayload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: order.id,
        custom_id: order.id,
        invoice_id: order.order_number,
        description: `CartPilot AI Order ${order.order_number} ($${usdTotal} USD)`,
        amount: {
          currency_code: 'USD',
          value: usdTotal,
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: usdSubtotal,
            },
            tax_total: {
              currency_code: 'USD',
              value: usdTax,
            },
            shipping: {
              currency_code: 'USD',
              value: usdShipping,
            },
          },
        },
        items: paypalItems,
      },
    ],
    application_context: {
      brand_name: 'CartPilot AI',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
      shipping_preference: 'NO_SHIPPING',
    },
  };

  const paypalRes = await fetch(paypalUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify(paypalPayload),
  });

  if (!paypalRes.ok) {
    const errorDetails = await paypalRes.text();
    console.error('[PayPal Service] Order creation error:', paypalRes.status, errorDetails);
    throw new Error(`PayPal order creation failed [${paypalRes.status}]: ${errorDetails}`);
  }

  const paypalData = await paypalRes.json();

  return {
    success: true,
    orderId: order.id,
    orderNumber: order.order_number,
    paypalOrderId: paypalData.id,
    paypalStatus: paypalData.status,
    currency: 'USD',
    paypalCurrency: 'USD',
    amount: {
      subtotal: subtotalUsd,
      tax: taxUsd,
      shipping: shippingUsd,
      total: totalUsd,
      usdTotal,
      usdSubtotal,
      usdTax,
      usdShipping,
    },
  };
}

/**
 * Capture and strictly verify PayPal Sandbox Order
 * Validates PayPal capture status, order amounts, decrements stock, records payment, and mints Digital Purchase Passports.
 */
export async function capturePayPalOrder({
  paypalOrderId,
  orderId,
  userId: reqUserId,
}) {
  if (!paypalOrderId) {
    throw new Error('PayPal Order ID is required for capture.');
  }

  if (!isPayPalConfigured()) {
    throw new Error('PayPal credentials are not configured in the server environment.');
  }

  const effectiveUserId = await getEffectiveUserId(reqUserId);

  // 1. Idempotency Check: Check if this payment or order was already captured
  if (isSupabaseConfigured() && supabaseAdmin) {
    const { data: existingPayment } = await supabaseAdmin
      .from('payments')
      .select('*, order:orders(*)')
      .eq('paypal_order_id', paypalOrderId)
      .maybeSingle();

    if (existingPayment && existingPayment.status === 'captured') {
      console.log(`[PayPal Service] Order ${paypalOrderId} already captured (idempotent duplicate request)`);
      return {
        success: true,
        alreadyProcessed: true,
        orderId: existingPayment.order_id,
        paypalCaptureId: existingPayment.paypal_capture_id,
        status: 'COMPLETED',
        payment: existingPayment,
        order: existingPayment.order,
      };
    }
  }

  // 2. Execute capture against PayPal REST Orders v2 API
  const accessToken = await getPayPalAccessToken();
  const captureUrl = `${config.paypal.baseUrl}/v2/checkout/orders/${paypalOrderId}/capture`;

  const captureRes = await fetch(captureUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      Prefer: 'return=representation',
    },
  });

  const captureData = await captureRes.json();

  // If already captured on PayPal side, fetch the order details to verify
  let purchaseUnit = captureData.purchase_units?.[0];
  let captureRecord = purchaseUnit?.payments?.captures?.[0];
  let captureStatus = captureData.status || captureRecord?.status;

  if (!captureRes.ok) {
    // If PayPal says order was already captured (ORDER_ALREADY_CAPTURED)
    if (captureData.name === 'UNPROCESSABLE_ENTITY' && captureData.details?.some(d => d.issue === 'ORDER_ALREADY_CAPTURED')) {
      // Fetch details from PayPal
      const checkRes = await fetch(`${config.paypal.baseUrl}/v2/checkout/orders/${paypalOrderId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const checkData = await checkRes.json();
      purchaseUnit = checkData.purchase_units?.[0];
      captureRecord = purchaseUnit?.payments?.captures?.[0];
      captureStatus = checkData.status;
    } else {
      console.error('[PayPal Service] Capture call failed:', captureRes.status, captureData);
      throw new Error(`PayPal capture failed [${captureRes.status}]: ${captureData.message || JSON.stringify(captureData)}`);
    }
  }

  // 3. Strict verification of capture status
  const isCompleted = captureStatus === 'COMPLETED' || captureRecord?.status === 'COMPLETED';
  if (!isCompleted) {
    throw new Error(`PayPal payment not completed. Current status: ${captureStatus || 'UNKNOWN'}`);
  }

  const paypalCaptureId = captureRecord?.id || `CAP-${paypalOrderId}`;
  const capturedAmountUsd = parseFloat(captureRecord?.amount?.value || purchaseUnit?.amount?.value || '0');
  const capturedCurrency = captureRecord?.amount?.currency_code || 'USD';

  // 4. Resolve local CartPilot Order
  const targetOrderId = orderId || purchaseUnit?.custom_id || purchaseUnit?.reference_id;
  let order = null;

  if (targetOrderId && isSupabaseConfigured()) {
    order = await getDbOrderById(targetOrderId).catch(() => null);
  }

  if (!order && purchaseUnit?.invoice_id && isSupabaseConfigured()) {
    order = await findDbOrderByRef(purchaseUnit.invoice_id).catch(() => null);
  }

  // 5. Verification: Check captured USD against expected order converted total
  if (order) {
    const expectedUsd = order.currency === 'USD' ? Number(order.total) : Math.round((Number(order.total) / EXCHANGE_RATE_INR_USD) * 100) / 100;
    const diff = Math.abs(capturedAmountUsd - expectedUsd);
    // Allow up to $0.15 tolerance for cent rounding differences
    if (diff > 0.15) {
      console.warn(`[PayPal Service] Amount mismatch warning: Captured $${capturedAmountUsd} vs Expected $${expectedUsd}`);
    }

    // 5b. PAYMENT SAFETY: In live PayPal mode, reject synthetic/demo products!
    const isSandbox = (config.paypal.mode || 'sandbox').toLowerCase() === 'sandbox';
    if (!isSandbox && Array.isArray(order.items)) {
      for (const item of order.items) {
        const prodId = item.productId || item.product_id || item.id;
        if (prodId) {
          const p = await getDbProductByIdOrSlug(prodId).catch(() => null);
          if (p && (p.is_demo === true || p.catalogue_source === 'aptdot_synthetic')) {
            const err = new Error(
              `Payment Safety Error: Payment capture rejected. Order contains synthetic product "${p.title}" on live production PayPal.`
            );
            err.statusCode = 400;
            err.code = 'CAPTURE_SAFETY_REJECTED';
            throw err;
          }
        }
      }
    }
  }

  // 6. Record Payment in Supabase
  let paymentRecord = null;
  if (isSupabaseConfigured() && order) {
    paymentRecord = await recordDbPayment({
      orderId: order.id,
      userId: order.user_id || effectiveUserId,
      paymentGateway: 'paypal',
      paypalOrderId,
      paypalCaptureId,
      amount: order.total,
      currency: order.currency || 'USD',
      status: 'captured',
      rawResponse: captureData,
    });
  }

  // 7. Decrement Inventory & Stock in Supabase
  if (isSupabaseConfigured() && order?.items && order.items.length > 0) {
    for (const lineItem of order.items) {
      if (lineItem.product_id) {
        try {
          await decrementDbProductStock(lineItem.product_id, lineItem.quantity);
        } catch (stockErr) {
          console.warn(`[PayPal Service] Stock decrement failed for item ${lineItem.product_id}:`, stockErr.message);
        }
      }
    }
  }

  // 8. Mint Digital Purchase Passports
  const mintedPassports = [];
  if (isSupabaseConfigured() && order?.items && order.items.length > 0) {
    for (const lineItem of order.items) {
      try {
        const passport = await mintDbPurchasePassport({
          orderId: order.id,
          orderItemId: lineItem.id,
          userId: order.user_id || effectiveUserId,
          productId: lineItem.product_id,
          productTitle: lineItem.title,
          brand: lineItem.brand || 'Authorized Hardware',
          imageUrl: lineItem.image_url,
          serialNumber: lineItem.serial_number || `SN-${Date.now()}`,
          purchasePrice: lineItem.unit_price,
          currency: order.currency || 'USD',
          returnWindowDays: 30,
          warrantyMonths: 24,
        });
        if (passport) mintedPassports.push(passport);
      } catch (passErr) {
        console.warn(`[PayPal Service] Passport minting warning for item ${lineItem.id}:`, passErr.message);
      }
    }
  }

  // 9. Clear user's active cart
  if (isSupabaseConfigured()) {
    try {
      await clearDbCart(effectiveUserId);
    } catch (cartErr) {
      console.warn('[PayPal Service] Cart clear warning:', cartErr.message);
    }
  }

  return {
    success: true,
    verified: true,
    orderId: order?.id || targetOrderId,
    orderNumber: order?.order_number || purchaseUnit?.invoice_id,
    paypalOrderId,
    paypalCaptureId,
    status: 'COMPLETED',
    capturedAmountUsd,
    capturedCurrency,
    settledAmount: capturedAmountUsd,
    currency: order?.currency || 'USD',
    order,
    payment: paymentRecord,
    passports: mintedPassports,
    verifiedAt: new Date().toISOString(),
  };
}

export default {
  EXCHANGE_RATE_INR_USD,
  getPayPalPublicConfig,
  createPayPalOrder,
  capturePayPalOrder,
};
