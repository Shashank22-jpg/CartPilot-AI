import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  X,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileKey,
  Truck,
  Sparkles,
  ExternalLink,
  Copy,
} from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import apiService from '../../services/api';
import { useApp } from '../../context/AppContext';

export default function PayPalCheckoutModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const {
    cart,
    subtotal,
    tax,
    shipping,
    total,
    clearCart,
    showToast,
    addCompletedOrder,
  } = useApp();

  const [paypalConfig, setPaypalConfig] = useState(null);
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState(null);

  // Checkout flow state
  const [isVerifyingCapture, setIsVerifyingCapture] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [paymentNotice, setPaymentNotice] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  // Shipping details state
  const [shippingAddress, setShippingAddress] = useState({
    name: 'Shashank AR',
    street: '12th Main, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    country: 'IN',
  });

  // Load public PayPal configuration from server or env
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setConfigLoading(true);
    setConfigError(null);

    apiService
      .getPaymentConfig()
      .then((cfg) => {
        if (!isMounted) return;
        const clientId = cfg?.clientId || import.meta.env.VITE_PAYPAL_CLIENT_ID;
        if (!clientId) {
          throw new Error('PayPal Client ID not configured. Please ensure PAYPAL_CLIENT_ID is set in server/.env.');
        }
        setPaypalConfig({
          clientId,
          mode: cfg?.mode || 'sandbox',
          currency: 'USD',
          displayCurrency: 'INR',
          exchangeRate: cfg?.exchangeRate || 86.50,
        });
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn('[PayPal Modal] Failed to load config from server:', err.message);
        const fallbackClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
        if (fallbackClientId) {
          setPaypalConfig({
            clientId: fallbackClientId,
            mode: 'sandbox',
            currency: 'USD',
            displayCurrency: 'INR',
            exchangeRate: 86.50,
          });
        } else {
          setConfigError(err.message || 'Unable to connect to PayPal Sandbox.');
        }
      })
      .finally(() => {
        if (isMounted) setConfigLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const usdEquivalent = paypalConfig?.exchangeRate
    ? (total / paypalConfig.exchangeRate).toFixed(2)
    : (total / 86.50).toFixed(2);

  // Triggered when buyer clicks PayPal button
  const handleCreateOrder = async () => {
    setPaymentError(null);
    setPaymentNotice(null);

    try {
      const orderPayload = {
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        shippingAddress,
        currency: 'INR',
        notes: 'CartPilot AI Web Checkout - PayPal AI Hackathon 2026',
      };

      const res = await apiService.createPayPalOrder(orderPayload);

      if (!res.success || !res.paypalOrderId) {
        throw new Error(res.error || 'Server rejected order creation.');
      }

      setActiveOrderId(res.orderId);
      return res.paypalOrderId;
    } catch (err) {
      console.error('[PayPal Checkout] createOrder error:', err);
      const errMsg = err.message || 'Failed to initialize PayPal Sandbox Order.';
      setPaymentError(errMsg);
      showToast(errMsg, 'error');
      throw err;
    }
  };

  // Triggered when buyer approves payment in the PayPal popup
  const handleApprove = async (data, actions) => {
    setIsVerifyingCapture(true);
    setPaymentError(null);
    setPaymentNotice('Verifying settlement on server & minting Digital Purchase Passport...');

    try {
      const capturePayload = {
        orderID: data.orderID,
        paypalOrderId: data.orderID,
        orderId: activeOrderId,
      };

      const res = await apiService.capturePayPalOrder(capturePayload);

      if (!res.success) {
        throw new Error(res.error || 'Server-side payment verification failed.');
      }

      // Successful verified settlement
      setOrderConfirmation(res);
      clearCart();
      addCompletedOrder(res);
      showToast('Payment verified! Digital Purchase Passport minted.', 'success');
    } catch (err) {
      console.error('[PayPal Checkout] capture error:', err);
      const errMsg = err.message || 'Payment capture failed server verification.';
      setPaymentError(errMsg);
      showToast(errMsg, 'error');
    } finally {
      setIsVerifyingCapture(false);
    }
  };

  const handleCancel = () => {
    setPaymentNotice('PayPal checkout was cancelled. Your cart has been preserved.');
    showToast('PayPal payment cancelled.', 'info');
  };

  const handleError = (err) => {
    console.error('[PayPal SDK Error]:', err);
    setPaymentError('PayPal SDK encountered an error during checkout. Please try again.');
    showToast('PayPal checkout encountered an issue.', 'error');
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text);
    showToast(`Copied ${label} to clipboard!`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-navy-900 border border-navy-750 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-navy-950/90 border-b border-navy-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0070BA] to-[#003087] flex items-center justify-center text-white font-black text-base shadow-glow-blue">
              P
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-white">PayPal Sandbox Checkout</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                  Orders v2 Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Authoritative server-side price recalculation & passport minting
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isVerifyingCapture}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* SUCCESS SCREEN */}
          {orderConfirmation ? (
            <div className="space-y-5 text-center py-2 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-emerald">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
                  Payment Verified & Captured
                </span>
                <h2 className="text-xl font-bold text-white mt-2">
                  Order Successfully Placed!
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Your payment was verified via PayPal Sandbox Orders v2 API. Hardware serial numbers and Digital Purchase Passports have been minted into the Supabase ledger.
                </p>
              </div>

              {/* Transaction Summary Card */}
              <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-navy-800">
                  <span className="text-slate-400">Order Number:</span>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono font-bold text-electric-400">
                      {orderConfirmation.orderNumber || orderConfirmation.orderId}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          orderConfirmation.orderNumber || orderConfirmation.orderId,
                          'Order Number'
                        )
                      }
                      className="text-slate-500 hover:text-white"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">PayPal Capture ID:</span>
                  <span className="font-mono text-slate-200 text-[11px]">
                    {orderConfirmation.paypalCaptureId || 'CAP-VERIFIED'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Settled (INR):</span>
                  <span className="font-mono font-bold text-white">
                    {formatCurrency(orderConfirmation.inrTotal || total)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">PayPal Converted USD:</span>
                  <span className="font-mono text-slate-300">
                    ${orderConfirmation.capturedAmountUsd || usdEquivalent} USD
                  </span>
                </div>

                {orderConfirmation.passports && orderConfirmation.passports.length > 0 && (
                  <div className="pt-2 border-t border-navy-800">
                    <div className="flex items-center space-x-1.5 text-violet-400 font-semibold mb-1">
                      <FileKey className="w-3.5 h-3.5" />
                      <span>
                        {orderConfirmation.passports.length} Digital Purchase Passport(s) Minted
                      </span>
                    </div>
                    <div className="space-y-1">
                      {orderConfirmation.passports.map((p) => (
                        <div
                          key={p.id || p.passport_token_id}
                          className="flex justify-between items-center text-[11px] text-slate-400 font-mono bg-navy-900/60 px-2.5 py-1.5 rounded-lg"
                        >
                          <span className="truncate max-w-[200px] text-slate-300">
                            {p.product_title || 'Hardware'}
                          </span>
                          <span className="text-emerald-400">
                            {p.passport_token_id || 'PASS-CP-TOKEN'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/passport');
                  }}
                  className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-glow-violet flex items-center justify-center space-x-2 transition-colors"
                >
                  <FileKey className="w-4 h-4" />
                  <span>View Digital Passports</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    navigate('/orders');
                  }}
                  className="flex-1 py-3 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 font-bold text-xs border border-navy-700 flex items-center justify-center space-x-2 transition-colors"
                >
                  <Truck className="w-4 h-4" />
                  <span>View Order Ledger</span>
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM & PAYPAL BUTTONS */
            <>
              {/* Items Summary Strip */}
              <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <span>Order Items ({cart.reduce((c, i) => c + i.quantity, 0)})</span>
                  <span>Amount</span>
                </div>
                <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1 divide-y divide-navy-800/60">
                  {cart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex justify-between items-center pt-1.5 first:pt-0"
                    >
                      <div className="flex items-center space-x-2 min-w-0 pr-2">
                        <span className="font-mono text-electric-400 font-bold text-[11px]">
                          {quantity}x
                        </span>
                        <span className="truncate text-slate-200 text-xs">
                          {product.title}
                        </span>
                      </div>
                      <span className="font-mono font-semibold text-white flex-shrink-0">
                        {formatCurrency(product.price * quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="p-4 rounded-xl bg-navy-950/70 border border-navy-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>GST (18% Goods & Services Tax)</span>
                  <span className="font-mono">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Insured Shipping</span>
                  <span className="font-mono">
                    {shipping === 0 ? (
                      <span className="text-emerald-400 font-semibold">FREE (Above ₹10,000)</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-navy-800 flex justify-between items-baseline text-sm">
                  <div>
                    <span className="font-bold text-white">Total Order Value</span>
                    <span className="block text-[10px] text-slate-400">
                      PayPal Sandbox settlement equivalent:
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-black text-white text-base">
                      {formatCurrency(total)}
                    </span>
                    <span className="block font-mono text-cyan-300 text-xs font-semibold">
                      ~ ${usdEquivalent} USD
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Address Summary */}
              <div className="p-3 rounded-xl bg-navy-950/50 border border-navy-800 text-[11px] text-slate-400 flex items-start space-x-2">
                <Truck className="w-4 h-4 text-electric-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 font-semibold">Delivery Destination: </span>
                  <span>
                    {shippingAddress.street}, {shippingAddress.city},{' '}
                    {shippingAddress.state} {shippingAddress.postalCode}
                  </span>
                </div>
              </div>

              {/* Alerts & Verification Progress */}
              {isVerifyingCapture && (
                <div className="p-4 rounded-xl bg-electric-950/40 border border-electric-500/50 flex items-center space-x-3 animate-pulse">
                  <div className="w-5 h-5 rounded-full border-2 border-electric-400 border-t-transparent animate-spin flex-shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-white">Verifying PayPal Capture...</p>
                    <p className="text-[11px] text-electric-300">
                      Validating order totals, decrementing stock, and minting Digital Purchase Passports.
                    </p>
                  </div>
                </div>
              )}

              {paymentNotice && !isVerifyingCapture && (
                <div className="p-3 rounded-xl bg-navy-950 border border-electric-500/30 text-xs text-electric-300 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-electric-400 flex-shrink-0" />
                  <span>{paymentNotice}</span>
                </div>
              )}

              {paymentError && (
                <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-300 flex items-start space-x-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Checkout Issue: </span>
                    <span>{paymentError}</span>
                  </div>
                </div>
              )}

              {/* PayPal Smart Payment Buttons Container */}
              <div className="pt-2">
                {configLoading ? (
                  <div className="py-8 flex flex-col items-center justify-center space-y-2 text-xs text-slate-400">
                    <div className="w-6 h-6 rounded-full border-2 border-electric-400 border-t-transparent animate-spin" />
                    <span>Connecting to PayPal Sandbox Gateway...</span>
                  </div>
                ) : configError ? (
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-300 space-y-2">
                    <p className="font-bold">PayPal Sandbox Unavailable</p>
                    <p className="text-[11px] text-slate-300">{configError}</p>
                  </div>
                ) : paypalConfig?.clientId ? (
                  <div className="relative min-h-[140px]">
                    <PayPalScriptProvider
                      options={{
                        clientId: paypalConfig.clientId,
                        currency: 'USD',
                        intent: 'capture',
                        components: 'buttons',
                      }}
                    >
                      <PayPalButtons
                        style={{
                          layout: 'vertical',
                          color: 'gold',
                          shape: 'rect',
                          label: 'paypal',
                          height: 44,
                        }}
                        disabled={isVerifyingCapture}
                        createOrder={handleCreateOrder}
                        onApprove={handleApprove}
                        onCancel={handleCancel}
                        onError={handleError}
                      />
                    </PayPalScriptProvider>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">
                    PayPal client ID not available.
                  </div>
                )}
              </div>

              {/* Security Safeguard Footer */}
              <div className="pt-2 border-t border-navy-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>Sandbox Environment • No Real Money Charged</span>
                </span>
                <span className="text-slate-500 font-mono">1 USD ≈ ₹{paypalConfig?.exchangeRate || 86.50}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
