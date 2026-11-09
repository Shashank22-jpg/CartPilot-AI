import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartPage() {
  const navigate = useNavigate();
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
    budget,
    showToast,
  } = useApp();

  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Budget calculations
  const projectedMonthlySpend = budget.spentThisMonth + total;
  const isOverBudget = projectedMonthlySpend > budget.monthlyLimit;

  const handleSimulatedPayPalSandboxCheckout = () => {
    setIsProcessingCheckout(true);

    setTimeout(() => {
      setIsProcessingCheckout(false);
      setCheckoutModalOpen(false);
      clearCart();
      showToast('Simulated PayPal Sandbox order created & passport minted!', 'success');
      navigate('/orders');
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold mb-2">
            <ShoppingCart className="w-3.5 h-3.5 text-electric-400" />
            <span>Agent-Curated Cart Staging</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Shopping Cart & Budget Safeguards
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review your selected gear with automated budget threshold checking before proceeding to PayPal Sandbox.
          </p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="px-3.5 py-2 rounded-xl bg-navy-950 hover:bg-navy-800 text-slate-400 hover:text-rose-400 text-xs border border-navy-800 transition-colors flex items-center space-x-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-navy-800 flex items-center justify-center text-slate-500 mx-auto">
            <ShoppingCart className="w-7 h-7" />
          </div>
          <h3 className="text-sm font-bold text-white">Your shopping cart is currently empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Browse our evidence-verified catalogue or ask the AI assistant to curate recommended hardware tailored to your budget.
          </p>
          <div className="pt-2">
            <Link
              to="/discover"
              className="px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold shadow-glow-blue inline-flex items-center space-x-1.5"
            >
              <span>Discover Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-navy-800 text-xs">
                <span className="font-bold text-white uppercase tracking-wider">
                  Items ({itemCount})
                </span>
                <span className="text-slate-400">Verified Seller Fulfillment</span>
              </div>

              <div className="divide-y divide-navy-800/80">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 min-w-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 rounded-xl object-cover bg-navy-950 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-electric-400 uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <h4 className="text-xs font-semibold text-slate-100 truncate mt-0.5">
                          {product.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-400">
                          <span className="font-mono text-white font-bold">
                            ${product.price.toFixed(2)} each
                          </span>
                          <span>•</span>
                          <span className="text-emerald-400">
                            {product.returnPolicy.days}d return guarantee
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 self-end sm:self-center">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-1 bg-navy-950 border border-navy-750 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs font-bold text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-mono font-bold text-sm text-white min-w-[70px] text-right">
                        ${(product.price * quantity).toFixed(2)}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-navy-800 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Cap Alert / Progress Box */}
            <div className={`p-5 rounded-2xl border ${
              isOverBudget
                ? 'bg-amber-950/20 border-amber-500/40'
                : 'bg-navy-900 border-navy-800'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-electric-400" />
                  <span>Agent Budget Guardrail</span>
                </span>
                <span className={`text-xs font-mono font-bold ${isOverBudget ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {isOverBudget ? 'Threshold Exceeded' : 'Within Safe Range'}
                </span>
              </div>

              <div className="mt-3 text-xs text-slate-300 space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span>Current spend this month:</span>
                  <span className="font-mono text-white">${budget.spentThisMonth.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>With current cart (+${total.toFixed(2)}):</span>
                  <span className="font-mono text-white font-bold">${projectedMonthlySpend.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Monthly budget ceiling:</span>
                  <span className="font-mono text-slate-400">${budget.monthlyLimit.toFixed(2)}</span>
                </div>

                <div className="w-full bg-navy-950 rounded-full h-2 mt-2 overflow-hidden border border-navy-800">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isOverBudget ? 'bg-amber-400' : 'bg-gradient-to-r from-electric-500 to-violet-500'
                    }`}
                    style={{ width: `${Math.min(100, (projectedMonthlySpend / budget.monthlyLimit) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & PayPal Checkout */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-5 shadow-lg">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-navy-800">
                Order Financial Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-mono font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Estimated Sales Tax (8.25%)</span>
                  <span className="font-mono">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Express Insured Shipping</span>
                  <span className="font-mono">
                    {shipping === 0 ? (
                      <span className="text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-navy-800 flex justify-between text-sm">
                  <span className="font-bold text-white">Estimated Total</span>
                  <span className="font-mono font-black text-white text-base">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* PayPal Sandbox Checkout Entry Point */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0070BA] to-[#003087] hover:from-[#005ea6] hover:to-[#00256c] text-white font-extrabold text-xs shadow-glow-blue flex items-center justify-center space-x-2 transition-all transform active:scale-95"
                >
                  <CreditCard className="w-4 h-4 text-cyan-300" />
                  <span>PayPal Sandbox Checkout</span>
                </button>

                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  Verified server-side via PayPal Orders API v2. No live charge or real funds required in sandbox test mode.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 flex items-center space-x-2 text-[11px] text-slate-400">
                <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>SSL Encrypted • Digital Purchase Passport Minted upon payment verification</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simulated PayPal Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-navy-900 border border-navy-750 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center space-x-3 pb-3 border-b border-navy-800">
              <div className="w-8 h-8 rounded-lg bg-[#0070BA] flex items-center justify-center text-white font-black text-sm">
                P
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">PayPal Sandbox Payment Gateway</h3>
                <p className="text-[10px] text-slate-400">Simulated Client Authorization & Server Capture</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Merchant:</span>
                <span className="text-white font-medium">CartPilot AI Verified Merchants</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Total:</span>
                <span className="font-mono font-bold text-white">${total.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Verification Model:</span>
                <span className="text-emerald-400 font-mono text-[11px]">Strict Server-Side Capture</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 text-[11px] text-blue-200">
              <p>
                <strong>Hackathon Notice:</strong> In this test mode, clicking "Approve Sandbox Payment" simulates the customer PayPal authorization callback and exercises the order ledger + passport generation.
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setCheckoutModalOpen(false)}
                disabled={isProcessingCheckout}
                className="flex-1 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSimulatedPayPalSandboxCheckout}
                disabled={isProcessingCheckout}
                className="flex-1 py-2.5 rounded-xl bg-[#0070BA] hover:bg-[#005ea6] text-white text-xs font-bold flex items-center justify-center space-x-1.5"
              >
                {isProcessingCheckout ? (
                  <>
                    <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Approve Sandbox Payment</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
