import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Lock,
  Camera,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowLeft,
  DollarSign,
  Sliders,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { supabase, isSupabaseConfigured } from '../services/supabase';

/**
 * EditProfilePage - User Profile Management
 * Follows Hybrid Design System (Emporium Light Shopping):
 * - Clean white cards, subtle borders, emerald accents
 * - Dark forest ink typography
 * - Standardized on USD ($) base currency and PayPal Sandbox delivery destinations
 */
export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user, userProfile, profileLoading, updateProfile, showToast } = useApp();

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');

  // Location / Shipping Address
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');

  // Budget & Preferences
  const [monthlyBudgetLimit, setMonthlyBudgetLimit] = useState(3000);
  const [alertThresholdPercent, setAlertThresholdPercent] = useState(80);
  const [currency, setCurrency] = useState('USD');
  const [priority, setPriority] = useState('Durability & Specs Verification');

  // UI States
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);
  const [storageNotice, setStorageNotice] = useState(null);

  // Sync form with user and userProfile
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setFullName(userProfile?.full_name || user.user_metadata?.full_name || '');
      setPhone(userProfile?.phone || user.user_metadata?.phone || '');
      setAvatarUrl(userProfile?.avatar_url || '');

      const shipping = userProfile?.shipping_address || {};
      setStreet(shipping.street || '2211 North First Street');
      setCity(shipping.city || 'San Jose');
      setState(shipping.state || 'CA');
      setPostalCode(shipping.postalCode || '95131');
      setCountry(shipping.country || 'United States');

      const prefs = userProfile?.shopping_preferences || {};
      setBio(prefs.bio || '');
      setPriority(prefs.priority || 'Durability & Specs Verification');

      if (userProfile?.monthly_budget_limit) {
        setMonthlyBudgetLimit(Number(userProfile.monthly_budget_limit));
      }
      if (userProfile?.alert_threshold_percent) {
        setAlertThresholdPercent(Number(userProfile.alert_threshold_percent));
      }
      if (userProfile?.currency) {
        setCurrency(userProfile.currency);
      }
    }
  }, [user, userProfile]);

  // Handle local avatar file selection
  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormErrors((prev) => ({
        ...prev,
        avatar: 'Please select a valid image file (PNG, JPG, WebP).',
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setFormErrors((prev) => ({
        ...prev,
        avatar: 'Image size must be under 2MB.',
      }));
      return;
    }

    setFormErrors((prev) => ({ ...prev, avatar: null }));

    try {
      if (isSupabaseConfigured() && user?.id) {
        const fileExt = file.name.split('.').pop();
        const filePath = `avatars/${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file, { upsert: true });

        if (!uploadError) {
          const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
          if (data?.publicUrl) {
            setAvatarUrl(data.publicUrl);
            showToast('Avatar uploaded successfully!', 'success');
            return;
          }
        }
      }
    } catch (err) {
      console.warn('[Avatar upload note]:', err.message);
    }

    // Fallback: Read as Base64 Data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarUrl(event.target.result);
      showToast('Profile photo staged locally.', 'info');
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const errors = {};
    if (!fullName.trim()) {
      errors.fullName = 'Full name is required.';
    } else if (fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters.';
    }

    if (phone.trim() && !/^\+?[0-9\s\-()]{7,20}$/.test(phone.trim())) {
      errors.phone = 'Please enter a valid phone number format.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    setStatusMessage(null);

    try {
      const payload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        avatarUrl: avatarUrl.trim(),
        shippingAddress: {
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          postalCode: postalCode.trim(),
          country: country.trim(),
        },
        shoppingPreferences: {
          bio: bio.trim(),
          priority,
        },
        monthlyBudgetLimit: Number(monthlyBudgetLimit) || 3000,
        alertThresholdPercent: Number(alertThresholdPercent) || 80,
        currency,
      };

      await updateProfile(payload);
      setStatusMessage({
        type: 'success',
        text: 'Your profile has been saved successfully to Supabase.',
      });
      setTimeout(() => {
        setStatusMessage(null);
      }, 5000);
    } catch (err) {
      console.error('[EditProfilePage] Save failed:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to update profile. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const userInitials = (
    fullName ||
    userProfile?.full_name ||
    user?.email ||
    'CP'
  )
    .replace(/[^a-zA-Z]/g, '')
    .slice(0, 2)
    .toUpperCase() || 'CP';

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Active Member';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-emp-surface-line pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-emp-ink-muted mb-1">
            <Link to="/dashboard" className="hover:text-emp-brand transition-colors flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span>/</span>
            <span className="text-emp-ink font-semibold">Edit Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-emp-ink tracking-tight font-display flex items-center space-x-2.5">
            <User className="w-6 h-6 text-emp-brand" />
            <span>Profile Management</span>
          </h1>
          <p className="text-sm text-emp-ink-secondary mt-1">
            Manage your personal identity, contact details, delivery addresses, and AI preferences.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="btn-emp btn-emp-secondary py-2.5 px-4 text-xs font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            disabled={isSaving || profileLoading}
            className="btn-emp btn-emp-primary py-2.5 px-5 text-xs font-bold inline-flex items-center space-x-1.5 shadow-emp-sm disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Alert Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-emp border text-xs flex items-start space-x-3 transition-all ${
            statusMessage.type === 'success'
              ? 'bg-emp-brand-50 border-emp-brand-100 text-emp-brand'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emp-brand flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-bold">{statusMessage.type === 'success' ? 'Profile Updated' : 'Update Notice'}</p>
            <p className="text-[11px] mt-0.5">{statusMessage.text}</p>
          </div>
        </div>
      )}

      {/* Main Edit Profile Form */}
      <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Section 1: User Identity & Avatar */}
        <div className="p-6 rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar Preview */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-emp bg-emp-surface-tint border border-emp-surface-line p-1 shadow-emp-sm">
                <div className="w-full h-full rounded-emp-sm bg-emp-surface-soft overflow-hidden flex items-center justify-center">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={fullName || 'User Avatar'}
                      className="w-full h-full object-cover"
                      onError={() => setAvatarUrl('')}
                    />
                  ) : (
                    <span className="text-2xl font-black text-emp-brand font-display">{userInitials}</span>
                  )}
                </div>
              </div>

              {/* Upload Overlay Button */}
              <label
                htmlFor="avatar-file-input"
                className="absolute inset-0 rounded-emp bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-[10px] font-bold space-y-1"
                title="Change Profile Photo"
              >
                <Camera className="w-5 h-5" />
                <span>Upload</span>
              </label>
              <input
                id="avatar-file-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarFileChange}
                className="hidden"
              />
            </div>

            {/* Profile Header Details */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-base sm:text-lg font-bold text-emp-ink font-display">
                  {fullName || 'Authenticated User'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-pill bg-emp-brand-50 border border-emp-brand-100 text-emp-brand font-mono text-[10px] font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Buyer</span>
                </span>
              </div>

              <p className="text-xs text-emp-ink-secondary font-mono flex items-center justify-center sm:justify-start space-x-2">
                <span>{email}</span>
                <span>•</span>
                <span className="flex items-center space-x-1 text-emp-ink-muted">
                  <Calendar className="w-3 h-3" />
                  <span>Member since {memberSince}</span>
                </span>
              </p>

              {/* Direct Avatar URL Input */}
              <div className="pt-2">
                <label className="text-[11px] font-bold text-emp-ink block mb-1 font-display">
                  Or provide image URL directly:
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full sm:max-w-md bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3 py-1.5 text-xs text-emp-ink placeholder:text-emp-ink-muted focus:outline-none shadow-emp-sm transition-colors"
                />
                {formErrors.avatar && (
                  <p className="text-[11px] text-rose-600 font-medium mt-1">{formErrors.avatar}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Personal & Contact Information */}
        <div className="p-6 rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-4">
          <h3 className="text-sm font-bold text-emp-ink font-display flex items-center space-x-2 pb-2 border-b border-emp-surface-line">
            <User className="w-4 h-4 text-emp-brand" />
            <span>Personal & Contact Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="field-fullName" className="block text-xs font-bold text-emp-ink font-display">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emp-ink-muted w-4 h-4 pointer-events-none" />
                <input
                  id="field-fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (formErrors.fullName) setFormErrors((prev) => ({ ...prev, fullName: null }));
                  }}
                  placeholder="Enter your full legal name"
                  className={`w-full bg-white border rounded-emp pl-10 pr-3.5 py-2.5 text-xs text-emp-ink placeholder:text-emp-ink-muted focus:outline-none shadow-emp-sm transition-colors ${
                    formErrors.fullName ? 'border-rose-500' : 'border-emp-surface-line focus:border-emp-brand'
                  }`}
                />
              </div>
              {formErrors.fullName && (
                <p className="text-[11px] text-rose-600 font-medium pl-1">{formErrors.fullName}</p>
              )}
            </div>

            {/* Email Address (Read-only) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="field-email" className="block text-xs font-bold text-emp-ink font-display">
                  Email Address
                </label>
                <span className="text-[10px] text-emp-ink-muted flex items-center space-x-1">
                  <Lock className="w-2.5 h-2.5" />
                  <span>Managed by Supabase Auth</span>
                </span>
              </div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emp-ink-muted w-4 h-4 pointer-events-none" />
                <input
                  id="field-email"
                  type="email"
                  value={email}
                  readOnly
                  disabled
                  className="w-full bg-emp-surface-tint border border-emp-surface-line rounded-emp pl-10 pr-3.5 py-2.5 text-xs text-emp-ink-muted cursor-not-allowed select-all font-mono"
                />
              </div>
              <p className="text-[11px] text-emp-ink-muted pl-1">
                Primary identifier for order confirmations and hardware passport attestation.
              </p>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label htmlFor="field-phone" className="block text-xs font-bold text-emp-ink font-display">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emp-ink-muted w-4 h-4 pointer-events-none" />
                <input
                  id="field-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (formErrors.phone) setFormErrors((prev) => ({ ...prev, phone: null }));
                  }}
                  placeholder="+1 408 555 0199"
                  className={`w-full bg-white border rounded-emp pl-10 pr-3.5 py-2.5 text-xs text-emp-ink placeholder:text-emp-ink-muted focus:outline-none shadow-emp-sm transition-colors ${
                    formErrors.phone ? 'border-rose-500' : 'border-emp-surface-line focus:border-emp-brand'
                  }`}
                />
              </div>
              {formErrors.phone && (
                <p className="text-[11px] text-rose-600 font-medium pl-1">{formErrors.phone}</p>
              )}
            </div>

            {/* User ID / Identity Token */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-emp-ink font-display">
                Authenticated User ID
              </label>
              <div className="px-3.5 py-2.5 rounded-emp bg-emp-surface-tint border border-emp-surface-line text-xs font-mono text-emp-ink-secondary truncate select-all">
                {user?.id || 'Anonymous Session'}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Shipping & Delivery Address */}
        <div className="p-6 rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-emp-surface-line">
            <h3 className="text-sm font-bold text-emp-ink font-display flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-emp-brand" />
              <span>Default Shipping Address</span>
            </h3>
            <span className="text-[11px] text-emp-ink-muted">Used for PayPal Sandbox transit verification</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-emp-ink font-display">Street Address</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="2211 North First Street"
                className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink placeholder:text-emp-ink-muted focus:outline-none shadow-emp-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-emp-ink font-display">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="San Jose"
                className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink placeholder:text-emp-ink-muted focus:outline-none shadow-emp-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-emp-ink font-display">State / Region</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="CA"
                className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink placeholder:text-emp-ink-muted focus:outline-none shadow-emp-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-emp-ink font-display">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="95131"
                className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink placeholder:text-emp-ink-muted focus:outline-none shadow-emp-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-emp-ink font-display">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="United States"
                className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink placeholder:text-emp-ink-muted focus:outline-none shadow-emp-sm transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Profile Description & Agent Preferences */}
        <div className="p-6 rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-4">
          <h3 className="text-sm font-bold text-emp-ink font-display flex items-center space-x-2 pb-2 border-b border-emp-surface-line">
            <FileText className="w-4 h-4 text-emp-brand" />
            <span>Profile Description & AI Shopping Alignment</span>
          </h3>

          <div className="space-y-4">
            {/* Bio / Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-emp-ink font-display">
                Profile Description / Shopping Focus
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Describe your tech interests, hardware requirements, or buying preferences to tune AI agent recommendations..."
                className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp p-3 text-xs text-emp-ink placeholder:text-emp-ink-muted focus:outline-none shadow-emp-sm transition-colors resize-none"
              />
            </div>

            {/* Shopping Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-emp-ink font-display">
                  Primary Shopping Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink focus:outline-none shadow-emp-sm transition-colors"
                >
                  <option value="Durability & Specs Verification">Durability & Specs Verification</option>
                  <option value="Price & Maximum Savings">Price & Maximum Savings</option>
                  <option value="Performance & Flagship Tech">Performance & Flagship Tech</option>
                  <option value="Balanced Everyday Value">Balanced Everyday Value</option>
                </select>
              </div>

              {/* Currency Preference */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-emp-ink font-display">
                  Preferred Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink focus:outline-none shadow-emp-sm transition-colors"
                >
                  <option value="USD">USD ($) — United States Dollar (Aptdot Native Base)</option>
                </select>
              </div>

              {/* Monthly Budget Cap */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-emp-ink font-display">
                  Monthly Budget Limit ({currency})
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={monthlyBudgetLimit}
                  onChange={(e) => setMonthlyBudgetLimit(e.target.value)}
                  className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink focus:outline-none shadow-emp-sm transition-colors font-mono"
                />
              </div>

              {/* Alert Threshold */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-emp-ink font-display">
                    Budget Warning Threshold
                  </label>
                  <span className="font-mono font-bold text-amber-700 text-xs">
                    {alertThresholdPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={alertThresholdPercent}
                  onChange={(e) => setAlertThresholdPercent(e.target.value)}
                  className="w-full accent-emp-brand cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="btn-emp btn-emp-secondary py-2.5 px-4 text-xs font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving || profileLoading}
            className="btn-emp btn-emp-primary py-2.5 px-6 text-xs font-bold inline-flex items-center space-x-2 shadow-emp-sm disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Saving to Supabase...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}