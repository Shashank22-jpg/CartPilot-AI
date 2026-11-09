import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useApp } from '../../context/AppContext';

export default function AppLayout() {
  const { sidebarCollapsed } = useApp();

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col md:flex-row overflow-x-hidden">
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
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
