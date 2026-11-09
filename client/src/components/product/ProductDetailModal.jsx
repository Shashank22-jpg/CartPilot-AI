import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  ShoppingCart,
  Layers,
  ShieldCheck,
  Package,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Truck,
  Sparkles,
  Star,
  Info,
  Maximize2,
  ThumbsUp,
  ThumbsDown,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency, formatProductPrice } from '../../utils/currency';

/**
 * ProductDetailModal - Premium Emporium-inspired Product Details View
 * Follows CartPilot Hybrid Design System:
 * - Light retail styling (warm off-white, emerald brand primary, ink typography)
 * - Complete Aptdot variant matrix & stock validation
 * - Stepper quantity selector
 * - Full Product Intelligence (Specs, Logistics, Seller, Warranty, Returns, Pros/Cons)
 * - Unobtrusive synthetic catalogue disclosure
 */
export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToCompare,
  isInCompare = false,
}) {
  // Variant Selection State
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Initialize selected options when product opens
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedImageIndex(0);
      setActiveTab('specs');

      if (product.has_variants && Array.isArray(product.options) && product.options.length > 0) {
        const initial = {};
        product.options.forEach((opt) => {
          if (Array.isArray(opt.values) && opt.values.length > 0) {
            initial[opt.name] = opt.values[0];
          }
        });
        setSelectedOptions(initial);
      } else {
        setSelectedOptions({});
      }
    }
  }, [product]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Derived active variant based on selected options
  const activeVariant = useMemo(() => {
    if (!product?.has_variants || !Array.isArray(product.variants) || product.variants.length === 0) {
      return null;
    }
    const matched = product.variants.find((v) => {
      if (!v.options) return false;
      return Object.entries(selectedOptions).every(([k, val]) => v.options[k] === val);
    });
    return matched || product.variants[0];
  }, [product, selectedOptions]);

  // Effective values derived from variant or product
  const effectivePrice = activeVariant?.price !== undefined ? activeVariant.price : product?.price || 0;
  const effectiveComparePrice =
    activeVariant?.compare_at_price || product?.compare_at_price || product?.original_price || product?.originalPrice;
  const effectiveSku = activeVariant?.sku || product?.specs?.sku || product?.id;
  const effectiveStock =
    activeVariant?.stock !== undefined ? activeVariant.stock : product?.stock !== undefined ? product.stock : 0;
  const isVariantSoldOut = activeVariant
    ? activeVariant.stock <= 0 || activeVariant.disabled || !activeVariant.is_available
    : !product?.is_available || product?.stock <= 0;

  // Savings calculation
  const hasDiscount = effectiveComparePrice && effectiveComparePrice > effectivePrice;
  const savingsAmount = hasDiscount ? effectiveComparePrice - effectivePrice : 0;
  const savingsPercent = hasDiscount ? Math.round((savingsAmount / effectiveComparePrice) * 100) : 0;

  // Available images array
  const galleryImages = useMemo(() => {
    if (!product) return [];
    const list = [];
    if (product.image_url) list.push(product.image_url);
    else if (product.image) list.push(product.image);

    if (Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    return list.length > 0 ? list : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'];
  }, [product]);

  // Stepper handlers
  const handleQuantityDecrease = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity((q) => Math.min(Math.max(1, effectiveStock), q + 1));
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      const clamped = Math.min(Math.max(1, val), Math.max(1, effectiveStock));
      setQuantity(clamped);
    }
  };

  const handleAddToCartClick = () => {
    if (isVariantSoldOut) return;
    if (onAddToCart) {
      onAddToCart(product, quantity, activeVariant);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window Container */}
        <div className="min-h-full flex items-center justify-center p-3 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-5xl rounded-emp-lg bg-white border border-emp-surface-line shadow-2xl overflow-hidden my-8 text-emp-ink flex flex-col max-h-[92vh]"
          >
            {/* Top Bar with Breadcrumbs & Close Button */}
            <div className="px-6 py-3.5 border-b border-emp-surface-line bg-emp-surface-tint/60 flex items-center justify-between gap-4 flex-shrink-0">
              <nav className="text-xs font-body text-emp-ink-muted flex items-center space-x-1.5 truncate">
                <span className="text-emp-brand font-semibold">Catalogue</span>
                <span>/</span>
                <span className="truncate">{product.category}</span>
                <span>/</span>
                <span className="text-emp-ink font-semibold truncate">{product.title}</span>
              </nav>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <span className="badge-emp badge-emp-verified hidden sm:inline-flex text-[11px]">
                  Aptdot Synthetic CC0
                </span>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-white text-emp-ink-secondary hover:text-emp-brand transition-colors border border-transparent hover:border-emp-surface-line"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Body Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* PRIMARY 2-COLUMN PDP LAYOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* LEFT COLUMN: Gallery Presentation */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Main Product Hero Image */}
                  <div className="relative aspect-square sm:aspect-[4/3] rounded-emp bg-emp-surface-soft border border-emp-surface-line overflow-hidden flex items-center justify-center group shadow-emp-sm">
                    <img
                      src={galleryImages[selectedImageIndex] || galleryImages[0]}
                      alt={product.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                      {hasDiscount && (
                        <span className="badge-emp badge-emp-sale shadow-sm">
                          Save {savingsPercent}%
                        </span>
                      )}
                      {isVariantSoldOut ? (
                        <span className="badge-emp bg-rose-600 shadow-sm">
                          Sold Out
                        </span>
                      ) : effectiveStock <= 15 ? (
                        <span className="badge-emp bg-amber-600 shadow-sm">
                          Only {effectiveStock} Left
                        </span>
                      ) : (
                        <span className="badge-emp bg-emerald-700 shadow-sm">
                          In Stock
                        </span>
                      )}
                    </div>

                    {/* Zoom / Lightbox Trigger */}
                    <button
                      type="button"
                      onClick={() => setIsLightboxOpen(!isLightboxOpen)}
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 text-emp-ink-secondary hover:text-emp-brand hover:bg-white shadow-emp-sm transition-colors border border-emp-surface-line"
                      title="Toggle full preview"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Thumbnail Gallery (When available or multiple) */}
                  {galleryImages.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-1">
                      {galleryImages.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`relative w-16 h-16 rounded-emp-sm border-2 overflow-hidden flex-shrink-0 transition-all ${
                            selectedImageIndex === idx
                              ? 'border-emp-brand shadow-emp-sm'
                              : 'border-emp-surface-line opacity-70 hover:opacity-100 hover:border-emp-brand-100'
                          }`}
                        >
                          <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Synthetic Notice Mini-card */}
                  <div className="rounded-emp-sm bg-emp-surface-tint border border-emp-surface-line p-3 text-xs flex items-center space-x-3">
                    <Sparkles className="w-4 h-4 text-emp-brand flex-shrink-0" />
                    <p className="text-[11px] text-emp-ink-secondary">
                      <strong>Synthetic Demo Goods:</strong> Tested on authentic PayPal Sandbox Orders v2. Payment is simulated; no physical shipment is made.
                    </p>
                  </div>
                </div>

                {/* RIGHT COLUMN: Product Information & Purchase Actions */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Brand & Title */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emp-brand font-body">
                      {product.brand || 'Aptdot Hardware'}
                    </span>
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-emp-ink leading-tight">
                      {product.title}
                    </h2>
                  </div>

                  {/* Rating & SKU Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-emp-ink-secondary pb-3 border-b border-emp-surface-line">
                    <div className="flex items-center space-x-1.5 font-bold text-emp-ink">
                      <Star className="w-4 h-4 text-emp-gold fill-current" />
                      <span>{product.rating || '4.8'}</span>
                      <span className="text-emp-ink-muted font-normal">
                        ({product.reviews_count || product.reviewsCount || 128} verified reviews)
                      </span>
                    </div>
                    <span className="text-emp-surface-line">•</span>
                    <span className="font-mono text-[11px] text-emp-ink-muted">
                      SKU: <strong className="text-emp-ink">{effectiveSku}</strong>
                    </span>
                    <span className="text-emp-surface-line">•</span>
                    <span className={`font-semibold ${isVariantSoldOut ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {isVariantSoldOut ? 'Out of stock' : `${effectiveStock} units available`}
                    </span>
                  </div>

                  {/* Pricing Block */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-display font-black text-3xl sm:text-4xl text-emp-brand-700">
                      {formatCurrency(effectivePrice, 'USD')}
                    </span>
                    {hasDiscount && (
                      <>
                        <span className="text-base line-through text-emp-ink-muted font-mono">
                          {formatCurrency(effectiveComparePrice, 'USD')}
                        </span>
                        <span className="text-xs font-bold text-emp-accent bg-emp-accent-050 px-2.5 py-0.5 rounded-pill border border-emp-accent/20">
                          Save {formatCurrency(savingsAmount, 'USD')} ({savingsPercent}%)
                        </span>
                      </>
                    )}
                  </div>

                  {/* Lead Description */}
                  <p className="text-xs sm:text-sm text-emp-ink-secondary leading-relaxed font-body">
                    {product.description}
                  </p>

                  {/* INTERACTIVE VARIANT SELECTOR */}
                  {product.has_variants && Array.isArray(product.options) && product.options.length > 0 && (
                    <div className="space-y-4 pt-2 border-t border-emp-surface-line">
                      {product.options.map((option) => (
                        <div key={option.name} className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-emp-ink font-body">
                              {option.name}: <span className="text-emp-brand font-semibold">{selectedOptions[option.name]}</span>
                            </span>
                            {activeVariant && option.name.toLowerCase().includes('color') && (
                              <span className="text-[11px] text-emp-ink-muted font-mono">
                                Selected SKU: {activeVariant.sku}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(option.values) &&
                              option.values.map((val) => {
                                const isSelected = selectedOptions[option.name] === val;
                                return (
                                  <button
                                    key={val}
                                    type="button"
                                    onClick={() =>
                                      setSelectedOptions((prev) => ({
                                        ...prev,
                                        [option.name]: val,
                                      }))
                                    }
                                    className={`px-3.5 py-2 rounded-emp-sm text-xs font-semibold transition-all ${
                                      isSelected
                                        ? 'bg-emp-brand text-white shadow-emp-sm ring-2 ring-emp-brand ring-offset-2'
                                        : 'bg-white border border-emp-surface-line text-emp-ink hover:border-emp-brand hover:text-emp-brand'
                                    }`}
                                  >
                                    {val}
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* QUANTITY & ADD TO CART ACTION BLOCK */}
                  <div className="pt-4 border-t border-emp-surface-line space-y-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {/* Stepper Quantity Control */}
                      <div className="inline-flex items-center rounded-pill bg-emp-surface-soft border border-emp-surface-line p-1 flex-shrink-0 justify-between sm:justify-start">
                        <button
                          type="button"
                          onClick={handleQuantityDecrease}
                          disabled={quantity <= 1 || isVariantSoldOut}
                          className="w-9 h-9 rounded-full bg-white text-emp-ink font-bold hover:bg-emp-brand-050 hover:text-emp-brand transition-colors disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-emp-ink shadow-emp-sm flex items-center justify-center text-sm"
                        >
                          −
                        </button>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={quantity}
                          onChange={handleQuantityChange}
                          disabled={isVariantSoldOut}
                          className="w-12 text-center bg-transparent font-display font-bold text-sm text-emp-ink outline-none"
                          aria-label="Quantity"
                        />
                        <button
                          type="button"
                          onClick={handleQuantityIncrease}
                          disabled={quantity >= effectiveStock || isVariantSoldOut}
                          className="w-9 h-9 rounded-full bg-white text-emp-ink font-bold hover:bg-emp-brand-050 hover:text-emp-brand transition-colors disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-emp-ink shadow-emp-sm flex items-center justify-center text-sm"
                        >
                          +
                        </button>
                      </div>

                      {/* Primary Add to Cart Button */}
                      <button
                        type="button"
                        onClick={handleAddToCartClick}
                        disabled={isVariantSoldOut}
                        className={`flex-1 py-3.5 px-6 rounded-pill font-body font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-emp ${
                          isVariantSoldOut
                            ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
                            : 'btn-emp-primary active:scale-98'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>
                          {isVariantSoldOut
                            ? 'Sold Out'
                            : `Add to Cart • ${formatCurrency(effectivePrice * quantity, 'USD')}`}
                        </span>
                      </button>

                      {/* Add to Compare */}
                      <button
                        type="button"
                        onClick={() => onAddToCompare && onAddToCompare(product)}
                        className={`p-3.5 rounded-pill border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors flex-shrink-0 ${
                          isInCompare
                            ? 'bg-emp-brand-050 border-emp-brand text-emp-brand'
                            : 'bg-white border-emp-surface-line text-emp-ink-secondary hover:text-emp-brand hover:border-emp-brand-100'
                        }`}
                        title={isInCompare ? 'Product added to comparison' : 'Add to compare'}
                      >
                        <Layers className="w-4 h-4" />
                        <span className="hidden sm:inline">{isInCompare ? 'In Compare' : 'Compare'}</span>
                      </button>
                    </div>

                    {/* Emporium Reassurance Bullets */}
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-emp-ink-muted">
                      <li className="flex items-center space-x-1.5">
                        <Truck className="w-3.5 h-3.5 text-emp-brand flex-shrink-0" />
                        <span>Free shipping over $50</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <RotateCcw className="w-3.5 h-3.5 text-emp-brand flex-shrink-0" />
                        <span>30-day sandbox returns</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <Lock className="w-3.5 h-3.5 text-emp-brand flex-shrink-0" />
                        <span>PayPal Orders v2 certified</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* PRODUCT INTELLIGENCE TABS SECTION */}
              <div className="pt-6 border-t border-emp-surface-line space-y-4">
                <div className="flex items-center gap-2 overflow-x-auto border-b border-emp-surface-line pb-px">
                  {[
                    { id: 'specs', label: 'Specifications', icon: ShieldCheck },
                    { id: 'logistics', label: 'Logistics & Dimensions', icon: Package },
                    { id: 'seller', label: 'Seller & Provenance', icon: CheckCircle2 },
                    { id: 'warranty', label: 'Warranty & Returns', icon: Calendar },
                    { id: 'proscons', label: 'Pros & Cons', icon: ThumbsUp },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                          isActive
                            ? 'border-emp-brand text-emp-brand'
                            : 'border-transparent text-emp-ink-muted hover:text-emp-ink hover:border-emp-surface-line'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab 1: Specifications */}
                {activeTab === 'specs' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emp-ink-muted font-body">
                      Authoritative Aptdot Specifications
                    </h4>
                    <div className="rounded-emp border border-emp-surface-line bg-emp-surface-soft overflow-hidden divide-y divide-emp-surface-line text-xs font-body">
                      <div className="p-3 flex justify-between bg-white">
                        <span className="text-emp-ink-muted font-medium">SKU</span>
                        <span className="font-mono font-bold text-emp-ink">{effectiveSku}</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-emp-ink-muted font-medium">Category</span>
                        <span className="font-semibold text-emp-ink">{product.category}</span>
                      </div>
                      <div className="p-3 flex justify-between bg-white">
                        <span className="text-emp-ink-muted font-medium">Brand</span>
                        <span className="font-semibold text-emp-ink">{product.brand || 'Aptdot'}</span>
                      </div>
                      {product.specs &&
                        Object.entries(product.specs)
                          .filter(([k]) => !['variants', 'options', 'dimensions', 'cost_price', 'sku', 'aptdot_id'].includes(k))
                          .map(([key, val]) => (
                            <div key={key} className="p-3 flex justify-between">
                              <span className="text-emp-ink-muted font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                              <span className="font-mono text-emp-ink text-right max-w-xs">{String(val)}</span>
                            </div>
                          ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Logistics & Dimensions */}
                {activeTab === 'logistics' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emp-ink-muted font-body">
                      Packed Box Logistics & Hardware Footprint
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-emp bg-emp-surface-soft border border-emp-surface-line space-y-1">
                        <span className="text-xs text-emp-ink-muted block">Packed Package Weight</span>
                        <span className="font-display font-extrabold text-base text-emp-ink block">
                          {product.specs?.dimensions?.weight_g
                            ? `${product.specs.dimensions.weight_g.toLocaleString()} g (${(product.specs.dimensions.weight_g / 1000).toFixed(2)} kg)`
                            : product.weight_g
                            ? `${product.weight_g.toLocaleString()} g`
                            : 'Standard Parcel Weight (Not Specified)'}
                        </span>
                      </div>

                      <div className="p-4 rounded-emp bg-emp-surface-soft border border-emp-surface-line space-y-1">
                        <span className="text-xs text-emp-ink-muted block">Box Dimensions (L × W × H)</span>
                        <span className="font-display font-extrabold text-base text-emp-ink block">
                          {product.specs?.dimensions?.length_cm
                            ? `${product.specs.dimensions.length_cm} × ${product.specs.dimensions.width_cm} × ${product.specs.dimensions.height_cm} cm`
                            : product.dimensions
                            ? `${product.dimensions.length_cm} × ${product.dimensions.width_cm} × ${product.dimensions.height_cm} cm`
                            : 'Standard Retail Dimensions'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Seller Information */}
                {activeTab === 'seller' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emp-ink-muted font-body">
                      Seller Provenance & Fulfilment Channel
                    </h4>
                    <div className="p-4 rounded-emp bg-emp-surface-soft border border-emp-surface-line space-y-3 text-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-emp-surface-line">
                        <div>
                          <strong className="block text-sm text-emp-ink">
                            {product.seller?.name || 'Aptdot Sample Goods'}
                          </strong>
                          <span className="text-emp-ink-muted text-[11px]">
                            {product.seller?.location || 'Autonomous Sandbox Node'}
                          </span>
                        </div>
                        <span className="badge-emp badge-emp-verified">
                          {product.seller?.verifiedStatus || 'Authoritative Benchmark Supplier'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                        <div>
                          <span className="text-emp-ink-muted block">Fulfillment Method</span>
                          <span className="font-semibold text-emp-ink">
                            {product.seller?.fulfillment || 'Simulated Sandbox Dispatch'}
                          </span>
                        </div>
                        <div>
                          <span className="text-emp-ink-muted block">Authorised Partner Status</span>
                          <span className="font-semibold text-emp-ink">
                            {product.seller?.authorizedPartner ? 'Direct Brand Partner' : 'Aptdot Open Dataset'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Warranty & Returns */}
                {activeTab === 'warranty' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emp-ink-muted font-body">
                      Warranty Coverage & Return Rights
                    </h4>
                    <div className="p-4 rounded-emp bg-emp-surface-soft border border-emp-surface-line space-y-3 text-xs">
                      <div>
                        <strong className="block text-sm text-emp-ink mb-1">
                          {typeof product.warranty === 'object' && product.warranty !== null
                            ? [product.warranty.duration, product.warranty.terms].filter(Boolean).join(' • ')
                            : (product.warranty || 'Simulated 1-Year Synthetic Warranty (Demo Only)')}
                        </strong>
                        <p className="text-emp-ink-secondary text-xs leading-relaxed">
                          {typeof product.return_policy === 'string'
                            ? product.return_policy
                            : (product.returnPolicy?.terms ||
                               product.returnPolicy?.condition ||
                               'Standard 30-day verified sandbox return window. Full refund issued upon return initiation.')}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-emp-surface-line text-[11px] font-mono">
                        <div>
                          <span className="text-emp-ink-muted block">Return Window</span>
                          <strong className="text-emp-ink">30 Days</strong>
                        </div>
                        <div>
                          <span className="text-emp-ink-muted block">Restocking Fee</span>
                          <strong className="text-emerald-700">$0.00 (Zero Fee)</strong>
                        </div>
                        <div>
                          <span className="text-emp-ink-muted block">Return Shipping</span>
                          <strong className="text-emp-ink">Prepaid Label Included</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 5: Pros & Cons */}
                {activeTab === 'proscons' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emp-ink-muted font-body">
                      Acoustic & Hardware Intelligence Pros and Cons
                    </h4>
                    {Array.isArray(product.pros) && product.pros.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-emp bg-emerald-50/60 border border-emerald-100 space-y-2">
                          <span className="text-xs font-bold text-emerald-800 flex items-center space-x-1.5">
                            <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified Highlights</span>
                          </span>
                          <ul className="space-y-1.5 text-xs text-emerald-900 list-disc list-inside">
                            {product.pros.map((pro, i) => (
                              <li key={i}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 rounded-emp bg-rose-50/60 border border-rose-100 space-y-2">
                          <span className="text-xs font-bold text-rose-800 flex items-center space-x-1.5">
                            <ThumbsDown className="w-3.5 h-3.5 text-rose-600" />
                            <span>Considerations</span>
                          </span>
                          <ul className="space-y-1.5 text-xs text-rose-900 list-disc list-inside">
                            {product.cons?.map((con, i) => (
                              <li key={i}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 rounded-emp bg-emp-surface-soft border border-emp-surface-line text-center text-xs text-emp-ink-muted space-y-1">
                        <Info className="w-5 h-5 mx-auto text-emp-brand-600 mb-1" />
                        <p className="font-semibold text-emp-ink">No crowd pros/cons filed for this item</p>
                        <p className="text-[11px]">
                          This product is part of the Aptdot CC0 benchmark specification catalogue. Community evaluations are not yet recorded.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* SYNTHETIC CATALOGUE DISCLOSURE FOOTER */}
              <div className="p-4 rounded-emp bg-emp-brand-050/60 border border-emp-brand-100 text-xs flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-emp-brand flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-emp-brand-700 font-display">
                    Synthetic Demonstration Catalogue Disclosure
                  </strong>
                  <p className="text-emp-ink-secondary text-[11px] leading-relaxed">
                    This product is an autonomous demonstration record sourced from the Aptdot CC0 1.0 Universal open dataset. Specifications, stock counts, and pricing are synthetic representations designed to test AI recommendation algorithms, multi-attribute comparisons, and authentic PayPal Orders API v2 Sandbox settlement.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
