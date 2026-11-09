import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  '';

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
export async function signUpWithEmail(email, password, metadata = {}) {
  if (!supabaseClient) throw new Error('Supabase is not configured.');
  const userMetadata =
    typeof metadata === 'string'
      ? { full_name: metadata }
      : {
          full_name: metadata.fullName || metadata.full_name || '',
          phone: metadata.phone || '',
          ...metadata,
        };

  return supabaseClient.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: userMetadata,
    },
  });
}

export async function signInWithEmail(email, password) {
  if (!supabaseClient) throw new Error('Supabase is not configured.');
  return supabaseClient.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
}

export async function signInWithEmailOrPhone(identifier, password) {
  if (!supabaseClient) throw new Error('Supabase is not configured.');
  const trimmed = identifier.trim();
  const isEmail = trimmed.includes('@');

  if (isEmail) {
    return supabaseClient.auth.signInWithPassword({
      email: trimmed.toLowerCase(),
      password,
    });
  } else {
    const cleanPhone = trimmed.startsWith('+') ? trimmed : `+${trimmed.replace(/[^0-9]/g, '')}`;
    return supabaseClient.auth.signInWithPassword({
      phone: cleanPhone,
      password,
    });
  }
}

export async function resetPasswordForEmail(email) {
  if (!supabaseClient) throw new Error('Supabase is not configured.');
  return supabaseClient.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: `${window.location.origin}/login`,
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

/**
 * Fetch products directly from Supabase via browser client (RLS Public Read)
 */
export async function fetchProductsFromSupabase(filters = {}) {
  if (!supabaseClient) return null;

  const {
    category,
    search,
    minPrice,
    maxPrice,
    limit = 50,
    offset = 0,
  } = filters;

  let query = supabaseClient
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false });

  if (category && category !== 'All') {
    query = query.eq('category', category);
  }

  if (minPrice !== undefined && minPrice !== '' && !isNaN(Number(minPrice))) {
    query = query.gte('price', Number(minPrice));
  }

  if (maxPrice !== undefined && maxPrice !== '' && !isNaN(Number(maxPrice))) {
    query = query.lte('price', Number(maxPrice));
  }

  if (search && search.trim()) {
    const term = search.trim().replace(/[^a-zA-Z0-9\s-]/g, '').trim();
    if (term) {
      query = query.or(`title.ilike.%${term}%,brand.ilike.%${term}%,description.ilike.%${term}%`);
    }
  }

  const { data, error } = await query;
  if (error) {
    console.warn('[Supabase Client] fetchProductsFromSupabase error:', error.message);
    throw error;
  }
  return data;
}

export default {
  supabase,
  isSupabaseConfigured,
  signUpWithEmail,
  signInWithEmail,
  signInWithEmailOrPhone,
  resetPasswordForEmail,
  signOut,
  getCurrentSession,
  onAuthStateChange,
  fetchProductsFromSupabase,
};
