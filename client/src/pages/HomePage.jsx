import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Server, 
  ShieldCheck, 
  Cpu, 
  Database, 
  ShoppingBag, 
  FileCheck, 
  Sparkles,
  Layers
} from 'lucide-react';
import apiService from '../services/api';
import ChatContainer from '../components/chat/ChatContainer';
import ProductGrid from '../components/products/ProductGrid';
import PayPalCheckoutButton from '../components/checkout/PayPalCheckoutButton';
import PurchasePassportCard from '../components/passport/PurchasePassportCard';

export default function HomePage({ backendHealth, onRefreshHealth, isRefreshing }) {
  const [latency, setLatency] = useState(null);

  useEffect(() => {
    if (backendHealth?._clientLatencyMs) {
      setLatency(backendHealth._clientLatencyMs);
    }
  }, [backendHealth]);

  const features = [
    { id: 1, title: 'Auth & User Profiles', category: 'Identity', status: 'Ready to Scaffold', icon: ShieldCheck },
    { id: 2, title: 'Conversational Shopping Agent', category: 'AI Engine', status: 'Ready to Scaffold', icon: Cpu },
    { id: 3, title: 'Product Catalogue', category: 'Inventory', status: 'Ready to Scaffold', icon: ShoppingBag },
    { id: 4, title: 'Natural-Language Discovery', category: 'Search', status: 'Ready to Scaffold', icon: Sparkles },
    { id: 5, title: 'Specification Comparison', category: 'Intelligence', status: 'Ready to Scaffold', icon: Layers },
    { id: 6, title: 'Budget-Aware Recommendations', category: 'Economics', status: 'Ready to Scaffold', icon: Activity },
    { id: 7, title: 'Evidence-Based Risk Assessment', category: 'Integrity', status: 'Ready to Scaffold', icon: FileCheck },
    { id: 8, title: 'Shopping Cart & Checkout', category: 'Commerce', status: 'Ready to Scaffold', icon: ShoppingBag },
    { id: 9, title: 'PayPal Sandbox Integration', category: 'Payment', status: 'Ready to Scaffold', icon: ShieldCheck },
    { id: 10, title: 'Server-Side Payment Verification', category: 'Security', status: 'Ready to Scaffold', icon: ShieldCheck },
    { id: 11, title: 'Order History & Ledger', category: 'Records', status: 'Ready to Scaffold', icon: Database },
    { id: 12, title: 'Digital Purchase Passport', category: 'Provenance', status: 'Ready to Scaffold', icon: FileCheck },
    { id: 13, title: 'Warranty & Return Deadlines', category: 'Protection', status: 'Ready to Scaffold', icon: Activity },
    { id: 14, title: 'Post-Purchase AI Assistance', category: 'Support', status: 'Ready to Scaffold', icon: Cpu },
  ];

  const isConnected = backendHealth?.status === 'ok';

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PayPal AI Hackathon 2026 • Project Initialized</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Autonomous Commerce with <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Agentic Intelligence</span>
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            CartPilot AI bridges conversational discovery, evidence-backed product comparison, customer-authorized PayPal sandbox checkout, and automated Digital Purchase Passports with post-purchase warranty tracking.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>React 18 + Vite + Tailwind</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Node.js + Express API</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>PayPal Orders v2 SDK</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>Supabase PostgreSQL</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Google Gemini AI</span>
            </span>
          </div>
        </div>
      </section>

      {/* Live Health-Check Diagnostics Panel */}
      <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl border ${
              isConnected 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white">Full-Stack Health Diagnostics</h2>
                {isConnected ? (
                  <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Live & Connected</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-semibold">
                    <XCircle className="w-3 h-3" />
                    <span>Disconnected</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time validation between React client and Node.js/Express backend
              </p>
            </div>
          </div>

          <button
            onClick={onRefreshHealth}
            disabled={isRefreshing}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Pinging API...' : 'Ping Health Endpoint'}</span>
          </button>
        </div>

        {/* Diagnostic Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">Backend Server Status</span>
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-rose-400'}`} />
              <span className="text-sm font-semibold text-white font-mono">
                {backendHealth?.status?.toUpperCase() || 'OFFLINE'}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Endpoint: <code className="text-blue-400">GET /api/health</code>
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">Environment & Mode</span>
            <span className="text-sm font-semibold text-white font-mono">
              {backendHealth?.environment || 'development'}
            </span>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Node v{backendHealth?.nodeVersion || '24.x'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">Roundtrip Latency</span>
            <span className="text-sm font-semibold text-white font-mono">
              {latency !== null ? `${latency} ms` : 'Evaluating...'}
            </span>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Client &harr; Server loop
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">Server Timestamp</span>
            <span className="text-xs font-semibold text-slate-300 font-mono truncate block">
              {backendHealth?.timestamp ? new Date(backendHealth.timestamp).toLocaleTimeString() : 'N/A'}
            </span>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Uptime: {backendHealth?.uptimeSeconds ? `${backendHealth.uptimeSeconds.toFixed(1)}s` : 'N/A'}
            </span>
          </div>
        </div>

        {backendHealth?.integrations && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap gap-4 text-xs text-slate-400">
            <span className="flex items-center space-x-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${backendHealth.integrations.paypal ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>PayPal Config: {backendHealth.integrations.paypal ? 'Configured' : 'Env Pending'}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${backendHealth.integrations.supabase ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>Supabase DB: {backendHealth.integrations.supabase ? 'Configured' : 'Env Pending'}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${backendHealth.integrations.gemini ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>Gemini AI: {backendHealth.integrations.gemini ? 'Configured' : 'Env Pending'}</span>
            </span>
          </div>
        )}
      </section>

      {/* Modular Architectural Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChatContainer />
        <div className="space-y-6">
          <ProductGrid />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PayPalCheckoutButton />
            <PurchasePassportCard />
          </div>
        </div>
      </div>

      {/* Project Requirements & Capability Checklist */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">Project Capability Matrix</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Target functional requirements for PayPal AI Hackathon 2026
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            14 Requirements Defined
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start space-x-3 hover:border-slate-700 transition-colors"
              >
                <div className="p-2 rounded-lg bg-slate-800/80 text-blue-400 border border-slate-700/60">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      #{feature.id} • {feature.category}
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      Structure OK
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 mt-1 truncate">
                    {feature.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
