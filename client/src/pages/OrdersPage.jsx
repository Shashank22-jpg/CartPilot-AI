import React, { useState } from 'react';
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
  Download,
  Bot,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';

export default function OrdersPage() {
  const navigate = useNavigate();
  const { orders } = useApp();
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchOrder, setSearchOrder] = useState('');

  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== 'All' && order.status !== filterStatus) {
      return false;
    }
    if (searchOrder.trim()) {
      const q = searchOrder.toLowerCase();
      const matchId = order.orderId.toLowerCase().includes(q);
      const matchTxn = order.transactionId.toLowerCase().includes(q);
      const matchItem = order.items.some(i => i.title.toLowerCase().includes(q));
      if (!matchId && !matchTxn && !matchItem) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold mb-2">
            <PackageCheck className="w-3.5 h-3.5 text-electric-400" />
            <span>Sample Transaction Ledger (Demo)</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Order History & Payment Verification
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Sample transaction records showcasing PayPal Sandbox Orders v2 API payload schema with digital purchase passport linkages.
          </p>
        </div>

        {/* Search Order Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchOrder}
            onChange={(e) => setSearchOrder(e.target.value)}
            placeholder="Search order ID or item..."
            className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Orders Filter Tabs */}
      <div className="flex items-center space-x-2">
        {['All', 'Delivered', 'Processing', 'In Transit'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterStatus === status
                ? 'bg-electric-600 text-white shadow-glow-blue'
                : 'bg-navy-900 border border-navy-800 text-slate-400 hover:text-white'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-navy-900 border border-navy-800 space-y-2">
            <PackageCheck className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-sm font-semibold text-white">No orders matching criteria</h3>
            <p className="text-xs text-slate-400">Try adjusting your status filter or search query.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.orderId}
              className="rounded-2xl bg-navy-900 border border-navy-800 overflow-hidden shadow-md"
            >
              {/* Order Header */}
              <div className="p-4 sm:p-5 bg-navy-850/60 border-b border-navy-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Order Reference
                    </span>
                    <span className="font-mono font-bold text-white text-sm">
                      {order.orderId}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Date Placed
                    </span>
                    <span className="text-slate-200">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Total Amount
                    </span>
                    <span className="font-mono font-bold text-white text-sm">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{order.paymentStatus}</span>
                  </span>
                </div>
              </div>

              {/* Order Items & Shipping Details */}
              <div className="p-5 space-y-4">
                <div className="divide-y divide-navy-800/60">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 rounded-xl object-cover bg-navy-950 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-electric-400 uppercase tracking-wider">
                            {item.brand}
                          </span>
                          <h4 className="text-xs font-semibold text-white truncate mt-0.5">
                            {item.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-400">
                            <span className="font-mono">{formatCurrency(item.price)}</span>
                            <span>•</span>
                            <span>Qty: {item.quantity}</span>
                            <span>•</span>
                            <span className="text-slate-300 font-mono text-[10px]">
                              Serial: {item.serialNumber}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 self-end sm:self-center">
                        <Link
                          to="/passport"
                          className="px-3 py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-violet-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                        >
                          <FileKey className="w-3.5 h-3.5" />
                          <span>View Passport</span>
                        </Link>
                        <button
                          onClick={() => navigate(`/assistant?q=${encodeURIComponent(`Check warranty and return claims for order ${order.orderId}`)}`)}
                          className="px-3 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-colors"
                        >
                          <Bot className="w-3.5 h-3.5 text-electric-400" />
                          <span>AI Support</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking & Transaction Verification Bar */}
                <div className="pt-3 border-t border-navy-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-electric-400" />
                    <span>Tracking: <code className="text-slate-300">{order.trackingNumber}</code> ({order.carrier})</span>
                  </div>
                  <div className="flex items-center space-x-2 font-mono text-[11px]">
                    <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{order.transactionId}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
