import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { mockProducts } from '../data/mockProducts';
import { mockOrders, mockPassports } from '../data/mockOrders';
import apiService from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Sidebar State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem('cp_sidebar_collapsed');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('cp_sidebar_collapsed', JSON.stringify(next));
      return next;
    });
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

  // Cart Financials
  const cartFinancials = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const taxRate = 0.0825; // standard sample sales tax
    const tax = subtotal * taxRate;
    const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15.00;
    const total = subtotal + tax + shipping;
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping,
      total: Math.round(total * 100) / 100,
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

  // Selected Product for Intelligence Inspection
  const [selectedIntelligenceProduct, setSelectedIntelligenceProduct] = useState(mockProducts[0]);

  // Orders and Passports
  const [orders, setOrders] = useState(mockOrders);
  const [passports, setPassports] = useState(mockPassports);

  // Budget & Preferences
  const [budget, setBudget] = useState({
    monthlyLimit: 2500,
    spentThisMonth: 1399.68,
    currency: 'USD',
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
    products: mockProducts,
    orders,
    passports,

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
