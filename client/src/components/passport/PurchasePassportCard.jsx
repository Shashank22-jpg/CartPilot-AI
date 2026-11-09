import React from 'react';
import { FileText, Calendar, ShieldCheck } from 'lucide-react';

export default function PurchasePassportCard() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
        <FileText className="w-5 h-5 text-cyan-400" />
        <h3 className="text-sm font-semibold text-slate-200">Digital Purchase Passport</h3>
      </div>
      <div className="py-6 flex flex-col items-center justify-center space-y-2 text-center text-xs text-slate-400">
        <div className="flex space-x-2 text-cyan-400 mb-1">
          <Calendar className="w-6 h-6" />
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
        </div>
        <p className="font-medium text-slate-300">Immutable Purchase Proof & Warranty Engine</p>
        <p className="text-slate-500 max-w-sm">
          Post-purchase tracking with automated return countdowns, warranty claims, and AI assistant.
        </p>
      </div>
    </div>
  );
}
