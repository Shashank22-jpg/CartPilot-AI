import { Router } from 'express';
import { supabaseAdmin, isSupabaseConfigured } from '../config/supabase.js';
import { requireAuth, optionalAuth } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * POST /api/auth/register
 * Real Supabase Auth registration with immediate profile persistence.
 * Creates user in Supabase auth.users and public.profiles.
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

    // 2. Create user in Supabase Auth (with email_confirm: true to support direct session)
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
        shopping_preferences: {
          priority: 'Durability & Specs Verification',
          riskThreshold: 'Strict',
          bio: '',
        },
        shipping_address: {
          street: '',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560038',
          country: 'IN',
        },
        monthly_budget_limit: 250000.00,
        alert_threshold_percent: 80,
        currency: 'INR',
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
 * GET /api/auth/me
 * Retrieves authenticated user's own profile using verified JWT
 */
router.get('/me', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ success: false, error: 'Profile not found.' });
    }

    return res.status(200).json({ success: true, user: req.user, profile: data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/auth/profile/:userId
 * Retrieves user profile record with ownership verification
 */
router.get('/profile/:userId', requireAuth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Security check: Only allow users to view their own profile
    if (req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: You cannot access another user\'s profile.',
        code: 'FORBIDDEN',
      });
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

    return res.status(200).json({ success: true, user: req.user, profile: data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PUT /api/auth/profile/:userId
 * Updates user profile with verified JWT authentication and ownership check
 */
router.put('/profile/:userId', requireAuth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Security check: Prevent users from editing another user's profile
    if (req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: You cannot modify another user\'s profile.',
        code: 'FORBIDDEN',
      });
    }

    const {
      fullName,
      phone,
      avatarUrl,
      bio,
      location,
      shippingAddress,
      monthlyBudgetLimit,
      alertThresholdPercent,
      currency,
      shoppingPreferences,
    } = req.body;

    const updates = {
      updated_at: new Date().toISOString(),
    };

    if (fullName !== undefined) {
      if (typeof fullName !== 'string' || fullName.trim().length < 2) {
        return res.status(400).json({ success: false, error: 'Full name must be at least 2 characters.' });
      }
      updates.full_name = fullName.trim();
    }

    if (phone !== undefined) updates.phone = String(phone).trim();
    if (avatarUrl !== undefined) updates.avatar_url = avatarUrl;
    if (currency !== undefined) updates.currency = currency;

    if (monthlyBudgetLimit !== undefined && !isNaN(Number(monthlyBudgetLimit))) {
      updates.monthly_budget_limit = Math.max(0, Number(monthlyBudgetLimit));
    }
    if (alertThresholdPercent !== undefined && !isNaN(Number(alertThresholdPercent))) {
      updates.alert_threshold_percent = Math.min(100, Math.max(10, Number(alertThresholdPercent)));
    }

    // Handle structured shipping_address & location
    if (shippingAddress !== undefined) {
      updates.shipping_address = shippingAddress;
    } else if (location !== undefined) {
      // Merge location string into city/state/country if provided
      const existingProfile = await supabaseAdmin.from('profiles').select('shipping_address').eq('id', userId).maybeSingle();
      const currentAddress = existingProfile?.data?.shipping_address || {};
      updates.shipping_address = {
        ...currentAddress,
        city: location.city || currentAddress.city || location,
        state: location.state || currentAddress.state || '',
        country: location.country || currentAddress.country || 'IN',
      };
    }

    // Handle shopping_preferences & bio
    if (shoppingPreferences !== undefined || bio !== undefined) {
      const existingProfile = await supabaseAdmin.from('profiles').select('shopping_preferences').eq('id', userId).maybeSingle();
      const currentPrefs = existingProfile?.data?.shopping_preferences || {};
      updates.shopping_preferences = {
        ...currentPrefs,
        ...(shoppingPreferences || {}),
        ...(bio !== undefined ? { bio: String(bio).trim() } : {}),
      };
    }

    const { data: updatedData, error: updateError } = await supabaseAdmin
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .maybeSingle();

    if (updateError) {
      console.warn('[Auth API] Profile update error:', updateError.message);
      throw updateError;
    }

    if (!updatedData) {
      // Upsert if not yet existing
      const { data: upsertData, error: upsertError } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: userId,
          email: req.user.email,
          ...updates,
        })
        .select()
        .single();

      if (upsertError) throw upsertError;
      return res.status(200).json({
        success: true,
        message: 'Profile created and updated successfully.',
        profile: upsertData,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      profile: updatedData,
    });
  } catch (err) {
    console.error('[Auth API] Profile update error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to update user profile.',
    });
  }
});

export default router;
