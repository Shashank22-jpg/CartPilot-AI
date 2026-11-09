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
   * Check backend server health status
   */
  async checkHealth() {
    return fetchJson('/api/health');
  },
};

export default apiService;
