import { createClient } from '@supabase/supabase-js';
import config from './env.js';

let supabaseClient = null;

if (config.supabase.url && config.supabase.anonKey) {
  try {
    supabaseClient = createClient(config.supabase.url, config.supabase.anonKey, {
      auth: {
        persistSession: false,
      },
    });
    console.log('[Supabase] Client initialized successfully.');
  } catch (error) {
    console.warn('[Supabase] Initialization warning:', error.message);
  }
} else {
  console.log('[Supabase] Keys not provided in environment. Supabase integration pending configuration.');
}

export const supabase = supabaseClient;
export const isSupabaseConfigured = () => Boolean(supabaseClient);
export default supabase;
