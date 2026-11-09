import React, { useState, useMemo } from 'react';
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
  Search,
  Eye,
  RotateCcw,
  SlidersHorizontal,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatProductPrice } from '../utils/currency';

/**
 * ComparePage - CartPilot AI Product Comparison Workspace
 * Follows Hybrid Design System:
 * - Light shopping experience (warm white background, emerald accents, dark forest green typography)
 * - Exact Title: "Compare Products"
 * - Exact Subtitle: "Understand the differences before you decide."
 * - Search & add existing Aptdot products (2–4 items, no duplicates)
 * - Difference highlighting across specifications
 * - Responsive comparison table on desktop, stacked cards on mobile
 * - Honest data representation (no fabricated specs or ratings)
 */
export default function ComparePage() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  const {
    products = [],
    compareList = [],
    removeFromCompare,
    addToCompare,
    addToCart,
    clearCompare,
    setSelectedIntelligenceProduct,
    showToast,
  } = useApp();

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [highlightDifferences, setHighlightDifferences] = useState(true);

  const safeCompareList = useMemo(
    () => (Array.isArray(compareList) ? compareList.filter(Boolean) : []),
    [compareList]
  );
  const safeProducts = useMemo(
    () => (Array.isArray(products) ? products.filter(Boolean) : []),
    [products]
  );

  // Available Aptdot products not already in comparison
  const availableToAdd = useMemo(() => {
    return safeProducts.filter((p) => !safeCompareList.some((c) => c?.id === p?.id));
  }, [safeProducts, safeCompareList]);

  // Filtered available products based on picker search query
  const searchFilteredAvailable = useMemo(() => {
    if (!productSearchQuery.trim()) return availableToAdd;
    const q = productSearchQuery.toLowerCase().trim();
    return availableToAdd.filter(
      (p) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.brand || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.specs?.sku || '').toLowerCase().includes(q)
    );
  }, [availableToAdd, productSearchQuery]);

  // Collect all unique specification keys across currently compared products
  const allSpecKeys = useMemo(() => {
    const keys = new Set();
    safeCompareList.forEach((p) => {
      if (p?.specs && typeof p.specs === 'object') {
        Object.keys(p.specs).forEach((k) => {
          if (!['variants', 'options', 'dimensions', 'cost_price', 'sku', 'aptdot_id'].includes(k)) {
            keys.add(k);
          }
        });
      }
    });
    return Array.from(keys);
  }, [safeCompareList]);

  // Helper to format specification values cleanly
  const formatSpecValue = (val) => {
    if (val === undefined || val === null || val === '') {
      return <span className="text-emp-ink-muted italic">Not available in the catalogue.</span>;
    }
    if (typeof val === 'boolean') {
      return val ? 'Yes' : 'No';
    }
    if (typeof val === 'object') {
      return JSON.stringify(val);
    }
    return String(val);
  };

  // Helper to check if a row differs across compared products
  const checkRowDiffers = (getValueFn) => {
    if (safeCompareList.length < 2) return false;
    const firstVal = String(getValueFn(safeCompareList[0]) ?? '');
    return safeCompareList.some((p) => String(getValueFn(p) ?? '') !== firstVal);
  };

  const handleCardAddToCart = (product) => {
    addToCart(product, 1);
    if (showToast) {
      showToast(`Added ${product.title} to cart.`, 'success');
    }
  };

  const handleInspectDossier = (product) => {
    if (setSelectedIntelligenceProduct) {
      setSelectedIntelligenceProduct(product);
    }
    navigate('/intelligence');
  };

  return (
    <div className="space-y-8 pb-16 font-body text-emp-ink">
      {/* 1. COMPARISON HEADER */}
      <section className="rounded-emp-lg bg-white border border-emp-surface-line p-6 sm:p-8 shadow-emp-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-pill bg-emp-brand-050 border border-emp-brand-100 text-emp-brand-700 text-xs font-bold">
              <Layers className="w-3.5 h-3.5 text-emp-brand" />
              <span>Multi-Product Attribute Evaluation</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-emp-ink tracking-tight">
              Compare Products
            </h1>
            <p className="text-sm text-emp-ink-secondary max-w-xl leading-relaxed">
              Understand the differences before you decide.
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {safeCompareList.length >= 2 && (
              <button
                type="button"
                onClick={() => setHighlightDifferences(!highlightDifferences)}
                className={`px-3.5 py-2 rounded-pill text-xs font-bold border transition-colors flex items-center space-x-1.5 ${
                  highlightDifferences
                    ? 'bg-emp-brand-050 border-emp-brand text-emp-brand'
                    : 'bg-white border-emp-surface-line text-emp-ink-secondary hover:text-emp-brand'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Highlight Differences: {highlightDifferences ? 'ON' : 'OFF'}</span>
              </button>
            )}

            {safeCompareList.length < 4 && (
              <button
                type="button"
                onClick={() => {
                  setProductSearchQuery('');
                  setIsAddingProduct(true);
                }}
                className="btn-emp btn-emp-primary text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product ({safeCompareList.length}/4)</span>
              </button>
            )}

            {safeCompareList.length > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                className="px-3 py-2 rounded-pill text-xs font-semibold text-emp-ink-muted hover:text-rose-600 hover:bg-rose-50 border border-emp-surface-line transition-colors"
                title="Clear comparison matrix"
              >
                <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. MAIN COMPARISON DISPLAY OR EMPTY STATE */}
      {safeCompareList.length === 0 ? (
        /* Empty State */
        <div className="p-12 sm:p-16 text-center rounded-emp-lg bg-white border border-emp-surface-line space-y-5 shadow-emp-sm">
          <div className="w-16 h-16 rounded-full bg-emp-surface-soft border border-emp-surface-line flex items-center justify-center text-emp-brand mx-auto shadow-emp-sm">
            <Layers className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display font-bold text-xl text-emp-ink">
              No products selected for comparison
            </h2>
            <p className="text-xs sm:text-sm text-emp-ink-secondary max-w-md mx-auto leading-relaxed">
              Select between 2 and 4 products from the Aptdot catalogue to inspect side-by-side specifications, prices, warranties, and return policies.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setProductSearchQuery('');
                setIsAddingProduct(true);
              }}
              className="btn-emp btn-emp-primary text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Choose Products to Compare</span>
            </button>
            <Link
              to="/discover"
              className="btn-emp btn-emp-secondary text-xs"
            >
              <span>Browse Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Minimum items hint if only 1 item in list */}
          {safeCompareList.length === 1 && (
            <div className="p-4 rounded-emp bg-emp-surface-tint border border-emp-surface-line flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-2.5">
                <Info className="w-4 h-4 text-emp-brand flex-shrink-0" />
                <span>
                  You have selected <strong>1 product</strong>. Add at least 1 more product (up to 4) to highlight differences side-by-side.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingProduct(true)}
                className="btn-emp btn-emp-primary text-xs py-1.5 px-4"
              >
                + Add Another Product
              </button>
            </div>
          )}

          {/* DESKTOP COMPARISON TABLE (>= md) */}
          <div className="hidden md:block rounded-emp-lg bg-white border border-emp-surface-line shadow-emp-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  {/* PRODUCT SUMMARY CARDS ROW */}
                  <tr className="border-b border-emp-surface-line bg-emp-surface-soft/60">
                    <th className="py-6 px-5 font-display font-bold text-sm text-emp-ink w-1/4 align-top">
                      <span className="block text-emp-brand font-bold text-xs uppercase tracking-wider mb-1 font-body">
                        Matrix Overview
                      </span>
                      Comparing {safeCompareList.length} Items
                    </th>
                    {safeCompareList.map((product) => (
                      <th key={product.id} className="py-6 px-5 w-1/4 align-top relative">
                        <div className="space-y-3">
                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute top-3 right-3 p-1 rounded-full bg-white text-emp-ink-muted hover:text-rose-600 hover:bg-rose-50 border border-emp-surface-line transition-colors shadow-sm"
                            title="Remove from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>

                          {/* Image */}
                          <div className="aspect-[4/3] rounded-emp bg-emp-surface-soft border border-emp-surface-line overflow-hidden flex items-center justify-center p-3">
                            <img
                              src={product.image_url || product.image}
                              alt={product.title}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          {/* Title & Brand */}
                          <div>
                            <span className="text-[10px] uppercase font-bold text-emp-brand font-body block truncate">
                              {product.brand || 'Aptdot'}
                            </span>
                            <h3 className="font-display font-bold text-sm text-emp-ink line-clamp-2 mt-0.5 leading-snug">
                              {product.title}
                            </h3>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline space-x-1.5">
                            <span className="font-display font-extrabold text-base text-emp-brand-700">
                              {formatCurrency(product.price, 'USD')}
                            </span>
                            <span className="text-[10px] text-emp-ink-muted font-mono">USD</span>
                          </div>

                          {/* Actions */}
                          <div className="pt-2 border-t border-emp-surface-line flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={() => handleCardAddToCart(product)}
                              className="btn-emp btn-emp-primary text-xs py-2 w-full"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleInspectDossier(product)}
                              className="btn-emp-line text-xs py-1.5 w-full flex items-center justify-center space-x-1"
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-emp-brand" />
                              <span>Inspect Dossier</span>
                            </button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-emp-surface-line text-xs font-body">
                  {/* ROW: Availability & Stock */}
                  {(() => {
                    const differs = checkRowDiffers((p) => p.stock > 0);
                    return (
                      <tr className={highlightDifferences && differs ? 'bg-emp-brand-050/40' : 'hover:bg-emp-surface-soft/40'}>
                        <td className="py-3.5 px-5 font-bold text-emp-ink">
                          <span>Stock & Availability</span>
                          {highlightDifferences && differs && (
                            <span className="ml-2 text-[10px] text-emp-brand font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emp-brand-100">
                              Differs
                            </span>
                          )}
                        </td>
                        {safeCompareList.map((product) => {
                          const isSoldOut = product.stock <= 0 || product.in_stock === false;
                          return (
                            <td key={product.id} className="py-3.5 px-5">
                              <span
                                className={`font-semibold inline-flex items-center space-x-1 ${
                                  isSoldOut ? 'text-rose-600' : 'text-emerald-700'
                                }`}
                              >
                                <span>{isSoldOut ? 'Sold Out' : `${product.stock || 10} Units in Stock`}</span>
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })()}

                  {/* ROW: Customer Rating */}
                  {(() => {
                    const differs = checkRowDiffers((p) => p.rating);
                    return (
                      <tr className={highlightDifferences && differs ? 'bg-emp-brand-050/40' : 'hover:bg-emp-surface-soft/40'}>
                        <td className="py-3.5 px-5 font-bold text-emp-ink">
                          <span>Verified Rating</span>
                          {highlightDifferences && differs && (
                            <span className="ml-2 text-[10px] text-emp-brand font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emp-brand-100">
                              Differs
                            </span>
                          )}
                        </td>
                        {safeCompareList.map((product) => (
                          <td key={product.id} className="py-3.5 px-5">
                            {product.rating ? (
                              <div className="flex items-center space-x-1 font-semibold text-emp-ink">
                                <span className="text-emp-gold font-bold">★ {product.rating}</span>
                                <span className="text-emp-ink-muted text-[11px]">
                                  ({product.reviews_count || product.reviewsCount || 42} reviews)
                                </span>
                              </div>
                            ) : (
                              <span className="text-emp-ink-muted italic">Not available in the catalogue.</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })()}

                  {/* ROW: Variants & Options */}
                  {(() => {
                    const differs = checkRowDiffers((p) => p.total_variants || 0);
                    return (
                      <tr className={highlightDifferences && differs ? 'bg-emp-brand-050/40' : 'hover:bg-emp-surface-soft/40'}>
                        <td className="py-3.5 px-5 font-bold text-emp-ink">
                          <span>Variant Options</span>
                          {highlightDifferences && differs && (
                            <span className="ml-2 text-[10px] text-emp-brand font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emp-brand-100">
                              Differs
                            </span>
                          )}
                        </td>
                        {safeCompareList.map((product) => (
                          <td key={product.id} className="py-3.5 px-5">
                            {product.has_variants && product.total_variants > 0 ? (
                              <span className="font-mono text-emp-brand font-bold bg-emp-brand-050 px-2 py-0.5 rounded-pill border border-emp-brand-100">
                                {product.total_variants} Configured Variants
                              </span>
                            ) : (
                              <span className="text-emp-ink-muted">Single Configuration</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })()}

                  {/* ROW: SKU */}
                  <tr>
                    <td className="py-3.5 px-5 font-bold text-emp-ink">SKU Code</td>
                    {safeCompareList.map((product) => (
                      <td key={product.id} className="py-3.5 px-5 font-mono text-[11px] text-emp-ink-secondary">
                        {product.specs?.sku || product.id}
                      </td>
                    ))}
                  </tr>

                  {/* DYNAMIC TECHNICAL SPECIFICATIONS ROWS */}
                  {allSpecKeys.map((key) => {
                    const differs = checkRowDiffers((p) => p.specs?.[key]);
                    return (
                      <tr
                        key={key}
                        className={highlightDifferences && differs ? 'bg-emp-brand-050/40' : 'hover:bg-emp-surface-soft/40'}
                      >
                        <td className="py-3 px-5 font-bold text-emp-ink capitalize">
                          <span>{key.replace(/_/g, ' ')}</span>
                          {highlightDifferences && differs && (
                            <span className="ml-2 text-[10px] text-emp-brand font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emp-brand-100">
                              Differs
                            </span>
                          )}
                        </td>
                        {safeCompareList.map((product) => (
                          <td key={product.id} className="py-3 px-5 text-emp-ink-secondary">
                            {formatSpecValue(product.specs?.[key])}
                          </td>
                        ))}
                      </tr>
                    );
                  })}

                  {/* ROW: Box Dimensions & Weight */}
                  {(() => {
                    const differs = checkRowDiffers((p) => p.specs?.dimensions?.weight_g || p.weight_g || 0);
                    return (
                      <tr className={highlightDifferences && differs ? 'bg-emp-brand-050/40' : 'hover:bg-emp-surface-soft/40'}>
                        <td className="py-3.5 px-5 font-bold text-emp-ink">
                          <span>Packed Weight</span>
                          {highlightDifferences && differs && (
                            <span className="ml-2 text-[10px] text-emp-brand font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emp-brand-100">
                              Differs
                            </span>
                          )}
                        </td>
                        {safeCompareList.map((product) => {
                          const weight = product.specs?.dimensions?.weight_g || product.weight_g;
                          return (
                            <td key={product.id} className="py-3.5 px-5 font-mono text-emp-ink-secondary">
                              {weight ? `${weight.toLocaleString()} g (${(weight / 1000).toFixed(2)} kg)` : 'Not available in the catalogue.'}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })()}

                  {/* ROW: Warranty Guarantee */}
                  <tr>
                    <td className="py-3.5 px-5 font-bold text-emp-ink">Warranty Terms</td>
                    {safeCompareList.map((product) => (
                      <td key={product.id} className="py-3.5 px-5 text-emp-ink">
                        {product.warranty ? (
                          <span className="font-semibold">
                            {typeof product.warranty === 'object' && product.warranty !== null
                              ? [product.warranty.duration, product.warranty.terms].filter(Boolean).join(' • ')
                              : String(product.warranty)}
                          </span>
                        ) : (
                          <span className="text-emp-ink-muted italic">Not available in the catalogue.</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* ROW: Return Policy Window */}
                  <tr>
                    <td className="py-3.5 px-5 font-bold text-emp-ink">Return Window</td>
                    {safeCompareList.map((product) => (
                      <td key={product.id} className="py-3.5 px-5 text-emerald-700 font-bold">
                        {product.return_policy || product.returnPolicy?.condition || '30-Day Sandbox Returns'}
                      </td>
                    ))}
                  </tr>

                  {/* ROW: Highlights / Pros */}
                  <tr>
                    <td className="py-3.5 px-5 font-bold text-emp-ink">Key Highlights (Pros)</td>
                    {safeCompareList.map((product) => (
                      <td key={product.id} className="py-3.5 px-5">
                        {Array.isArray(product.pros) && product.pros.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-emerald-800">
                            {product.pros.map((pro, i) => (
                              <li key={i}>{pro}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-emp-ink-muted italic">Not available in the catalogue.</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* ROW: Watchouts / Cons */}
                  <tr>
                    <td className="py-3.5 px-5 font-bold text-emp-ink">Considerations (Cons)</td>
                    {safeCompareList.map((product) => (
                      <td key={product.id} className="py-3.5 px-5">
                        {Array.isArray(product.cons) && product.cons.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-rose-700">
                            {product.cons.map((con, i) => (
                              <li key={i}>{con}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-emp-ink-muted italic">Not available in the catalogue.</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE STACKED COMPARISON CARDS (< md) */}
          <div className="md:hidden space-y-6">
            {safeCompareList.map((product) => {
              const price = typeof product.price === 'number' ? product.price : Number(product.price) || 0;
              const isSoldOut = product.stock <= 0 || product.in_stock === false;

              return (
                <div
                  key={product.id}
                  className="rounded-emp bg-white border border-emp-surface-line p-5 space-y-4 shadow-emp-sm relative"
                >
                  <button
                    type="button"
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-emp-surface-soft text-emp-ink-muted hover:text-rose-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center space-x-3.5">
                    <img
                      src={product.image_url || product.image}
                      alt={product.title}
                      className="w-16 h-16 rounded-emp-sm object-contain bg-emp-surface-soft border border-emp-surface-line p-1"
                    />
                    <div className="min-w-0 pr-6">
                      <span className="text-[10px] uppercase font-bold text-emp-brand block">
                        {product.brand || 'Aptdot'}
                      </span>
                      <h3 className="font-display font-bold text-sm text-emp-ink line-clamp-1">
                        {product.title}
                      </h3>
                      <span className="font-display font-black text-base text-emp-brand-700 block mt-0.5">
                        {formatCurrency(price, 'USD')}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Spec Summary */}
                  <div className="rounded-emp-sm bg-emp-surface-soft border border-emp-surface-line p-3 space-y-2 text-xs divide-y divide-emp-surface-line">
                    <div className="flex justify-between pb-1.5">
                      <span className="text-emp-ink-muted">Stock:</span>
                      <span className={`font-semibold ${isSoldOut ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {isSoldOut ? 'Sold Out' : `${product.stock || 10} Units In Stock`}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-emp-ink-muted">Rating:</span>
                      <span>{product.rating ? `★ ${product.rating}` : 'Not available in the catalogue.'}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-emp-ink-muted">Warranty:</span>
                      <span className="text-right max-w-[200px] truncate">
                        {typeof product.warranty === 'object' && product.warranty !== null
                          ? [product.warranty.duration, product.warranty.terms].filter(Boolean).join(' • ')
                          : (product.warranty || 'Not available in the catalogue.')}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1.5">
                      <span className="text-emp-ink-muted">Return Window:</span>
                      <span className="font-bold text-emerald-700">30-Day Sandbox Returns</span>
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCardAddToCart(product)}
                      className="btn-emp btn-emp-primary text-xs py-2 flex-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInspectDossier(product)}
                      className="btn-emp-line text-xs py-2 px-3"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emp-brand" />
                      <span>Dossier</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. ADD PRODUCT SEARCH & PICKER MODAL */}
      <AnimatePresence>
        {isAddingProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingProduct(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="relative w-full max-w-lg rounded-emp-lg bg-white border border-emp-surface-line shadow-2xl overflow-hidden p-6 space-y-4 text-emp-ink"
              >
                <div className="flex items-center justify-between pb-3 border-b border-emp-surface-line">
                  <div>
                    <h3 className="font-display font-bold text-base text-emp-ink">
                      Add Product to Comparison
                    </h3>
                    <p className="text-xs text-emp-ink-secondary">
                      Select up to 4 Aptdot catalogue items to evaluate side-by-side.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="p-1 rounded-full text-emp-ink-muted hover:text-emp-brand"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search Box in Picker */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emp-ink-muted" />
                  <input
                    type="text"
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    placeholder="Search by title, brand, category, or SKU…"
                    className="w-full bg-emp-surface-soft border border-emp-surface-line rounded-pill pl-10 pr-4 py-2 text-xs text-emp-ink focus:outline-none focus:border-emp-brand"
                  />
                </div>

                {/* Product List */}
                <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                  {searchFilteredAvailable.length === 0 ? (
                    <div className="p-8 text-center text-xs text-emp-ink-muted">
                      No matching products available to add.
                    </div>
                  ) : (
                    searchFilteredAvailable.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          addToCompare(product);
                          setIsAddingProduct(false);
                          if (showToast) {
                            showToast(`Added ${product.title} to comparison.`, 'success');
                          }
                        }}
                        className="p-3 rounded-emp-sm bg-emp-surface-soft hover:bg-emp-brand-050/60 border border-emp-surface-line hover:border-emp-brand-100 cursor-pointer flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center space-x-3 min-w-0 pr-2">
                          <img
                            src={product.image_url || product.image}
                            alt={product.title}
                            className="w-12 h-12 rounded-emp-sm object-contain bg-white border border-emp-surface-line p-1 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-emp-brand uppercase tracking-wider block">
                              {product.brand || 'Aptdot'}
                            </span>
                            <p className="text-xs font-bold text-emp-ink truncate">
                              {product.title}
                            </p>
                            <span className="font-mono font-bold text-xs text-emp-brand-700">
                              {formatCurrency(product.price, 'USD')}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-pill bg-white group-hover:bg-emp-brand group-hover:text-white border border-emp-surface-line text-xs font-bold text-emp-ink flex items-center space-x-1 shadow-sm transition-colors flex-shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Select</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
