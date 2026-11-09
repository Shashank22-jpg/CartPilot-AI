const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Common fetch wrapper with error handling
 */
async function fetchJson(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = data?.message || data?.error || `HTTP error ${response.status}: ${response.statusText}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`API Request Failed [${options.method || 'GET'} ${url}]:`, error);
    throw error;
  }
}

export const apiService = {
  /**
   * Check backend server & integration health status
   */
  async checkHealth() {
    return fetchJson('/api/health');
  },

  /**
   * Check live database connection status
   */
  async checkDbHealth() {
    return fetchJson('/api/health/db');
  },

  /**
   * Retrieve products from API (Supabase or seed fallback)
   */
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.set('category', params.category);
    if (params.search) query.set('search', params.search);
    if (params.minPrice) query.set('minPrice', params.minPrice);
    if (params.maxPrice) query.set('maxPrice', params.maxPrice);

    const qs = query.toString() ? `?${query.toString()}` : '';
    return fetchJson(`/api/products${qs}`);
  },

  /**
   * Retrieve single product
   */
  async getProduct(idOrSlug) {
    return fetchJson(`/api/products/${idOrSlug}`);
  },

  /**
   * Retrieve user order history
   */
  async getOrders() {
    return fetchJson('/api/orders');
  },

  /**
   * Retrieve digital purchase passports
   */
  async getPassports() {
    return fetchJson('/api/orders/passports');
  },

  /**
   * Communicate with Gemini-powered AI Shopping Agent
   */
  async chatWithAi(message, history = [], context = {}) {
    return fetchJson('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history, context }),
    });
  },

  /**
   * Retrieve AI starter prompt suggestions
   */
  async getAiPrompts() {
    return fetchJson('/api/ai/prompts');
  },

  /**
   * Retrieve PayPal public configuration
   */
  async getPaymentConfig() {
    return fetchJson('/api/payments/config');
  },

  /**
   * Create server-verified PayPal order
   */
  async createPayPalOrder(payload) {
    return fetchJson('/api/payments/create-order', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Capture and verify PayPal payment on server
   */
  async capturePayPalOrder(payload) {
    return fetchJson('/api/payments/capture-order', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Retrieve order and payment status
   */
  async getOrderDetails(orderId) {
    return fetchJson(`/api/payments/order/${orderId}`);
  },

  /**
   * Register new account with Supabase Auth and save profile
   */
  async registerUser(payload) {
    return fetchJson('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Retrieve user profile from Supabase
   */
  async getUserProfile(userId) {
    return fetchJson(`/api/auth/profile/${userId}`);
  },
};

export default apiService;
