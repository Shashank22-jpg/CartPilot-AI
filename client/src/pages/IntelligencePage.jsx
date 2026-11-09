import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Building,
  Calendar,
  Layers,
  ShoppingCart,
  ExternalLink,
  Award,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function IntelligencePage() {
  const navigate = useNavigate();
  const {
    products,
    selectedIntelligenceProduct,
    setSelectedIntelligenceProduct,
    addToCart,
    addToCompare,
  } = useApp();

  const product = selectedIntelligenceProduct || products[0];

  return (
    <div className="space-y-6 pb-16">
      {/* Product Selector Header */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Autonomous Risk & Evidence Audit</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Purchase Intelligence Dossier
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Independent verification of manufacturer specifications, benchmark telemetry, seller authenticity, and return rights.
          </p>
        </div>

        {/* Product Switcher Dropdown */}
        <div className="flex items-center space-x-3">
          <span className="text-xs text-slate-400 hidden sm:inline">Inspect Gear:</span>
          <select
            value={product.id}
            onChange={(e) => {
              const found = products.find(p => p.id === e.target.value);
              if (found) setSelectedIntelligenceProduct(found);
            }}
            className="bg-navy-950 border border-navy-750 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-500 min-w-[220px]"
          >
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.brand} - {p.title.substring(0, 32)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Dossier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Product Summary & Seller Integrity */}
        <div className="space-y-6">
          {/* Product Profile Card */}
          <div className="rounded-2xl bg-navy-900 border border-navy-800 p-5 space-y-4">
            <div className="aspect-video rounded-xl overflow-hidden bg-navy-950">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                {product.brand} • {product.category}
              </span>
              <h3 className="text-sm font-bold text-white mt-1">
                {product.title}
              </h3>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-lg font-black font-mono text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs line-through text-slate-500 font-mono">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-navy-800 flex items-center space-x-2">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow-blue flex items-center justify-center space-x-1.5 transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => addToCompare(product)}
                className="px-3 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 text-xs font-semibold"
              >
                Compare
              </button>
            </div>
          </div>

          {/* Seller Authenticity Card */}
          <div className="rounded-2xl bg-navy-900 border border-navy-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <span className="text-xs font-bold text-white flex items-center space-x-2">
                <Building className="w-4 h-4 text-electric-400" />
                <span>Seller Integrity Analysis</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                {product.seller.verifiedStatus.toUpperCase()}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Merchant Channel:</span>
                <span className="text-slate-200 font-medium">{product.seller.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fulfillment Model:</span>
                <span className="text-slate-200">{product.seller.fulfillment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Physical Origin:</span>
                <span className="text-slate-200 font-mono">{product.seller.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Merchant Satisfaction:</span>
                <span className="text-emerald-400 font-bold">{product.seller.rating} / 5.0</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 text-[11px] text-slate-300 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                Authorized distribution tier confirmed. Direct warranty honored without gray-market exclusions.
              </span>
            </div>
          </div>
        </div>

        {/* Middle & Right Column: Evidence Matrix, Concerns, and Missing Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overall Confidence Score Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-navy-750 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                CartPilot Verification Algorithm
              </span>
              <h3 className="text-lg font-bold text-white">
                {product.riskAssessment.status}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md">
                {product.riskAssessment.summary}
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-navy-950/80 border border-navy-800 p-4 rounded-xl flex-shrink-0">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Confidence Score
                </span>
                <span className="text-2xl font-black font-mono text-emerald-400">
                  {product.evidence.overallConfidenceScore}%
                </span>
              </div>
              <Award className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          {/* Evidence Sources & Audited Benchmark List */}
          <div className="rounded-2xl bg-navy-900 border border-navy-800 p-6 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-electric-400" />
              <span>Independent Evidence Sources & Regulatory Documentation</span>
            </h3>

            <div className="space-y-2.5">
              {product.evidence.sources.map((src, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 flex items-center justify-between text-xs hover:border-navy-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-lg bg-electric-500/10 text-electric-400 flex items-center justify-center font-bold text-[10px]">
                      #{i + 1}
                    </div>
                    <span className="text-slate-200 font-medium">{src}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
                    Audited
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Technical Specifications Table */}
          <div className="rounded-2xl bg-navy-900 border border-navy-800 p-6 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Specifications vs. Manufacturer Claims</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="p-3 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                  <span className="text-slate-400 text-[11px] block">{key}</span>
                  <span className="text-slate-100 font-mono font-medium block truncate">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Potential Concerns & Missing Information (Critical for Integrity) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Potential Concerns / Watchouts */}
            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Potential Concerns & Market Watchouts</span>
              </div>
              <ul className="space-y-2 text-xs text-amber-200/90 leading-relaxed">
                {product.riskAssessment.concerns.map((c, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing or Unverified Information */}
            <div className="p-5 rounded-2xl bg-navy-900 border border-navy-750 space-y-3">
              <div className="flex items-center space-x-2 text-slate-300 text-xs font-bold">
                <HelpCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>Unavailable / Undisclosed Manufacturer Data</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {product.riskAssessment.missingInfo}
              </p>
              <div className="pt-2 text-[10px] text-slate-500 font-mono">
                Flagged for transparency per CartPilot Evidence Standards.
              </div>
            </div>
          </div>

          {/* Warranty & Return Rights Section */}
          <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <span className="text-xs font-bold text-white flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-violet-400" />
                <span>Audited Return & Warranty Guarantee</span>
              </span>
              <span className="text-xs font-mono text-emerald-400">
                {product.returnPolicy.days} Calendar Days Window
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                <span className="text-slate-400 text-[10px] block">Return Restocking Fee</span>
                <span className="text-white font-mono font-bold mt-1 block">
                  ${product.returnPolicy.restockingFee} (Zero Fee)
                </span>
              </div>
              <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                <span className="text-slate-400 text-[10px] block">Prepaid Return Label</span>
                <span className="text-emerald-400 font-bold mt-1 block">
                  {product.returnPolicy.prepaidLabel ? 'Provided by Merchant' : 'Buyer Expense'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                <span className="text-slate-400 text-[10px] block">Manufacturer Warranty</span>
                <span className="text-white font-mono font-bold mt-1 block">
                  {product.evidence.warrantyMonths} Months Active
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
              <strong>Condition Requirement:</strong> {product.returnPolicy.condition}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
