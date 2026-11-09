import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  ExternalLink,
  ChevronRight,
  Info,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { productCategories } from '../data/mockProducts';
import { formatCurrency } from '../utils/currency';

export default function DiscoverPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    addToCompare,
    isInCompare,
    setSelectedIntelligenceProduct,
  } = useApp();

  // Search & Filter State
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [maxPrice, setMaxPrice] = useState(250000);
  const [minRating, setMinRating] = useState(0);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  // Product Detail Drawer State
  const [drawerProduct, setDrawerProduct] = useState(null);

  // Sync with URL params
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Brands list from products
  const brands = useMemo(() => {
    return ['All', ...new Set(products.map(p => p.brand))];
  }, [products]);
  const [selectedBrand, setSelectedBrand] = useState('All');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'All' && item.brand !== selectedBrand) {
        return false;
      }
      // Price filter
      if (item.price > maxPrice) {
        return false;
      }
      // Rating filter
      if (item.rating < minRating) {
        return false;
      }
      // Verified only
      if (onlyVerified && !item.evidence?.specsVerified) {
        return false;
      }
      // Search text query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesBrand = item.brand.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesCategory && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'confidence-desc') return b.evidence.overallConfidenceScore - a.evidence.overallConfidenceScore;
      return 0; // relevance
    });
  }, [products, selectedCategory, selectedBrand, maxPrice, minRating, onlyVerified, searchQuery, sortBy]);

  return (
    <div className="space-y-6 pb-16">
      {/* Search & Top Action Bar */}
      <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, brand, verified specification..."
            className="w-full bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center space-x-3 overflow-x-auto">
          <div className="flex items-center space-x-2 text-xs text-slate-400 flex-shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-electric-400" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-navy-950 border border-navy-750 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="relevance">AI Relevance</option>
              <option value="confidence-desc">Evidence Score (High to Low)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: Highest</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedBrand('All');
              setMaxPrice(250000);
              setMinRating(0);
              setOnlyVerified(false);
              setSearchQuery('');
            }}
            className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-400 hover:text-white text-xs transition-colors flex-shrink-0"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {productCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-electric-600 to-violet-600 text-white shadow-glow-blue'
                : 'bg-navy-900 border border-navy-800 text-slate-400 hover:text-slate-200 hover:bg-navy-850'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid & Filters Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Filter className="w-3.5 h-3.5 text-electric-400" />
                <span>Filters & Constraints</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {filteredProducts.length} Matches
              </span>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-2">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-navy-950 border border-navy-750 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              >
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className="text-[11px] font-semibold text-slate-400">Max Price Cap</span>
                <span className="font-mono text-white font-bold">{formatCurrency(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="250000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-electric-500 bg-navy-950"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>{formatCurrency(10000)}</span>
                <span>{formatCurrency(250000)}</span>
              </div>
            </div>

            {/* Verification Only Toggle */}
            <div className="pt-2 border-t border-navy-800/80">
              <label className="flex items-center space-x-2 text-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="rounded border-navy-700 bg-navy-950 text-electric-500 focus:ring-0"
                />
                <span className="text-slate-300">Only Verified Specs & Benchmarks</span>
              </label>
              <p className="text-[10px] text-slate-500 mt-1 pl-5">
                Excludes unverified seller marketing claims
              </p>
            </div>

            {/* Rating Filter */}
            <div className="pt-2 border-t border-navy-800/80">
              <label className="text-[11px] font-semibold text-slate-400 block mb-2">
                Minimum Customer Rating
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 4.5, 4.7, 4.8].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(rate)}
                    className={`py-1.5 rounded-lg text-[11px] font-medium border text-center transition-colors ${
                      minRating === rate
                        ? 'bg-electric-500/20 border-electric-500 text-electric-300'
                        : 'bg-navy-950 border-navy-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {rate === 0 ? 'Any' : `${rate}+ ★`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Products Catalogue Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-navy-900 border border-navy-800 space-y-3">
              <Search className="w-8 h-8 text-slate-500 mx-auto" />
              <h3 className="text-sm font-semibold text-white">No products found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No items match your active filters and search query. Try broadening your price range or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => {
                const inCompare = isInCompare(product.id);
                return (
                  <div
                    key={product.id}
                    className="rounded-2xl bg-navy-900 border border-navy-800 hover:border-navy-700 transition-all flex flex-col justify-between overflow-hidden group shadow-md"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative aspect-[4/3] bg-navy-950 overflow-hidden cursor-pointer" onClick={() => setDrawerProduct(product)}>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 flex flex-col space-y-1">
                          <span className="px-2 py-0.5 rounded-md bg-navy-950/80 backdrop-blur-md text-[10px] font-bold text-electric-300 border border-navy-750">
                            {product.tag}
                          </span>
                        </div>
                        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-navy-900/90 text-slate-300 border border-navy-750 text-[10px] font-medium flex items-center space-x-1 shadow-md">
                          <ShieldCheck className="w-3 h-3 text-electric-400" />
                          <span>Sample Data</span>
                        </span>
                      </div>

                      {/* Content Area */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span className="font-bold uppercase tracking-wider text-slate-400">
                            {product.brand} • {product.category}
                          </span>
                          <span className="flex items-center space-x-1 text-amber-400">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{product.rating}</span>
                            <span className="text-slate-500">({product.reviewsCount})</span>
                          </span>
                        </div>

                        <h4
                          onClick={() => setDrawerProduct(product)}
                          className="text-xs font-semibold text-slate-100 hover:text-electric-300 cursor-pointer line-clamp-2 leading-relaxed"
                        >
                          {product.title}
                        </h4>

                        {/* Specs Highlights */}
                        <div className="pt-2 text-[11px] text-slate-400 space-y-1 border-t border-navy-800/80">
                          {Object.entries(product.specs).slice(0, 2).map(([k, v]) => (
                            <div key={k} className="flex justify-between truncate">
                              <span className="text-slate-400">{k}:</span>
                              <span className="text-slate-300 font-mono text-[10px]">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions & Pricing */}
                    <div className="p-4 pt-0">
                      <div className="pt-3 border-t border-navy-800 flex items-center justify-between">
                        <div>
                          <span className="text-sm font-extrabold font-mono text-white">
                            {formatCurrency(product.price)}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-[10px] line-through text-slate-500 ml-1.5 font-mono">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() => {
                              setSelectedIntelligenceProduct(product);
                              navigate('/intelligence');
                            }}
                            title="Inspect Evidence & Risk"
                            className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white transition-colors"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => addToCompare(product)}
                            title={inCompare ? 'Already in comparison' : 'Add to Comparison'}
                            className={`p-1.5 rounded-lg transition-colors ${
                              inCompare
                                ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40'
                                : 'bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white'
                            }`}
                          >
                            <Layers className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="px-2.5 py-1.5 rounded-lg bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs shadow-sm transition-colors flex items-center space-x-1"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal Drawer */}
      {drawerProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-navy-900 border-l border-navy-750 h-full overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-navy-800">
              <span className="text-xs font-bold text-electric-400 uppercase tracking-wider">
                Product Specification Dossier
              </span>
              <button
                onClick={() => setDrawerProduct(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden bg-navy-950">
              <img
                src={drawerProduct.image}
                alt={drawerProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {drawerProduct.brand} • {drawerProduct.category}
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                {drawerProduct.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {drawerProduct.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Sample Purchase Price</span>
                <span className="text-xl font-bold font-mono text-white">
                  {formatCurrency(drawerProduct.price)}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => addToCompare(drawerProduct)}
                  className="px-3 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 text-xs font-semibold flex items-center space-x-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Compare</span>
                </button>
                <button
                  onClick={() => addToCart(drawerProduct)}
                  className="px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-bold shadow-glow-blue flex items-center space-x-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

            {/* Evidence & Specifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Technical Specifications</span>
              </h4>
              <div className="rounded-xl border border-navy-800 bg-navy-950 overflow-hidden divide-y divide-navy-800 text-xs">
                {Object.entries(drawerProduct.specs).map(([k, v]) => (
                  <div key={k} className="p-2.5 flex justify-between">
                    <span className="text-slate-400">{k}</span>
                    <span className="text-slate-200 font-mono text-[11px] text-right max-w-xs">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Return Policy & Warranty */}
            <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 text-xs space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-semibold">
                <Calendar className="w-4 h-4" />
                <span>Return Window & Warranty Policy</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                {drawerProduct.returnPolicy.condition}
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-mono">
                <span>Return Days: {drawerProduct.returnPolicy.days}</span>
                <span>Restocking Fee: {formatCurrency(drawerProduct.returnPolicy.restockingFee)}</span>
                <span>Prepaid Shipping: {drawerProduct.returnPolicy.prepaidLabel ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
