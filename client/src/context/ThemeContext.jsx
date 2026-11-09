import React, { createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const ThemeContext = createContext({
  isDarkAiRoute: false,
  theme: 'theme-light',
  zone: 'shopping',
});

/**
 * Route-aware Hybrid Theme Provider
 * - Storefront, Discover, Cart, Checkout, Orders, Passport, Settings: LIGHT SHOPPING (Emporium-inspired)
 * - AI Assistant, Purchase Intelligence: DARK WORKSPACE (Premium Navy)
 */
export function ThemeProvider({ children }) {
  const location = useLocation();

  const isDarkAiRoute = useMemo(() => {
    const darkPaths = ['/assistant', '/intelligence'];
    return darkPaths.some(path => location.pathname.startsWith(path));
  }, [location.pathname]);

  const value = useMemo(() => {
    return {
      isDarkAiRoute,
      theme: isDarkAiRoute ? 'theme-dark' : 'theme-light',
      zone: isDarkAiRoute ? 'ai-workspace' : 'shopping',
    };
  }, [isDarkAiRoute]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={value.theme} data-theme-zone={value.zone}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
