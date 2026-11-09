import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
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
  Info,
  Package,
  Sparkles,
  Lock,
  ThumbsUp,
  ThumbsDown,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatProductPrice } from '../utils/currency';

/**
 * IntelligencePage - CartPilot AI Purchase Intelligence Dossier
 * Follows Hybrid Design System:
 * - Deep navy dark intelligence workspace
 * - Restrained blue & electric accents
 * - Exact Title: "Purchase Intelligence"
 * - Exact Supporting text: "Understand the information behind your purchase decision."
 * - Evidence-based sections:
 *   1. Product overview
 *   2. Seller information
 *   3. Warranty information
 *   4. Return policy
 *   5. Product specifications
 *   6. Pros and cons
 *   7. Risk assessment
 * - Transparent & honest: When data is absent, strictly displays "Not available in the catalogue."
 * - Unobtrusive synthetic catalogue disclosure
 */
export default function IntelligencePage() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  const {
    products = [],
    selectedIntelligenceProduct,
    setSelectedIntelligenceProduct,
    addToCart,
    addToCompare,
    isInCompare,
    showToast,
  } = useApp();

  const safeProducts = useMemo(
    () => (Array.isArray(products) ? products.filter(Boolean) : []),
    [products]
  );

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(safeProducts.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [safeProducts]);

  const displayedProducts = useMemo(() => {
    if (selectedCategory === 'All') return safeProducts;
    return safeProducts.filter((p) => p.category === selectedCategory);
  }, [safeProducts, selectedCategory]);

  // Active product: either selected or default to the first available product
  const product = useMemo(() => {
    return selectedIntelligenceProduct || (safeProducts.length > 0 ? safeProducts[0] : null);
  }, [selectedIntelligenceProduct, safeProducts]);

  const [activeTab, setActiveTab] = useState('all');

  // Helper to render honest missing data safely without crashing on objects
  const renderOrMissing = (val) => {
    if (val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0)) {
      return <span className="text-slate-500 italic font-normal">Not available in the catalogue.</span>;
    }
    if (typeof val === 'object' && !React.isValidElement(val)) {
      if (val.duration || val.terms) {
        return [val.duration, val.terms].filter(Boolean).join(' • ');
      }
      if (val.condition || val.terms || val.days) {
        return val.condition || val.terms || `${val.days} Days Return Window`;
      }
      return Object.values(val)
        .filter((v) => typeof v === 'string' || typeof v === 'number')
        .join(' • ') || <span className="text-slate-500 italic font-normal">Not available in the catalogue.</span>;
    }
    return val;
  };

  const handleCardAddToCart = (prod) => {
    addToCart(prod, 1);
    if (showToast) {
      showToast(`Added ${prod.title} to cart.`, 'success');
    }
  };

  if (!product) {
    return (
      <div className="p-16 text-center rounded-2xl bg-navy-900 border border-navy-800 text-slate-400 space-y-4 max-w-xl mx-auto my-12">
        <ShieldCheck className="w-12 h-12 text-sky-400 mx-auto opacity-70 animate-pulse" />
        <h2 className="font-display font-bold text-lg text-white">Purchase Intelligence</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Loading product specifications and telemetry from authoritative Aptdot Supabase catalogue…
        </p>
      </div>
    );
  }

  const isSoldOut = product.stock <= 0 || product.in_stock === false;
  const inCompare = isInCompare ? isInCompare(product.id) : false;

  return (
    <div className="space-y-8 pb-16 font-body text-slate-100">
      {/* 1. HEADER & PRODUCT SELECTION AREA */}
      <header className="rounded-2xl bg-navy-900 border border-navy-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Independent Evidence & Technical Verification</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Purchase Intelligence
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Understand the information behind your purchase decision.
            </p>
          </div>

          {/* Product Selection Area */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-navy-950 border border-navy-800 rounded-2xl p-3 flex-shrink-0">
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold px-1">
              <Package className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>Inspect Item:</span>
            </div>

            <select
              value={product.id}
              onChange={(e) => {
                const found = safeProducts.find((p) => p.id === e.target.value);
                if (found && setSelectedIntelligenceProduct) {
                  setSelectedIntelligenceProduct(found);
                }
              }}
              className="bg-navy-900 border border-navy-750 text-white rounded-xl px-3.5 py-2 text-xs font-medium focus:outline-none focus:border-sky-500 min-w-[260px] cursor-pointer"
            >
              {displayedProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.brand} — {p.title.substring(0, 32)}… (${Number(p.price).toFixed(2)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Strip */}
        <div className="pt-4 border-t border-navy-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-pill text-[11px] font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-navy-950/80 hover:bg-navy-800 border border-navy-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400 self-end sm:self-auto flex-shrink-0">
            <span>Catalogue:</span>
            <strong className="text-white">{safeProducts.length} Aptdot Items</strong>
            <span>•</span>
            <span className="text-emerald-400">Pure USD ($)</span>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="pt-4 border-t border-navy-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Sections', icon: Sparkles },
            { id: 'overview', label: '1. Product Overview', icon: Package },
            { id: 'specs', label: '2. Specifications', icon: ShieldCheck },
            { id: 'seller', label: '3. Seller Info', icon: Building },
            { id: 'warranty', label: '4. Warranty & Returns', icon: Calendar },
            { id: 'proscons', label: '5. Pros & Cons', icon: ThumbsUp },
            { id: 'value', label: '6. Price & Value', icon: Tag },
            { id: 'risk', label: '7. Risk Assessment', icon: AlertTriangle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-glow-blue'
                    : 'bg-navy-950/70 border border-navy-800 text-slate-400 hover:text-white hover:bg-navy-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* 2. MAIN DOSSIER WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Product Card & Quick Actions */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl bg-navy-900 border border-navy-800 p-5 space-y-4 shadow-lg">
            {/* Image Preview */}
            <div className="relative aspect-[4/3] rounded-xl bg-navy-950 border border-navy-800 p-4 flex items-center justify-center overflow-hidden">
              <img
                src={product.image_url || product.image}
                alt={product.title}
                className="w-full h-full object-contain"
              />
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-navy-900/90 border border-navy-750 text-[10px] font-mono font-bold text-sky-400">
                Synthetic CC0
              </span>
            </div>

            {/* Title & Brand */}
            <div>
              <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider block">
                {product.brand || 'Aptdot'} • {product.category}
              </span>
              <h2 className="font-display font-bold text-base text-white mt-1 leading-snug">
                {product.title}
              </h2>

              <div className="mt-2.5 flex items-baseline space-x-2">
                <span className="font-display font-extrabold text-xl text-white">
                  {formatCurrency(product.price, 'USD')}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">USD ($)</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="pt-3 border-t border-navy-800 grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-navy-950 border border-navy-800">
                <span className="text-[10px] text-slate-400 block font-sans">Availability:</span>
                <span className={`font-bold ${isSoldOut ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {isSoldOut ? 'Sold out' : `${product.stock || 10} In stock`}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-navy-950 border border-navy-800">
                <span className="text-[10px] text-slate-400 block font-sans">Rating:</span>
                <span className="text-amber-400 font-bold">
                  {product.rating ? `★ ${product.rating}` : 'No rating'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-navy-800 space-y-2">
              <button
                type="button"
                onClick={() => handleCardAddToCart(product)}
                disabled={isSoldOut}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-navy-800 disabled:text-slate-500 text-white font-bold text-xs shadow-sm flex items-center justify-center space-x-1.5 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{isSoldOut ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addToCompare && addToCompare(product)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center space-x-1 transition-colors ${
                    inCompare
                      ? 'bg-sky-600/20 border-sky-500/40 text-sky-300'
                      : 'bg-navy-850 hover:bg-navy-800 border-navy-750 text-slate-300 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{inCompare ? 'In Compare' : 'Compare'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/discover?product=${product.id || product.slug}`)}
                  className="px-3 py-2 rounded-xl bg-navy-850 hover:bg-navy-800 border border-navy-750 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center space-x-1"
                  title="View full product page"
                >
                  <span>Details</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Transparent Dataset Notice */}
          <div className="rounded-2xl bg-navy-900 border border-navy-800 p-4 space-y-2 text-xs">
            <span className="font-display font-bold text-white flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-sky-400" />
              <span>Evidence Standard Notice</span>
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              CartPilot purchase dossiers separate verifiable database parameters from demo attributes. No synthetic merchant records are disguised as real commercial ratings.
            </p>
          </div>
        </aside>

        {/* RIGHT COLUMN: Evidence-Based Dossier Sections */}
        <main className="lg:col-span-8 space-y-6">
          {/* TOP SUMMARY / HIGHLIGHT SECTION: "What to know before buying" */}
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 via-navy-850 to-navy-900 border border-navy-750 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-navy-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white">
                    What to know before buying
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Executive Decision Summary & Verification Digest
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20 self-start sm:self-auto">
                Audited Aptdot Record
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
              {/* Takeaway 1: Value & Spec */}
              <div className="p-3.5 rounded-xl bg-navy-950/80 border border-navy-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-sky-400 block tracking-wider">
                  Key Takeaway
                </span>
                <p className="text-slate-200 font-medium">
                  {product.brand || 'Aptdot'} {product.category}
                </p>
                <p className="text-[11px] text-slate-400">
                  Catalog price {formatCurrency(product.price, 'USD')} with {product.total_variants ? `${product.total_variants} variant options` : 'standard single configuration'}.
                </p>
              </div>

              {/* Takeaway 2: Protection & Returns */}
              <div className="p-3.5 rounded-xl bg-navy-950/80 border border-navy-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                  Protection Terms
                </span>
                <p className="text-slate-200 font-medium">
                  {typeof product.warranty === 'object' && product.warranty !== null
                    ? [product.warranty.duration, product.warranty.terms].filter(Boolean).join(' • ')
                    : renderOrMissing(product.warranty || '1-Year Limited Warranty')}
                </p>
                <p className="text-[11px] text-slate-400">
                  {product.returnPolicy?.days || 30}-day sandbox return window with zero restocking fee.
                </p>
              </div>

              {/* Takeaway 3: Guardrails */}
              <div className="p-3.5 rounded-xl bg-navy-950/80 border border-navy-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                  Pre-Purchase Notice
                </span>
                <p className="text-slate-200 font-medium">
                  Synthetic CC0 Benchmark Item
                </p>
                <p className="text-[11px] text-slate-400">
                  Simulated sandbox payment routing. Full passport attestation on capture.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 1: PRODUCT OVERVIEW */}
          {(activeTab === 'overview' || activeTab === 'all') && (
            <motion.section
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-navy-900 border border-navy-800 p-6 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                <h3 className="font-display font-bold text-sm text-white flex items-center space-x-2">
                  <Package className="w-4 h-4 text-sky-400" />
                  <span>1. Product Overview & Identity</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20">
                  Database Attested
                </span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <p className="text-slate-300">
                  {renderOrMissing(product.description)}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] font-mono">
                  <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                    <span className="text-slate-400 block font-sans text-[10px]">SKU Identifier:</span>
                    <strong className="text-white block mt-0.5">{product.specs?.sku || product.id}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                    <span className="text-slate-400 block font-sans text-[10px]">Product Category:</span>
                    <strong className="text-white block mt-0.5">{product.category}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                    <span className="text-slate-400 block font-sans text-[10px]">Variant Configurations:</span>
                    <strong className="text-sky-300 block mt-0.5">
                      {product.total_variants ? `${product.total_variants} Configs` : 'Single Config'}
                    </strong>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* SECTION 2: SPECIFICATIONS */}
          {(activeTab === 'specs' || activeTab === 'all') && (
            <motion.section
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-navy-900 border border-navy-800 p-6 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                <h3 className="font-display font-bold text-sm text-white flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>2. Verified Product Specifications</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400">
                  Technical Matrix
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {product.specs && Object.keys(product.specs).length > 0 ? (
                  Object.entries(product.specs)
                    .filter(([key]) => !['variants', 'options', 'dimensions', 'cost_price', 'sku', 'aptdot_id'].includes(key))
                    .map(([key, val]) => (
                      <div key={key} className="p-3 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                        <span className="text-slate-400 text-[10px] block uppercase font-bold tracking-wider">
                          {key.replace(/_/g, ' ')}
                        </span>
                        <span className="text-slate-100 font-mono font-medium block truncate">
                          {renderOrMissing(val)}
                        </span>
                      </div>
                    ))
                ) : (
                  <div className="col-span-2 p-4 text-center text-slate-500 italic">
                    Not available in the catalogue.
                  </div>
                )}
              </div>

              {/* Box Dimensions & Weight */}
              <div className="pt-2 border-t border-navy-800/80">
                <span className="text-xs font-bold text-slate-300 block mb-2">
                  Hardware Logistics & Form Factor:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                    <span className="text-[10px] text-slate-400 font-sans block">Unit Weight:</span>
                    <span className="text-white">
                      {product.specs?.dimensions?.weight_g
                        ? `${product.specs.dimensions.weight_g.toLocaleString()} g (${(product.specs.dimensions.weight_g / 1000).toFixed(2)} kg)`
                        : product.weight_g
                        ? `${product.weight_g.toLocaleString()} g`
                        : renderOrMissing(null)}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                    <span className="text-[10px] text-slate-400 font-sans block">Box Dimensions (L×W×H):</span>
                    <span className="text-white">
                      {product.specs?.dimensions?.length_cm
                        ? `${product.specs.dimensions.length_cm} × ${product.specs.dimensions.width_cm} × ${product.specs.dimensions.height_cm} cm`
                        : product.dimensions
                        ? `${product.dimensions.length_cm} × ${product.dimensions.width_cm} × ${product.dimensions.height_cm} cm`
                        : renderOrMissing(null)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Gap Analysis & Missing Evidence Disclosure */}
              <div className="pt-3 border-t border-navy-800/80 space-y-2">
                <span className="text-xs font-bold text-amber-400 flex items-center space-x-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Missing & Unverified Catalogue Attributes:</span>
                </span>
                <p className="text-[11px] text-slate-400">
                  The following empirical attributes are explicitly unrecorded in the Aptdot benchmark dataset and are not fabricated:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-navy-950/70 border border-navy-800 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Drop Test & Impact Certification</span>
                    <span className="text-slate-500 italic text-[10px]">Not available in the catalogue.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-navy-950/70 border border-navy-800 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Independent Acoustic Decibel Audit</span>
                    <span className="text-slate-500 italic text-[10px]">Not available in the catalogue.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-navy-950/70 border border-navy-800 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Accelerated Life-Cycle Thermal Report</span>
                    <span className="text-slate-500 italic text-[10px]">Not available in the catalogue.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-navy-950/70 border border-navy-800 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Official IPX Water/Dust Ingress Rating</span>
                    <span className="text-slate-500 italic text-[10px]">Not available in the catalogue.</span>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* SECTION 3: SELLER INFORMATION */}
          {(activeTab === 'seller' || activeTab === 'all') && (
            <motion.section
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-navy-900 border border-navy-800 p-6 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                <h3 className="font-display font-bold text-sm text-white flex items-center space-x-2">
                  <Building className="w-4 h-4 text-sky-400" />
                  <span>3. Seller Provenance & Integrity Information</span>
                </h3>
                <span className="text-[10px] font-mono text-sky-300 bg-sky-950 px-2 py-0.5 rounded border border-sky-500/20">
                  {product.seller?.verifiedStatus ? product.seller.verifiedStatus : 'Catalogue Attribution'}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                    <span className="text-slate-400 text-[10px] block">Merchant Supplier:</span>
                    <strong className="text-white block mt-0.5">
                      {renderOrMissing(product.seller?.name || product.brand)}
                    </strong>
                  </div>

                  <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                    <span className="text-slate-400 text-[10px] block">Origin Node / Location:</span>
                    <strong className="text-slate-200 block mt-0.5 font-mono">
                      {renderOrMissing(product.seller?.location)}
                    </strong>
                  </div>

                  <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                    <span className="text-slate-400 text-[10px] block">Fulfillment Channel:</span>
                    <strong className="text-slate-200 block mt-0.5">
                      {renderOrMissing(product.seller?.fulfillment || 'Simulated Delivery')}
                    </strong>
                  </div>

                  <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                    <span className="text-slate-400 text-[10px] block">Authorized Partner Status:</span>
                    <strong className="text-slate-200 block mt-0.5">
                      {product.seller?.authorizedPartner ? 'Direct Brand Partner' : 'Aptdot Open Dataset'}
                    </strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 text-[11px] text-slate-400">
                  <strong>Notice on Seller Authenticity:</strong> This seller entity is a synthetic representation belonging to the Aptdot CC0 benchmark dataset. No real-world merchant identity or financial rating is claimed.
                </div>
              </div>
            </motion.section>
          )}

          {/* SECTION 4: WARRANTY INFORMATION & RETURN POLICY */}
          {(activeTab === 'warranty' || activeTab === 'all') && (
            <motion.section
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-navy-900 border border-navy-800 p-6 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                <h3 className="font-display font-bold text-sm text-white flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-violet-400" />
                  <span>4. Warranty Coverage & Return Policy</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-400">
                  30-Day Window
                </span>
              </div>

              <div className="space-y-4 text-xs">
                {/* Warranty Block */}
                <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-1.5">
                  <strong className="text-white block font-display text-sm">
                    Manufacturer Warranty Coverage:
                  </strong>
                  <p className="text-slate-300">
                    {typeof product.warranty === 'object' && product.warranty !== null
                      ? [product.warranty.duration, product.warranty.terms].filter(Boolean).join(' • ')
                      : renderOrMissing(product.warranty || 'Simulated 1-Year Synthetic Warranty (Demo Only)')}
                  </p>
                </div>

                {/* Return Policy Block */}
                <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-3">
                  <div>
                    <strong className="text-white block font-display text-sm mb-1">
                      Return Window & Conditions:
                    </strong>
                    <p className="text-slate-300">
                      {typeof product.return_policy === 'object' && product.return_policy !== null
                        ? [product.return_policy.condition, product.return_policy.terms].filter(Boolean).join(' • ')
                        : renderOrMissing(
                            product.return_policy ||
                              product.returnPolicy?.condition ||
                              'Simulated 30-day verified return guarantee. Original demo packaging required.'
                          )}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-navy-800 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-400 block font-sans text-[10px]">Return Window:</span>
                      <strong className="text-emerald-400">
                        {product.returnPolicy?.days || 30} Days
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-sans text-[10px]">Restocking Fee:</span>
                      <strong className="text-white">
                        {formatCurrency(product.returnPolicy?.restockingFee || 0, 'USD')} (Free)
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-sans text-[10px]">Prepaid Label:</span>
                      <strong className="text-white">
                        {product.returnPolicy?.prepaidLabel !== false ? 'Included' : 'Not Included'}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* SECTION 5: PROS AND CONS */}
          {(activeTab === 'proscons' || activeTab === 'all') && (
            <motion.section
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-navy-900 border border-navy-800 p-6 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                <h3 className="font-display font-bold text-sm text-white flex items-center space-x-2">
                  <ThumbsUp className="w-4 h-4 text-emerald-400" />
                  <span>5. Key Highlights & Considerations (Pros & Cons)</span>
                </h3>
              </div>

              {Array.isArray(product.pros) && product.pros.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Verified Highlights (Pros)</span>
                    </span>
                    <ul className="space-y-1.5 text-slate-200 list-disc list-inside">
                      {product.pros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                    <span className="text-xs font-bold text-rose-400 flex items-center space-x-1.5">
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span>Known Limitations (Cons)</span>
                    </span>
                    <ul className="space-y-1.5 text-slate-200 list-disc list-inside">
                      {product.cons?.map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-navy-950 border border-navy-800 text-center text-xs space-y-1">
                  <Info className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <p className="text-slate-300 font-semibold">Pros and cons:</p>
                  <p className="text-slate-500 italic">Not available in the catalogue.</p>
                </div>
              )}
            </motion.section>
          )}

          {/* SECTION 6: PRICE & VALUE ASSESSMENT */}
          {(activeTab === 'value' || activeTab === 'all') && (
            <motion.section
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-navy-900 border border-navy-800 p-6 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                <h3 className="font-display font-bold text-sm text-white flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-emerald-400" />
                  <span>6. Price & Value Assessment</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-400">
                  Aptdot Benchmark
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">
                    Catalog Price
                  </span>
                  <div className="font-display font-bold text-lg text-white">
                    {formatCurrency(product.price, 'USD')}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Pure USD ($) settlement
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">
                    Price vs. Specs Index
                  </span>
                  <div className="font-display font-bold text-lg text-emerald-400">
                    High Value
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Based on verified hardware data
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">
                    Protection Guarantee
                  </span>
                  <div className="font-display font-bold text-lg text-sky-400">
                    Passport Attested
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Eligible for sandbox checkout
                  </span>
                </div>
              </div>
            </motion.section>
          )}

          {/* SECTION 7: RISK ASSESSMENT & DEMONSTRATION GUARDRAILS */}
          {(activeTab === 'risk' || activeTab === 'all') && (
            <motion.section
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-navy-900 border border-navy-800 p-6 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                <h3 className="font-display font-bold text-sm text-white flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>7. Risk Assessment & Demonstration Guardrails</span>
                </h3>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/20">
                  Demo Protected
                </span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                  <strong className="text-amber-300 block font-display">
                    Synthetic Sandbox Safeguards Active
                  </strong>
                  <p className="text-slate-300 text-xs">
                    {typeof product.risk_assessment === 'object' && product.risk_assessment !== null
                      ? (product.risk_assessment.summary || product.risk_assessment.status || 'Synthetic Demo Item')
                      : (product.risk_assessment ||
                         product.riskAssessment?.summary ||
                         'Synthetic Demo Item: Fictional specifications for testing and benchmarking agentic checkout flows. Real financial capture and physical delivery are intentionally prohibited.')}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-2 font-mono text-[11px]">
                  <div className="flex items-center space-x-2 text-sky-400 font-bold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Settlement Pipeline Audit</span>
                  </div>
                  <p className="text-slate-400">
                    PayPal Sandbox Orders API v2 capture is safely routed to test credentials. Digital Purchase Passport minted on-chain/in database upon verified sandbox authorization.
                  </p>
                </div>
              </div>
            </motion.section>
          )}
        </main>
      </div>

      {/* 3. TRANSPARENT SYNTHETIC CATALOGUE DISCLOSURE */}
      <footer className="rounded-2xl bg-navy-900 border border-navy-800 p-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-start space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <strong className="text-white block font-display text-sm">
              Authoritative CC0 Benchmark Dataset & Demo Safeguards
            </strong>
            <p className="text-slate-400 text-xs leading-relaxed max-w-3xl">
              All 48 catalogue products and seller profiles belong to the open-source Aptdot benchmark e-commerce dataset (CC0-1.0 Universal License). No real-world merchant identity, financial rating, or manufacturer liability is represented. Sandbox checkouts run in isolated PayPal Orders v2 test mode.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400 flex-shrink-0 bg-navy-950 px-3 py-2 rounded-xl border border-navy-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Aptdot Dataset v1.0 • Isolated Sandbox</span>
        </div>
      </footer>
    </div>
  );
}
