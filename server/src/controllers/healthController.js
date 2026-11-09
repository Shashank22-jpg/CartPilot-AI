import config from '../config/env.js';
import { isPayPalConfigured } from '../config/paypal.js';
import { isSupabaseConfigured } from '../config/supabase.js';
import { isGeminiConfigured } from '../config/gemini.js';

export function getHealth(req, res) {
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
      supabase: isSupabaseConfigured(),
      gemini: isGeminiConfigured(),
    },
  };

  res.status(200).json(healthData);
}

export default {
  getHealth,
};
