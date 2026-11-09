import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  Compass,
  Layers,
  ShieldCheck,
  ShoppingCart,
  PackageCheck,
  FileKey,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export default function Sidebar() {
  const {
    sidebarCollapsed,
    toggleSidebar,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    itemCount,
    compareList,
    userProfile,
    logout,
  } = useApp();
  const { isDarkAiRoute } = useTheme();

  const displayName =
    userProfile?.full_name || 'Shashank AR';

  const displaySubtitle = 'Authenticated Session';

  const userInitials = (
    userProfile?.full_name || 'SA'
  )
    .replace(/[^a-zA-Z]/g, '')
    .slice(0, 2)
    .toUpperCase() || 'SA';

  const navItems = [
    { to: '/dashboard', label: 'Storefront', icon: LayoutDashboard },
    { to: '/assistant', label: 'AI Assistant', icon: Bot, badge: 'Agent' },
    { to: '/discover', label: 'Discover', icon: Compass },
    {
      to: '/compare',
      label: 'Compare',
      icon: Layers,
      badgeCount: compareList.length > 0 ? compareList.length : null,
    },
    { to: '/intelligence', label: 'Intelligence', icon: ShieldCheck },
    {
      to: '/cart',
      label: 'Shopping Cart',
      icon: ShoppingCart,
      badgeCount: itemCount > 0 ? itemCount : null,
    },
    { to: '/orders', label: 'Order History', icon: PackageCheck },
    { to: '/passport', label: 'Purchase Passport', icon: FileKey },
    { to: '/profile', label: 'My Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = () => {
    if (mobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 transition-all duration-300 ease-in-out flex flex-col justify-between select-none ${
          isDarkAiRoute
            ? 'bg-navy-900 border-r border-navy-800 text-slate-100'
            : 'bg-white border-r border-emp-surface-line text-emp-ink shadow-emp-sm'
        } ${
          mobileSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
        } ${
          sidebarCollapsed ? 'md:w-20' : 'md:w-64'
        }`}
      >
        {/* Top Branding Section */}
        <div>
          <div className={`h-16 px-4 flex items-center justify-between border-b ${
            isDarkAiRoute ? 'border-navy-800' : 'border-emp-surface-line'
          }`}>
            <Link to="/dashboard" className="flex items-center space-x-3 overflow-hidden">
              <div className={`relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-105 ${
                isDarkAiRoute
                  ? 'bg-gradient-to-tr from-electric-500 via-violet-600 to-electric-400 p-0.5 shadow-glow-blue'
                  : 'bg-emp-brand text-white shadow-[0_6px_14px_rgba(12,107,88,0.25)]'
              }`}>
                {isDarkAiRoute ? (
                  <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-electric-400" />
                  </div>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
                    <path d="M4 8h18l-1.6 9.2a2 2 0 0 1-2 1.6H7.6a2 2 0 0 1-2-1.6L4 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M9 8V6.5a4 4 0 0 1 8 0V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </div>

              {(!sidebarCollapsed || mobileSidebarOpen) && (
                <div className="min-w-0 flex flex-col">
                  <span className={`text-base font-extrabold tracking-tight truncate ${
                    isDarkAiRoute
                      ? 'bg-gradient-to-r from-white via-slate-100 to-electric-300 bg-clip-text text-transparent'
                      : 'text-emp-ink font-display'
                  }`}>
                    CartPilot<span className={isDarkAiRoute ? 'text-electric-400' : 'text-emp-brand'}>.AI</span>
                  </span>
                  <span className={`text-[10px] font-semibold tracking-wider uppercase truncate ${
                    isDarkAiRoute ? 'text-slate-400' : 'text-emp-ink-muted'
                  }`}>
                    Agentic Commerce
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Collapse / Expand Toggle */}
            <button
              onClick={toggleSidebar}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className={`hidden md:flex p-1.5 rounded-lg transition-colors ${
                isDarkAiRoute
                  ? 'text-slate-400 hover:text-white hover:bg-navy-800'
                  : 'text-emp-ink-muted hover:text-emp-brand hover:bg-emp-surface-tint'
              }`}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Link List */}
          <nav className="p-3 space-y-1 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center rounded-emp-sm transition-all duration-200 group relative ${
                      sidebarCollapsed && !mobileSidebarOpen
                        ? 'justify-center p-3'
                        : 'px-3.5 py-2.5 space-x-3'
                    } ${
                      isActive
                        ? isDarkAiRoute
                          ? 'bg-gradient-to-r from-electric-600/20 to-violet-600/20 text-white font-medium border border-electric-500/30'
                          : 'bg-emp-brand-050 text-emp-brand-700 font-bold border border-emp-brand-100'
                        : isDarkAiRoute
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-navy-800/60'
                        : 'text-emp-ink-secondary hover:text-emp-brand hover:bg-emp-surface-tint'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                          isActive
                            ? isDarkAiRoute
                              ? 'text-electric-400'
                              : 'text-emp-brand'
                            : isDarkAiRoute
                            ? 'text-slate-400'
                            : 'text-emp-ink-muted group-hover:text-emp-brand'
                        }`}
                      />

                      {(!sidebarCollapsed || mobileSidebarOpen) && (
                        <span className="text-xs tracking-wide flex-1 truncate font-body">
                          {item.label}
                        </span>
                      )}

                      {(!sidebarCollapsed || mobileSidebarOpen) && item.badge && (
                        <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-pill uppercase tracking-wider ${
                          isDarkAiRoute
                            ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300'
                            : 'bg-emp-brand-050 border border-emp-brand-100 text-emp-brand'
                        }`}>
                          {item.badge}
                        </span>
                      )}

                      {(!sidebarCollapsed || mobileSidebarOpen) && item.badgeCount !== null && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-pill bg-emp-accent text-white">
                          {item.badgeCount}
                        </span>
                      )}

                      {/* Popover tooltip when collapsed on desktop */}
                      {sidebarCollapsed && !mobileSidebarOpen && (
                        <div className="hidden md:block absolute left-full ml-3 px-2.5 py-1 bg-white border border-emp-surface-line text-emp-ink text-xs rounded-emp-sm shadow-emp-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                          {item.label}
                          {item.badgeCount && ` (${item.badgeCount})`}
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Section */}
        <div className={`p-3 border-t ${
          isDarkAiRoute ? 'border-navy-800 bg-navy-950/40' : 'border-emp-surface-line bg-emp-surface-tint/50'
        }`}>
          {!sidebarCollapsed || mobileSidebarOpen ? (
            <div className={`flex items-center justify-between p-2 rounded-xl border transition-colors ${
              isDarkAiRoute
                ? 'bg-navy-850/60 border-navy-750/70 hover:border-navy-700'
                : 'bg-white border-emp-surface-line hover:border-emp-brand-100'
            }`}>
              <Link
                to="/profile"
                onClick={handleNavClick}
                className="flex items-center space-x-2.5 min-w-0 flex-1 pr-2 hover:opacity-90 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-emp-brand text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  {userInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold truncate">{displayName}</p>
                  <p className="text-[10px] text-emp-ink-muted truncate">{displaySubtitle}</p>
                </div>
              </Link>

              {/* Logout Button */}
              <button
                type="button"
                onClick={logout}
                title="Sign out of CartPilot"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-emp-surface-tint transition-colors flex-shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center py-1 space-y-2">
              <Link
                to="/profile"
                className="w-8 h-8 rounded-full bg-emp-brand text-white flex items-center justify-center text-xs font-bold"
              >
                {userInitials}
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
