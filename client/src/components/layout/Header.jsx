import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Bell,
  RefreshCw,
  ExternalLink,
  Menu,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/currency';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    itemCount,
    total,
    cartTotal,
    backendHealth,
    isHealthLoading,
    refreshHealth,
    passports,
    toggleMobileSidebar,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isHealthy = backendHealth?.status === 'ok';

  // Get current page friendly name
  const pageTitles = {
    '/dashboard': 'Personalized Overview',
    '/assistant': 'Conversational AI Shopping Assistant',
    '/discover': 'Seed Product Catalogue',
    '/compare': 'Specification Matrix',
    '/intelligence': 'Purchase Intelligence Report',
    '/cart': 'Shopping Cart & Budget Safeguards',
    '/orders': 'Order History & Ledger',
    '/passport': 'Digital Purchase Passport',
    '/settings': 'Preferences & Settings',
  };

  const currentTitle = pageTitles[location.pathname] || 'Agentic Commerce';

  // Active passports needing attention (e.g. return days left)
  const activeReturnPassports = passports.filter(p => p.returnDaysRemaining > 0);

  return (
    <header className="sticky top-0 z-30 h-16 bg-navy-950/80 backdrop-blur-md border-b border-navy-800 px-4 sm:px-6 flex items-center justify-between">
      {/* Mobile Hamburger & Page Title */}
      <div className="flex items-center space-x-3 min-w-0">
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden p-2 rounded-xl bg-navy-900 border border-navy-750 text-slate-300 hover:text-white"
          title="Open Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div>
          <h1 className="text-sm font-bold text-white tracking-tight truncate">
            {currentTitle}
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            CartPilot AI • Prototype Demonstration
          </p>
        </div>
      </div>

      {/* Global Quick Search */}
      <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, specifications, or ask assistant..."
            className="w-full bg-navy-900 border border-navy-750 focus:border-electric-500 rounded-xl pl-9 pr-12 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-navy-800 rounded border border-navy-700">
            ↵
          </kbd>
        </div>
      </form>

      {/* Action Controls & Statuses */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Backend Health Check Pill */}
        <button
          onClick={refreshHealth}
          disabled={isHealthLoading}
          title="Click to ping backend Express API /api/health"
          className="flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-navy-900 border border-navy-750 hover:border-navy-600 transition-colors text-xs"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isHealthy
                ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50'
                : 'bg-amber-400 animate-pulse'
            }`}
          />
          <span className="text-[11px] font-mono text-slate-300 hidden sm:inline">
            {isHealthy ? 'API 200' : 'API Polling'}
          </span>
          <RefreshCw className={`w-3 h-3 text-slate-400 ${isHealthLoading ? 'animate-spin' : ''}`} />
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-navy-900 border border-navy-750 text-slate-300 hover:text-white hover:border-navy-600 transition-colors"
            title="Notifications & Warranty Alerts"
          >
            <Bell className="w-4 h-4" />
            {activeReturnPassports.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-navy-900 border border-navy-750 shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                <span className="text-xs font-bold text-white">Purchase & Return Alerts</span>
                <span className="text-[10px] text-electric-400 bg-electric-500/10 px-2 py-0.5 rounded-full font-mono">
                  {activeReturnPassports.length} Sample Deadlines
                </span>
              </div>

              <div className="mt-3 space-y-2.5 max-h-64 overflow-y-auto">
                {activeReturnPassports.map((p) => (
                  <div key={p.passportId} className="p-2.5 rounded-xl bg-navy-850 border border-navy-750 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200 truncate">{p.brand}</span>
                      <span className="text-[10px] text-amber-400 font-medium bg-amber-400/10 px-1.5 py-0.5 rounded">
                        {p.returnDaysRemaining}d remaining
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{p.productTitle}</p>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Warranty: {p.warrantyDuration}</span>
                      <Link
                        to="/passport"
                        onClick={() => setShowNotifications(false)}
                        className="text-electric-400 hover:underline flex items-center space-x-1"
                      >
                        <span>Passport</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Cart Button */}
        <Link
          to="/cart"
          className="relative flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-electric-600 to-violet-600 hover:from-electric-500 hover:to-violet-500 text-white font-medium text-xs shadow-glow-blue transition-all"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline font-mono">
            {formatCurrency(total || cartTotal || 0)}
          </span>
          {itemCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-navy-950 text-[10px] font-black flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
