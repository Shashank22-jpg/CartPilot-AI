import config from '../config/env.js';
import { isPayPalConfigured } from '../config/paypal.js';
import { isSupabaseConfigured, testSupabaseConnection } from '../config/supabase.js';
import { isGeminiConfigured } from '../config/gemini.js';

export async function getHealth(req, res) {
  const dbHealth = await testSupabaseConnection();

  const healthData = {
    status: 'ok',
    service: 'CartPilot AI API',
    version: '1.0.0',
    environment: config.nodeEnv,
    nodeVersion: process.version,
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString(),
    integrations: {
      paypal: isPayPalConfigured(),
      supabase: dbHealth.connected,
      gemini: isGeminiConfigured(),
    },
    database: dbHealth,
  };

  res.status(200).json(healthData);
}

export async function getDbHealth(req, res) {
  const dbHealth = await testSupabaseConnection();
  const statusCode = dbHealth.connected ? 200 : (dbHealth.status === 'pending_configuration' ? 200 : 503);
  res.status(statusCode).json(dbHealth);
}

export default {
  getHealth,
  getDbHealth,
};
