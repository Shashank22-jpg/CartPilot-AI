import { supabaseAdmin, isSupabaseConfigured } from '../config/supabase.js';

/**
 * Authentication Middleware
 * Validates Supabase JWT from the Authorization header (Bearer token)
 * and attaches the verified user record to req.user.
 */
export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Missing Bearer token in Authorization header.',
        code: 'UNAUTHORIZED',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Token is empty.',
        code: 'UNAUTHORIZED',
      });
    }

    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return res.status(500).json({
        success: false,
        error: 'Supabase authentication service is unavailable.',
      });
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid, expired, or revoked authentication session. Please sign in again.',
        code: 'SESSION_EXPIRED',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('[Auth Middleware] Verification error:', err.message);
    return res.status(401).json({
      success: false,
      error: 'Authentication verification failed.',
    });
  }
}

/**
 * Optional Authentication Middleware
 * If a valid Bearer token is provided, attaches user to req.user.
 * If no token is provided, execution proceeds with req.user = null.
 */
export async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (token && isSupabaseConfigured() && supabaseAdmin) {
        const { data: { user } } = await supabaseAdmin.auth.getUser(token);
        if (user) {
          req.user = user;
        }
      }
    }
  } catch (err) {
    console.warn('[OptionalAuth Middleware] Note:', err.message);
  }
  next();
}

export default {
  requireAuth,
  optionalAuth,
};
