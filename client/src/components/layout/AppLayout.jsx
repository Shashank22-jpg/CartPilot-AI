import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export default function AppLayout() {
  const { sidebarCollapsed } = useApp();
  const { isDarkAiRoute } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row overflow-x-hidden transition-colors duration-200 ${
        isDarkAiRoute
          ? 'bg-navy-950 text-slate-100'
          : 'bg-emp-surface-soft text-emp-ink'
      }`}
    >
      {/* Responsive Collapsible / Mobile Drawer Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen w-full transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {/* Sticky Top Header */}
        <Header />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
