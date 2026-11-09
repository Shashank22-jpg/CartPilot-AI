import config from './env.js';

let cachedAccessToken = null;
let tokenExpiresAt = 0;

/**
 * Generate PayPal OAuth2 Access Token using Client Credentials flow
 */
export async function getPayPalAccessToken() {
  const { clientId, clientSecret, baseUrl } = config.paypal;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal Client ID and Secret must be configured in environment.');
  }

  // Return cached token if valid with 60-second buffer
  const now = Date.now();
  if (cachedAccessToken && tokenExpiresAt > now + 60000) {
    return cachedAccessToken;
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to obtain PayPal access token: ${response.status} ${errorData}`);
  }

  const data = await response.json();
  cachedAccessToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in * 1000);

  return cachedAccessToken;
}

export const isPayPalConfigured = () => Boolean(config.paypal.clientId && config.paypal.clientSecret);

export default {
  getPayPalAccessToken,
  isPayPalConfigured,
};
