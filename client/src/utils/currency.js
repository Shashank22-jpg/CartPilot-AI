/**
 * CartPilot AI - Currency & Financial Formatting System
 * Uses Intl.NumberFormat for standards-compliant locale and currency formatting.
 * Base currency for all internal calculations is INR (Indian Rupee).
 */

export const SUPPORTED_CURRENCIES = {
  INR: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
    name: 'Indian Rupee',
    rateFromINR: 1.0,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
    name: 'US Dollar',
    rateFromINR: 0.012,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    locale: 'de-DE',
    name: 'Euro',
    rateFromINR: 0.011,
  },
};

export const DEFAULT_CURRENCY = 'INR';

/**
 * Format an amount in the designated currency using Intl.NumberFormat.
 * @param {number} amount - Numeric amount in base currency (INR)
 * @param {string} currencyCode - ISO currency code ('INR', 'USD', etc.)
 * @param {Intl.NumberFormatOptions} [options] - Optional overrides for Intl.NumberFormat
 * @returns {string} Formatted currency string (e.g. "₹28,990" or "₹28,990.00")
 */
export function formatCurrency(amount, currencyCode = DEFAULT_CURRENCY, options = {}) {
  const numericVal = typeof amount === 'number' && !Number.isNaN(amount) ? amount : 0;
  const config = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES[DEFAULT_CURRENCY];

  // Convert if target currency differs from base (INR)
  const convertedAmount = currencyCode === 'INR' ? numericVal : numericVal * (config.rateFromINR || 1);

  // Standard Indian numbering (lakhs/crores) formatted via en-IN
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(convertedAmount);
}

/**
 * Format currency with 2 decimal places (standard for totals, tax, receipts)
 */
export function formatCurrencyWithDecimals(amount, currencyCode = DEFAULT_CURRENCY) {
  return formatCurrency(amount, currencyCode, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default {
  formatCurrency,
  formatCurrencyWithDecimals,
  SUPPORTED_CURRENCIES,
  DEFAULT_CURRENCY,
};
