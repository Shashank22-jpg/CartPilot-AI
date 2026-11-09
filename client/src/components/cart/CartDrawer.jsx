import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
        <ShoppingBag className="w-5 h-5 text-indigo-400" />
        <h3 className="text-sm font-semibold text-slate-200">Cart & Checkout Staging</h3>
      </div>
      <div className="py-8 text-center text-slate-500 text-xs">
        Cart module ready for agent-assisted item curation and budget tracking.
      </div>
    </div>
  );
}
