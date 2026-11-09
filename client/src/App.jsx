import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';
import ErrorBoundary from './components/common/ErrorBoundary';

// Pages
import DashboardPage from './pages/DashboardPage';
import AssistantPage from './pages/AssistantPage';
import DiscoverPage from './pages/DiscoverPage';
import ComparePage from './pages/ComparePage';
import IntelligencePage from './pages/IntelligencePage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import PassportPage from './pages/PassportPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="assistant" element={<AssistantPage />} />
              <Route path="discover" element={<DiscoverPage />} />
              <Route path="compare" element={<ComparePage />} />
              <Route path="intelligence" element={<IntelligencePage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="passport" element={<PassportPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
