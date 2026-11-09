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

export default function SettingsPage() {
  const {
    budget,
    setBudget,
    preferences,
    setPreferences,
    showToast,
    user,
    logout,
    orders,
    passports,
  } = useApp();

  // 1. Personal Profile State
  const [profile, setProfile] = useState({
    fullName: user?.user_metadata?.full_name || 'Alex Mercer',
    email: user?.email || 'alex.mercer@cartpilot.ai',
    phone: user?.user_metadata?.phone || '+91 98765 43210',
    street: 'Indiranagar 100ft Road, Stage 2',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    country: 'India',
  });

  // 2. Shopping Preferences State
  // Priorities: Price, Durability, Performance, Verified Specifications, Balanced
  const [priority, setPriority] = useState(
    preferences?.priority?.includes('Durability')
      ? 'Durability'
      : preferences?.priority?.includes('Price') || preferences?.priority?.includes('Cost')
      ? 'Price'
      : 'Verified Specifications'
  );

  // Evidence Preference: Standard, Strict
  const [evidenceFilter, setEvidenceFilter] = useState(
    preferences?.riskThreshold?.includes('Strict') ? 'Strict' : 'Standard'
  );

  // Currency: INR default
  const [currency, setCurrency] = useState(budget.currency || 'INR');

  // Budget Sliders
  const [localBudget, setLocalBudget] = useState(budget.monthlyLimit || 250000);
  const [localThreshold, setLocalThreshold] = useState(budget.alertThresholdPercent || 80);

  // 3. Notification Preferences State
  const [notifications, setNotifications] = useState({
    returnDeadlines: true,
    warrantyExpirations: true,
    priceDropAlerts: true,
    smsWhatsApp: false, // coming soon in OTP phase
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

  // Evidence filter definitions
  const evidenceDescriptions = {
    'Standard': 'Standard (Authorized Retailer Claims Accepted) — Accepts verified manufacturer specifications and official retailer listings.',
    'Strict': 'Strict (Verified only) — Requires independent laboratory testing, accredited whitepapers, and verified benchmarks before recommending.',
  };

  // Sync profile when user changes or load from Supabase
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        fullName: user.user_metadata?.full_name || prev.fullName,
        email: user.email || prev.email,
        phone: user.user_metadata?.phone || prev.phone,
      }));

      // Fetch user profile from Supabase public.profiles if exists
      if (user.id) {
        apiService
          .getUserProfile(user.id)
          .then((res) => {
            if (res?.profile) {
              const p = res.profile;
              setProfile((prev) => ({
                ...prev,
                fullName: p.full_name || prev.fullName,
                phone: p.phone || prev.phone,
                street: p.shipping_address?.street || prev.street,
                city: p.shipping_address?.city || prev.city,
                state: p.shipping_address?.state || prev.state,
                postalCode: p.shipping_address?.postalCode || prev.postalCode,
                country: p.shipping_address?.country || prev.country,
              }));

              if (p.monthly_budget_limit) {
                setLocalBudget(Number(p.monthly_budget_limit));
              }
              if (p.alert_threshold_percent) {
                setLocalThreshold(Number(p.alert_threshold_percent));
              }
              if (p.currency) {
                setCurrency(p.currency);
              }
              if (p.shopping_preferences) {
                if (p.shopping_preferences.priority) setPriority(p.shopping_preferences.priority);
                if (p.shopping_preferences.evidenceFilter) setEvidenceFilter(p.shopping_preferences.evidenceFilter);
                if (p.shopping_preferences.notifications) setNotifications((prev) => ({ ...prev, ...p.shopping_preferences.notifications }));
                if (p.shopping_preferences.aiTelemetry !== undefined) setAiTelemetry(Boolean(p.shopping_preferences.aiTelemetry));
              }
            }
          })
          .catch((err) => {
            console.warn('[SettingsPage] Could not load profile:', err.message);
          });
      }
    }
  }, [user]);

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
          currency: budget.currency || 'INR',
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
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold mb-2">
            <Settings className="w-3.5 h-3.5 text-electric-400" />
            <span>Customer Account & Configuration</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Settings & Shopping Preferences
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your personal profile, shopping intelligence criteria, budget ceilings, notifications, and security.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-bold shadow-glow-blue flex items-center space-x-2 transition-all self-start sm:self-center disabled:opacity-50 cursor-pointer"
        >
          <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* SECTION 1: PERSONAL PROFILE & DELIVERY ADDRESS */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-navy-800">
            <div className="flex items-center space-x-2 text-xs font-bold text-white">
              <User className="w-4 h-4 text-electric-400" />
              <span>Personal Profile & Delivery Address</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-navy-800 text-slate-300 border border-navy-700">
              Verified Identity
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                placeholder="e.g. Alex Mercer"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                placeholder="alex@example.com"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                placeholder="+91 98765 43210"
              />
              <p className="text-[10px] text-slate-500 mt-1">Used for order tracking alerts and courier delivery verification.</p>
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Street Address
              </label>
              <input
                type="text"
                value={profile.street}
                onChange={(e) => setProfile({ ...profile, street: e.target.value })}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                placeholder="Flat / House No., Street, Landmark"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                City
              </label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                placeholder="City"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                State & Postal Code
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                  placeholder="State"
                />
                <input
                  type="text"
                  value={profile.postalCode}
                  onChange={(e) => setProfile({ ...profile, postalCode: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono transition-colors"
                  placeholder="PIN Code"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: SHOPPING PREFERENCES */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="flex items-center space-x-2 text-xs font-bold text-white pb-3 border-b border-navy-800">
            <Sliders className="w-4 h-4 text-violet-400" />
            <span>Shopping Preferences</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            {/* Primary Shopping Priority */}
            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                Primary Shopping Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              >
                <option value="Price">Price — Lowest landed cost & best value deals</option>
                <option value="Durability">Durability — Longest build lifespan & warranty coverage</option>
                <option value="Performance">Performance — Top speed, benchmark scores & flagship specs</option>
                <option value="Verified Specifications">Verified Specifications — Rigorous independent lab & data verification</option>
                <option value="Balanced">Balanced — Everyday equilibrium of price, rating & reliability</option>
              </select>

              <div className="mt-2 p-2.5 rounded-lg bg-navy-950/60 border border-navy-800/80 flex items-start space-x-2">
                <Info className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {priorityDescriptions[priority] || priorityDescriptions['Balanced']}
                </p>
              </div>
            </div>

            {/* Product Evidence Preference */}
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                Product Evidence Preference
              </label>
              <select
                value={evidenceFilter}
                onChange={(e) => setEvidenceFilter(e.target.value)}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              >
                <option value="Standard">Standard — Verified manufacturer specs & retailer claims</option>
                <option value="Strict">Strict — Independent lab test results & verified whitepapers</option>
              </select>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                {evidenceDescriptions[evidenceFilter]}
              </p>
            </div>

            {/* Preferred Currency */}
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                Preferred Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              >
                <option value="INR">INR (₹) — Indian Rupee (Default Base Currency)</option>
                <option value="USD" disabled>USD ($) — US Dollar (Coming Soon)</option>
                <option value="EUR" disabled>EUR (€) — Euro (Coming Soon)</option>
              </select>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                Currently set to INR (₹) for accurate India GST (18%), domestic delivery, and PayPal sandbox checkout.
              </p>
            </div>
          </div>

          {/* Budget & Spend Guardrails Sub-Card */}
          <div className="pt-4 border-t border-navy-800">
            <div className="flex items-center space-x-2 text-xs font-bold text-white mb-4">
              <TrendingUp className="w-4 h-4 text-electric-400" />
              <span>Monthly Budget Ceiling & Spend Guardrails</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-semibold text-slate-400">
                    Monthly Budget Limit
                  </label>
                  <span className="font-mono font-bold text-white text-sm">
                    {formatCurrency(localBudget)}
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="500000"
                  step="5000"
                  value={localBudget}
                  onChange={(e) => setLocalBudget(Number(e.target.value))}
                  className="w-full accent-electric-500 bg-navy-950 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400 mt-2">
                  CartPilot flags any shopping carts that cause your total monthly spend to exceed {formatCurrency(localBudget)}.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-semibold text-slate-400">
                    Early Warning Alert Threshold
                  </label>
                  <span className="font-mono font-bold text-amber-400 text-sm">
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
                  className="w-full accent-amber-400 bg-navy-950 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400 mt-2">
                  Triggers warning alerts once monthly expenditure reaches {localThreshold}% of ceiling ({formatCurrency((localBudget * localThreshold) / 100)}).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: NOTIFICATION PREFERENCES */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-white pb-3 border-b border-navy-800">
            <Bell className="w-4 h-4 text-electric-400" />
            <span>Notification & Protection Alerts</span>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Return Deadlines */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-950/70 border border-navy-800">
              <div className="space-y-0.5 pr-4">
                <span className="font-semibold text-white block">Return Window 3-Day Deadlines</span>
                <span className="text-[11px] text-slate-400 block">
                  Receive proactive alerts 72 hours before your 30-day merchant return window expires.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={notifications.returnDeadlines}
                  onChange={(e) => setNotifications({ ...notifications, returnDeadlines: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-navy-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-electric-500"></div>
              </label>
            </div>

            {/* Warranty Expiration Alerts */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-950/70 border border-navy-800">
              <div className="space-y-0.5 pr-4">
                <span className="font-semibold text-white block">Warranty Expiration Notices</span>
                <span className="text-[11px] text-slate-400 block">
                  Receive notifications 30 days before manufacturer warranties end with one-click claim instructions.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={notifications.warrantyExpirations}
                  onChange={(e) => setNotifications({ ...notifications, warrantyExpirations: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-navy-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-electric-500"></div>
              </label>
            </div>

            {/* Price Drop & Evidence Updates */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-950/70 border border-navy-800">
              <div className="space-y-0.5 pr-4">
                <span className="font-semibold text-white block">Price Drop & Evidence Score Updates</span>
                <span className="text-[11px] text-slate-400 block">
                  Get notified when items in your comparison or cart drop in price or receive new verified lab scores.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={notifications.priceDropAlerts}
                  onChange={(e) => setNotifications({ ...notifications, priceDropAlerts: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-navy-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-electric-500"></div>
              </label>
            </div>

            {/* SMS & WhatsApp Alerts (Coming Soon) */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-950/40 border border-navy-800/60 opacity-75">
              <div className="space-y-0.5 pr-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-300">SMS & WhatsApp Real-Time Dispatches</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-950/80 text-violet-300 border border-violet-500/30 font-medium">
                    Coming Soon in OTP Phase
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Direct WhatsApp delivery dispatches and instant warranty passport registration codes.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-not-allowed shrink-0">
                <input
                  type="checkbox"
                  disabled
                  checked={false}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-navy-800/80 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-600 after:rounded-full after:h-4 after:w-4"></div>
              </label>
            </div>
          </div>
        </div>

        {/* SECTION 4: PRIVACY & SECURITY */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-white pb-3 border-b border-navy-800">
            <Lock className="w-4 h-4 text-electric-400" />
            <span>Privacy & Security</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* AI Recommendation Telemetry */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-950/70 border border-navy-800">
              <div className="space-y-0.5 pr-4">
                <div className="flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span className="font-semibold text-white">AI Assistant Telemetry & Personalization</span>
                </div>
                <span className="text-[11px] text-slate-400 block">
                  Allow Google Gemini AI to analyze your search context to optimize budget and hardware suggestions.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={aiTelemetry}
                  onChange={(e) => setAiTelemetry(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-navy-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-electric-500"></div>
              </label>
            </div>

            {/* Password Management & Recovery */}
            <div className="p-3.5 rounded-xl bg-navy-950/70 border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-white block">Account Password & Recovery</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Send a secure password reset link to your registered email address ({profile.email}).
                </span>
              </div>
              <button
                type="button"
                onClick={handlePasswordReset}
                disabled={isResettingPassword}
                className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 hover:text-white border border-navy-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors self-start sm:self-auto cursor-pointer disabled:opacity-50"
              >
                <Key className={`w-3.5 h-3.5 text-electric-400 ${isResettingPassword ? 'animate-spin' : ''}`} />
                <span>{isResettingPassword ? 'Sending...' : 'Send Password Reset Link'}</span>
              </button>
            </div>

            {/* Two-Factor Authentication (2FA) */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-950/40 border border-navy-800/60 opacity-75">
              <div className="space-y-0.5 pr-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-300">Two-Factor Authentication (2FA)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-950/80 text-violet-300 border border-violet-500/30 font-medium">
                    Coming Soon in OTP Phase
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Secure sign-ins with authenticator app (TOTP) or SMS verification.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-not-allowed shrink-0">
                <input
                  type="checkbox"
                  disabled
                  checked={false}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-navy-800/80 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-600 after:rounded-full after:h-4 after:w-4"></div>
              </label>
            </div>

            {/* Encryption & Compliance Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="p-2.5 rounded-xl bg-navy-950/50 border border-navy-800 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[11px] font-semibold text-slate-300 block">Row-Level Security</span>
                  <span className="text-[10px] text-slate-500 block">Supabase Auth Enforced</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy-950/50 border border-navy-800 flex items-center space-x-2">
                <Lock className="w-4 h-4 text-electric-400 shrink-0" />
                <div>
                  <span className="text-[11px] font-semibold text-slate-300 block">Data Protection</span>
                  <span className="text-[10px] text-slate-500 block">TLS 1.3 & AES-256</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-navy-950/50 border border-navy-800 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                <div>
                  <span className="text-[11px] font-semibold text-slate-300 block">Payment Compliance</span>
                  <span className="text-[10px] text-slate-500 block">PayPal Orders v2 Server-Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: ACCOUNT MANAGEMENT */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-white pb-3 border-b border-navy-800">
            <Shield className="w-4 h-4 text-electric-400" />
            <span>Account Management</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-navy-950/70 border border-navy-800">
            <div>
              <span className="text-xs font-bold text-white block">
                {profile.fullName || 'Registered User'}
              </span>
              <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                {profile.email} {user?.id ? `• UID: ${user.id.slice(0, 8)}...` : ''}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">
                Active Session • Verified Customer Profile
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Export Data Button */}
              <button
                type="button"
                onClick={handleExportData}
                className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 hover:text-white border border-navy-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-electric-400" />
                <span>Export Ledger (JSON)</span>
              </button>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={logout}
                className="px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of CartPilot</span>
              </button>
            </div>
          </div>

          {/* Delete Account (Disabled with Coming Soon note) */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div>
              <span className="font-semibold text-slate-300 block">Close or Delete Account</span>
              <span className="text-[11px] text-slate-500 block">
                Permanently purge your digital passports, order ledger, and saved shipping preferences.
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                Coming Soon
              </span>
              <button
                type="button"
                disabled
                className="px-3 py-1.5 rounded-lg bg-navy-950 border border-navy-800 text-slate-600 text-xs font-medium cursor-not-allowed"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}