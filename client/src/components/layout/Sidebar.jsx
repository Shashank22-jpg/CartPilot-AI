import React from 'react';
import { NavLink } from 'react-router-dom';
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
  ChevronLeft,
  ChevronRight,
  Activity,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const {
    sidebarCollapsed,
    toggleSidebar,
    itemCount,
    compareList,
    backendHealth,
    isHealthLoading,
  } = useApp();

  const isHealthy = backendHealth?.status === 'ok';

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
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
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-navy-900 border-r border-navy-800 transition-all duration-300 ease-in-out flex flex-col justify-between select-none ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Branding Section */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-navy-800">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-tr from-electric-500 via-violet-600 to-electric-400 p-0.5 shadow-glow-blue flex items-center justify-center">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-electric-400" />
              </div>
            </div>

            {!sidebarCollapsed && (
              <div className="min-w-0 flex flex-col">
                <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-electric-300 bg-clip-text text-transparent truncate">
                  CartPilot<span className="text-electric-400">.AI</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase truncate">
                  Agentic Commerce
                </span>
              </div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Link List */}
        <nav className="p-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center rounded-xl transition-all duration-200 group relative ${
                    sidebarCollapsed ? 'justify-center p-3' : 'px-3.5 py-2.5 space-x-3'
                  } ${
                    isActive
                      ? 'bg-gradient-to-r from-electric-600/20 to-violet-600/20 text-white font-medium border border-electric-500/30 shadow-sm shadow-electric-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800/60 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? 'text-electric-400' : 'text-slate-400'
                      }`}
                    />

                    {!sidebarCollapsed && (
                      <span className="text-xs tracking-wide flex-1 truncate">
                        {item.label}
                      </span>
                    )}

                    {!sidebarCollapsed && item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-violet-500/20 border border-violet-500/40 text-violet-300 uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}

                    {!sidebarCollapsed && item.badgeCount !== null && item.badgeCount !== undefined && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-electric-500 text-white shadow-sm shadow-electric-500/50">
                        {item.badgeCount}
                      </span>
                    )}

                    {/* Popover tooltip when collapsed */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-3 px-2.5 py-1 bg-navy-800 border border-navy-700 text-white text-xs rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
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

      {/* Bottom Status & Info Section */}
      <div className="p-3 border-t border-navy-800/80 bg-navy-950/40">
        {!sidebarCollapsed ? (
          <div className="space-y-3">
            <div className="p-2.5 rounded-xl bg-navy-850 border border-navy-750">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center space-x-1.5">
                  <Activity className="w-3 h-3 text-electric-400" />
                  <span>Backend Core</span>
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isHealthy
                      ? 'bg-emerald-400 animate-pulse-slow shadow-sm shadow-emerald-400/50'
                      : 'bg-amber-400'
                  }`}
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span>{isHealthy ? 'Connected (200 OK)' : 'Pending Poll'}</span>
                <span className="text-[10px] text-slate-500">
                  {backendHealth?._clientLatencyMs ? `${backendHealth._clientLatencyMs}ms` : ''}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 px-1">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-600 to-electric-500 p-0.5 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-navy-900 flex items-center justify-center text-[10px] font-bold text-white">
                  AM
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-200 truncate">Alex Mercer</p>
                <p className="text-[10px] text-slate-400 truncate">PayPal Sandbox Demo</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <div
              title={`API Status: ${isHealthy ? 'Live Connected' : 'Checking...'}`}
              className={`w-3 h-3 rounded-full ${
                isHealthy ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-600 to-electric-500 p-0.5">
              <div className="w-full h-full rounded-full bg-navy-900 flex items-center justify-center text-[10px] font-bold text-white">
                AM
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
