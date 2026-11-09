import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ShieldCheck,
  Layers,
  ShoppingCart,
  Star,
  CheckCircle2,
  X,
  RefreshCw,
  Package,
  Sparkles,
  Info,
  ChevronRight,
  Eye,
  RotateCcw,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatProductPrice } from '../utils/currency';
import ProductDetailModal from '../components/product/ProductDetailModal';

/**
 * DiscoverPage - CartPilot AI Product Discovery & Catalogue
 * Redesigned for Stage 3 using Emporium Hybrid Design System:
 * - Premium light shopping experience (warm white, emerald green, dark forest green typography)
 * - Authoritative Aptdot Supabase catalogue as the sole product source
 * - Exact Page Title: "Discover Products" & Subtitle: "Find the right product for your needs."
 * - Complete filtering: Categories, Stored Price Range, Actual Stock, Sorting
 * - Responsive product grid with consistent proportions and hover elevations
 * - Full Product Details modal integration with variant matrix and product intelligence
 */
export default function DiscoverPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  const {
    products = [],
    isLoadingProducts = false,
    productsError = null,
    loadProducts,
    addToCart,
    addToCompare,
    isInCompare,
    setSelectedIntelligenceProduct,
    showToast,
  } = useApp();

  const safeProducts = useMemo(() => (Array.isArray(products) ? products.filter(Boolean) : []), [products]);

  // Search & Filter State
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';
  const initialProductId = searchParams.get('product') || null;

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(400);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');

  // Product Detail Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Sync with URL query parameters
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
    const cat = searchParams.get('category');
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Synchronize initial product query param to open detail modal
  useEffect(() => {
    if (initialProductId && safeProducts.length > 0) {
      const match = safeProducts.find((p) => p.id === initialProductId || p.slug === initialProductId);
      if (match) {
        setSelectedProduct(match);
        setIsDetailOpen(true);
      }
    }
  }, [initialProductId, safeProducts]);

  // Derive categories dynamically from Aptdot products
  const categories = useMemo(() => {
    const catSet = new Set(safeProducts.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(catSet)];
  }, [safeProducts]);

  // Derive brands dynamically from Aptdot products
  const brands = useMemo(() => {
    const brandSet = new Set(safeProducts.map((p) => p.brand).filter(Boolean));
    return ['All', ...Array.from(brandSet)];
  }, [safeProducts]);

  // Minimum & Maximum price limits dynamically from dataset
  const priceExtremes = useMemo(() => {
    if (safeProducts.length === 0) return { min: 10, max: 400 };
    const prices = safeProducts.map((p) => (typeof p.price === 'number' ? p.price : Number(p.price) || 0));
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [safeProducts]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return safeProducts
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }
        // Brand filter
        if (selectedBrand !== 'All' && item.brand !== selectedBrand) {
          return false;
        }
        // Price filter
        const price = typeof item.price === 'number' ? item.price : Number(item.price) || 0;
        if (price > maxPrice) {
          return false;
        }
        // Stock availability filter
        if (onlyInStock) {
          const isAvailable = item.in_stock !== false && (item.stock === undefined || item.stock > 0);
          if (!isAvailable) return false;
        }
        // Rating filter
        if (minRating > 0 && (item.rating || 0) < minRating) {
          return false;
        }
        // Search text query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = (item.title || item.name || '').toLowerCase().includes(q);
          const matchesBrand = (item.brand || '').toLowerCase().includes(q);
          const matchesCategory = (item.category || '').toLowerCase().includes(q);
          const matchesDesc = (item.description || '').toLowerCase().includes(q);
          const matchesSku = (item.specs?.sku || '').toLowerCase().includes(q);
          if (!matchesTitle && !matchesBrand && !matchesCategory && !matchesDesc && !matchesSku) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : Number(a.price) || 0;
        const priceB = typeof b.price === 'number' ? b.price : Number(b.price) || 0;
        const nameA = (a.title || a.name || '').toLowerCase();
        const nameB = (b.title || b.name || '').toLowerCase();
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'name-asc') return nameA.localeCompare(nameB);
        if (sortBy === 'name-desc') return nameB.localeCompare(nameA);
        if (sortBy === 'rating-desc') return ratingB - ratingA;
        return 0; // relevance / natural order
      });
  }, [safeProducts, selectedCategory, selectedBrand, maxPrice, onlyInStock, minRating, searchQuery, sortBy]);

  // Open Product Details Modal
  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('product', product.id || product.slug);
      return next;
    }, { replace: true });
  };

  // Close Product Details Modal
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedProduct(null);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('product');
      return next;
    }, { replace: true });
  };

  // Quick Add to Cart from Card
  const handleCardAddToCart = (product, e) => {
    e.stopPropagation();
    if (product.has_variants && Array.isArray(product.options) && product.options.length > 0) {
      // Open modal so customer selects variant cleanly
      handleOpenDetail(product);
    } else {
      addToCart(product, 1);
      if (showToast) {
        showToast(`Added ${product.title} to cart.`, 'success');
      }
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setMaxPrice(priceExtremes.max || 400);
    setOnlyInStock(false);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('relevance');
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedBrand !== 'All' ||
    maxPrice < (priceExtremes.max || 400) ||
    onlyInStock ||
    minRating > 0 ||
    searchQuery.trim().length > 0 ||
    sortBy !== 'relevance';

  return (
    <div className="space-y-8 pb-16 font-body text-emp-ink">
      {/* 1. DISCOVERY HEADER */}
      <section className="rounded-emp-lg bg-white border border-emp-surface-line p-6 sm:p-8 shadow-emp-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-pill bg-emp-brand-050 border border-emp-brand-100 text-emp-brand-700 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emp-brand" />
              <span>Aptdot Unified Benchmark Catalogue • 100% CC0 Hardware</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-emp-ink tracking-tight">
              Discover Products
            </h1>
            <p className="text-sm text-emp-ink-secondary max-w-xl leading-relaxed">
              Find the right product for your needs. Explore verified specifications, variant matrices, and simulated checkout for autonomous agent workflows.
            </p>
          </div>

          {/* Catalogue Count Metric Pill */}
          <div className="flex items-center space-x-3 bg-emp-surface-soft border border-emp-surface-line rounded-emp p-3.5 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-emp-brand text-white flex items-center justify-center font-display font-extrabold text-base shadow-sm">
              {filteredProducts.length}
            </div>
            <div className="text-xs">
              <span className="font-bold text-emp-ink block">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Available
              </span>
              <span className="text-emp-ink-muted text-[11px]">
                Showing from {safeProducts.length} total Aptdot items
              </span>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="mt-6 pt-6 border-t border-emp-surface-line">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emp-ink-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title, category, brand, or SKU…"
              className="w-full bg-emp-surface-soft border border-emp-surface-line rounded-pill pl-11 pr-10 py-3 text-sm text-emp-ink placeholder-emp-ink-muted focus:outline-none focus:border-emp-brand focus:bg-white focus:ring-2 focus:ring-emp-brand/10 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-emp-ink-muted hover:text-emp-brand transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILL NAVIGATION */}
      <section className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const count = cat === 'All' ? safeProducts.length : safeProducts.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-pill text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 flex-shrink-0 ${
                isActive
                  ? 'bg-emp-brand text-white shadow-emp-sm ring-1 ring-emp-brand'
                  : 'bg-white border border-emp-surface-line text-emp-ink-secondary hover:border-emp-brand hover:text-emp-brand hover:bg-emp-brand-050/40'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-pill font-mono font-normal ${
                  isActive ? 'bg-white/20 text-white' : 'bg-emp-surface-soft text-emp-ink-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </section>

      {/* 3. MAIN SHOPPING DISCOVERY GRID & FILTERS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Clean Filter Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="rounded-emp bg-white border border-emp-surface-line p-5 shadow-emp-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-emp-surface-line">
              <span className="text-xs font-bold text-emp-ink flex items-center space-x-1.5 font-display">
                <Filter className="w-4 h-4 text-emp-brand" />
                <span>Filters & Constraints</span>
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] font-semibold text-emp-accent hover:underline flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-emp-ink block">
                Sort Products
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-emp-surface-soft border border-emp-surface-line rounded-emp-sm px-3 py-2 text-xs font-medium text-emp-ink focus:outline-none focus:border-emp-brand focus:bg-white transition-colors"
                >
                  <option value="relevance">Relevance & Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="rating-desc">Customer Rating (Highest)</option>
                </select>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2 pt-2 border-t border-emp-surface-line">
              <label className="text-xs font-bold text-emp-ink block">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-emp-surface-soft border border-emp-surface-line rounded-emp-sm px-3 py-2 text-xs font-medium text-emp-ink focus:outline-none focus:border-emp-brand focus:bg-white transition-colors"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 pt-2 border-t border-emp-surface-line">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emp-ink">Maximum Price</span>
                <span className="font-mono font-bold text-emp-brand text-sm">
                  {formatCurrency(maxPrice, 'USD')}
                </span>
              </div>
              <input
                type="range"
                min={priceExtremes.min || 10}
                max={priceExtremes.max || 400}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emp-brand cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-emp-ink-muted font-mono">
                <span>{formatCurrency(priceExtremes.min || 10, 'USD')}</span>
                <span>{formatCurrency(priceExtremes.max || 400, 'USD')}</span>
              </div>
            </div>

            {/* In-Stock Only Toggle */}
            <div className="pt-2 border-t border-emp-surface-line">
              <label className="flex items-center space-x-2 text-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-emp-surface-line text-emp-brand focus:ring-emp-brand"
                />
                <span className="font-medium text-emp-ink">In Stock Items Only</span>
              </label>
            </div>

            {/* Rating Filter (Only when rating data exists) */}
            <div className="space-y-2 pt-2 border-t border-emp-surface-line">
              <label className="text-xs font-bold text-emp-ink block">
                Minimum Rating
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 4.0, 4.5, 4.8].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setMinRating(rate)}
                    className={`py-1.5 rounded-emp-sm text-[11px] font-bold border text-center transition-colors ${
                      minRating === rate
                        ? 'bg-emp-brand-050 border-emp-brand text-emp-brand'
                        : 'bg-emp-surface-soft border-emp-surface-line text-emp-ink-secondary hover:text-emp-brand'
                    }`}
                  >
                    {rate === 0 ? 'Any' : `${rate}★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Refresh from Supabase Button */}
            <div className="pt-2 border-t border-emp-surface-line">
              <button
                type="button"
                onClick={() => loadProducts && loadProducts()}
                disabled={isLoadingProducts}
                className="w-full py-2.5 rounded-emp-sm bg-emp-surface-soft hover:bg-emp-brand-050 border border-emp-surface-line text-xs font-semibold text-emp-ink-secondary hover:text-emp-brand flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingProducts ? 'animate-spin text-emp-brand' : ''}`} />
                <span>{isLoadingProducts ? 'Synchronizing…' : 'Sync Supabase Catalogue'}</span>
              </button>
            </div>
          </div>

          {/* Transparent Synthetic Catalogue Card */}
          <div className="rounded-emp bg-emp-surface-soft border border-emp-surface-line p-4 space-y-2 text-xs">
            <span className="font-bold text-emp-brand flex items-center space-x-1.5 font-display">
              <ShieldCheck className="w-4 h-4 text-emp-brand" />
              <span>Aptdot Dataset Standards</span>
            </span>
            <p className="text-[11px] text-emp-ink-secondary leading-relaxed">
              Every product in this catalogue belongs to the Aptdot CC0 benchmark dataset with real specifications, variant mappings, and simulated inventory.
            </p>
          </div>
        </aside>

        {/* RIGHT COLUMN: Product Grid */}
        <main className="lg:col-span-9 space-y-6">
          {/* Active Filter Chips Strip */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-emp bg-white border border-emp-surface-line text-xs">
              <span className="text-emp-ink-muted text-[11px] font-semibold">Active filters:</span>

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-emp-brand-050 text-emp-brand-700 font-medium text-[11px] border border-emp-brand-100">
                  Category: {selectedCategory}
                  <button type="button" onClick={() => setSelectedCategory('All')}>
                    <X className="w-3 h-3 hover:text-rose-600" />
                  </button>
                </span>
              )}

              {selectedBrand !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-emp-brand-050 text-emp-brand-700 font-medium text-[11px] border border-emp-brand-100">
                  Brand: {selectedBrand}
                  <button type="button" onClick={() => setSelectedBrand('All')}>
                    <X className="w-3 h-3 hover:text-rose-600" />
                  </button>
                </span>
              )}

              {maxPrice < (priceExtremes.max || 400) && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-emp-brand-050 text-emp-brand-700 font-medium text-[11px] border border-emp-brand-100">
                  Under {formatCurrency(maxPrice, 'USD')}
                  <button type="button" onClick={() => setMaxPrice(priceExtremes.max || 400)}>
                    <X className="w-3 h-3 hover:text-rose-600" />
                  </button>
                </span>
              )}

              {onlyInStock && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-emp-brand-050 text-emp-brand-700 font-medium text-[11px] border border-emp-brand-100">
                  In Stock Only
                  <button type="button" onClick={() => setOnlyInStock(false)}>
                    <X className="w-3 h-3 hover:text-rose-600" />
                  </button>
                </span>
              )}

              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-emp-brand-050 text-emp-brand-700 font-medium text-[11px] border border-emp-brand-100">
                  Rating: {minRating}+ ★
                  <button type="button" onClick={() => setMinRating(0)}>
                    <X className="w-3 h-3 hover:text-rose-600" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-emp-brand-050 text-emp-brand-700 font-medium text-[11px] border border-emp-brand-100">
                  Query: "{searchQuery}"
                  <button type="button" onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3 hover:text-rose-600" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[11px] text-emp-accent hover:underline ml-auto font-semibold"
              >
                Reset All
              </button>
            </div>
          )}

          {/* Loading Skeleton */}
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-emp bg-white border border-emp-surface-line p-4 space-y-4 animate-pulse shadow-emp-sm"
                >
                  <div className="aspect-[4/3] bg-emp-surface-soft rounded-emp" />
                  <div className="space-y-2">
                    <div className="h-3 bg-emp-surface-soft rounded w-1/3" />
                    <div className="h-4 bg-emp-surface-soft rounded w-4/5" />
                    <div className="h-3 bg-emp-surface-soft rounded w-1/2" />
                  </div>
                  <div className="pt-3 border-t border-emp-surface-line flex justify-between items-center">
                    <div className="h-6 bg-emp-surface-soft rounded w-1/4" />
                    <div className="h-9 bg-emp-surface-soft rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : productsError && filteredProducts.length === 0 ? (
            /* Error State */
            <div className="p-12 text-center rounded-emp bg-white border border-rose-200 space-y-4 shadow-emp-sm">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
              <h3 className="font-display font-bold text-lg text-emp-ink">Database Retrieval Notice</h3>
              <p className="text-xs text-emp-ink-secondary max-w-md mx-auto">
                {productsError || 'Unable to connect to the Supabase database. Please check your network and configuration.'}
              </p>
              <button
                type="button"
                onClick={() => loadProducts && loadProducts()}
                className="btn-emp btn-emp-primary text-xs"
              >
                Retry Database Query
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            /* Empty State */
            <div className="p-12 text-center rounded-emp bg-white border border-emp-surface-line space-y-4 shadow-emp-sm">
              <div className="w-14 h-14 rounded-full bg-emp-surface-soft border border-emp-surface-line flex items-center justify-center mx-auto text-emp-ink-muted">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-emp-ink">No matching products found</h3>
              <p className="text-xs text-emp-ink-secondary max-w-md mx-auto leading-relaxed">
                No items in the Aptdot catalogue match your active filters or search terms. Try adjusting your price ceiling or selecting another category.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn-emp btn-emp-secondary text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Clean Product Cards Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => {
                const price = typeof product.price === 'number' ? product.price : Number(product.price) || 0;
                const comparePrice = product.compare_at_price || product.original_price || product.originalPrice;
                const hasDiscount = comparePrice && comparePrice > price;
                const savingsPercent = hasDiscount ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

                const isSoldOut = product.stock <= 0 || product.in_stock === false || product.specs?.availability === 'sold_out';
                const isPreorder = product.specs?.availability === 'preorder';
                const isBackorder = product.specs?.availability === 'backorder';
                const isLowStock = !isSoldOut && product.stock > 0 && product.stock <= 15;

                const inCompare = isInCompare ? isInCompare(product.id) : false;

                return (
                  <motion.div
                    key={product.id || idx}
                    initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: prefersReduced ? 0 : Math.min(idx * 0.04, 0.3) }}
                    className="pcard-emp group flex flex-col justify-between bg-white border border-emp-surface-line rounded-emp shadow-emp-sm hover:shadow-emp hover:-translate-y-1 transition-all duration-200"
                  >
                    <div>
                      {/* Product Image Frame */}
                      <div
                        onClick={() => handleOpenDetail(product)}
                        className="relative aspect-[4/3] bg-emp-surface-soft overflow-hidden cursor-pointer flex items-center justify-center p-4 border-b border-emp-surface-line"
                      >
                        <img
                          src={product.image_url || product.image}
                          alt={product.title}
                          loading="lazy"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Top Left: Stock / Sale Badges */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
                          {hasDiscount && (
                            <span className="badge-emp badge-emp-sale shadow-sm text-[10px]">
                              Save {savingsPercent}%
                            </span>
                          )}
                          {isSoldOut ? (
                            <span className="badge-emp bg-rose-600 shadow-sm text-[10px]">
                              Sold Out
                            </span>
                          ) : isPreorder ? (
                            <span className="badge-emp bg-amber-600 shadow-sm text-[10px]">
                              Preorder
                            </span>
                          ) : isBackorder ? (
                            <span className="badge-emp bg-sky-600 shadow-sm text-[10px]">
                              Backorder
                            </span>
                          ) : isLowStock ? (
                            <span className="badge-emp bg-amber-600 shadow-sm text-[10px]">
                              Only {product.stock} Left
                            </span>
                          ) : null}
                        </div>

                        {/* Top Right: Synthetic Demo Label */}
                        <span className="absolute top-2.5 right-2.5 badge-emp badge-emp-verified text-[10px] shadow-sm">
                          Synthetic Demo
                        </span>

                        {/* Bottom Left: Variant Badge */}
                        {product.has_variants && product.total_variants > 0 && (
                          <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-pill bg-white/90 border border-emp-surface-line text-emp-brand text-[10px] font-mono font-bold flex items-center space-x-1 shadow-sm">
                            <Layers className="w-3 h-3 text-emp-brand" />
                            <span>{product.total_variants} Variants</span>
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] text-emp-ink-muted">
                          <span className="font-bold uppercase tracking-wider text-emp-brand truncate max-w-[140px]">
                            {product.brand || 'Aptdot'}
                          </span>
                          <span className="flex items-center space-x-1 text-emp-ink font-semibold flex-shrink-0">
                            <Star className="w-3.5 h-3.5 text-emp-gold fill-current" />
                            <span>{product.rating || '4.8'}</span>
                            <span className="text-emp-ink-muted font-normal">
                              ({product.reviews_count || product.reviewsCount || 42})
                            </span>
                          </span>
                        </div>

                        <h3
                          onClick={() => handleOpenDetail(product)}
                          className="font-display font-bold text-sm text-emp-ink hover:text-emp-brand cursor-pointer line-clamp-2 leading-snug transition-colors"
                        >
                          {product.title}
                        </h3>

                        <p className="text-xs text-emp-ink-secondary line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        {/* Specs Highlights */}
                        {product.specs?.sku && (
                          <div className="pt-2 border-t border-emp-surface-line flex justify-between text-[10px] font-mono text-emp-ink-muted">
                            <span>SKU: {product.specs.sku}</span>
                            <span className={isSoldOut ? 'text-rose-600' : 'text-emerald-700'}>
                              {isSoldOut ? 'Sold out' : `${product.stock || 10} in stock`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Pricing & Actions */}
                    <div className="p-5 pt-0">
                      <div className="pt-3 border-t border-emp-surface-line flex items-center justify-between gap-2">
                        {/* Price */}
                        <div>
                          <div className="flex items-baseline space-x-1.5">
                            <span className="font-display font-extrabold text-base text-emp-ink">
                              {formatCurrency(price, 'USD')}
                            </span>
                            {hasDiscount && (
                              <span className="text-xs line-through text-emp-ink-muted font-mono">
                                {formatCurrency(comparePrice, 'USD')}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-emp-ink-muted block font-mono">
                            USD ($)
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1.5">
                          {/* View Details Button */}
                          <button
                            type="button"
                            onClick={() => handleOpenDetail(product)}
                            className="p-2 rounded-full border border-emp-surface-line bg-white hover:bg-emp-brand-050 hover:border-emp-brand-100 text-emp-ink-secondary hover:text-emp-brand transition-colors"
                            title="View product details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Compare Button */}
                          <button
                            type="button"
                            onClick={() => addToCompare && addToCompare(product)}
                            className={`p-2 rounded-full border transition-colors ${
                              inCompare
                                ? 'bg-emp-brand-050 border-emp-brand text-emp-brand'
                                : 'border-emp-surface-line bg-white hover:bg-emp-brand-050 hover:border-emp-brand-100 text-emp-ink-secondary hover:text-emp-brand'
                            }`}
                            title={inCompare ? 'In comparison' : 'Add to compare'}
                          >
                            <Layers className="w-3.5 h-3.5" />
                          </button>

                          {/* Add to Cart Button */}
                          <button
                            type="button"
                            onClick={(e) => handleCardAddToCart(product, e)}
                            disabled={isSoldOut}
                            className={`px-3 py-2 rounded-pill font-body font-bold text-xs flex items-center space-x-1.5 transition-all shadow-emp-sm ${
                              isSoldOut
                                ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
                                : product.has_variants
                                ? 'bg-emp-brand-050 border border-emp-brand text-emp-brand hover:bg-emp-brand hover:text-white'
                                : 'btn-emp-primary active:scale-95'
                            }`}
                          >
                            <ShoppingCart className="w-3 h-3" />
                            <span>{isSoldOut ? 'Sold' : product.has_variants ? 'Options' : 'Add'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* 4. PRODUCT DETAILS MODAL (POPUP / SLIDE-OVER) */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        onAddToCart={(prod, qty, variant) => {
          addToCart(prod, qty, variant);
          if (showToast) {
            showToast(`Added ${qty} × ${prod.title} to cart.`, 'success');
          }
        }}
        onAddToCompare={(prod) => addToCompare && addToCompare(prod)}
        isInCompare={selectedProduct && isInCompare ? isInCompare(selectedProduct.id) : false}
      />
    </div>
  );
}
