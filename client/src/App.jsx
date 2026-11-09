import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Dashboard & App Pages
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
            {/* Public Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected SaaS Application Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="assistant" element={<AssistantPage />} />
              <Route path="discover" element={<DiscoverPage />} />
              <Route path="compare" element={<ComparePage />} />
              <Route path="intelligence" element={<IntelligencePage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CartPage />} />
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
