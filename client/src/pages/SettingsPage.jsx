import React, { useState } from 'react';
import {
  Settings,
  User,
  Sliders,
  TrendingUp,
  Server,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';

export default function SettingsPage() {
  const {
    budget,
    setBudget,
    preferences,
    setPreferences,
    backendHealth,
    isHealthLoading,
    refreshHealth,
    showToast,
  } = useApp();

  const [profile, setProfile] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@cartpilot.ai',
    address: 'Indiranagar 100ft Road, Stage 2',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
  });

  const [localBudget, setLocalBudget] = useState(budget.monthlyLimit);
  const [localThreshold, setLocalThreshold] = useState(budget.alertThresholdPercent);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setBudget(prev => ({
      ...prev,
      monthlyLimit: Number(localBudget),
      alertThresholdPercent: Number(localThreshold),
    }));
    showToast('Settings and budget preferences updated successfully!', 'success');
  };

  const isHealthy = backendHealth?.status === 'ok';

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold mb-2">
            <Settings className="w-3.5 h-3.5 text-electric-400" />
            <span>User & Agent Configuration</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Settings & Shopping Preferences
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your personal profile, monthly budget caps, agent verification strictness, and system diagnostics.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-bold shadow-glow-blue flex items-center space-x-1.5 transition-colors self-start sm:self-center"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-white pb-3 border-b border-navy-800">
            <User className="w-4 h-4 text-electric-400" />
            <span>Personal Profile & Delivery Address</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
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
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Street Address
              </label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                City & State
              </label>
              <input
                type="text"
                value={`${profile.city}, ${profile.state}`}
                readOnly
                className="w-full bg-navy-950/60 border border-navy-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Postal Code
              </label>
              <input
                type="text"
                value={profile.postalCode}
                onChange={(e) => setProfile({ ...profile, postalCode: e.target.value })}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Budget Preferences Card */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-white pb-3 border-b border-navy-800">
            <TrendingUp className="w-4 h-4 text-electric-400" />
            <span>Budget Ceiling & Spend Guardrails</span>
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
                className="w-full accent-electric-500 bg-navy-950"
              />
              <p className="text-[11px] text-slate-400 mt-2">
                CartPilot will flag carts that push your projected monthly spend above this limit.
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
                className="w-full accent-amber-400 bg-navy-950"
              />
              <p className="text-[11px] text-slate-400 mt-2">
                Alerts trigger when spending reaches {localThreshold}% of ceiling ({formatCurrency((localBudget * localThreshold) / 100)}).
              </p>
            </div>
          </div>
        </div>

        {/* AI & Shopping Preferences Card */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-white pb-3 border-b border-navy-800">
            <Sliders className="w-4 h-4 text-violet-400" />
            <span>Agent Intelligence Criteria</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Primary Purchasing Priority
              </label>
              <select
                value={preferences.priority}
                onChange={(e) => setPreferences({ ...preferences, priority: e.target.value })}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              >
                <option value="Durability & Specs Verification">Durability & Verified Specifications</option>
                <option value="Lowest Total Landed Cost">Lowest Total Landed Cost</option>
                <option value="Longest Manufacturer Warranty">Longest Manufacturer Warranty</option>
                <option value="No-Questions Return Flexibility">Maximum Return Flexibility</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Evidence Verification Filter
              </label>
              <select
                value={preferences.riskThreshold}
                onChange={(e) => setPreferences({ ...preferences, riskThreshold: e.target.value })}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              >
                <option value="Strict (Verified only)">Strict (Independent Lab & Whitepapers Only)</option>
                <option value="Standard">Standard (Authorized Retailer Claims Accepted)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Base Operating Currency
              </label>
              <select
                value={budget.currency || 'INR'}
                onChange={(e) => setBudget(prev => ({ ...prev, currency: e.target.value }))}
                className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
              >
                <option value="INR">INR (₹) - Indian Rupee (Default Base)</option>
                <option value="USD" disabled>USD ($) - US Dollar (Multi-currency planned)</option>
                <option value="EUR" disabled>EUR (€) - Euro (Multi-currency planned)</option>
              </select>
              <p className="text-[10px] text-slate-500 mt-1">Default currency is locked to INR for accurate GST & threshold calculations.</p>
            </div>
          </div>
        </div>

        {/* Backend & Diagnostics Live Panel */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-navy-800">
            <span className="text-xs font-bold text-white flex items-center space-x-2">
              <Server className="w-4 h-4 text-electric-400" />
              <span>Full-Stack Health & Service Diagnostics</span>
            </span>
            <button
              type="button"
              onClick={refreshHealth}
              disabled={isHealthLoading}
              className="px-3 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white text-xs flex items-center space-x-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isHealthLoading ? 'animate-spin' : ''}`} />
              <span>Ping /api/health</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
              <span className="text-slate-400 text-[10px] block">Express Backend API</span>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                <span className="font-mono font-bold text-white">
                  {backendHealth?.status?.toUpperCase() || 'OFFLINE'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                Latency: {backendHealth?._clientLatencyMs ? `${backendHealth._clientLatencyMs}ms` : 'N/A'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
              <span className="text-slate-400 text-[10px] block">Supabase PostgreSQL</span>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${
                  backendHealth?.database?.connected
                    ? 'bg-emerald-400'
                    : backendHealth?.database?.status === 'schema_pending'
                    ? 'bg-amber-400'
                    : 'bg-slate-500'
                }`} />
                <span className="font-mono font-bold text-white text-[11px]">
                  {backendHealth?.database?.connected
                    ? 'OPERATIONAL'
                    : backendHealth?.database?.status === 'schema_pending'
                    ? 'SCHEMA PENDING'
                    : 'PENDING CONFIG'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5 block truncate" title={backendHealth?.database?.message}>
                {backendHealth?.database?.productsCount !== undefined
                  ? `${backendHealth.database.productsCount} catalog rows`
                  : 'Run schema.sql'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
              <span className="text-slate-400 text-[10px] block">PayPal Orders v2 API</span>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${backendHealth?.integrations?.paypal ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className="font-mono font-bold text-white">
                  {backendHealth?.integrations?.paypal ? 'CONFIGURED' : 'SANDBOX SIMULATED'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                Environment: Sandbox
              </span>
            </div>

            <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
              <span className="text-slate-400 text-[10px] block">Google Gemini Engine</span>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${backendHealth?.integrations?.gemini ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className="font-mono font-bold text-white">
                  {backendHealth?.integrations?.gemini ? 'CONFIGURED' : 'ENV PENDING'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                Model: Gemini Pro
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
