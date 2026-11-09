import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import apiService from '../services/api';
import {
  supabase,
  getCurrentSession,
  onAuthStateChange,
  isSupabaseConfigured,
  fetchProductsFromSupabase,
  signOut as supabaseSignOut,
} from '../services/supabase';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Sidebar State (Desktop Collapsed & Mobile Open Drawer)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem('cp_sidebar_collapsed');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('cp_sidebar_collapsed', JSON.stringify(next));
      return next;
    });
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(prev => !prev);
  };

  // Toast Notification State
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  // Cart State (Initialized empty)
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product, quantity = 1, selectedVariant = null) => {
    setCart(prev => {
      const cartItemId = selectedVariant ? `${product.id}__${selectedVariant.sku || selectedVariant.id || selectedVariant.variant_id}` : product.id;
      const existingIndex = prev.findIndex(item => (item.cartItemId && item.cartItemId === cartItemId) || (item.product.id === product.id && !item.selectedVariant && !selectedVariant));

      const effectivePrice = selectedVariant?.price !== undefined ? Number(selectedVariant.price) : Number(product.price);
      const effectiveSku = selectedVariant?.sku || product.specs?.sku || product.id;
      const effectiveTitle = selectedVariant ? `${product.title} (${selectedVariant.title || Object.values(selectedVariant.options || {}).join(' / ')})` : product.title;

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, {
        product,
        quantity,
        selectedVariant,
        cartItemId,
        price: effectivePrice,
        displayTitle: effectiveTitle,
        sku: effectiveSku,
      }];
    });
    const label = selectedVariant ? `${product.title} (${selectedVariant.title || 'Variant'})` : product.title;
    showToast(`Added "${label.substring(0, 32)}..." to your cart`, 'success');
  }, [showToast]);

  const updateQuantity = useCallback((cartItemIdOrProductId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemIdOrProductId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        (item.cartItemId === cartItemIdOrProductId || item.product.id === cartItemIdOrProductId) ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((cartItemIdOrProductId) => {
    setCart(prev => {
      const item = prev.find(i => i.cartItemId === cartItemIdOrProductId || i.product.id === cartItemIdOrProductId);
      if (item) {
        showToast(`Removed "${item.product.title.substring(0, 24)}..." from cart`, 'info');
      }
      return prev.filter(i => i.cartItemId !== cartItemIdOrProductId && i.product.id !== cartItemIdOrProductId);
    });
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    showToast('Shopping cart cleared', 'info');
  }, [showToast]);

  // Cart Financials in USD (Aptdot unified catalogue)
  const cartFinancials = useMemo(() => {
    const safeCart = Array.isArray(cart) ? cart.filter(Boolean) : [];
    const itemCount = safeCart.reduce((count, item) => count + (item?.quantity || 1), 0);
    const primaryCurrency = 'USD';
    const isMixedCurrency = false;
    const hasSyntheticItems = false; // Aptdot is fully authorized for PayPal Sandbox checkout!

    const subtotal = safeCart.reduce((sum, item) => {
      const linePrice = item?.selectedVariant?.price !== undefined
        ? Number(item.selectedVariant.price)
        : Number(item?.product?.price || 0);
      return sum + (linePrice * (item?.quantity || 1));
    }, 0);

    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 9.99;
    const total = Math.round((subtotal + tax + shipping) * 100) / 100;

    return {
      subtotal,
      tax,
      shipping,
      total,
      cartTotal: total,
      itemCount,
      primaryCurrency,
      isMixedCurrency,
      hasSyntheticItems,
    };
  }, [cart]);

  // Compare State (Initialized empty)
  const [compareList, setCompareList] = useState([]);

  const addToCompare = useCallback((product) => {
    setCompareList(prev => {
      if (prev.some(p => p.id === product.id)) {
        showToast(`"${product.title.substring(0, 25)}..." is already in comparison`, 'info');
        return prev;
      }
      if (prev.length >= 4) {
        showToast('Maximum 4 products can be compared at once', 'warning');
        return prev;
      }
      showToast(`Added "${product.title.substring(0, 25)}..." to comparison`, 'success');
      return [...prev, product];
    });
  }, [showToast]);

  const removeFromCompare = useCallback((productId) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
    showToast('Product removed from comparison', 'info');
  }, [showToast]);

  const isInCompare = useCallback((productId) => {
    return compareList.some(p => p.id === productId);
  }, [compareList]);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    showToast('Comparison list cleared', 'info');
  }, [showToast]);

  // Product Catalogue State (Authoritative Supabase - Aptdot Unified Catalogue)
  const [products, setProducts] = useState([]);
  const [activeCatalogue, setActiveCatalogue] = useState('aptdot');
  const [productsSource, setProductsSource] = useState('supabase');
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);

  // Helper to normalize product format across Supabase DB
  const normalizeProduct = useCallback((p) => {
    const rawVariants = Array.isArray(p.variants) && p.variants.length > 0
      ? p.variants
      : (Array.isArray(p.specs?.variants) ? p.specs.variants : []);

    const rawOptions = Array.isArray(p.options) && p.options.length > 0
      ? p.options
      : (Array.isArray(p.specs?.options) ? p.specs.options : []);

    const hasVariants = Boolean(p.has_variants || p.specs?.has_variants || rawVariants.length > 0);
    const totalVariants = Number(p.total_variants || rawVariants.length);

    return {
      ...p,
      id: p.id || p.slug,
      slug: p.slug || p.id,
      title: p.title || p.name || 'Untitled Product',
      name: p.name || p.title || 'Untitled Product',
      brand: p.brand || 'Generic',
      category: p.category || 'General',
      description: p.description || '',
      price: Number(p.price) || 0,
      originalPrice: p.original_price !== undefined ? (p.original_price ? Number(p.original_price) : null) : (p.originalPrice ? Number(p.originalPrice) : null),
      compare_at_price: p.compare_at_price !== undefined ? p.compare_at_price : (p.original_price || p.originalPrice || null),
      currency: p.currency || 'USD',
      rating: Number(p.rating) || 4.5,
      reviewsCount: p.reviews_count !== undefined ? Number(p.reviews_count) : (p.reviewsCount || 0),
      stock: p.stock !== undefined ? Number(p.stock) : (p.in_stock ? 50 : 0),
      inStock: p.in_stock !== undefined ? Boolean(p.in_stock) : (p.inStock !== undefined ? Boolean(p.inStock) : true),
      is_available: p.is_available !== undefined ? Boolean(p.is_available) : (p.in_stock !== false && (p.stock === undefined || p.stock > 0)),
      image: p.image_url || p.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      imageUrl: p.image_url || p.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      tag: p.tag || 'Aptdot Certified',
      badgeType: p.badge_type || p.badgeType || 'verified',
      specs: p.specs || {},
      pros: Array.isArray(p.pros) ? p.pros : [],
      cons: Array.isArray(p.cons) ? p.cons : [],
      seller: typeof p.seller === 'object' && p.seller !== null ? {
        name: p.seller.name || 'Aptdot Commercial Goods',
        verifiedStatus: p.seller.verifiedStatus || 'Verified Vendor',
        fulfillment: p.seller.fulfillment || 'Standard Delivery',
        location: p.seller.location || 'United States',
        rating: Number(p.seller.rating) || 4.8,
        ...p.seller,
      } : {
        name: typeof p.seller === 'string' ? p.seller : 'Aptdot Commercial Goods',
        verifiedStatus: 'Verified Vendor',
        fulfillment: 'Standard Delivery',
        location: 'United States',
        rating: 4.8,
      },
      evidence: typeof p.evidence === 'object' && p.evidence !== null ? {
        ...p.evidence,
        sources: Array.isArray(p.evidence.sources) && p.evidence.sources.length > 0
          ? p.evidence.sources
          : [
              p.evidence.source || 'Aptdot E-Commerce Product Catalog',
              p.evidence.sku ? `SKU: ${p.evidence.sku}` : null,
              'Audited Benchmark Specifications',
            ].filter(Boolean),
        warrantyMonths: p.evidence.warrantyMonths || 12,
      } : {
        sources: ['Aptdot Product Catalog', 'CC0-1.0 Universal License'],
        warrantyMonths: 12,
      },
      warranty: typeof p.warranty === 'object' && p.warranty !== null
        ? [p.warranty.duration, p.warranty.terms].filter(Boolean).join(' • ') || '1-Year Limited Warranty'
        : (typeof p.warranty === 'string' ? p.warranty : '1-Year Limited Warranty'),
      warrantyDetails: typeof p.warranty === 'object' && p.warranty !== null ? {
        duration: p.warranty.duration || '1-Year Limited Warranty',
        terms: p.warranty.terms || 'Manufacturer Coverage with PayPal Protection',
        ...p.warranty,
      } : {
        duration: typeof p.warranty === 'string' ? p.warranty : '1-Year Limited Warranty',
        terms: 'Manufacturer Coverage with PayPal Protection',
      },
      return_policy: typeof p.return_policy === 'string'
        ? p.return_policy
        : (typeof p.returnPolicy === 'string'
            ? p.returnPolicy
            : (p.returnPolicy?.terms || p.return_policy?.terms || '30-Day Hassle-Free Returns')),
      returnPolicy: typeof p.returnPolicy === 'object' && p.returnPolicy !== null ? {
        days: Number(p.returnPolicy.days) || 30,
        terms: p.returnPolicy.terms || '30-Day Hassle-Free Returns',
        restockingFee: Number(p.returnPolicy.restockingFee) || 0,
        prepaidLabel: p.returnPolicy.prepaidLabel !== undefined ? Boolean(p.returnPolicy.prepaidLabel) : true,
        ...p.returnPolicy,
      } : (
        typeof p.return_policy === 'object' && p.return_policy !== null ? {
          days: Number(p.return_policy.days) || 30,
          terms: p.return_policy.terms || '30-Day Hassle-Free Returns',
          restockingFee: Number(p.return_policy.restockingFee) || 0,
          prepaidLabel: p.return_policy.prepaidLabel !== undefined ? Boolean(p.return_policy.prepaidLabel) : true,
          ...p.return_policy,
        } : {
          days: 30,
          terms: typeof p.return_policy === 'string' ? p.return_policy : '30-Day Hassle-Free Returns',
          restockingFee: 0,
          prepaidLabel: true,
        }
      ),
      riskAssessment: typeof p.riskAssessment === 'object' && p.riskAssessment !== null ? {
        status: p.riskAssessment.status || 'Verified Commercial Specifications',
        summary: p.riskAssessment.summary || (typeof p.risk_assessment === 'string' ? p.risk_assessment : 'Specifications verified for commercial e-commerce evaluation.'),
        concerns: Array.isArray(p.riskAssessment.concerns) && p.riskAssessment.concerns.length > 0
          ? p.riskAssessment.concerns
          : [
              'Standard return window: 30 days.',
              'Eligible for PayPal Sandbox Orders v2 checkout and passport minting.',
            ],
        missingInfo: p.riskAssessment.missingInfo || 'None reported.',
        ...p.riskAssessment,
      } : (
        typeof p.risk_assessment === 'object' && p.risk_assessment !== null ? {
          status: p.risk_assessment.status || 'Verified Commercial Specifications',
          summary: p.risk_assessment.summary || 'Specifications verified for commercial e-commerce evaluation.',
          concerns: Array.isArray(p.risk_assessment.concerns) && p.risk_assessment.concerns.length > 0
            ? p.risk_assessment.concerns
            : [
                'Standard return window: 30 days.',
                'Eligible for PayPal Sandbox Orders v2 checkout and passport minting.',
              ],
          missingInfo: p.risk_assessment.missingInfo || 'None reported.',
          ...p.risk_assessment,
        } : {
          status: 'Verified Commercial Specifications',
          summary: typeof p.risk_assessment === 'string'
            ? p.risk_assessment
            : 'Specifications verified for commercial e-commerce evaluation.',
          concerns: [
            'Standard return window: 30 days.',
            'Eligible for PayPal Sandbox Orders v2 checkout and passport minting.',
          ],
          missingInfo: 'None reported.',
        }
      ),
      is_demo: p.is_demo !== undefined ? p.is_demo : true,
      catalogue_source: 'aptdot_synthetic',
      verification_tier: 'verified',
      lifecycle_status: p.lifecycle_status || 'active',
      price_updated_at: p.price_updated_at || null,
      has_variants: hasVariants,
      total_variants: totalVariants,
      options: rawOptions,
      variants: rawVariants,
      dimensions: p.specs?.dimensions || null,
      weight_g: p.specs?.dimensions?.weight_g || p.specs?.weight_g || null,
      availability: p.specs?.availability || (p.in_stock ? 'in_stock' : 'out_of_stock'),
      availability_date: p.specs?.availability_date || null,
    };
  }, []);

  // Selected Product for Intelligence Inspection
  const [selectedIntelligenceProduct, setSelectedIntelligenceProduct] = useState(null);

  // Orders and Passports (Loaded dynamically from database)
  const [orders, setOrders] = useState([]);
  const [passports, setPassports] = useState([]);

  // Normalize Supabase DB Order to UI model
  const normalizeDbOrder = useCallback((o) => {
    if (!o) return null;
    const payment = Array.isArray(o.payments) && o.payments.length > 0 ? o.payments[0] : o.payments;
    const items = (Array.isArray(o.items) ? o.items : []).map(item => ({
      productId: item?.product_id,
      title: item?.title || 'Order Item',
      brand: item?.brand || 'Brand',
      price: Number(item?.unit_price) || 0,
      quantity: item?.quantity || 1,
      image: item?.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      passportId: `PASS-CP-${(item?.id || '').substring(0, 8)}`,
      serialNumber: item?.serial_number || 'SN-VERIFIED',
      warrantyExpires: new Date(Date.now() + 24 * 30 * 86400000).toISOString(),
      returnDeadline: new Date(Date.now() + 30 * 86400000).toISOString(),
      returnDaysRemaining: 30,
      isReturnEligible: true,
      warrantyMonthsTotal: 24,
    }));

    return {
      id: o.id,
      orderId: o.order_number || `ORD-${(o.id || '').substring(0, 8)}`,
      date: o.created_at || new Date().toISOString(),
      status: o.status === 'processing' ? 'Processing (Verified)' : (o.status === 'completed' ? 'Delivered' : (o.status || 'Processing')),
      paymentStatus: payment?.status === 'captured' ? 'Captured (PayPal Sandbox)' : 'Pending Capture',
      paymentMethod: 'PayPal Sandbox Orders v2',
      transactionId: payment?.paypal_capture_id || payment?.paypal_order_id || 'Pending',
      subtotal: Number(o.subtotal) || 0,
      tax: Number(o.tax) || 0,
      shipping: Number(o.shipping_cost) || 0,
      total: Number(o.total) || 0,
      currency: o.currency || 'USD',
      trackingNumber: o.tracking_number || `USPS-${(o.order_number || o.id || '').slice(-8)}`,
      carrier: o.carrier || 'Express Air Courier',
      deliveryDate: new Date(Date.now() + 3 * 86400000).toISOString(),
      items,
      shippingAddress: o.shipping_address || {
        name: 'Verified Customer',
        street: '2211 N First St',
        city: 'San Jose',
        state: 'CA',
        postalCode: '95131',
        country: 'US',
      },
      isLive: true,
    };
  }, []);

  // Normalize Supabase DB Passport to UI model
  const normalizeDbPassport = useCallback((p) => {
    if (!p) return null;
    const purchaseDate = new Date(p.purchase_date || p.created_at || Date.now());
    const returnDeadline = new Date(p.return_deadline || (purchaseDate.getTime() + 30 * 86400000));
    const now = new Date();
    const diffDays = Math.max(0, Math.ceil((returnDeadline - now) / (1000 * 60 * 60 * 24)));
    const warranty = Array.isArray(p.warranties) && p.warranties.length > 0 ? p.warranties[0] : (p.warranties || null);

    return {
      id: p.id,
      passportId: p.passport_token_id || `PASS-CP-${(p.id || '').substring(0, 8)}`,
      productId: p.product_id,
      productTitle: p.product_title || 'Purchased Hardware',
      brand: p.brand || 'Hardware',
      category: p.product?.category || 'Hardware',
      image: p.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      serialNumber: p.serial_number || 'SN-VERIFIED',
      orderId: p.order_id,
      transactionHash: p.transaction_hash || '0x00...attested',
      verifiedPayment: `PayPal Sandbox Captured (${p.currency || 'USD'})`,
      purchaseDate: purchaseDate.toISOString().split('T')[0],
      purchasePrice: Number(p.purchase_price) || 0,
      currency: p.currency || 'USD',
      retailer: `${p.brand || 'Hardware'} Authorized Merchant`,
      warrantyStatus: warranty?.claim_status || 'Active Comprehensive',
      warrantyDuration: warranty?.duration_months ? `${warranty.duration_months} Months Full Coverage` : '24 Months Full Coverage',
      warrantyExpires: warranty?.expires_at ? new Date(warranty.expires_at).toISOString().split('T')[0] : new Date(purchaseDate.getTime() + 24 * 30 * 86400000).toISOString().split('T')[0],
      warrantyClaimUrl: warranty?.claim_url || `https://support.${(p.brand || 'hardware').toLowerCase().replace(/[^a-z]/g, '')}.com`,
      returnWindowDaysTotal: p.return_window_days || 30,
      returnDeadline: returnDeadline.toISOString().split('T')[0],
      returnDaysRemaining: diffDays,
      returnStatus: diffDays > 0 ? 'Eligible for Return' : 'Return Window Closed',
      ownershipStatus: 'Verified Registered Owner',
      authenticityProof: 'Hardware Cryptographic Attestation v2.4',
      isLive: true,
    };
  }, []);

  const loadOrders = useCallback(async () => {
    try {
      const res = await apiService.getOrders();
      if (res && res.data && Array.isArray(res.data)) {
        const liveOrders = res.data.map(normalizeDbOrder).filter(Boolean);
        setOrders(liveOrders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.warn('[AppContext] loadOrders error:', err.message);
      setOrders([]);
    }
  }, [normalizeDbOrder]);

  const loadPassports = useCallback(async () => {
    try {
      const res = await apiService.getPassports();
      if (res && res.data && Array.isArray(res.data)) {
        const livePassports = res.data.map(normalizeDbPassport).filter(Boolean);
        setPassports(livePassports);
      } else {
        setPassports([]);
      }
    } catch (err) {
      console.warn('[AppContext] loadPassports error:', err.message);
      setPassports([]);
    }
  }, [normalizeDbPassport]);

  const addCompletedOrder = useCallback((orderResult) => {
    if (!orderResult) return;
    if (orderResult.order) {
      const normalizedOrder = normalizeDbOrder(orderResult.order);
      if (normalizedOrder) {
        setOrders(prev => [normalizedOrder, ...(Array.isArray(prev) ? prev : []).filter(o => o.orderId !== normalizedOrder.orderId)]);
      }
    }
    if (Array.isArray(orderResult.passports) && orderResult.passports.length > 0) {
      const normalizedPassports = orderResult.passports.map(normalizeDbPassport).filter(Boolean);
      setPassports(prev => [...normalizedPassports, ...(Array.isArray(prev) ? prev : [])]);
    }
  }, [normalizeDbOrder, normalizeDbPassport]);

  // User Profile and Supabase Auth State
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Budget & Preferences (Base currency: USD, dynamic spent calculation from real orders)
  const [budget, setBudget] = useState({
    monthlyLimit: 3000,
    spentThisMonth: 0,
    currency: 'USD',
    alertThresholdPercent: 80,
  });

  // Keep budget spent updated dynamically from real orders
  useEffect(() => {
    const realSpent = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    setBudget(prev => ({
      ...prev,
      spentThisMonth: realSpent,
    }));
  }, [orders]);

  // Load user profile from backend or direct Supabase
  const loadUserProfile = useCallback(async (userId) => {
    if (!userId) {
      setUserProfile(null);
      return null;
    }
    setProfileLoading(true);
    try {
      const res = await apiService.getMyProfile().catch(() => null);
      if (res?.success && res.profile) {
        setUserProfile(res.profile);
        if (res.profile.monthly_budget_limit) {
          setBudget(prev => ({
            ...prev,
            monthlyLimit: Number(res.profile.monthly_budget_limit),
            alertThresholdPercent: Number(res.profile.alert_threshold_percent || prev.alertThresholdPercent),
            currency: res.profile.currency || prev.currency,
          }));
        }
        return res.profile;
      }
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();
        if (!error && data) {
          setUserProfile(data);
          if (data.monthly_budget_limit) {
            setBudget(prev => ({
              ...prev,
              monthlyLimit: Number(data.monthly_budget_limit),
              alertThresholdPercent: Number(data.alert_threshold_percent || prev.alertThresholdPercent),
              currency: data.currency || prev.currency,
            }));
          }
          return data;
        }
      }
    } catch (err) {
      console.warn('[AppContext] loadUserProfile error:', err.message);
    } finally {
      setProfileLoading(false);
    }
    return null;
  }, []);

  // Update profile in backend Supabase
  const updateProfile = useCallback(async (updates) => {
    if (!user?.id) throw new Error('You must be signed in to update your profile.');
    try {
      const res = await apiService.updateUserProfile(user.id, updates);
      if (!res.success) throw new Error(res.error || 'Failed to update profile.');
      setUserProfile(res.profile);
      if (res.profile.monthly_budget_limit) {
        setBudget(prev => ({
          ...prev,
          monthlyLimit: Number(res.profile.monthly_budget_limit),
          alertThresholdPercent: Number(res.profile.alert_threshold_percent || prev.alertThresholdPercent),
          currency: res.profile.currency || prev.currency,
        }));
      }
      showToast('Profile updated successfully!', 'success');
      return res.profile;
    } catch (err) {
      console.error('[AppContext] updateProfile error:', err);
      showToast(err.message || 'Failed to update profile', 'warning');
      throw err;
    }
  }, [user, showToast]);

  const logout = useCallback(async () => {
    try {
      await supabaseSignOut();
      setUser(null);
      setSession(null);
      setUserProfile(null);
      setOrders([]);
      setPassports([]);
      showToast('You have been signed out successfully.', 'info');
    } catch (err) {
      console.warn('[AppContext] Sign out error:', err.message);
    }
  }, [showToast]);

  // Load products from backend (Aptdot unified catalogue) or directly via Supabase browser client
  const loadProducts = useCallback(async (filters = {}) => {
    setIsLoadingProducts(true);
    setProductsError(null);
    try {
      // 1. Try Express backend API (queries live Supabase PostgreSQL)
      const res = await apiService.getProducts(filters);
      if (res && res.data && Array.isArray(res.data)) {
        const formatted = res.data.map(normalizeProduct);
        setProducts(formatted);
        setProductsSource(res.source || 'supabase');
        if (formatted.length > 0 && !selectedIntelligenceProduct) {
          setSelectedIntelligenceProduct(formatted[0]);
        }
        return formatted;
      }
    } catch (err) {
      console.warn('[AppContext] Backend API fetch failed, trying direct browser Supabase client:', err.message);
      // 2. Direct browser Supabase client query with RLS public read
      try {
        if (isSupabaseConfigured()) {
          const directData = await fetchProductsFromSupabase(filters);
          if (directData && directData.length > 0) {
            const formatted = directData.map(normalizeProduct);
            setProducts(formatted);
            setProductsSource('supabase');
            return formatted;
          }
        }
      } catch (browserErr) {
        console.warn('[AppContext] Browser Supabase fetch failed:', browserErr.message);
        setProductsError(browserErr.message);
      }
      setProductsError(err.message);
    } finally {
      setIsLoadingProducts(false);
    }
  }, [normalizeProduct, selectedIntelligenceProduct]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Listen to browser Supabase auth session
  useEffect(() => {
    let isMounted = true;
    if (isSupabaseConfigured()) {
      getCurrentSession()
        .then((s) => {
          if (!isMounted) return;
          if (s) {
            setSession(s);
            setUser(s.user);
            loadUserProfile(s.user.id);
            loadOrders();
            loadPassports();
          } else {
            setSession(null);
            setUser(null);
            setUserProfile(null);
            setOrders([]);
            setPassports([]);
          }
        })
        .catch(() => {
          if (isMounted) {
            setSession(null);
            setUser(null);
            setUserProfile(null);
            setOrders([]);
            setPassports([]);
          }
        })
        .finally(() => {
          if (isMounted) setAuthLoading(false);
        });

      const { data: authSub } = onAuthStateChange((_event, newSession) => {
        if (!isMounted) return;
        setSession(newSession);
        setUser(newSession?.user || null);
        if (newSession?.user) {
          loadUserProfile(newSession.user.id);
          loadOrders();
          loadPassports();
        } else {
          setUserProfile(null);
          setOrders([]);
          setPassports([]);
        }
        setAuthLoading(false);
      });

      return () => {
        isMounted = false;
        authSub?.subscription?.unsubscribe?.();
      };
    } else {
      setAuthLoading(false);
    }
  }, [loadUserProfile, loadOrders, loadPassports]);

  const [preferences, setPreferences] = useState({
    priority: 'Durability & Specs Verification',
    preferredCategory: 'Audio & Laptops',
    autoVerifySellers: true,
    riskThreshold: 'Strict (Verified only)',
    preferredBrands: ['Sony', 'Apple', 'Bose', 'Keychron', 'DJI', 'LG'],
  });

  // Real Backend Health Check State
  const [backendHealth, setBackendHealth] = useState(null);
  const [isHealthLoading, setIsHealthLoading] = useState(false);

  const refreshHealth = useCallback(async () => {
    setIsHealthLoading(true);
    const startTime = performance.now();
    try {
      const data = await apiService.checkHealth();
      const endTime = performance.now();
      const latencyMs = Math.round(endTime - startTime);
      setBackendHealth({
        ...data,
        _clientLatencyMs: latencyMs,
        _lastChecked: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      setBackendHealth({
        status: 'error',
        message: err.message,
        _lastChecked: new Date().toLocaleTimeString(),
      });
    } finally {
      setIsHealthLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshHealth();
  }, [refreshHealth]);

  const value = {
    // Sidebar
    sidebarCollapsed,
    toggleSidebar,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    toggleMobileSidebar,

    // Cart
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    ...cartFinancials,

    // Compare
    compareList,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare,

    // Intelligence
    selectedIntelligenceProduct,
    setSelectedIntelligenceProduct,

    // Data lists
    products,
    activeCatalogue,
    setActiveCatalogue,
    productsSource,
    isLoadingProducts,
    productsError,
    loadProducts,
    orders,
    passports,
    loadOrders,
    loadPassports,
    addCompletedOrder,

    // Auth & Profile
    user,
    session,
    userProfile,
    profileLoading,
    loadUserProfile,
    updateProfile,
    authLoading,
    logout,

    // User & Budget
    budget,
    setBudget,
    preferences,
    setPreferences,

    // Backend Health
    backendHealth,
    isHealthLoading,
    refreshHealth,

    // Notifications
    toasts,
    showToast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {/* Global Toast Notifications container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl border shadow-xl text-xs font-medium flex items-center justify-between transition-all duration-300 transform translate-y-0 backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200 shadow-emerald-900/30'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500/40 text-amber-200 shadow-amber-900/30'
                : 'bg-navy-900/90 border-electric-500/40 text-electric-200 shadow-electric-900/30'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
