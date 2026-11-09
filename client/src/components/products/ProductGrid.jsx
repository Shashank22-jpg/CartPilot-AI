import React from 'react';
import { Package } from 'lucide-react';

export default function ProductGrid() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-blue-400" />
          <h3 className="text-sm font-semibold text-slate-200">Product Catalogue</h3>
        </div>
        <span className="text-xs text-slate-400">Structured Seed Inventory</span>
      </div>
      <div className="py-12 text-center text-slate-500 text-xs">
        Product catalogue module configured with evidence-based specifications.
      </div>
    </div>
  );
}
