import React, { useState, useEffect } from 'react';
import {
  Settings,
  User,
  Sliders,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  LogOut,
  Bell,
  Lock,
  Download,
  Key,
  Info,
  Sparkles,
  Smartphone,
  Shield,
  FileText,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';
import apiService from '../services/api';
import { resetPasswordForEmail } from '../services/supabase';

/**
 * SettingsPage - Customer Account & Configuration
 * Emporium Light Shopping Architecture:
 * - Clean white cards, subtle borders, emerald accents
 * - Dark forest ink typography
 * - Standardized on USD ($) base currency
 * - Budget guardrails, shopping preferences, notifications, and security controls
 */
export default function SettingsPage() {
  const {
    budget,
    setBudget,
    preferences,
    setPreferences,
    showToast,
    user,
    userProfile,
    logout,
    orders,
    passports,
  } = useApp();

  // 1. Personal Profile State
  const [profile, setProfile] = useState({
    fullName: userProfile?.full_name || user?.user_metadata?.full_name || '',
    email: userProfile?.email || user?.email || '',
    phone: userProfile?.phone || user?.user_metadata?.phone || '',
    street: userProfile?.shipping_address?.street || '',
    city: userProfile?.shipping_address?.city || 'San Jose',
    state: userProfile?.shipping_address?.state || 'CA',
    postalCode: userProfile?.shipping_address?.postalCode || '95131',
    country: userProfile?.shipping_address?.country || 'United States',
  });

  // 2. Shopping Preferences State
  const [priority, setPriority] = useState(
    preferences?.priority?.includes('Durability')
      ? 'Durability'
      : preferences?.priority?.includes('Price') || preferences?.priority?.includes('Cost')
      ? 'Price'
      : 'Verified Specifications'
  );

  const [evidenceFilter, setEvidenceFilter] = useState(
    preferences?.riskThreshold?.includes('Strict') ? 'Strict' : 'Standard'
  );

  const [currency, setCurrency] = useState(budget.currency || 'USD');

  // Budget Sliders
  const [localBudget, setLocalBudget] = useState(budget.monthlyLimit || 3000);
  const [localThreshold, setLocalThreshold] = useState(budget.alertThresholdPercent || 80);

  // 3. Notification Preferences State
  const [notifications, setNotifications] = useState({
    returnDeadlines: true,
    warrantyExpirations: true,
    priceDropAlerts: true,
    smsWhatsApp: false,
  });

  // 4. Privacy & Security State
  const [aiTelemetry, setAiTelemetry] = useState(true);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Priority definitions with consumer-friendly descriptions
  const priorityDescriptions = {
    'Price': 'Focuses strictly on the lowest total cost, deals, and maximum discount opportunities.',
    'Durability': 'Prioritizes long-lasting build materials, repairability, and comprehensive warranties.',
    'Performance': 'Prioritizes top-tier benchmarks, processing speeds, and flagship hardware capabilities.',
    'Verified Specifications': 'Demands rigorous third-party hardware validation, lab reports, and independent testing.',
    'Balanced': 'Harmonizes price, verified quality, and manufacturer support for everyday smart shopping.',
  };

  const evidenceDescriptions = {
    'Standard': 'Evaluates manufacturer datasheets, verified vendor credentials, and standard commercial benchmarks.',
    'Strict': 'Requires independent third-party hardware test reports, verifiable certifications, and strict warranty audits.',
  };

  // Sync profile when user profile loads
  useEffect(() => {
    if (userProfile || user) {
      setProfile({
        fullName: userProfile?.full_name || user?.user_metadata?.full_name || '',
        email: userProfile?.email || user?.email || '',
        phone: userProfile?.phone || user?.user_metadata?.phone || '',
        street: userProfile?.shipping_address?.street || '',
        city: userProfile?.shipping_address?.city || 'San Jose',
        state: userProfile?.shipping_address?.state || 'CA',
        postalCode: userProfile?.shipping_address?.postalCode || '95131',
        country: userProfile?.shipping_address?.country || 'United States',
      });

      if (userProfile?.monthly_budget_limit) {
        setLocalBudget(Number(userProfile.monthly_budget_limit));
      }
      if (userProfile?.alert_threshold_percent) {
        setLocalThreshold(Number(userProfile.alert_threshold_percent));
      }
      if (userProfile?.currency) {
        setCurrency(userProfile.currency);
      }
      if (userProfile?.shopping_preferences) {
        const sp = userProfile.shopping_preferences;
        if (sp.priority) setPriority(sp.priority);
        if (sp.evidenceFilter) setEvidenceFilter(sp.evidenceFilter);
        if (sp.notifications) setNotifications((prev) => ({ ...prev, ...sp.notifications }));
        if (sp.aiTelemetry !== undefined) setAiTelemetry(sp.aiTelemetry);
      }
    }
  }, [user, userProfile]);

  // Handle Save Settings
  const handleSaveSettings = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsSaving(true);

    try {
      // 1. Update React Context state
      setBudget((prev) => ({
        ...prev,
        monthlyLimit: Number(localBudget),
        alertThresholdPercent: Number(localThreshold),
        currency,
      }));

      setPreferences((prev) => ({
        ...prev,
        priority,
        riskThreshold: evidenceFilter === 'Strict' ? 'Strict (Verified only)' : 'Standard',
      }));

      // 2. Persist to Supabase public.profiles if user is signed in
      if (user?.id) {
        await apiService.updateUserProfile(user.id, {
          fullName: profile.fullName,
          phone: profile.phone,
          shippingAddress: {
            street: profile.street,
            city: profile.city,
            state: profile.state,
            postalCode: profile.postalCode,
            country: profile.country,
          },
          monthlyBudgetLimit: Number(localBudget),
          alertThresholdPercent: Number(localThreshold),
          currency,
          shoppingPreferences: {
            priority,
            evidenceFilter,
            notifications,
            aiTelemetry,
          },
        });
      }

      showToast('Settings & Shopping Preferences saved successfully!', 'success');
    } catch (err) {
      console.error('[SettingsPage] Save error:', err);
      showToast('Preferences updated locally. (Database sync note: ' + err.message + ')', 'info');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Password Reset Link Dispatch
  const handlePasswordReset = async () => {
    const targetEmail = profile.email || user?.email;
    if (!targetEmail || !targetEmail.includes('@')) {
      showToast('Please provide a valid email address first.', 'warning');
      return;
    }

    setIsResettingPassword(true);
    try {
      const { error } = await resetPasswordForEmail(targetEmail);
      if (error) {
        if (error.message?.toLowerCase().includes('rate') || error.status === 429) {
          showToast('Supabase email limit reached. Please wait a few minutes before trying again.', 'warning');
        } else {
          showToast(error.message || 'Unable to dispatch password reset email.', 'warning');
        }
      } else {
        showToast(`Password recovery link dispatched to ${targetEmail}!`, 'success');
      }
    } catch (err) {
      showToast(err.message || 'Error sending password reset email.', 'warning');
    } finally {
      setIsResettingPassword(false);
    }
  };

  // Handle Export Purchase Ledger & Passports
  const handleExportData = () => {
    try {
      const exportData = {
        exportVersion: '1.0.0',
        exportedAt: new Date().toISOString(),
        customer: {
          uid: user?.id || 'demo-user-id',
          email: profile.email,
          fullName: profile.fullName,
          phone: profile.phone,
          shippingAddress: {
            street: profile.street,
            city: profile.city,
            state: profile.state,
            postalCode: profile.postalCode,
            country: profile.country,
          },
        },
        shoppingPreferences: {
          priority,
          evidenceFilter,
          currency,
          monthlyBudgetLimit: localBudget,
          alertThresholdPercent: localThreshold,
          aiTelemetry,
          notifications,
        },
        budgetStatus: {
          monthlyLimit: localBudget,
          spentThisMonth: budget.spentThisMonth,
          currency: budget.currency || 'USD',
        },
        orderCount: orders?.length || 0,
        orders: orders || [],
        passportCount: passports?.length || 0,
        purchasePassports: passports || [],
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `cartpilot-customer-ledger-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      showToast('Ledger export complete: Downloaded purchase history and digital passports.', 'success');
    } catch (err) {
      showToast('Export failed: ' + err.message, 'warning');
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-emp-surface-line">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-pill bg-emp-brand-50 text-emp-brand text-xs font-bold border border-emp-brand-100 flex items-center space-x-1.5">
              <Settings className="w-3.5 h-3.5" />
              <span>Customer Account & Configuration</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-emp-ink tracking-tight font-display mt-2">
            Settings & Shopping Preferences
          </h1>
          <p className="text-sm text-emp-ink-secondary mt-1">
            Manage your personal profile, shopping intelligence criteria, budget ceilings, notifications, and security.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="btn-emp btn-emp-primary py-3 px-5 text-xs font-bold inline-flex items-center space-x-2 self-start sm:self-auto cursor-pointer disabled:opacity-50 shadow-emp-sm"
        >
          <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* SECTION 1: PERSONAL PROFILE & DELIVERY ADDRESS */}
        <div className="p-6 rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-emp-surface-line">
            <div className="flex items-center space-x-2 text-sm font-bold text-emp-ink font-display">
              <User className="w-4 h-4 text-emp-brand" />
              <span>Personal Profile & Delivery Address</span>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-pill bg-emp-brand-50 text-emp-brand font-bold border border-emp-brand-100">
              Verified Identity
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[11px] font-bold text-emp-ink block mb-1.5 font-display">
                Full Name
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink focus:outline-none shadow-emp-sm transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-emp-ink block mb-1.5 font-display">
                Email Address (Read-only)
              </label>
              <input
                type="email"
                value={profile.email}
                readOnly
                disabled
                className="w-full bg-emp-surface-tint border border-emp-surface-line rounded-emp px-3.5 py-2.5 text-xs text-emp-ink-muted cursor-not-allowed"
                placeholder="name@domain.com"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold text-emp-ink block mb-1.5 font-display">
                Phone Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink focus:outline-none shadow-emp-sm transition-colors"
                placeholder="+1 408 555 0199"
              />
              <p className="text-[11px] text-emp-ink-muted mt-1">Used for order tracking alerts and courier delivery verification.</p>
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold text-emp-ink block mb-1.5 font-display">
                Street Address
              </label>
              <input
                type="text"
                value={profile.street}
                onChange={(e) => setProfile({ ...profile, street: e.target.value })}
                className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink focus:outline-none shadow-emp-sm transition-colors"
                placeholder="2211 North First Street"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-emp-ink block mb-1.5 font-display">
                City
              </label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink focus:outline-none shadow-emp-sm transition-colors"
                placeholder="San Jose"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-emp-ink block mb-1.5 font-display">
                State & Postal Code
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink focus:outline-none shadow-emp-sm transition-colors"
                  placeholder="CA"
                />
                <input
                  type="text"
                  value={profile.postalCode}
                  onChange={(e) => setProfile({ ...profile, postalCode: e.target.value })}
                  className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink focus:outline-none font-mono shadow-emp-sm transition-colors"
                  placeholder="95131"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: SHOPPING PREFERENCES */}
        <div className="p-6 rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-6">
          <div className="flex items-center space-x-2 text-sm font-bold text-emp-ink font-display pb-3 border-b border-emp-surface-line">
            <Sliders className="w-4 h-4 text-emp-brand" />
            <span>Shopping Preferences</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            {/* Primary Shopping Priority */}
            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold text-emp-ink block mb-1.5 font-display">
                Primary Shopping Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink focus:outline-none shadow-emp-sm"
              >
                <option value="Price">Price — Lowest landed cost & best value deals</option>
                <option value="Durability">Durability — Longest build lifespan & warranty coverage</option>
                <option value="Performance">Performance — Top speed, benchmark scores & flagship specs</option>
                <option value="Verified Specifications">Verified Specifications — Rigorous independent lab & data verification</option>
                <option value="Balanced">Balanced — Everyday equilibrium of price, rating & reliability</option>
              </select>

              <div className="mt-2 p-3 rounded-emp bg-emp-surface-tint border border-emp-surface-line flex items-start space-x-2">
                <Info className="w-3.5 h-3.5 text-emp-brand shrink-0 mt-0.5" />
                <p className="text-[11px] text-emp-ink-secondary leading-relaxed">
                  {priorityDescriptions[priority] || priorityDescriptions['Balanced']}
                </p>
              </div>
            </div>

            {/* Product Evidence Preference */}
            <div>
              <label className="text-[11px] font-bold text-emp-ink block mb-1.5 font-display">
                Product Evidence Preference
              </label>
              <select
                value={evidenceFilter}
                onChange={(e) => setEvidenceFilter(e.target.value)}
                className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink focus:outline-none shadow-emp-sm"
              >
                <option value="Standard">Standard — Verified manufacturer specs & retailer claims</option>
                <option value="Strict">Strict — Independent lab test results & verified whitepapers</option>
              </select>
              <p className="text-[11px] text-emp-ink-muted mt-1.5 leading-relaxed">
                {evidenceDescriptions[evidenceFilter]}
              </p>
            </div>

            {/* Preferred Currency */}
            <div>
              <label className="text-[11px] font-bold text-emp-ink block mb-1.5 font-display">
                Preferred Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-white border border-emp-surface-line focus:border-emp-brand rounded-emp px-3.5 py-2.5 text-xs text-emp-ink focus:outline-none shadow-emp-sm"
              >
                <option value="USD">USD ($) — US Dollar (Aptdot Native Base Currency)</option>
              </select>
              <p className="text-[11px] text-emp-ink-muted mt-1.5 leading-relaxed">
                Standardized on USD ($) for Aptdot unified catalogue and PayPal Sandbox checkout.
              </p>
            </div>
          </div>

          {/* Budget & Spend Guardrails Sub-Card */}
          <div className="pt-4 border-t border-emp-surface-line">
            <div className="flex items-center space-x-2 text-xs font-bold text-emp-ink font-display mb-4">
              <TrendingUp className="w-4 h-4 text-emp-brand" />
              <span>Monthly Budget Ceiling & Spend Guardrails</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold text-emp-ink font-display">
                    Monthly Budget Limit
                  </label>
                  <span className="font-mono font-bold text-emp-ink text-sm">
                    {formatCurrency(localBudget, 'USD')}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={localBudget}
                  onChange={(e) => setLocalBudget(Number(e.target.value))}
                  className="w-full accent-emp-brand cursor-pointer"
                />
                <p className="text-[11px] text-emp-ink-muted mt-2">
                  CartPilot flags any shopping carts that cause your total monthly spend to exceed {formatCurrency(localBudget, 'USD')}.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold text-emp-ink font-display">
                    Early Warning Alert Threshold
                  </label>
                  <span className="font-mono font-bold text-amber-700 text-sm">
                    {localThreshold}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={localThreshold}
                  onChange={(e) => setLocalThreshold(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <p className="text-[11px] text-emp-ink-muted mt-2">
                  Triggers warning alerts once monthly expenditure reaches {localThreshold}% of ceiling ({formatCurrency((localBudget * localThreshold) / 100, 'USD')}).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: NOTIFICATION PREFERENCES */}
        <div className="p-6 rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-4">
          <div className="flex items-center space-x-2 text-sm font-bold text-emp-ink font-display pb-3 border-b border-emp-surface-line">
            <Bell className="w-4 h-4 text-emp-brand" />
            <span>Notification & Protection Alerts</span>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Return Deadlines */}
            <div className="flex items-center justify-between p-3.5 rounded-emp bg-emp-surface-tint border border-emp-surface-line">
              <div className="space-y-0.5 pr-4">
                <span className="font-bold text-emp-ink block">Return Window 3-Day Deadlines</span>
                <span className="text-[11px] text-emp-ink-secondary block">
                  Receive proactive alerts 72 hours before your 30-day merchant return window expires.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifications.returnDeadlines}
                onChange={(e) => setNotifications({ ...notifications, returnDeadlines: e.target.checked })}
                className="w-4 h-4 accent-emp-brand cursor-pointer rounded"
              />
            </div>

            {/* Warranty Expiration Alerts */}
            <div className="flex items-center justify-between p-3.5 rounded-emp bg-emp-surface-tint border border-emp-surface-line">
              <div className="space-y-0.5 pr-4">
                <span className="font-bold text-emp-ink block">Warranty Expiration Notices</span>
                <span className="text-[11px] text-emp-ink-secondary block">
                  Receive notifications 30 days before manufacturer warranties end with one-click claim instructions.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifications.warrantyExpirations}
                onChange={(e) => setNotifications({ ...notifications, warrantyExpirations: e.target.checked })}
                className="w-4 h-4 accent-emp-brand cursor-pointer rounded"
              />
            </div>

            {/* Price Drop & Evidence Updates */}
            <div className="flex items-center justify-between p-3.5 rounded-emp bg-emp-surface-tint border border-emp-surface-line">
              <div className="space-y-0.5 pr-4">
                <span className="font-bold text-emp-ink block">Price Drop & Evidence Score Updates</span>
                <span className="text-[11px] text-emp-ink-secondary block">
                  Get notified when items in your comparison or cart drop in price or receive new verified lab scores.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifications.priceDropAlerts}
                onChange={(e) => setNotifications({ ...notifications, priceDropAlerts: e.target.checked })}
                className="w-4 h-4 accent-emp-brand cursor-pointer rounded"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: PRIVACY & SECURITY */}
        <div className="p-6 rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-4">
          <div className="flex items-center space-x-2 text-sm font-bold text-emp-ink font-display pb-3 border-b border-emp-surface-line">
            <Lock className="w-4 h-4 text-emp-brand" />
            <span>Privacy & Security</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* AI Recommendation Telemetry */}
            <div className="flex items-center justify-between p-3.5 rounded-emp bg-emp-surface-tint border border-emp-surface-line">
              <div className="space-y-0.5 pr-4">
                <div className="flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                  <span className="font-bold text-emp-ink">AI Assistant Telemetry & Personalization</span>
                </div>
                <span className="text-[11px] text-emp-ink-secondary block">
                  Allow Google Gemini AI to analyze your search context to optimize budget and hardware suggestions.
                </span>
              </div>
              <input
                type="checkbox"
                checked={aiTelemetry}
                onChange={(e) => setAiTelemetry(e.target.checked)}
                className="w-4 h-4 accent-emp-brand cursor-pointer rounded"
              />
            </div>

            {/* Password Management & Recovery */}
            <div className="p-3.5 rounded-emp bg-emp-surface-tint border border-emp-surface-line flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-emp-ink block">Account Password & Recovery</span>
                <span className="text-[11px] text-emp-ink-secondary block mt-0.5">
                  Send a secure password reset link to your registered email address ({profile.email}).
                </span>
              </div>
              <button
                type="button"
                onClick={handlePasswordReset}
                disabled={isResettingPassword}
                className="btn-emp btn-emp-secondary py-2 px-3.5 text-xs font-semibold inline-flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer disabled:opacity-50"
              >
                <Key className={`w-3.5 h-3.5 text-emp-brand ${isResettingPassword ? 'animate-spin' : ''}`} />
                <span>{isResettingPassword ? 'Sending...' : 'Send Password Reset Link'}</span>
              </button>
            </div>

            {/* Encryption & Compliance Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="p-3 rounded-emp bg-emp-surface-tint border border-emp-surface-line flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emp-brand shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-emp-ink block">Row-Level Security</span>
                  <span className="text-[10px] text-emp-ink-muted block">Supabase Auth Enforced</span>
                </div>
              </div>

              <div className="p-3 rounded-emp bg-emp-surface-tint border border-emp-surface-line flex items-center space-x-2">
                <Lock className="w-4 h-4 text-emp-brand shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-emp-ink block">Data Protection</span>
                  <span className="text-[10px] text-emp-ink-muted block">TLS 1.3 & AES-256</span>
                </div>
              </div>

              <div className="p-3 rounded-emp bg-emp-surface-tint border border-emp-surface-line flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emp-brand shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-emp-ink block">Payment Compliance</span>
                  <span className="text-[10px] text-emp-ink-muted block">PayPal Orders v2 Server-Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: ACCOUNT MANAGEMENT */}
        <div className="p-6 rounded-emp bg-white border border-emp-surface-line shadow-emp-sm space-y-4">
          <div className="flex items-center space-x-2 text-sm font-bold text-emp-ink font-display pb-3 border-b border-emp-surface-line">
            <Shield className="w-4 h-4 text-emp-brand" />
            <span>Account Management</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-emp bg-emp-surface-tint border border-emp-surface-line">
            <div>
              <span className="text-xs font-bold text-emp-ink block">
                {profile.fullName || 'Registered User'}
              </span>
              <span className="text-[11px] text-emp-ink-secondary font-mono block mt-0.5">
                {profile.email} {user?.id ? `• UID: ${user.id.slice(0, 8)}...` : ''}
              </span>
              <span className="text-[10px] text-emp-ink-muted block mt-1">
                Active Session • Verified Customer Profile
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Export Data Button */}
              <button
                type="button"
                onClick={handleExportData}
                className="btn-emp btn-emp-secondary py-2 px-3 text-xs font-semibold inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emp-brand" />
                <span>Export Ledger (JSON)</span>
              </button>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={logout}
                className="px-3.5 py-2 rounded-pill bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}