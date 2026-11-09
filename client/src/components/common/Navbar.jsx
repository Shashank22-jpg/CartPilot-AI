import React from 'react';
import { ShoppingCart, Bot, ShieldCheck, Sparkles } from 'lucide-react';

export default function Navbar({ backendHealth }) {
  const isHealthy = backendHealth?.status === 'ok';

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                CartPilot<span className="text-blue-500 font-extrabold">.AI</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                Hackathon 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Agentic Commerce & Evidence-Based Purchasing
            </p>
          </div>
        </div>

        {/* Status & Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                isHealthy
                  ? 'bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50'
                  : 'bg-amber-400'
              }`}
            />
            <span className="text-slate-300 font-mono text-[11px]">
              API: {isHealthy ? 'Connected' : 'Connecting...'}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1 text-xs text-slate-400">
            <span className="flex items-center space-x-1 px-2.5 py-1 bg-slate-800/40 border border-slate-700/40 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>PayPal Sandbox</span>
            </span>
            <span className="flex items-center space-x-1 px-2.5 py-1 bg-slate-800/40 border border-slate-700/40 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Gemini Agent</span>
            </span>
          </div>

          <button
            type="button"
            className="relative p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-colors"
            title="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-[10px] font-bold rounded-full flex items-center justify-center text-white">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
