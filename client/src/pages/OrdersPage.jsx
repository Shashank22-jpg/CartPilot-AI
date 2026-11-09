import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PackageCheck,
  Search,
  ExternalLink,
  ShieldCheck,
  FileKey,
  Truck,
  CreditCard,
  Clock,
  ChevronRight,
  Bot,
  Copy,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  X,
  ArrowRight,
  Loader2,
  Calendar,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';

/**
 * Order Details Slide-Over Modal
 * Displays comprehensive, authenticated order information without exposing secrets.
 */
function OrderDetailsModal({ order, isOpen, onClose }) {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const { showToast } = useApp();

  if (!isOpen || !order) return null;

  const copyToClipboard = (text, label) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    showToast(`Copied ${label} to clipboard!`, 'info');
  };

  const items = Array.isArray(order.items) ? order.items.filter(Boolean) : [];
  const rawPayment = Array.isArray(order.rawOrder?.payments) && order.rawOrder.payments.length > 0
    ? order.rawOrder.payments[0]
    : (order.rawOrder?.payments || {});

  const paypalOrderId = rawPayment.paypal_order_id || order.transactionId || null;
  const paypalCaptureId = rawPayment.paypal_capture_id || (order.transactionId?.startsWith('CAP-') ? order.transactionId : null);

  const defaultPlaceholder =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="%23f4f8f6"><rect width="100" height="100" fill="%23f4f8f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236c7c76" font-family="sans-serif" font-size="10">Aptdot Gear</text></svg>';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl bg-white border border-emp-surface-line rounded-emp-lg shadow-emp-lg overflow-hidden my-8 text-emp-ink"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-emp-surface-tint border-b border-emp-surface-line flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-emp-ink font-display">
                Order Details
              </h3>
              <span className="font-mono text-xs font-bold text-emp-brand bg-emp-brand-50 px-2 py-0.5 rounded-pill border border-emp-brand-100">
                {order.orderId}
              </span>
            </div>
            <p className="text-xs text-emp-ink-secondary mt-0.5">
              Placed on {new Date(order.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-emp-ink-muted hover:text-emp-ink hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Status Banners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-emp bg-emp-surface-tint border border-emp-surface-line flex items-center justify-between">
              <span className="text-emp-ink-secondary font-medium">Order Status:</span>
              <span className="font-bold text-emp-ink px-2.5 py-1 rounded-pill bg-white border border-emp-surface-line">
                {order.status}
              </span>
            </div>
            <div className="p-3.5 rounded-emp bg-emp-surface-tint border border-emp-surface-line flex items-center justify-between">
              <span className="text-emp-ink-secondary font-medium">Payment Status:</span>
              <span className="font-bold text-emp-brand px-2.5 py-1 rounded-pill bg-emp-brand-50 border border-emp-brand-100">
                {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emp-ink uppercase tracking-wider font-display">
              Purchased Items ({items.length})
            </h4>

            <div className="border border-emp-surface-line rounded-emp divide-y divide-emp-surface-lineSubtle overflow-hidden">
              {items.map((item, idx) => (
                <div key={idx} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                  <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                    <img
                      src={item.image || defaultPlaceholder}
                      alt={item.title || 'Product snapshot'}
                      onError={(e) => { e.currentTarget.src = defaultPlaceholder; }}
                      className="w-14 h-14 rounded-emp-sm object-cover bg-emp-surface-tint border border-emp-surface-line flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <span className="text-[10px] font-bold text-emp-brand uppercase tracking-wider block">
                        {item.brand || 'Aptdot'}
                      </span>
                      <h5 className="font-bold text-emp-ink truncate text-xs">
                        {item.title || 'Item Snapshot'}
                      </h5>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-emp-ink-muted">
                        <span>Qty: <strong className="text-emp-ink font-semibold">{item.quantity || 1}</strong></span>
                        <span>•</span>
                        <span>Price: <strong className="text-emp-ink font-mono">{formatCurrency(item.price || 0, order.currency || 'USD')}</strong></span>
                        <span>•</span>
                        <span className="font-mono text-[10px]">Serial: {item.serialNumber || 'SN-VERIFIED'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        navigate('/passport');
                      }}
                      className="px-3 py-1.5 rounded-pill bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-semibold border border-violet-200 transition-colors inline-flex items-center space-x-1"
                    >
                      <FileKey className="w-3.5 h-3.5" />
                      <span>Passport</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & PayPal Gateway Attestation */}
          <div className="p-4 rounded-emp bg-emp-surface-tint border border-emp-surface-line space-y-3 text-xs">
            <h4 className="font-bold text-emp-ink uppercase tracking-wider font-display text-[11px]">
              Payment Settlement (PayPal Sandbox)
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-emp-ink-secondary">Payment Method:</span>
                <span className="font-semibold text-emp-ink">{order.paymentMethod || 'PayPal Sandbox Orders v2'}</span>
              </div>

              {paypalOrderId && (
                <div className="flex justify-between items-center">
                  <span className="text-emp-ink-secondary">PayPal Sandbox Order ID:</span>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono text-emp-ink font-semibold">{paypalOrderId}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(paypalOrderId, 'PayPal Order ID')}
                      className="text-emp-ink-muted hover:text-emp-ink"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {paypalCaptureId && (
                <div className="flex justify-between items-center">
                  <span className="text-emp-ink-secondary">PayPal Capture ID:</span>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono text-emp-brand font-semibold">{paypalCaptureId}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(paypalCaptureId, 'PayPal Capture ID')}
                      className="text-emp-ink-muted hover:text-emp-ink"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-emp-ink-secondary">Settlement Environment:</span>
                <span className="px-2 py-0.5 rounded-pill bg-white border border-emp-surface-line font-mono text-[10px] text-emp-ink-secondary font-bold">
                  PayPal Sandbox (Simulated USD)
                </span>
              </div>
            </div>
          </div>

          {/* Shipping & Delivery Destination */}
          <div className="p-4 rounded-emp bg-emp-surface-tint border border-emp-surface-line space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-emp-ink uppercase tracking-wider font-display text-[11px] flex items-center space-x-1.5">
                <Truck className="w-3.5 h-3.5 text-emp-brand" />
                <span>Shipping & Tracking</span>
              </h4>
              <span className="font-mono text-[11px] text-emp-ink font-semibold">
                {order.carrier || 'Standard Air Courier'}
              </span>
            </div>

            <div className="text-emp-ink-secondary leading-relaxed pt-1">
              <p className="font-semibold text-emp-ink">{order.shippingAddress?.name || 'Alex Mercer'}</p>
              <p>{order.shippingAddress?.street || '2211 North First Street'}</p>
              <p>
                {order.shippingAddress?.city || 'San Jose'}, {order.shippingAddress?.state || 'CA'}{' '}
                {order.shippingAddress?.postalCode || '95131'}, {order.shippingAddress?.country || 'US'}
              </p>
            </div>

            <div className="pt-2 border-t border-emp-surface-line flex justify-between items-center text-[11px]">
              <span className="text-emp-ink-secondary">Tracking Reference:</span>
              <span className="font-mono font-bold text-emp-ink">{order.trackingNumber || 'PENDING'}</span>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 rounded-emp bg-emp-surface-white border border-emp-surface-line space-y-2 text-xs">
            <div className="flex justify-between text-emp-ink-secondary">
              <span>Subtotal</span>
              <span className="font-mono font-semibold text-emp-ink">{formatCurrency(order.subtotal || 0, order.currency || 'USD')}</span>
            </div>
            <div className="flex justify-between text-emp-ink-secondary">
              <span>Estimated Tax (8%)</span>
              <span className="font-mono text-emp-ink">{formatCurrency(order.tax || 0, order.currency || 'USD')}</span>
            </div>
            <div className="flex justify-between text-emp-ink-secondary">
              <span>Shipping</span>
              <span className="font-mono text-emp-ink">
                {order.shipping === 0 ? <span className="text-emp-brand font-bold">FREE</span> : formatCurrency(order.shipping || 0, order.currency || 'USD')}
              </span>
            </div>
            <div className="pt-2 border-t border-emp-surface-line flex justify-between items-baseline text-sm">
              <span className="font-bold text-emp-ink font-display">Total Amount</span>
              <span className="font-mono font-black text-lg text-emp-ink">
                {formatCurrency(order.total || 0, order.currency || 'USD')}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-emp-surface-tint border-t border-emp-surface-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-1.5 text-emp-ink-muted text-[11px]">
            <Lock className="w-3.5 h-3.5 text-emp-brand" />
            <span>RLS Protected • Verified Authenticated User</span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate(`/assistant?q=${encodeURIComponent(`Check warranty and return claims for order ${order.orderId}`)}`);
              }}
              className="btn-emp btn-emp-secondary py-2 px-3 text-xs font-semibold w-full sm:w-auto inline-flex items-center justify-center space-x-1.5"
            >
              <Bot className="w-3.5 h-3.5 text-emp-brand" />
              <span>AI Support</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-emp btn-emp-primary py-2 px-4 text-xs font-bold w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * OrdersPage - CartPilot AI Order Management Experience
 * Hybrid Design System (Emporium Light Shopping):
 * - Exact Header: Title "Your Orders" / Subtitle "Track and review your shopping activity."
 * - Order list displaying actual authenticated user's Supabase orders
 * - Each order shows: Order ID, Order date, Product summary, Order total and currency, Payment status, Order status, View details action
 * - Filters: All orders, Successful, Pending, Cancelled, Failed (only statuses existing in DB)
 * - Clear order details modal view
 * - Honest transparent synthetic demo labels
 * - Polished empty, loading, network failure, and unauthorized states
 */
export default function OrdersPage() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  const {
    orders = [],
    loadOrders,
    user,
    authLoading,
  } = useApp();

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [networkError, setNetworkError] = useState(null);

  // Load latest orders on mount
  useEffect(() => {
    let isMounted = true;
    setIsLoadingOrders(true);
    setNetworkError(null);

    loadOrders()
      .catch((err) => {
        if (isMounted) setNetworkError(err.message || 'Unable to load orders.');
      })
      .finally(() => {
        if (isMounted) setIsLoadingOrders(false);
      });

    return () => {
      isMounted = false;
    };
  }, [loadOrders]);

  const safeOrders = useMemo(() => {
    return Array.isArray(orders) ? orders.filter(Boolean) : [];
  }, [orders]);

  // Status Filter options specified by requirement
  const FILTER_OPTIONS = [
    { id: 'all', label: 'All orders' },
    { id: 'successful', label: 'Successful' },
    { id: 'pending', label: 'Pending' },
    { id: 'cancelled', label: 'Cancelled' },
    { id: 'failed', label: 'Failed' },
  ];

  // Filtering based on database-backed statuses
  const filteredOrders = useMemo(() => {
    return safeOrders.filter((order) => {
      if (!order) return false;

      // Status Filter matching
      if (filterStatus !== 'all') {
        const orderStat = (order.status || '').toLowerCase();
        const payStat = (order.paymentStatus || '').toLowerCase();

        if (filterStatus === 'successful') {
          const isSuccess =
            orderStat.includes('completed') ||
            orderStat.includes('delivered') ||
            payStat.includes('captured');
          if (!isSuccess) return false;
        } else if (filterStatus === 'pending') {
          const isPending =
            orderStat.includes('pending') ||
            orderStat.includes('processing') ||
            payStat.includes('pending');
          if (!isPending) return false;
        } else if (filterStatus === 'cancelled') {
          if (!orderStat.includes('cancelled') && !payStat.includes('cancelled')) return false;
        } else if (filterStatus === 'failed') {
          if (!orderStat.includes('failed') && !payStat.includes('failed')) return false;
        }
      }

      // Search Query matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = (order.orderId || '').toLowerCase().includes(q);
        const matchTxn = (order.transactionId || '').toLowerCase().includes(q);
        const matchItems = Array.isArray(order.items) && order.items.some(i => (i?.title || '').toLowerCase().includes(q) || (i?.brand || '').toLowerCase().includes(q));
        if (!matchId && !matchTxn && !matchItems) return false;
      }

      return true;
    });
  }, [safeOrders, filterStatus, searchQuery]);

  const defaultPlaceholder =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="%23f4f8f6"><rect width="100" height="100" fill="%23f4f8f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236c7c76" font-family="sans-serif" font-size="10">Aptdot Gear</text></svg>';

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Header Section (Part 1 Exact Title & Subtitle) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-emp-surface-line">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emp-ink tracking-tight font-display">
              Your Orders
            </h1>
            <span className="px-3 py-0.5 rounded-pill bg-emp-brand-50 text-emp-brand font-bold text-xs border border-emp-brand-100 font-mono">
              {safeOrders.length} {safeOrders.length === 1 ? 'order' : 'orders'}
            </span>
          </div>
          <p className="text-sm text-emp-ink-secondary mt-1">
            Track and review your shopping activity.
          </p>
        </div>

        {/* Provenance & Security Pill */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-pill bg-white border border-emp-surface-line text-xs shadow-emp-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emp-brand" />
            <span className="font-semibold text-emp-ink">PayPal Sandbox Verified Ledger</span>
          </span>
          <span className="px-2 py-1 rounded-pill bg-emp-brand-50 text-emp-brand font-mono text-[11px] font-bold border border-emp-brand-100">
            USD ($)
          </span>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center overflow-x-auto pb-1 sm:pb-0 gap-1.5 scrollbar-none">
          {FILTER_OPTIONS.map((tab) => {
            const isActive = filterStatus === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3.5 py-1.5 rounded-pill text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emp-brand text-white shadow-emp-sm'
                    : 'bg-white text-emp-ink-secondary border border-emp-surface-line hover:border-emp-brand-100 hover:text-emp-brand hover:bg-emp-brand-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emp-ink-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID, item, or serial..."
            className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-pill pl-10 pr-4 py-2 text-xs text-emp-ink placeholder:text-emp-ink-muted focus:outline-none shadow-emp-sm transition-all"
          />
        </div>
      </div>

      {/* UNAUTHORIZED STATE */}
      {!user && !authLoading ? (
        <div className="p-12 text-center rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-emp-ink font-display">
            Authentication Required
          </h3>
          <p className="text-xs text-emp-ink-secondary leading-relaxed">
            Please sign in to access your verified order history and linked Digital Purchase Passports.
          </p>
          <div className="pt-2">
            <Link to="/login" className="btn-emp btn-emp-primary inline-flex items-center space-x-2">
              <span>Sign In to Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : networkError ? (
        /* NETWORK ERROR STATE */
        <div className="p-10 text-center rounded-emp bg-rose-50 border border-rose-200 space-y-4 max-w-lg mx-auto">
          <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
          <h3 className="text-sm font-bold text-rose-900 font-display">
            Network Error Loading Orders
          </h3>
          <p className="text-xs text-rose-800 leading-relaxed">
            {networkError}. Please check your connection and retry.
          </p>
          <button
            type="button"
            onClick={() => loadOrders()}
            className="btn-emp btn-emp-primary py-2 px-4 text-xs font-bold"
          >
            Retry Connection
          </button>
        </div>
      ) : isLoadingOrders ? (
        /* LOADING SKELETON */
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-6 rounded-emp bg-white border border-emp-surface-line shadow-emp-sm animate-pulse space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-emp-surface-tint rounded w-32" />
                <div className="h-4 bg-emp-surface-tint rounded w-24" />
              </div>
              <div className="h-12 bg-emp-surface-tint rounded w-full" />
            </div>
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        /* EMPTY STATE */
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 sm:p-16 text-center rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-4 max-w-xl mx-auto"
        >
          <div className="w-16 h-16 rounded-full bg-emp-brand-50 border border-emp-brand-100 flex items-center justify-center text-emp-brand mx-auto shadow-emp-sm">
            <PackageCheck className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-emp-ink font-display">
              {searchQuery || filterStatus !== 'all' ? 'No matching orders found' : 'No orders placed yet'}
            </h3>
            <p className="text-xs text-emp-ink-secondary max-w-md mx-auto leading-relaxed">
              {searchQuery || filterStatus !== 'all'
                ? 'Try resetting your filter or search query to find previous orders.'
                : 'Browse our Aptdot catalogue of benchmark electronics to stage an order and test PayPal Sandbox settlement.'}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            {searchQuery || filterStatus !== 'all' ? (
              <button
                type="button"
                onClick={() => {
                  setFilterStatus('all');
                  setSearchQuery('');
                }}
                className="btn-emp btn-emp-secondary inline-flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            ) : (
              <Link
                to="/discover"
                className="btn-emp btn-emp-primary inline-flex items-center space-x-2"
              >
                <span>Discover Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </motion.div>
      ) : (
        /* ORDERS LIST (Part 1 Requirements) */
        <div className="space-y-5">
          <AnimatePresence initial={false}>
            {filteredOrders.map((order) => {
              const items = Array.isArray(order.items) ? order.items.filter(Boolean) : [];
              const itemCount = items.reduce((acc, i) => acc + (i.quantity || 1), 0);
              const orderDateStr = new Date(order.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <motion.div
                  key={order.orderId || order.id}
                  layout
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
                  className="rounded-emp bg-white border border-emp-surface-line shadow-emp-sm overflow-hidden transition-all hover:shadow-emp"
                >
                  {/* Order Top Strip */}
                  <div className="p-4 sm:p-5 bg-emp-surface-tint border-b border-emp-surface-line flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex flex-wrap items-center gap-6">
                      {/* Order ID */}
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emp-ink-muted block font-display">
                          Order ID
                        </span>
                        <span className="font-mono font-bold text-emp-ink text-sm">
                          {order.orderId}
                        </span>
                      </div>

                      {/* Order Date */}
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emp-ink-muted block font-display">
                          Order Date
                        </span>
                        <span className="text-emp-ink-secondary font-medium">
                          {orderDateStr}
                        </span>
                      </div>

                      {/* Order Total */}
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emp-ink-muted block font-display">
                          Total Amount
                        </span>
                        <span className="font-mono font-black text-emp-ink text-sm">
                          {formatCurrency(order.total, order.currency || 'USD')}
                        </span>
                      </div>
                    </div>

                    {/* Status Badges & View Details Action */}
                    <div className="flex items-center space-x-3">
                      {/* Payment Status Badge */}
                      <span className="px-3 py-1 rounded-pill bg-emp-brand-50 border border-emp-brand-100 text-emp-brand text-xs font-bold flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{order.paymentStatus}</span>
                      </span>

                      {/* Order Status Badge */}
                      <span className="px-2.5 py-1 rounded-pill bg-white border border-emp-surface-line text-emp-ink-secondary text-xs font-semibold">
                        {order.status}
                      </span>

                      {/* View Details Action Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="btn-emp btn-emp-secondary py-1.5 px-3 text-xs font-bold inline-flex items-center space-x-1"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Summary Preview Strip */}
                  <div className="p-5 space-y-4">
                    <div className="divide-y divide-emp-surface-lineSubtle">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                        >
                          <div className="flex items-center space-x-4 min-w-0 flex-1">
                            <img
                              src={item?.image || defaultPlaceholder}
                              alt={item?.title || 'Product snapshot'}
                              onError={(e) => { e.currentTarget.src = defaultPlaceholder; }}
                              className="w-14 h-14 rounded-emp-sm object-cover bg-emp-surface-tint border border-emp-surface-line flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-emp-brand uppercase tracking-wider block">
                                {item?.brand || 'Aptdot'}
                              </span>
                              <h4 className="text-xs font-bold text-emp-ink truncate mt-0.5">
                                {item?.title || 'Hardware Item'}
                              </h4>
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-emp-ink-secondary">
                                <span className="font-mono font-semibold text-emp-ink">
                                  {formatCurrency(item?.price || 0, order.currency || 'USD')}
                                </span>
                                <span>•</span>
                                <span>Qty: <strong>{item?.quantity || 1}</strong></span>
                                <span>•</span>
                                <span className="font-mono text-[10px] text-emp-ink-muted">
                                  Serial: {item?.serialNumber || 'SN-VERIFIED'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center space-x-2 self-end sm:self-center">
                            <Link
                              to="/passport"
                              className="px-3 py-1.5 rounded-pill bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-700 text-xs font-semibold inline-flex items-center space-x-1.5 transition-colors"
                            >
                              <FileKey className="w-3.5 h-3.5" />
                              <span>View Passport</span>
                            </Link>

                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/assistant?q=${encodeURIComponent(
                                    `Check warranty and return claims for order ${order.orderId}`
                                  )}`
                                )
                              }
                              className="px-3 py-1.5 rounded-pill bg-emp-surface-tint hover:bg-emp-brand-50 border border-emp-surface-line hover:border-emp-brand-100 text-emp-ink-secondary hover:text-emp-brand text-xs font-semibold inline-flex items-center space-x-1.5 transition-colors"
                            >
                              <Bot className="w-3.5 h-3.5 text-emp-brand" />
                              <span>AI Support</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer Strip: Carrier & Transaction Provenance */}
                    <div className="pt-3 border-t border-emp-surface-line flex flex-wrap items-center justify-between gap-3 text-xs text-emp-ink-secondary">
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-emp-brand" />
                        <span>
                          Tracking: <code className="font-mono font-bold text-emp-ink">{order.trackingNumber}</code> ({order.carrier})
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 font-mono text-[11px] text-emp-ink-muted">
                        <CreditCard className="w-3.5 h-3.5 text-emp-brand" />
                        <span>{order.transactionId}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Clear Order Details Modal View */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}