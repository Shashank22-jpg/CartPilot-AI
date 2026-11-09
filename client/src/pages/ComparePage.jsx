import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Layers,
  X,
  Plus,
  ShieldCheck,
  ShoppingCart,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ComparePage() {
  const navigate = useNavigate();
  const {
    products,
    compareList,
    removeFromCompare,
    addToCompare,
    addToCart,
    clearCompare,
    setSelectedIntelligenceProduct,
  } = useApp();

  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Available products not in compare list
  const availableToAdd = products.filter(
    (p) => !compareList.some((c) => c.id === p.id)
  );

  // Collect all unique spec keys across compared products
  const allSpecKeys = Array.from(
    new Set(compareList.flatMap((p) => Object.keys(p.specs || {})))
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner & Controls */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span>Side-by-Side Tradeoff Matrix</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Product Specification & Risk Comparison
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Evaluating {compareList.length} products across technical specs, return rights, and manufacturer warranty coverage.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {compareList.length < 4 && (
            <button
              onClick={() => setIsAddingProduct(true)}
              className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 border border-navy-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Plus className="w-4 h-4 text-electric-400" />
              <span>Add Product</span>
            </button>
          )}

          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="px-3.5 py-2 rounded-xl bg-navy-950 hover:bg-navy-800 text-slate-400 hover:text-rose-400 text-xs border border-navy-800 transition-colors"
            >
              Clear Matrix
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {compareList.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-navy-800 flex items-center justify-center text-slate-500 mx-auto">
            <Layers className="w-7 h-7" />
          </div>
          <h3 className="text-sm font-bold text-white">No products selected for comparison</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Add up to 4 products from the catalogue or AI assistant to inspect granular specification differences and warranty policies.
          </p>
          <div className="pt-2">
            <Link
              to="/discover"
              className="px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold shadow-glow-blue inline-flex items-center space-x-1.5"
            >
              <span>Explore Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Comparison Cards Header Row */}
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[700px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {compareList.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl bg-navy-900 border border-navy-800 p-4 space-y-3 relative flex flex-col justify-between"
                >
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-3 right-3 p-1 rounded-lg bg-navy-950 text-slate-400 hover:text-white border border-navy-800 transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    <div className="aspect-video rounded-xl overflow-hidden bg-navy-950 mb-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      {product.brand} • {product.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-100 line-clamp-2 mt-0.5">
                      {product.title}
                    </h4>

                    <div className="mt-2 flex items-baseline space-x-2">
                      <span className="text-base font-extrabold font-mono text-white">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-[10px] line-through text-slate-500 font-mono">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-navy-800/80 space-y-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs shadow-glow-blue flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedIntelligenceProduct(product);
                        navigate('/intelligence');
                      }}
                      className="w-full py-1.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white text-[11px] font-medium flex items-center justify-center space-x-1 transition-colors"
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Inspect Dossier</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Suitability Assessment Verdict */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-navy-750 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-white">
              <Sparkles className="w-4 h-4 text-electric-400" />
              <span>AI Suitability Assessment & Tradeoff Recommendation</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {compareList.map((product) => (
                <div key={product.id} className="p-4 rounded-xl bg-navy-950 border border-navy-800 text-xs space-y-2">
                  <div className="flex items-center space-x-1.5 text-electric-400 font-bold">
                    <Award className="w-4 h-4" />
                    <span className="truncate">{product.brand} Verdict</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    <strong>Pros:</strong> {product.pros[0]}
                  </p>
                  <p className="text-slate-400 text-[10px] leading-relaxed">
                    <strong>Watchout:</strong> {product.cons[0]}
                  </p>
                  <div className="pt-2 border-t border-navy-800 text-[10px] font-mono text-emerald-400">
                    Confidence: {product.evidence.overallConfidenceScore}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Granular Specification Comparison Table */}
          <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Technical Specifications Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-navy-800 text-slate-400">
                    <th className="py-3 px-4 font-semibold w-1/4">Specification</th>
                    {compareList.map((product) => (
                      <th key={product.id} className="py-3 px-4 font-bold text-slate-200">
                        {product.brand}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800/60 font-mono text-[11px]">
                  {allSpecKeys.map((key) => (
                    <tr key={key} className="hover:bg-navy-850/50">
                      <td className="py-2.5 px-4 font-sans font-medium text-slate-400">{key}</td>
                      {compareList.map((product) => (
                        <td key={product.id} className="py-2.5 px-4 text-slate-200">
                          {product.specs[key] || <span className="text-slate-600 font-sans italic">N/A</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Warranty & Return Policy Comparison Table */}
          <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Warranty Duration & Return Rights Comparison</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-navy-800 text-slate-400">
                    <th className="py-3 px-4 font-semibold w-1/4">Protection Metric</th>
                    {compareList.map((product) => (
                      <th key={product.id} className="py-3 px-4 font-bold text-slate-200">
                        {product.brand}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800/60 text-[11px]">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Return Window</td>
                    {compareList.map((product) => (
                      <td key={product.id} className="py-3 px-4 font-mono font-bold text-amber-400">
                        {product.returnPolicy.days} Calendar Days
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Restocking Fee</td>
                    {compareList.map((product) => (
                      <td key={product.id} className="py-3 px-4 font-mono text-emerald-400">
                        ${product.returnPolicy.restockingFee} (Free Returns)
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Prepaid Return Label</td>
                    {compareList.map((product) => (
                      <td key={product.id} className="py-3 px-4">
                        {product.returnPolicy.prepaidLabel ? (
                          <span className="text-emerald-400 flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Included</span>
                          </span>
                        ) : (
                          <span className="text-rose-400">Buyer Pays</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Manufacturer Warranty</td>
                    {compareList.map((product) => (
                      <td key={product.id} className="py-3 px-4 font-mono text-white">
                        {product.evidence.warrantyMonths} Months
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-400">Fulfillment Partner</td>
                    {compareList.map((product) => (
                      <td key={product.id} className="py-3 px-4 text-slate-300">
                        {product.seller.fulfillment}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-navy-900 border border-navy-750 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <span className="text-xs font-bold text-white">Select Product to Add</span>
              <button
                onClick={() => setIsAddingProduct(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2">
              {availableToAdd.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    addToCompare(product);
                    setIsAddingProduct(false);
                  }}
                  className="p-3 rounded-xl bg-navy-950 border border-navy-800 hover:border-electric-500 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-10 h-10 rounded-lg object-cover bg-navy-900"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-200 truncate">{product.title}</p>
                      <p className="text-[10px] text-slate-400">{product.brand} • ${product.price}</p>
                    </div>
                  </div>
                  <Plus className="w-4 h-4 text-electric-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
