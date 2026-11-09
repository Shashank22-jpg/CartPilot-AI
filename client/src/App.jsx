import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import apiService from './services/api';

export default function App() {
  const [backendHealth, setBackendHealth] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchHealth = useCallback(async () => {
    setIsRefreshing(true);
    const startTime = performance.now();
    try {
      const data = await apiService.checkHealth();
      const endTime = performance.now();
      const latencyMs = Math.round(endTime - startTime);
      setBackendHealth({
        ...data,
        _clientLatencyMs: latencyMs,
      });
      setError(null);
    } catch (err) {
      console.error('Failed to connect to backend:', err);
      setBackendHealth({
        status: 'error',
        message: err.message,
      });
      setError(err.message);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  return (
    <div className="min-h-screen flex flex-col bg-[#080d1a] text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar backendHealth={backendHealth} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <HomePage 
          backendHealth={backendHealth} 
          onRefreshHealth={fetchHealth} 
          isRefreshing={isRefreshing} 
        />
      </main>
      <Footer />
    </div>
  );
}
