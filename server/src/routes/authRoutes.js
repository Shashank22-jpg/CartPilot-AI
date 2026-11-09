import { Router } from 'express';
import { supabaseAdmin, isSupabaseConfigured } from '../config/supabase.js';

const router = Router();

/**
 * POST /api/auth/register
 * Real Supabase Auth registration with immediate profile persistence.
 * Postpones email OTP verification by marking email_confirm: true on creation.
 */
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    // 1. Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Full name is required and must be at least 2 characters.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'A valid email address is required.',
      });
    }

    if (!phone || typeof phone !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required.',
      });
    }
    const cleanPhoneDigits = phone.replace(/[^0-9]/g, '');
    if (cleanPhoneDigits.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Phone number must contain at least 10 digits.',
      });
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 8 characters long.',
      });
    }

    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return res.status(500).json({
        success: false,
        error: 'Supabase server configuration is unavailable.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();
    const formattedPhone = phone.trim().startsWith('+') ? phone.trim() : `+${cleanPhoneDigits}`;

    // 2. Create user in Supabase Auth (with email_confirm: true to postpone OTP email verification)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: cleanEmail,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: cleanName,
        phone: formattedPhone,
      },
    });

    if (authError) {
      console.warn('[Auth API] Supabase createUser error:', authError.message);
      const isDuplicate =
        authError.message?.toLowerCase().includes('already') ||
        authError.message?.toLowerCase().includes('exists');

      return res.status(isDuplicate ? 409 : 400).json({
        success: false,
        error: isDuplicate
          ? 'A user with this email address has already been registered.'
          : authError.message,
      });
    }

    const newUser = authData.user;

    // 3. Persist Full Name and Phone Number into public.profiles
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: newUser.id,
        email: cleanEmail,
        full_name: cleanName,
        phone: formattedPhone,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (profileError) {
      console.warn('[Auth API] Profile sync warning:', profileError.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Account created successfully in Supabase.',
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: cleanName,
        phone: formattedPhone,
      },
      profile: profileData,
    });
  } catch (err) {
    console.error('[Auth API] Unexpected register error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'An unexpected error occurred during registration.',
    });
  }
});

/**
 * GET /api/auth/profile/:userId
 * Retrieves user profile record from Supabase public.profiles
 */
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return res.status(500).json({ success: false, error: 'Database unconfigured.' });
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ success: false, error: 'Profile not found.' });
    }

    return res.status(200).json({ success: true, profile: data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
