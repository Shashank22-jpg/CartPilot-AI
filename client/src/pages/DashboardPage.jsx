import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  FileKey,
  Clock,
  Compass,
  Layers,
  Search,
  Bot,
  Package,
  User,
  ShoppingBag,
  CreditCard,
  CheckCircle2,
  Star,
  Flame,
  Truck,
  RotateCcw,
  Zap,
  Tag,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';

export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    products = [],
    orders = [],
    passports = [],
    budget,
    addToCart,
    showToast,
  } = useApp();

  const safeProducts = useMemo(() => (Array.isArray(products) ? products.filter(Boolean) : []), [products]);
  const safeOrders = useMemo(() => (Array.isArray(orders) ? orders.filter(Boolean) : []), [orders]);
  const safePassports = useMemo(() => (Array.isArray(passports) ? passports.filter(Boolean) : []), [passports]);

  // Search & Prompt input state
  const [quickInput, setQuickInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Countdown timer for Deal of the Day (Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 24, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (quickInput.trim()) {
      navigate(`/assistant?q=${encodeURIComponent(quickInput.trim())}`);
    }
  };

  const handleQuickPrompt = (promptText) => {
    navigate(`/assistant?q=${encodeURIComponent(promptText)}`);
  };

  // Derive categories from products
  const categories = useMemo(() => {
    const set = new Set(safeProducts.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [safeProducts]);

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return safeProducts.slice(0, 8);
    return safeProducts.filter((p) => p.category === selectedCategory).slice(0, 8);
  }, [safeProducts, selectedCategory]);

  // Featured Deal Product (e.g. Headphones or Watch)
  const dealProduct = useMemo(() => {
    return (
      safeProducts.find((p) => (p.title || '').toLowerCase().includes('headphones')) ||
      safeProducts[0] || {
        id: 'deal-prod-1',
        title: 'Active Noise Cancelling Wireless Headphones',
        brand: 'Aptdot Audio',
        price: 149.0,
        originalPrice: 199.0,
        rating: 4.9,
        reviewsCount: 342,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        description: 'Hybrid active noise cancellation, 40mm titanium drivers, 38-hour battery, and verified 30-day return rights.',
      }
    );
  }, [safeProducts]);

  // Hero Spotlight Product
  const heroProduct = useMemo(() => {
    return safeProducts[1] || dealProduct;
  }, [safeProducts, dealProduct]);

  // Budget calculations in USD
  const monthlyLimit = budget?.monthlyLimit || 3000;
  const spentThisMonth = budget?.spentThisMonth || 0;
  const budgetPercent = Math.min(100, Math.round((spentThisMonth / monthlyLimit) * 100));

  return (
    <div className="space-y-8 pb-16">
      {/* 1. TOP STORE ANNOUNCEMENT STRIP */}
      <div className="rounded-emp bg-[#084a3d] text-[#dbeee7] px-4 sm:px-6 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 shadow-emp-sm">
        <p className="flex items-center space-x-2 font-medium">
          <span className="text-emp-accent">✦</span>
          <span>
            Free express shipping on orders over <strong>$50 USD</strong> • Authenticated PayPal Sandbox Orders v2 Gateway
          </span>
        </p>
        <div className="flex items-center space-x-3 text-[11px] font-semibold">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase">
            DEMO ENVIRONMENT
          </span>
          <span className="text-[#0c6b58]">•</span>
          <Link to="/orders" className="hover:text-white transition-colors">
            Order Ledger ({safeOrders.length})
          </Link>
          <span className="text-[#0c6b58]">•</span>
          <Link to="/passport" className="hover:text-white transition-colors">
            Passports ({safePassports.length})
          </Link>
          <span className="text-[#0c6b58]">•</span>
          <span className="text-white font-mono bg-[#0c6b58] px-2 py-0.5 rounded-pill">
            USD ($)
          </span>
        </div>
      </div>

      {/* 2. DEMO ENVIRONMENT NOTICE */}
      <div className="rounded-emp border border-amber-200/90 bg-amber-50/90 text-amber-950 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 text-xs shadow-emp-sm">
        <span className="inline-flex items-center self-start sm:self-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500 text-slate-950 tracking-wider shrink-0">
          DEMO ENVIRONMENT
        </span>
        <p className="leading-relaxed font-medium">
          Demo Environment: CartPilot AI currently uses synthetic product data for demonstration purposes. Product prices, availability, seller information, and purchase insights may be simulated. All payments are processed in PayPal Sandbox mode. No real transactions are made.
        </p>
      </div>

      {/* 2. EMPORIUM DUAL-COLUMN HERO */}
      <section className="relative overflow-hidden rounded-emp-lg bg-gradient-to-br from-[#e7f3ef]/80 via-white to-white border border-emp-surface-line p-6 sm:p-10 lg:p-12 shadow-emp-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Value Props & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white border border-emp-brand-100 text-emp-brand-700 font-body font-bold text-xs shadow-emp-sm">
              <Sparkles className="w-3.5 h-3.5 text-emp-brand" />
              <span>Autumn 2026 Collection • Autonomous Benchmark Goods</span>
            </span>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.12] text-emp-ink">
              Find better.{' '}
              <em className="text-emp-brand not-italic">Buy smarter.</em>
            </h1>

            <p className="font-body text-base text-emp-ink-secondary leading-relaxed max-w-xl">
              Discover products, compare your options and make confident purchase decisions with AI.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a href="#featured-products" className="btn-emp btn-emp-primary">
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link to="/assistant" className="btn-emp btn-emp-secondary">
                <Bot className="w-4 h-4 text-emp-brand" />
                <span>Ask AI Assistant</span>
              </Link>
            </div>

            {/* Hero Trust Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-emp-surface-line text-xs">
              <div>
                <strong className="block font-display font-extrabold text-xl text-emp-ink">
                  {safeProducts.length || 50}
                </strong>
                <span className="text-emp-ink-muted">Aptdot Products</span>
              </div>
              <div>
                <strong className="block font-display font-extrabold text-xl text-emp-ink">
                  135
                </strong>
                <span className="text-emp-ink-muted">Hardware Variants</span>
              </div>
              <div>
                <strong className="block font-display font-extrabold text-xl text-emp-ink">
                  30-Day
                </strong>
                <span className="text-emp-ink-muted">Guaranteed Returns</span>
              </div>
              <div>
                <strong className="block font-display font-extrabold text-xl text-emp-ink text-emp-brand">
                  Orders v2
                </strong>
                <span className="text-emp-ink-muted">PayPal Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-emp-lg bg-emp-surface-tint border border-emp-surface-line overflow-hidden shadow-emp-lg group">
              <div className="aspect-[4/3] overflow-hidden bg-white">
                <img
                  src={heroProduct.image || heroProduct.image_url}
                  alt={heroProduct.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Sale Tag */}
              <div className="absolute top-4 right-4 bg-emp-accent text-white font-display font-bold text-xs uppercase px-3 py-1.5 rounded-pill shadow-glow-coral">
                Top Rated Choice
              </div>

              <div className="p-5 bg-white space-y-2 border-t border-emp-surface-line">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emp-brand font-bold uppercase tracking-wider text-[10px]">
                    {heroProduct.brand} • {heroProduct.category}
                  </span>
                  <div className="flex items-center space-x-1 text-emp-gold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-emp-ink">{heroProduct.rating || 4.8}</span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-sm text-emp-ink line-clamp-1">
                  {heroProduct.title}
                </h3>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-display font-extrabold text-lg text-emp-ink">
                      {formatCurrency(heroProduct.price, 'USD')}
                    </span>
                    {heroProduct.originalPrice && heroProduct.originalPrice > heroProduct.price && (
                      <span className="text-xs text-emp-ink-muted line-through">
                        {formatCurrency(heroProduct.originalPrice, 'USD')}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      addToCart(heroProduct);
                      showToast(`Added "${heroProduct.title}" to cart`, 'success');
                    }}
                    className="btn-emp btn-emp-primary text-xs py-2 px-4 shadow-emp-sm"
                  >
                    <span>Quick Add</span>
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Secondary Promo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-emp-surface-line">
          <Link
            to="/discover?category=Electronics"
            className="group relative rounded-emp overflow-hidden p-6 bg-gradient-to-r from-[#0c6b58] to-[#084a3d] text-white flex items-center justify-between shadow-emp-sm hover:shadow-emp transition-all"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#cfe8e0] uppercase tracking-wider block">
                Audio & Acoustic Hardware
              </span>
              <h4 className="font-display font-bold text-lg sm:text-xl">
                ANC Headphones from $32.00
              </h4>
              <span className="inline-flex items-center space-x-1 text-xs font-semibold text-white group-hover:underline pt-1">
                <span>Explore catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
              <Sparkles className="w-7 h-7 text-[#cfe8e0]" />
            </div>
          </Link>

          <Link
            to="/discover?category=Hydration"
            className="group relative rounded-emp overflow-hidden p-6 bg-gradient-to-r from-[#16211d] to-[#253831] text-white flex items-center justify-between shadow-emp-sm hover:shadow-emp transition-all"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#bfe3d8] uppercase tracking-wider block">
                Hydration & Lifestyle
              </span>
              <h4 className="font-display font-bold text-lg sm:text-xl">
                Stainless Steel Essentials
              </h4>
              <span className="inline-flex items-center space-x-1 text-xs font-semibold text-white group-hover:underline pt-1">
                <span>Inspect finishes</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
              <ShieldCheck className="w-7 h-7 text-[#bfe3d8]" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. AI SHOPPING AGENT LAUNCHPAD (Conversational Prompt Strip) */}
      <section className="rounded-emp-lg bg-white border border-emp-surface-line p-6 shadow-emp-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emp-brand-050 text-emp-brand flex items-center justify-center border border-emp-brand-100">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-emp-ink">
                CartPilot Autonomous Shopping Agent
              </h3>
              <p className="font-body text-xs text-emp-ink-muted">
                Ask in natural language to compare hardware specs, find variants, or review return policies.
              </p>
            </div>
          </div>

          <Link
            to="/assistant"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-emp-brand hover:text-emp-brand-700 transition-colors"
          >
            <span>Open Dedicated AI Workspace</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <form onSubmit={handlePromptSubmit} className="relative">
          <div className="emp-search-pill p-1.5 pr-2">
            <Bot className="w-5 h-5 text-emp-brand ml-2 flex-shrink-0" />
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder="Ask agent: 'Find ANC wireless headphones with over 30 hours battery under $150'..."
              className="emp-search-input px-3 text-sm"
            />
            <button
              type="submit"
              className="btn-emp btn-emp-primary text-xs py-2 px-5 flex-shrink-0 shadow-emp-sm"
            >
              <span>Ask Agent</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Suggested Prompt Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-emp-ink-muted font-medium text-[11px]">Quick prompts:</span>
          {[
            'Compare Active Noise Cancelling Headphones against benchmark audio',
            'Show me available sizes and colors for the Insulated Water Bottle',
            'What strap and lens combinations are available for the Minimalist Watch?',
            'Find all products under $100 eligible for free shipping',
          ].map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickPrompt(prompt)}
              className="px-3 py-1 rounded-pill bg-emp-surface-tint hover:bg-emp-brand-050 border border-emp-surface-line hover:border-emp-brand-100 text-emp-ink-secondary hover:text-emp-brand-700 text-[11px] font-medium transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </section>

      {/* 4. SHOP BY CATEGORY (Emporium .cats Grid) */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold text-emp-brand uppercase tracking-wider">
              Browse the Store
            </p>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-emp-ink">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/discover"
            className="text-xs font-bold text-emp-brand hover:text-emp-brand-700 flex items-center space-x-1"
          >
            <span>View all 50 products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Audio', label: 'Audio & Sound', count: '12 items', icon: '🎧' },
            { name: 'Hydration', label: 'Hydration & Bottle', count: '8 items', icon: '💧' },
            { name: 'Wearables', label: 'Watches & Tech', count: '10 items', icon: '⌚' },
            { name: 'Home', label: 'Smart Home & Living', count: '9 items', icon: '🏠' },
            { name: 'Office', label: 'Computing & Office', count: '11 items', icon: '⌨️' },
            { name: 'Deals', label: 'Special Markdowns', count: 'Up to 30% Off', icon: '🔥', isDeal: true },
          ].map((cat, idx) => (
            <Link
              key={idx}
              to={`/discover?category=${encodeURIComponent(cat.name)}`}
              className={`flex flex-col items-center text-center p-5 rounded-emp border transition-all duration-200 group ${
                cat.isDeal
                  ? 'bg-gradient-to-b from-emp-accent-050 to-white border-[#f7d9cb] hover:shadow-emp'
                  : 'bg-white border-emp-surface-line hover:border-emp-brand-100 hover:shadow-emp hover:-translate-y-1'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3 ${
                cat.isDeal ? 'bg-emp-accent text-white shadow-glow-coral' : 'bg-emp-surface-tint group-hover:bg-emp-brand-050'
              }`}>
                <span>{cat.icon}</span>
              </div>
              <span className="font-display font-bold text-sm text-emp-ink group-hover:text-emp-brand">
                {cat.label}
              </span>
              <span className={`text-[11px] mt-1 ${
                cat.isDeal ? 'text-emp-accent font-bold' : 'text-emp-ink-muted'
              }`}>
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. DEAL OF THE DAY COUNTDOWN SHOWCASE (Emporium .deal) */}
      <section className="rounded-emp-lg bg-gradient-to-r from-[#084a3d] via-[#0c6b58] to-[#0a5a4a] text-white p-6 sm:p-10 shadow-emp">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-emp overflow-hidden bg-white/10 shadow-emp-lg">
              <img
                src={dealProduct.image || dealProduct.image_url}
                alt={dealProduct.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute top-3 left-3 bg-emp-accent text-white font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-pill shadow-glow-coral">
              Deal of the Day
            </span>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-bold text-[#bfe3d8] uppercase tracking-wider block">
              Today only • Limited Sandbox Stock
            </span>

            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              {dealProduct.title}
            </h2>

            <div className="flex items-center space-x-2 text-xs text-[#d7ede6]">
              <div className="flex text-emp-gold">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <span className="font-semibold text-white">
                {dealProduct.rating || 4.9} ({dealProduct.reviewsCount || 342} verified reviews)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#d7ede6] leading-relaxed max-w-xl">
              {dealProduct.description || 'Premium benchmark hardware with full cryptographic passport attestation and instant PayPal Sandbox settlement.'}
            </p>

            <div className="flex items-baseline space-x-3 pt-1">
              <span className="font-display font-black text-3xl text-white">
                {formatCurrency(dealProduct.price, 'USD')}
              </span>
              <span className="text-base text-[#a7cfc4] line-through">
                {formatCurrency(dealProduct.originalPrice || dealProduct.price * 1.3, 'USD')}
              </span>
              <span className="bg-emp-accent text-white text-xs font-bold px-2.5 py-1 rounded-pill">
                Save 25%
              </span>
            </div>

            {/* Countdown Display Units */}
            <div className="flex items-center space-x-2 pt-2">
              <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 min-w-[56px]">
                <b className="font-display font-extrabold text-xl font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}
                </b>
                <small className="text-[9px] uppercase tracking-wider text-[#bfe3d8]">Hrs</small>
              </div>
              <span className="font-bold text-lg text-[#7fc3b1]">:</span>
              <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 min-w-[56px]">
                <b className="font-display font-extrabold text-xl font-mono">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </b>
                <small className="text-[9px] uppercase tracking-wider text-[#bfe3d8]">Min</small>
              </div>
              <span className="font-bold text-lg text-[#7fc3b1]">:</span>
              <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 min-w-[56px]">
                <b className="font-display font-extrabold text-xl font-mono">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </b>
                <small className="text-[9px] uppercase tracking-wider text-[#bfe3d8]">Sec</small>
              </div>
            </div>

            {/* Stock Level Progress */}
            <div className="space-y-1.5 max-w-md pt-1">
              <div className="h-2 bg-white/20 rounded-pill overflow-hidden">
                <div className="h-full bg-emp-accent rounded-pill" style={{ width: '74%' }} />
              </div>
              <p className="text-[11px] text-[#d7ede6]">
                <strong className="text-white">37 units claimed</strong> • only 13 remaining in sandbox stage
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  addToCart(dealProduct);
                  showToast(`Added Deal of the Day "${dealProduct.title}" to cart!`, 'success');
                }}
                className="btn-emp btn-emp-accent py-3 px-8 text-sm font-bold shadow-glow-coral"
              >
                <span>Add to Cart • {formatCurrency(dealProduct.price, 'USD')}</span>
                <ShoppingBag className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS WITH EMPORIUM FILTER TABS */}
      <section id="featured-products" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold text-emp-brand uppercase tracking-wider">
              Handpicked this Week
            </p>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-emp-ink">
              Featured Aptdot Products
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-pill text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emp-brand text-white shadow-emp-sm'
                    : 'bg-white border border-emp-surface-line text-emp-ink-secondary hover:border-emp-brand-100 hover:text-emp-brand'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const hasDiscount = product.originalPrice && product.originalPrice > product.price;

            return (
              <article
                key={product.id}
                className="pcard-emp group"
              >
                <div className="relative aspect-square overflow-hidden bg-emp-surface-tint">
                  <img
                    src={product.image || product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badge */}
                  {hasDiscount ? (
                    <span className="badge-emp badge-emp-sale absolute top-3 left-3 z-10">
                      Sale
                    </span>
                  ) : (
                    <span className="badge-emp badge-emp-best absolute top-3 left-3 z-10">
                      Verified
                    </span>
                  )}

                  {/* Quick Add Overlay on Hover */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={() => {
                        addToCart(product);
                        showToast(`Added "${product.title}" to cart`, 'success');
                      }}
                      className="w-full py-2.5 rounded-pill bg-emp-ink text-white hover:bg-emp-brand font-bold text-xs flex items-center justify-center space-x-1.5 shadow-emp transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Quick Add</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-bold text-emp-brand uppercase tracking-wider block">
                      {product.brand} • {product.category}
                    </span>
                    <h3 className="font-display font-bold text-sm text-emp-ink line-clamp-2 mt-1 group-hover:text-emp-brand transition-colors">
                      <Link to={`/discover?q=${encodeURIComponent(product.title)}`}>
                        {product.title}
                      </Link>
                    </h3>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-emp-surface-line/60">
                    <div className="flex items-center space-x-1 text-xs">
                      <div className="flex text-emp-gold">
                        {'★★★★★'.split('').map((s, i) => (
                          <span key={i}>{s}</span>
                        ))}
                      </div>
                      <span className="text-emp-ink-muted text-[11px] font-medium">
                        {product.rating || 4.7} ({product.reviewsCount || 128})
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-display font-extrabold text-base text-emp-ink">
                          {formatCurrency(product.price, 'USD')}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-emp-ink-muted line-through">
                            {formatCurrency(product.originalPrice, 'USD')}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] text-emp-brand font-bold font-mono">
                        In Stock ({product.stock || 50})
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 7. BRAND TRUST BAR (Emporium .trust Section) */}
      <section className="rounded-emp-lg bg-emp-surface-tint border border-emp-surface-line p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3.5 p-2">
            <div className="w-12 h-12 rounded-xl bg-white border border-emp-brand-100 text-emp-brand flex items-center justify-center flex-shrink-0 shadow-emp-sm">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <strong className="block font-display font-bold text-sm text-emp-ink">
                Free Express Shipping
              </strong>
              <span className="text-xs text-emp-ink-muted">
                On all orders over $50 USD
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-2">
            <div className="w-12 h-12 rounded-xl bg-white border border-emp-brand-100 text-emp-brand flex items-center justify-center flex-shrink-0 shadow-emp-sm">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <strong className="block font-display font-bold text-sm text-emp-ink">
                PayPal Sandbox Gateway
              </strong>
              <span className="text-xs text-emp-ink-muted">
                Authentic Orders v2 settlement
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-2">
            <div className="w-12 h-12 rounded-xl bg-white border border-emp-brand-100 text-emp-brand flex items-center justify-center flex-shrink-0 shadow-emp-sm">
              <FileKey className="w-6 h-6" />
            </div>
            <div>
              <strong className="block font-display font-bold text-sm text-emp-ink">
                Purchase Passports
              </strong>
              <span className="text-xs text-emp-ink-muted">
                Cryptographic hardware registry
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-2">
            <div className="w-12 h-12 rounded-xl bg-white border border-emp-brand-100 text-emp-brand flex items-center justify-center flex-shrink-0 shadow-emp-sm">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <strong className="block font-display font-bold text-sm text-emp-ink">
                30-Day Free Returns
              </strong>
              <span className="text-xs text-emp-ink-muted">
                Automated window countdowns
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MEMBER FINANCIAL & BUDGET GUARDRAILS CARD */}
      <section className="rounded-emp-lg bg-white border border-emp-surface-line p-6 shadow-emp-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emp-surface-line">
          <div className="flex items-center space-x-2 text-emp-ink font-display font-bold text-base">
            <TrendingUp className="w-5 h-5 text-emp-brand" />
            <span>Monthly Budget Guardrail & Member Health</span>
          </div>
          <span className="text-xs font-mono font-bold text-emp-brand bg-emp-brand-050 px-2.5 py-1 rounded-pill border border-emp-brand-100">
            {budgetPercent}% of monthly ceiling used
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div>
            <span className="text-emp-ink-muted block text-[11px]">Spent this Month</span>
            <strong className="font-display font-extrabold text-lg text-emp-ink block mt-0.5">
              {formatCurrency(spentThisMonth, 'USD')}
            </strong>
          </div>
          <div>
            <span className="text-emp-ink-muted block text-[11px]">Monthly Ceiling</span>
            <strong className="font-display font-extrabold text-lg text-emp-ink block mt-0.5">
              {formatCurrency(monthlyLimit, 'USD')}
            </strong>
          </div>
          <div>
            <span className="text-emp-ink-muted block text-[11px]">Ledger Transactions</span>
            <strong className="font-display font-extrabold text-lg text-emp-brand block mt-0.5">
              {safeOrders.length} Verified Orders
            </strong>
          </div>
        </div>

        <div className="w-full bg-emp-surface-tint rounded-pill h-2.5 overflow-hidden border border-emp-surface-line">
          <div
            className={`h-full rounded-pill transition-all duration-500 ${
              budgetPercent > 80 ? 'bg-emp-accent' : 'bg-emp-brand'
            }`}
            style={{ width: `${budgetPercent}%` }}
          />
        </div>
      </section>
    </div>
  );
}
