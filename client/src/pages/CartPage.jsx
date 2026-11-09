import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Lock,
  Sparkles,
  Package,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';
import PayPalCheckoutModal from '../components/checkout/PayPalCheckoutModal';

/**
 * CartPage - CartPilot AI Shopping Cart & Checkout Staging
 * Follows Hybrid Design System:
 * - Light shopping experience (warm off-white background, white cards, emerald accents, dark forest ink typography)
 * - Exact Header: "Your Shopping Cart" with actual cart item count
 * - Clear continue-shopping navigation back to /discover
 * - Product rows with actual Aptdot images, names, brand, variant options, prices in USD ($), quantity stepper, remove action
 * - Order summary with real subtotal, applicable taxes/shipping, and final total
 * - Agent budget guardrail monitoring
 * - Polished empty cart state with "Discover Products" CTA
 * - Preserved PayPal Sandbox modal integration with full state transparency
 */
export default function CartPage() {
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    tax,
    shipping,
    total,
    itemCount,
    primaryCurrency = 'USD',
    budget,
  } = useApp();

  // If user arrives via /checkout, automatically open the PayPal Sandbox modal
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(
    location.pathname === '/checkout'
  );

  useEffect(() => {
    if (location.pathname === '/checkout') {
      setCheckoutModalOpen(true);
    }
  }, [location.pathname]);

  const safeCart = Array.isArray(cart) ? cart.filter(Boolean) : [];

  // Budget calculations
  const projectedMonthlySpend = (budget?.spentThisMonth || 0) + (total || 0);
  const monthlyLimit = budget?.monthlyLimit || 3000;
  const isOverBudget = projectedMonthlySpend > monthlyLimit;
  const budgetPercent = Math.min(100, Math.round((projectedMonthlySpend / monthlyLimit) * 100));

  // Placeholder SVG for broken or missing images
  const defaultPlaceholder =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="%23f4f8f6"><rect width="200" height="200" fill="%23f4f8f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236c7c76" font-family="sans-serif" font-size="12">Aptdot Gear</text></svg>';

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Navigation Breadcrumb / Continue Shopping */}
      <div className="flex items-center justify-between">
        <Link
          to="/discover"
          className="inline-flex items-center space-x-2 text-xs font-bold text-emp-brand hover:text-emp-brand-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Continue Shopping</span>
        </Link>

        {safeCart.length > 0 && (
          <button
            onClick={clearCart}
            className="inline-flex items-center space-x-1.5 text-xs text-emp-ink-muted hover:text-rose-600 transition-colors px-3 py-1.5 rounded-pill hover:bg-rose-50 border border-transparent hover:border-rose-100"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {/* Main Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-emp-surface-line">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emp-ink tracking-tight font-display">
              Your Shopping Cart
            </h1>
            <span className="px-3 py-0.5 rounded-pill bg-emp-brand-50 text-emp-brand font-bold text-xs border border-emp-brand-100 font-mono">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className="text-sm text-emp-ink-secondary mt-1">
            Review your Aptdot hardware items, adjust quantities, and proceed to PayPal Sandbox settlement.
          </p>
        </div>

        {/* Provenance Tag */}
        <div className="flex items-center space-x-2 text-xs text-emp-ink-secondary">
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-pill bg-white border border-emp-surface-line shadow-emp-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emp-brand" />
            <span className="font-semibold text-emp-ink">Aptdot Autonomous Catalogue</span>
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-pill bg-emp-brand-50 text-emp-brand font-mono text-[11px] font-bold border border-emp-brand-100">
            USD ($)
          </span>
        </div>
      </div>

      {/* Cart Content: Empty State vs Cart Grid */}
      {safeCart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-12 sm:p-16 text-center rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-5 max-w-xl mx-auto"
        >
          <div className="w-16 h-16 rounded-full bg-emp-brand-50 border border-emp-brand-100 flex items-center justify-center text-emp-brand mx-auto shadow-emp-sm">
            <ShoppingCart className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-emp-ink font-display">
              Your shopping cart is empty
            </h3>
            <p className="text-xs sm:text-sm text-emp-ink-secondary max-w-md mx-auto leading-relaxed">
              Browse our Aptdot catalogue of benchmark electronics, or ask the AI assistant to curate recommendations.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/discover"
              className="btn-emp btn-emp-primary inline-flex items-center space-x-2 w-full sm:w-auto"
            >
              <span>Discover Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/assistant"
              className="btn-emp btn-emp-secondary inline-flex items-center space-x-2 w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-emp-brand" />
              <span>Ask AI Assistant</span>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Cart Items List & Guardrails */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-emp-surface-line rounded-emp shadow-emp-sm overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 bg-emp-surface-tint border-b border-emp-surface-line flex items-center justify-between text-xs">
                <span className="font-bold text-emp-ink uppercase tracking-wider font-display">
                  Cart Items ({itemCount})
                </span>
                <span className="text-emp-ink-muted">
                  Subtotal: <strong className="text-emp-ink font-mono">{formatCurrency(subtotal, primaryCurrency)}</strong>
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-emp-surface-lineSubtle">
                <AnimatePresence initial={false}>
                  {safeCart.map((item) => {
                    const product = item?.product || {};
                    const quantity = item?.quantity || 1;
                    const selectedVariant = item?.selectedVariant;
                    const cartItemId = item?.cartItemId;
                    const itemKey = cartItemId || product.id || Math.random();
                    const itemPrice =
                      item?.price !== undefined
                        ? item.price
                        : (selectedVariant?.price ?? product.price ?? 0);
                    const itemCurrency = product.currency || 'USD';
                    const lineTotal = itemPrice * quantity;
                    const productImage = product.image || product.image_url || defaultPlaceholder;
                    const itemSku =
                      item.sku ||
                      selectedVariant?.sku ||
                      product.specs?.sku ||
                      product.id;

                    return (
                      <motion.div
                        key={itemKey}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        {/* Product Image & Info */}
                        <div className="flex items-start space-x-4 min-w-0 flex-1">
                          <img
                            src={productImage}
                            alt={product.title || 'Aptdot product'}
                            onError={(e) => {
                              e.currentTarget.src = defaultPlaceholder;
                            }}
                            className="w-20 h-20 rounded-emp-sm object-cover bg-emp-surface-tint flex-shrink-0 border border-emp-surface-line"
                          />

                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {product.brand && (
                                <span className="text-[11px] font-bold text-emp-brand uppercase tracking-wider">
                                  {product.brand}
                                </span>
                              )}
                              <span className="px-2 py-0.5 rounded-pill bg-emp-brand-50 text-emp-brand text-[10px] font-bold border border-emp-brand-100 font-mono">
                                Aptdot Verified
                              </span>
                            </div>

                            <Link
                              to={`/discover?product=${product.id}`}
                              className="text-sm font-bold text-emp-ink hover:text-emp-brand transition-colors line-clamp-1"
                            >
                              {item.displayTitle || product.title}
                            </Link>

                            {/* Selected Variant Options */}
                            {selectedVariant && selectedVariant.options && typeof selectedVariant.options === 'object' && (
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {Object.entries(selectedVariant.options).map(([k, val]) => (
                                  <span
                                    key={k}
                                    className="px-2 py-0.5 rounded-md bg-emp-surface-tint text-emp-ink-secondary border border-emp-surface-line text-[11px] font-medium"
                                  >
                                    <span className="capitalize">{k}</span>:{' '}
                                    <strong className="text-emp-ink font-semibold">{String(val)}</strong>
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Price per unit & SKU */}
                            <div className="flex items-center space-x-2 text-xs text-emp-ink-secondary pt-0.5">
                              <span className="font-mono font-bold text-emp-ink">
                                {formatCurrency(itemPrice, itemCurrency)} each
                              </span>
                              <span>•</span>
                              <span className="font-mono text-[11px] text-emp-ink-muted">
                                SKU: {itemSku}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Controls & Line Total */}
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-emp-surface-lineSubtle">
                          {/* Quantity Stepper */}
                          <div className="flex items-center bg-emp-surface-tint border border-emp-surface-line rounded-pill p-1 shadow-emp-sm">
                            <button
                              type="button"
                              onClick={() => {
                                if (quantity > 1) {
                                  updateQuantity(itemKey, quantity - 1);
                                } else {
                                  removeFromCart(itemKey);
                                }
                              }}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-emp-ink-secondary hover:text-emp-ink hover:bg-white transition-colors"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center font-mono text-xs font-extrabold text-emp-ink">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(itemKey, quantity + 1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-emp-ink-secondary hover:text-emp-ink hover:bg-white transition-colors"
                              title="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Line Item Total */}
                          <span className="font-mono font-black text-base text-emp-ink min-w-[85px] text-right">
                            {formatCurrency(lineTotal, itemCurrency)}
                          </span>

                          {/* Remove Action Button */}
                          <button
                            type="button"
                            onClick={() => removeFromCart(itemKey)}
                            className="p-2 rounded-full text-emp-ink-muted hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Remove item from cart"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Agent Budget Guardrail Progress Card */}
            <div
              className={`p-5 rounded-emp border shadow-emp-sm transition-all ${
                isOverBudget
                  ? 'bg-amber-50/50 border-amber-300'
                  : 'bg-white border-emp-surface-line'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emp-ink flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emp-brand" />
                  <span className="font-display">Agent Budget Guardrail</span>
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded-pill ${
                    isOverBudget
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emp-brand-50 text-emp-brand'
                  }`}
                >
                  {isOverBudget ? 'Threshold Exceeded' : 'Within Safe Range'}
                </span>
              </div>

              <div className="mt-3 text-xs text-emp-ink-secondary space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span>Current spend this month:</span>
                  <span className="font-mono font-semibold text-emp-ink">
                    {formatCurrency(budget?.spentThisMonth || 0, primaryCurrency)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>With current cart (+{formatCurrency(total, primaryCurrency)}):</span>
                  <span className="font-mono font-bold text-emp-ink">
                    {formatCurrency(projectedMonthlySpend, primaryCurrency)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Monthly budget ceiling:</span>
                  <span className="font-mono text-emp-ink-muted">
                    {formatCurrency(monthlyLimit, primaryCurrency)}
                  </span>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-emp-surface-tint rounded-full h-2.5 mt-2 overflow-hidden border border-emp-surface-line">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isOverBudget ? 'bg-amber-500' : 'bg-emp-brand'
                    }`}
                    style={{ width: `${budgetPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Order Financial Summary & Checkout CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-emp bg-white border border-emp-surface-line space-y-5 shadow-emp-sm sticky top-24">
              <h3 className="text-xs font-bold text-emp-ink uppercase tracking-wider pb-3 border-b border-emp-surface-line font-display">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-emp-ink-secondary">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-mono font-bold text-emp-ink">
                    {formatCurrency(subtotal, primaryCurrency)}
                  </span>
                </div>

                <div className="flex justify-between text-emp-ink-secondary">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono font-semibold text-emp-ink">
                    {formatCurrency(tax, primaryCurrency)}
                  </span>
                </div>

                <div className="flex justify-between text-emp-ink-secondary">
                  <span>Delivery / Shipping</span>
                  <span className="font-mono">
                    {shipping === 0 ? (
                      <span className="text-emp-brand font-bold">FREE (Over $50)</span>
                    ) : (
                      <span className="font-semibold text-emp-ink">
                        {formatCurrency(shipping, primaryCurrency)}
                      </span>
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-emp-surface-line flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-emp-ink text-sm font-display">Total</span>
                    <span className="block text-[10px] text-emp-ink-muted">
                      Including taxes & shipping
                    </span>
                  </div>
                  <span className="font-mono font-black text-xl text-emp-ink">
                    {formatCurrency(total, primaryCurrency)}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => setCheckoutModalOpen(true)}
                  className="btn-emp btn-emp-primary w-full py-4 text-sm font-bold flex items-center justify-center space-x-2 shadow-emp"
                >
                  <CreditCard className="w-4 h-4 text-white" />
                  <span>Proceed to PayPal Sandbox Checkout</span>
                </button>

                <p className="text-[11px] text-emp-ink-muted text-center leading-relaxed">
                  Verified server-side via PayPal Orders API v2. Authentic Sandbox test mode.
                </p>
              </div>

              {/* Trust & Guarantees */}
              <div className="pt-4 border-t border-emp-surface-line space-y-2 text-[11px] text-emp-ink-secondary">
                <div className="flex items-center space-x-2">
                  <Lock className="w-3.5 h-3.5 text-emp-brand flex-shrink-0" />
                  <span>256-bit SSL encrypted checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-violet-600 flex-shrink-0" />
                  <span>Digital Purchase Passport minted on payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-3.5 h-3.5 text-emp-brand flex-shrink-0" />
                  <span>30-day Sandbox return window</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Real PayPal Sandbox Checkout Modal */}
      {checkoutModalOpen && (
        <PayPalCheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
        />
      )}
    </div>
  );
}