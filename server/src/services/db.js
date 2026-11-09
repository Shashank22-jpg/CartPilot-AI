import { supabase, supabaseAdmin, isSupabaseConfigured } from '../config/supabase.js';

/**
 * CartPilot AI - Database Service Layer
 * Wraps Supabase PostgreSQL operations with error handling, validation and typing.
 */

// ------------------------------------------------------------------------------
// 1. PRODUCTS SERVICES
// ------------------------------------------------------------------------------

/**
 * Format a database product row with structured variants, options, and availability flags.
 * Preserves all original database fields while elevating variant status.
 */
export function formatProductWithVariants(product) {
  if (!product) return null;

  const rawVariants = Array.isArray(product.specs?.variants) ? product.specs.variants : [];
  const rawOptions = Array.isArray(product.specs?.options) ? product.specs.options : [];
  const isProductActive = product.lifecycle_status === 'active';

  const formattedVariants = rawVariants.map((v) => {
    const stock = Number(v.stock) !== undefined && v.stock !== null ? Number(v.stock) : 0;
    const isSoldOut = stock <= 0;
    const isAvailable = stock > 0 && isProductActive && Boolean(product.in_stock);

    return {
      variant_id: v.variant_id || v.id,
      id: v.uuid || v.variant_id || v.sku,
      uuid: v.uuid,
      sku: v.sku,
      title: v.title,
      options: v.options || {},
      price: Number(v.price),
      compare_at_price: v.compare_at_price ? Number(v.compare_at_price) : null,
      stock,
      in_stock: stock > 0,
      is_available: isAvailable,
      is_sold_out: isSoldOut,
      disabled: !isAvailable,
    };
  });

  return {
    ...product,
    price: Number(product.price),
    original_price: product.original_price ? Number(product.original_price) : null,
    stock: Number(product.stock) || 0,
    has_variants: formattedVariants.length > 0,
    total_variants: formattedVariants.length,
    options: rawOptions,
    variants: formattedVariants,
    is_available: Boolean(product.in_stock) && isProductActive,
    catalogue_source: product.catalogue_source || 'aptdot_synthetic',
    verification_tier: product.verification_tier || 'synthetic',
    lifecycle_status: product.lifecycle_status || 'active',
    currency: product.currency || 'USD',
  };
}

export async function getDbProducts(filters = {}) {
  if (!isSupabaseConfigured()) return null;

  const client = supabaseAdmin || supabase;
  if (!client) return null;

  const {
    category,
    search,
    minPrice,
    maxPrice,
    currency = 'USD',
    inStock,
    limit = 100,
    offset = 0,
    sortBy = 'created_at',
    sortOrder = 'desc',
    includeInactive = false,
  } = filters;

  const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 100);
  const safeOffset = Math.max(parseInt(offset, 10) || 0, 0);
  const allowedSortColumns = ['created_at', 'price', 'rating', 'title', 'reviews_count'];
  const safeSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'created_at';
  const isAscending = sortOrder === 'asc';

  let query = client
    .from('products')
    .select('*')
    .range(safeOffset, safeOffset + safeLimit - 1)
    .order(safeSortBy, { ascending: isAscending });

  // 1. Lifecycle filter: Exclude draft and archived from normal public catalogue results
  if (!includeInactive) {
    query = query.eq('lifecycle_status', 'active');
  }

  // 2. Strict Unified Catalogue Source: Aptdot Synthetic Catalogue ONLY
  query = query.eq('catalogue_source', 'aptdot_synthetic');

  // 3. Currency filter
  if (currency && typeof currency === 'string') {
    query = query.eq('currency', currency.trim().toUpperCase());
  }

  // 4. In-Stock filter (if explicitly passed)
  if (inStock !== undefined && inStock !== null && inStock !== '' && inStock !== 'all') {
    const isInStock = String(inStock).toLowerCase() === 'true';
    query = query.eq('in_stock', isInStock);
  }

  // 5. Category filter
  if (category && category !== 'All') {
    query = query.ilike('category', `%${category.trim()}%`);
  }

  // 6. Price Range filter
  if (minPrice !== undefined && minPrice !== null && !isNaN(Number(minPrice))) {
    query = query.gte('price', Number(minPrice));
  }

  if (maxPrice !== undefined && maxPrice !== null && !isNaN(Number(maxPrice))) {
    query = query.lte('price', Number(maxPrice));
  }

  // 7. Search filter
  if (search && typeof search === 'string' && search.trim()) {
    const rawTokens = search.trim().replace(/[^a-zA-Z0-9\s-]/g, '').split(/\s+/).filter(t => t.length >= 2);
    if (rawTokens.length > 0) {
      const orConditions = [];
      const fullPhrase = rawTokens.join(' ');
      orConditions.push(`title.ilike.%${fullPhrase}%`);
      orConditions.push(`brand.ilike.%${fullPhrase}%`);
      orConditions.push(`description.ilike.%${fullPhrase}%`);

      rawTokens.slice(0, 4).forEach(tok => {
        orConditions.push(`title.ilike.%${tok}%`);
        orConditions.push(`brand.ilike.%${tok}%`);
      });

      query = query.or(orConditions.join(','));
    }
  }

  const { data, error } = await query;
  if (error) {
    console.error('[DB Service] getDbProducts error:', error.message);
    throw error;
  }

  return (data || []).map(formatProductWithVariants);
}

export async function getDbProductByIdOrSlug(identifier) {
  if (!identifier) return null;

  if (isSupabaseConfigured()) {
    const client = supabaseAdmin || supabase;
    if (client) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

      const query = client.from('products').select('*');
      if (isUuid) {
        query.eq('id', identifier);
      } else {
        query.eq('slug', identifier);
      }

      const { data, error } = await query.single();
      if (!error && data) {
        return formatProductWithVariants(data);
      }
    }
  }

  return null;
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
    const orderItems = await Promise.all(items.map(async (item) => {
      let validProductId = null;
      if (item.productId) {
        const { data: prodRow } = await supabaseAdmin
          .from('products')
          .select('id')
          .eq('id', item.productId)
          .maybeSingle();
        if (prodRow) validProductId = prodRow.id;
      }

      return {
        order_id: order.id,
        product_id: validProductId,
        title: item.title,
        brand: item.brand || 'Authorized Hardware',
        image_url: item.image || item.imageUrl,
        quantity: item.quantity,
        unit_price: item.unitPrice || item.price,
        total_price: (item.unitPrice || item.price) * item.quantity,
        currency,
        serial_number: `SN-${item.brand ? item.brand.substring(0, 3).toUpperCase() : 'CP'}-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      };
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

  let validProductId = null;
  if (productId) {
    const { data: prodRow } = await supabaseAdmin
      .from('products')
      .select('id')
      .eq('id', productId)
      .maybeSingle();
    if (prodRow) validProductId = prodRow.id;
  }

  // 1. Insert Purchase Passport
  const { data: passport, error: passError } = await supabaseAdmin
    .from('purchase_passports')
    .insert({
      passport_token_id: passportTokenId,
      order_id: orderId,
      order_item_id: orderItemId,
      user_id: userId,
      product_id: validProductId,
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
      product_id: validProductId,
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

// ------------------------------------------------------------------------------
// 7. STOCK MANAGEMENT & ORDER LOOKUPS
// ------------------------------------------------------------------------------

export async function getEffectiveUserId(preferredId) {
  const isUuid = preferredId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(preferredId);

  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      if (isUuid) {
        const { data: userRecord } = await supabaseAdmin.auth.admin.getUserById(preferredId);
        if (userRecord?.user?.id) {
          return userRecord.user.id;
        }
      }

      const { data } = await supabaseAdmin.auth.admin.listUsers({ perPage: 25 });
      if (data?.users && data.users.length > 0) {
        const permanentUser =
          data.users.find((u) => u.email === 'arshashank49@gmail.com') ||
          data.users.find((u) => u.email === 'demo@cartpilot.ai') ||
          data.users.find((u) => !u.email?.includes('test_user_')) ||
          data.users[0];
        return permanentUser.id;
      }

      // If no users exist, create default demo auth user
      const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
        email: 'demo@cartpilot.ai',
        password: 'DemoUserCartPilot2026!',
        email_confirm: true,
        user_metadata: { full_name: 'Shashank AR' },
      });

      if (!error && created?.user) {
        await supabaseAdmin.from('profiles').upsert({
          id: created.user.id,
          email: created.user.email,
          full_name: 'Shashank AR',
          currency: 'INR',
        });
        return created.user.id;
      }
    } catch (authErr) {
      console.warn('[DB Service] Could not fetch/create auth user:', authErr.message);
    }
  }

  return '00000000-0000-0000-0000-000000000001';
}

export async function decrementDbProductStock(productId, quantity = 1) {
  if (!isSupabaseConfigured()) return null;

  const client = supabaseAdmin || supabase;
  const product = await getDbProductByIdOrSlug(productId);
  if (!product) return null;

  const currentStock = product.stock !== undefined ? product.stock : 50;
  const newStock = Math.max(0, currentStock - quantity);
  const isInStock = newStock > 0;

  const { data, error } = await client
    .from('products')
    .update({
      stock: newStock,
      in_stock: isInStock,
      updated_at: new Date().toISOString(),
    })
    .eq('id', product.id)
    .select()
    .single();

  if (error) {
    console.error('[DB Service] decrementDbProductStock error:', error.message);
    throw error;
  }

  return data;
}

export async function getDbOrderById(orderId) {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabaseAdmin
    .from('orders')
    .select(`
      *,
      items:order_items (*),
      payments (*),
      passports:purchase_passports (*)
    `)
    .eq('id', orderId)
    .single();

  if (error) {
    console.error('[DB Service] getDbOrderById error:', error.message);
    throw error;
  }

  return data;
}

export async function findDbOrderByRef(orderRef) {
  if (!isSupabaseConfigured()) return null;

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderRef);
  let query = supabaseAdmin
    .from('orders')
    .select(`
      *,
      items:order_items (*),
      payments (*),
      passports:purchase_passports (*)
    `);

  if (isUuid) {
    query = query.eq('id', orderRef);
  } else {
    query = query.eq('order_number', orderRef);
  }

  const { data, error } = await query.maybeSingle();
  if (error) {
    console.error('[DB Service] findDbOrderByRef error:', error.message);
    throw error;
  }

  return data;
}

export default {
  formatProductWithVariants,
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
  getEffectiveUserId,
  decrementDbProductStock,
  getDbOrderById,
  findDbOrderByRef,
};
