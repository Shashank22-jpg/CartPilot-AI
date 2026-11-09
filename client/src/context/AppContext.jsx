import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { mockProducts } from '../data/mockProducts';
import { mockOrders, mockPassports } from '../data/mockOrders';
import apiService from '../services/api';
import { getCurrentSession, onAuthStateChange, isSupabaseConfigured } from '../services/supabase';

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

  // Cart State (Initialized with 1 realistic item for rich UI demo)
  const [cart, setCart] = useState(() => {
    return [
      {
        product: mockProducts[0], // Sony WH-1000XM5
        quantity: 1
      }
    ];
  });

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.title.substring(0, 32)}..." to your cart`, 'success');
  }, [showToast]);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => {
      const item = prev.find(i => i.product.id === productId);
      if (item) {
        showToast(`Removed "${item.product.title.substring(0, 24)}..." from cart`, 'info');
      }
      return prev.filter(i => i.product.id !== productId);
    });
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    showToast('Shopping cart cleared', 'info');
  }, [showToast]);

  // Cart Financials in INR
  const cartFinancials = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const taxRate = 0.18; // standard GST rate
    const tax = Math.round(subtotal * taxRate);
    const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 499;
    const total = subtotal + tax + shipping;
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return {
      subtotal,
      tax,
      shipping,
      total,
      cartTotal: total,
      itemCount
    };
  }, [cart]);

  // Compare State (Default 2 items for instant rich side-by-side view)
  const [compareList, setCompareList] = useState([
    mockProducts[0], // Sony XM5
    mockProducts[3], // Bose QC Ultra
  ]);

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

  // Product Catalogue State (Dynamic API / Supabase with Seed Fallback)
  const [products, setProducts] = useState(mockProducts);
  const [productsSource, setProductsSource] = useState('seed_initial');
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  // Selected Product for Intelligence Inspection
  const [selectedIntelligenceProduct, setSelectedIntelligenceProduct] = useState(mockProducts[0]);

  // Orders and Passports
  const [orders, setOrders] = useState(mockOrders);
  const [passports, setPassports] = useState(mockPassports);

  // User Profile and Supabase Auth State
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  // Load products from backend (Supabase or server seed)
  const loadProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    try {
      const res = await apiService.getProducts();
      if (res && res.data && res.data.length > 0) {
        const formatted = res.data.map(p => ({
          ...p,
          image: p.image_url || p.image,
          originalPrice: p.original_price !== undefined ? p.original_price : p.originalPrice,
          reviewsCount: p.reviews_count !== undefined ? p.reviews_count : p.reviewsCount,
          inStock: p.in_stock !== undefined ? p.in_stock : p.inStock,
          badgeType: p.badge_type || p.badgeType || 'sample',
          returnPolicy: p.return_policy || p.returnPolicy,
          riskAssessment: p.risk_assessment || p.riskAssessment,
        }));
        setProducts(formatted);
        setProductsSource(res.source || 'api');
        if (formatted.length > 0 && !selectedIntelligenceProduct) {
          setSelectedIntelligenceProduct(formatted[0]);
        }
      }
    } catch (err) {
      console.warn('[AppContext] Products fetch failed, using seed dataset:', err.message);
    } finally {
      setIsLoadingProducts(false);
    }
  }, [selectedIntelligenceProduct]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Listen to browser Supabase auth session
  useEffect(() => {
    if (isSupabaseConfigured()) {
      getCurrentSession().then(s => {
        if (s) {
          setSession(s);
          setUser(s.user);
        }
      }).catch(() => {});

      const { data: authSub } = onAuthStateChange((_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user || null);
      });

      return () => {
        authSub?.subscription?.unsubscribe?.();
      };
    }
  }, []);

  // Budget & Preferences (Base currency: INR)
  const [budget, setBudget] = useState({
    monthlyLimit: 250000,
    spentThisMonth: 112490,
    currency: 'INR',
    alertThresholdPercent: 80,
  });

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
    productsSource,
    isLoadingProducts,
    loadProducts,
    orders,
    passports,

    // Auth
    user,
    session,

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
