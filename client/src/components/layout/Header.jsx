import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Bell,
  ExternalLink,
  Menu,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { formatCurrency } from '../../utils/currency';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    itemCount,
    total,
    cartTotal,
    passports,
    toggleMobileSidebar,
  } = useApp();
  const { isDarkAiRoute } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Get current page friendly name
  const pageTitles = {
    '/dashboard': 'Storefront & Overview',
    '/assistant': 'Conversational AI Shopping Assistant',
    '/discover': 'Product Catalogue & Discovery',
    '/compare': 'Specification Matrix',
    '/intelligence': 'Purchase Intelligence Dossier',
    '/cart': 'Shopping Cart & Settlement',
    '/checkout': 'PayPal Sandbox Checkout',
    '/orders': 'Order History & Ledger',
    '/passport': 'Digital Purchase Passports',
    '/settings': 'Preferences & Settings',
  };

  const currentTitle = pageTitles[location.pathname] || 'CartPilot AI';

  // Active passports needing attention (e.g. return days left)
  const activeReturnPassports = (passports || []).filter(p => p && (p.returnDaysRemaining || 0) > 0);

  return (
    <header
      className={`sticky top-0 z-30 h-16 px-4 sm:px-6 flex items-center justify-between transition-colors duration-200 ${
        isDarkAiRoute
          ? 'bg-navy-950/80 backdrop-blur-md border-b border-navy-800 text-white'
          : 'bg-white/95 backdrop-blur-md border-b border-emp-surface-line text-emp-ink shadow-emp-sm'
      }`}
    >
      {/* Mobile Hamburger & Page Title */}
      <div className="flex items-center space-x-3 min-w-0">
        <button
          onClick={toggleMobileSidebar}
          className={`md:hidden p-2 rounded-xl transition-colors ${
            isDarkAiRoute
              ? 'bg-navy-900 border border-navy-750 text-slate-300 hover:text-white'
              : 'bg-emp-surface-tint border border-emp-surface-line text-emp-ink-secondary hover:text-emp-brand'
          }`}
          title="Open Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div>
          <h1 className={`text-sm font-bold tracking-tight truncate ${
            isDarkAiRoute ? 'text-white' : 'text-emp-ink font-display'
          }`}>
            {currentTitle}
          </h1>
          <p className={`text-[11px] hidden sm:block ${
            isDarkAiRoute ? 'text-slate-400' : 'text-emp-ink-muted'
          }`}>
            CartPilot AI • Emporium Hybrid Architecture
          </p>
        </div>
      </div>

      {/* Global Quick Search Pill */}
      <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          {isDarkAiRoute ? (
            <>
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
            </>
          ) : (
            <div className="emp-search-pill">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands, specifications…"
                className="emp-search-input"
              />
              <button type="submit" className="emp-search-btn" title="Search">
                <Search className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          )}
        </div>
      </form>

      {/* Action Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-xl transition-colors ${
              isDarkAiRoute
                ? 'bg-navy-900 border border-navy-750 text-slate-300 hover:text-white hover:border-navy-600'
                : 'bg-emp-surface-tint border border-emp-surface-line text-emp-ink-secondary hover:text-emp-brand hover:border-emp-brand-100'
            }`}
            title="Notifications & Warranty Alerts"
          >
            <Bell className="w-4 h-4" />
            {activeReturnPassports.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emp-accent animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl p-4 z-50 ${
              isDarkAiRoute
                ? 'bg-navy-900 border border-navy-750 text-white'
                : 'bg-white border border-emp-surface-line text-emp-ink shadow-emp-lg'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-emp-surface-line">
                <span className="text-xs font-bold">Purchase & Return Alerts</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-pill font-mono font-bold ${
                  isDarkAiRoute ? 'text-electric-300 bg-electric-500/10' : 'text-emp-brand bg-emp-brand-050'
                }`}>
                  {activeReturnPassports.length} Active Deadlines
                </span>
              </div>

              <div className="mt-3 space-y-2.5 max-h-64 overflow-y-auto">
                {activeReturnPassports.map((p, idx) => (
                  <div
                    key={p?.passportId || idx}
                    className={`p-2.5 rounded-xl text-xs border ${
                      isDarkAiRoute ? 'bg-navy-850 border-navy-750' : 'bg-emp-surface-tint border-emp-surface-line'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold truncate">{p?.brand || 'Hardware'}</span>
                      <span className="text-[10px] text-emp-accent font-bold bg-emp-accent-050 px-2 py-0.5 rounded-pill">
                        {p?.returnDaysRemaining || 0}d left
                      </span>
                    </div>
                    <p className={`text-[11px] mt-0.5 truncate ${isDarkAiRoute ? 'text-slate-400' : 'text-emp-ink-muted'}`}>
                      {p?.productTitle || 'Product'}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className={isDarkAiRoute ? 'text-slate-400' : 'text-emp-ink-muted'}>
                        Warranty: {p?.warrantyDuration || 'Coverage Active'}
                      </span>
                      <Link
                        to="/passport"
                        onClick={() => setShowNotifications(false)}
                        className="text-emp-brand font-semibold hover:underline flex items-center space-x-1"
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

        {/* Cart Button */}
        <Link
          to="/cart"
          className={
            isDarkAiRoute
              ? 'relative flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-electric-600 to-violet-600 text-white font-medium text-xs shadow-glow-blue transition-all'
              : 'emp-cartpill'
          }
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline font-bold text-xs">
            {formatCurrency(total || cartTotal || 0, 'USD')}
          </span>
          <span className={isDarkAiRoute ? 'w-5 h-5 rounded-full bg-white text-navy-950 text-[10px] font-black flex items-center justify-center' : 'emp-cartpill__count'}>
            {itemCount || 0}
          </span>
        </Link>
      </div>
    </header>
  );
}
