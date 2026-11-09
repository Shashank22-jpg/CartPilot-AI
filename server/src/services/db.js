import { supabase, supabaseAdmin, isSupabaseConfigured } from '../config/supabase.js';

/**
 * CartPilot AI - Database Service Layer
 * Wraps Supabase PostgreSQL operations with error handling, validation and typing.
 */

// ------------------------------------------------------------------------------
// 1. PRODUCTS SERVICES
// ------------------------------------------------------------------------------

export async function getDbProducts(filters = {}) {
  if (!isSupabaseConfigured()) return null;

  const {
    category,
    search,
    minPrice,
    maxPrice,
    inStock = true,
    limit = 50,
    offset = 0,
    sortBy = 'created_at',
    sortOrder = 'desc',
  } = filters;

  let query = supabase
    .from('products')
    .select('*')
    .eq('in_stock', inStock)
    .range(offset, offset + limit - 1)
    .order(sortBy, { ascending: sortOrder === 'asc' });

  if (category && category !== 'All') {
    query = query.eq('category', category);
  }

  if (minPrice !== undefined && minPrice !== null) {
    query = query.gte('price', Number(minPrice));
  }

  if (maxPrice !== undefined && maxPrice !== null) {
    query = query.lte('price', Number(maxPrice));
  }

  if (search && search.trim()) {
    const term = search.trim();
    query = query.or(`title.ilike.%${term}%,brand.ilike.%${term}%,description.ilike.%${term}%`);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error('[DB Service] getDbProducts error:', error.message);
    throw error;
  }

  return data;
}

export async function getDbProductByIdOrSlug(identifier) {
  if (!isSupabaseConfigured()) return null;

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

  const query = supabase.from('products').select('*');
  if (isUuid) {
    query.eq('id', identifier);
  } else {
    query.eq('slug', identifier);
  }

  const { data, error } = await query.single();
  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('[DB Service] getDbProductByIdOrSlug error:', error.message);
    throw error;
  }

  return data;
}

// ------------------------------------------------------------------------------
// 2. PROFILES SERVICES
// ------------------------------------------------------------------------------

export async function getDbProfile(userId) {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('[DB Service] getDbProfile error:', error.message);
    throw error;
  }
  return data;
}

export async function upsertDbProfile(userId, profileData) {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .upsert({
      id: userId,
      ...profileData,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('[DB Service] upsertDbProfile error:', error.message);
    throw error;
  }
  return data;
}

// ------------------------------------------------------------------------------
// 3. CART & CART ITEMS SERVICES
// ------------------------------------------------------------------------------

export async function getDbActiveCart(userId) {
  if (!isSupabaseConfigured()) return null;

  // Retrieve existing active cart with items and product relations
  let { data: cart, error } = await supabaseAdmin
    .from('carts')
    .select(`
      *,
      items:cart_items (
        id,
        quantity,
        unit_price,
        currency,
        created_at,
        product:products (*)
      )
    `)
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle();

  if (error) {
    console.error('[DB Service] getDbActiveCart query error:', error.message);
    throw error;
  }

  // Create active cart if none exists
  if (!cart) {
    const { data: newCart, error: createError } = await supabaseAdmin
      .from('carts')
      .insert({ user_id: userId, status: 'active', currency: 'INR' })
      .select('*, items:cart_items(*)')
      .single();

    if (createError) {
      console.error('[DB Service] create active cart error:', createError.message);
      throw createError;
    }
    cart = newCart;
  }

  return cart;
}

export async function addDbCartItem(userId, productId, quantity = 1, unitPrice) {
  if (!isSupabaseConfigured()) return null;

  const cart = await getDbActiveCart(userId);
  if (!cart) throw new Error('Active cart could not be initialized.');

  // If unitPrice not supplied, read from product
  let price = unitPrice;
  if (price === undefined || price === null) {
    const prod = await getDbProductByIdOrSlug(productId);
    if (!prod) throw new Error('Product not found.');
    price = prod.price;
  }

  const { data, error } = await supabaseAdmin
    .from('cart_items')
    .upsert(
      {
        cart_id: cart.id,
        product_id: productId,
        quantity,
        unit_price: price,
        currency: cart.currency || 'INR',
      },
      { onConflict: 'cart_id,product_id' }
    )
    .select('*, product:products(*)')
    .single();

  if (error) {
    console.error('[DB Service] addDbCartItem error:', error.message);
    throw error;
  }

  return data;
}

export async function updateDbCartItemQuantity(userId, itemId, quantity) {
  if (!isSupabaseConfigured()) return null;

  if (quantity <= 0) {
    return removeDbCartItem(userId, itemId);
  }

  const { data, error } = await supabaseAdmin
    .from('cart_items')
    .update({ quantity, updated_at: new Date().toISOString() })
    .eq('id', itemId)
    .select('*, product:products(*)')
    .single();

  if (error) {
    console.error('[DB Service] updateDbCartItemQuantity error:', error.message);
    throw error;
  }

  return data;
}

export async function removeDbCartItem(userId, itemId) {
  if (!isSupabaseConfigured()) return null;

  const { error } = await supabaseAdmin
    .from('cart_items')
    .delete()
    .eq('id', itemId);

  if (error) {
    console.error('[DB Service] removeDbCartItem error:', error.message);
    throw error;
  }

  return { success: true, removedItemId: itemId };
}

export async function clearDbCart(userId) {
  if (!isSupabaseConfigured()) return null;

  const cart = await getDbActiveCart(userId);
  if (!cart) return { success: true };

  const { error } = await supabaseAdmin
    .from('cart_items')
    .delete()
    .eq('cart_id', cart.id);

  if (error) {
    console.error('[DB Service] clearDbCart error:', error.message);
    throw error;
  }

  return { success: true, cartId: cart.id };
}

// ------------------------------------------------------------------------------
// 4. ORDERS & CHECKOUT SERVICES
// ------------------------------------------------------------------------------

export async function createDbOrder(orderPayload) {
  if (!isSupabaseConfigured()) return null;

  const {
    userId,
    items,
    subtotal,
    tax,
    shippingCost = 0,
    total,
    currency = 'INR',
    shippingAddress = {},
    notes = '',
  } = orderPayload;

  const orderNumber = `CP-ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // 1. Insert master order row
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert({
      order_number: orderNumber,
      user_id: userId,
      status: 'pending',
      subtotal,
      tax,
      shipping_cost: shippingCost,
      total,
      currency,
      shipping_address: shippingAddress,
      notes,
    })
    .select()
    .single();

  if (orderError) {
    console.error('[DB Service] createDbOrder master insert error:', orderError.message);
    throw orderError;
  }

  // 2. Insert line items
  if (items && items.length > 0) {
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      title: item.title,
      brand: item.brand || 'Authorized Hardware',
      image_url: item.image || item.imageUrl,
      quantity: item.quantity,
      unit_price: item.unitPrice || item.price,
      total_price: (item.unitPrice || item.price) * item.quantity,
      currency,
      serial_number: `SN-${item.brand ? item.brand.substring(0, 3).toUpperCase() : 'CP'}-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('[DB Service] insert order_items error:', itemsError.message);
      throw itemsError;
    }
  }

  return order;
}

export async function getDbUserOrders(userId) {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabaseAdmin
    .from('orders')
    .select(`
      *,
      items:order_items (*),
      payments (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[DB Service] getDbUserOrders error:', error.message);
    throw error;
  }

  return data;
}

// ------------------------------------------------------------------------------
// 5. PAYMENTS SERVICES
// ------------------------------------------------------------------------------

export async function recordDbPayment(paymentPayload) {
  if (!isSupabaseConfigured()) return null;

  const {
    orderId,
    userId,
    paymentGateway = 'paypal',
    paypalOrderId,
    paypalCaptureId,
    amount,
    currency = 'INR',
    status = 'captured',
    rawResponse = {},
  } = paymentPayload;

  const { data, error } = await supabaseAdmin
    .from('payments')
    .insert({
      order_id: orderId,
      user_id: userId,
      payment_gateway: paymentGateway,
      paypal_order_id: paypalOrderId,
      paypal_capture_id: paypalCaptureId,
      amount,
      currency,
      status,
      raw_response: rawResponse,
      verified_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('[DB Service] recordDbPayment error:', error.message);
    throw error;
  }

  // Update order status to processing upon verified capture
  if (status === 'captured') {
    await supabaseAdmin
      .from('orders')
      .update({ status: 'processing', updated_at: new Date().toISOString() })
      .eq('id', orderId);
  }

  return data;
}

// ------------------------------------------------------------------------------
// 6. DIGITAL PURCHASE PASSPORT MINTING
// ------------------------------------------------------------------------------

export async function mintDbPurchasePassport(passportPayload) {
  if (!isSupabaseConfigured()) return null;

  const {
    orderId,
    orderItemId,
    userId,
    productId,
    productTitle,
    brand,
    imageUrl,
    serialNumber,
    purchasePrice,
    currency = 'INR',
    returnWindowDays = 30,
    warrantyMonths = 24,
    claimUrl,
  } = passportPayload;

  const passportTokenId = `PASS-CP-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const transactionHash = `0x${Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

  const purchaseDate = new Date();
  const returnDeadline = new Date(purchaseDate.getTime() + returnWindowDays * 24 * 60 * 60 * 1000);
  const warrantyExpires = new Date(purchaseDate.getTime() + warrantyMonths * 30 * 24 * 60 * 60 * 1000);

  // 1. Insert Purchase Passport
  const { data: passport, error: passError } = await supabaseAdmin
    .from('purchase_passports')
    .insert({
      passport_token_id: passportTokenId,
      order_id: orderId,
      order_item_id: orderItemId,
      user_id: userId,
      product_id: productId,
      product_title: productTitle,
      brand,
      image_url: imageUrl,
      serial_number: serialNumber,
      transaction_hash: transactionHash,
      purchase_date: purchaseDate.toISOString(),
      purchase_price: purchasePrice,
      currency,
      return_window_days: returnWindowDays,
      return_deadline: returnDeadline.toISOString(),
      return_status: 'Window Active',
      status: 'active',
    })
    .select()
    .single();

  if (passError) {
    console.error('[DB Service] mintDbPurchasePassport error:', passError.message);
    throw passError;
  }

  // 2. Insert linked warranty
  const { error: warrError } = await supabaseAdmin
    .from('warranties')
    .insert({
      passport_id: passport.id,
      user_id: userId,
      product_id: productId,
      provider: `${brand} Official Service Network`,
      duration_months: warrantyMonths,
      coverage_type: 'Manufacturer Comprehensive',
      start_date: purchaseDate.toISOString(),
      expires_at: warrantyExpires.toISOString(),
      claim_url: claimUrl || `https://support.${brand.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      claim_status: 'Active (Unclaimed)',
    });

  if (warrError) {
    console.warn('[DB Service] insert linked warranty warning:', warrError.message);
  }

  // 3. Create automated return deadline reminder
  const reminderDue = new Date(returnDeadline.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days before deadline
  await supabaseAdmin
    .from('reminders')
    .insert({
      user_id: userId,
      passport_id: passport.id,
      order_id: orderId,
      reminder_type: 'return_deadline',
      title: `Return Window Closing Soon: ${productTitle.substring(0, 30)}...`,
      message: `Your return window for ${productTitle} ends in 3 days. Inspect hardware and report defects before deadline.`,
      due_at: reminderDue.toISOString(),
    })
    .then(() => {})
    .catch((err) => console.warn('[DB Service] reminder notice warning:', err.message));

  return passport;
}

export async function getDbUserPassports(userId) {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabaseAdmin
    .from('purchase_passports')
    .select(`
      *,
      warranties (*),
      product:products (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[DB Service] getDbUserPassports error:', error.message);
    throw error;
  }

  return data;
}

export default {
  getDbProducts,
  getDbProductByIdOrSlug,
  getDbProfile,
  upsertDbProfile,
  getDbActiveCart,
  addDbCartItem,
  updateDbCartItemQuantity,
  removeDbCartItem,
  clearDbCart,
  createDbOrder,
  getDbUserOrders,
  recordDbPayment,
  mintDbPurchasePassport,
  getDbUserPassports,
};
