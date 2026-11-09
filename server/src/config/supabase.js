import { createClient } from '@supabase/supabase-js';
import config from './env.js';

let supabaseClient = null;
let supabaseAdminClient = null;

const supabaseUrl = config.supabase.url;
const supabaseAnonKey = config.supabase.anonKey;
const supabaseServiceKey = config.supabase.serviceRoleKey;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    console.log('[Supabase] Public client initialized successfully.');
  } catch (error) {
    console.warn('[Supabase] Public client initialization warning:', error.message);
  }
}

if (supabaseUrl && supabaseServiceKey) {
  try {
    supabaseAdminClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    console.log('[Supabase] Admin service_role client initialized successfully.');
  } catch (error) {
    console.warn('[Supabase] Admin client initialization warning:', error.message);
  }
} else if (supabaseClient) {
  // Fallback to anon client if service role key is not yet set
  supabaseAdminClient = supabaseClient;
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('[Supabase] URL or Anon Key not configured in .env. Running in demonstration fallback mode.');
}

/**
 * Live test of Supabase connection by executing a lightweight HEAD count query
 */
export async function testSupabaseConnection() {
  if (!supabaseClient) {
    return {
      connected: false,
      status: 'pending_configuration',
      message: 'Supabase URL or Anon Key not provided in server/.env',
    };
  }

  const startTime = Date.now();
  try {
    const { count, error } = await supabaseClient
      .from('products')
      .select('*', { count: 'exact', head: true });

    const latencyMs = Date.now() - startTime;

    if (error) {
      // If table doesn't exist yet, it's connected to database but schema needs running
      if (error.code === '42P01') {
        return {
          connected: true,
          status: 'schema_pending',
          message: 'Connected to Supabase, but "products" table not found. Please execute server/supabase/schema.sql in Supabase SQL Editor.',
          latencyMs,
          error: error.message,
        };
      }
      return {
        connected: false,
        status: 'query_error',
        message: error.message,
        code: error.code,
        latencyMs,
      };
    }

    return {
      connected: true,
      status: 'operational',
      message: 'Successfully connected to Supabase PostgreSQL.',
      productsCount: count,
      latencyMs,
    };
  } catch (err) {
    return {
      connected: false,
      status: 'network_error',
      message: err.message,
      latencyMs: Date.now() - startTime,
    };
  }
}

export const supabase = supabaseClient;
export const supabaseAdmin = supabaseAdminClient;
export const isSupabaseConfigured = () => Boolean(supabaseClient);

export default {
  supabase,
  supabaseAdmin,
  isSupabaseConfigured,
  testSupabaseConnection,
};
