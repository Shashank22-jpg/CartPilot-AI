import React from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';

export default function PayPalCheckoutButton() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
        <CreditCard className="w-5 h-5 text-blue-400" />
        <h3 className="text-sm font-semibold text-slate-200">PayPal Sandbox Integration</h3>
      </div>
      <div className="py-6 flex flex-col items-center justify-center space-y-2 text-center text-xs text-slate-400">
        <ShieldCheck className="w-8 h-8 text-emerald-400/80 mb-1" />
        <p className="font-medium text-slate-300">Server-Side Order Creation & Verification Ready</p>
        <p className="text-slate-500 max-w-sm">
          PayPal Sandbox client configured to verify all captures exclusively on Express backend.
        </p>
      </div>
    </div>
  );
}
