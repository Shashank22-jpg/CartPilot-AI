import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseClient = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    console.log('[Supabase Client] Browser client initialized successfully.');
  } catch (err) {
    console.warn('[Supabase Client] Failed to initialize browser client:', err.message);
  }
}

export const supabase = supabaseClient;
export const isSupabaseConfigured = () => Boolean(supabaseClient);

/**
 * Authentication Helper Functions
 */
export async function signUpWithEmail(email, password, fullName = '') {
  if (!supabaseClient) throw new Error('Supabase is not configured.');
  return supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
}

export async function signInWithEmail(email, password) {
  if (!supabaseClient) throw new Error('Supabase is not configured.');
  return supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  if (!supabaseClient) return;
  return supabaseClient.auth.signOut();
}

export async function getCurrentSession() {
  if (!supabaseClient) return null;
  const { data } = await supabaseClient.auth.getSession();
  return data.session;
}

export function onAuthStateChange(callback) {
  if (!supabaseClient) return { data: { subscription: { unsubscribe: () => {} } } };
  return supabaseClient.auth.onAuthStateChange(callback);
}

export default {
  supabase,
  isSupabaseConfigured,
  signUpWithEmail,
  signInWithEmail,
  signOut,
  getCurrentSession,
  onAuthStateChange,
};
