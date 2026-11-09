import React from 'react';
import { ShieldCheck, Cpu, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-300">CartPilot AI</span>
          <span>•</span>
          <span>Built for the PayPal AI Hackathon 2026</span>
        </div>

        <div className="flex items-center space-x-6 text-slate-400">
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Strict Server-Side Verification</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Google Gemini Agentic AI</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span>Supabase PostgreSQL</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
