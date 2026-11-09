/**
 * CartPilot AI - Currency & Financial Formatting System
 * Standardized on USD ($) for Aptdot unified catalogue and PayPal Sandbox processing.
 */

export const SUPPORTED_CURRENCIES = {
  USD: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
    name: 'US Dollar',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    locale: 'de-DE',
    name: 'Euro',
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
    name: 'Indian Rupee',
  },
};

export const DEFAULT_CURRENCY = 'USD';

/**
 * Format an amount in the designated currency using Intl.NumberFormat.
 * @param {number} amount - Numeric amount in designated currency
 * @param {string} currencyCode - ISO currency code ('USD', 'EUR', etc.)
 * @param {Intl.NumberFormatOptions} [options] - Overrides
 * @returns {string} Formatted currency string (e.g. "$89.00")
 */
export function formatCurrency(amount, currencyCode = DEFAULT_CURRENCY, options = {}) {
  const numericVal = typeof amount === 'number' && !Number.isNaN(amount) ? amount : 0;
  const config = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES[DEFAULT_CURRENCY];

  const defaultDecimals = Number.isInteger(numericVal) ? 0 : 2;

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: options.minimumFractionDigits !== undefined ? options.minimumFractionDigits : defaultDecimals,
    maximumFractionDigits: options.maximumFractionDigits !== undefined ? options.maximumFractionDigits : defaultDecimals,
    ...options,
  }).format(numericVal);
}

/**
 * Format product price based on product.currency and product.price (Default USD)
 */
export function formatProductPrice(product, options = {}) {
  if (!product) return '$0';
  const currency = product.currency || DEFAULT_CURRENCY;
  const price = typeof product.price === 'number' ? product.price : Number(product.price) || 0;
  return formatCurrency(price, currency, options);
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
  formatProductPrice,
  formatCurrencyWithDecimals,
  SUPPORTED_CURRENCIES,
  DEFAULT_CURRENCY,
};
