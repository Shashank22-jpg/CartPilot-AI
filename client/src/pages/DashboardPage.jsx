import React, { useState } from 'react';
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
  ChevronRight,
  Search,
  ExternalLink,
  Bot,
  Package,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';

export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    products,
    orders,
    passports,
    budget,
    addToCart,
    addToCompare,
    setSelectedIntelligenceProduct,
  } = useApp();

  const [quickInput, setQuickInput] = useState('');

  const handleQuickPrompt = (promptText) => {
    navigate(`/assistant?q=${encodeURIComponent(promptText)}`);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (quickInput.trim()) {
      handleQuickPrompt(quickInput.trim());
    }
  };

  const recentSearches = [
    'ANC headphones under ₹35,000',
    'MacBook M3 vs Dell XPS 15',
    'Mechanical keyboards with QMK/VIA',
    'OLED monitors 240Hz with burn-in warranty',
    'Sub-249g camera drones',
  ];

  const suggestedPrompts = [
    {
      title: 'Evidence-Backed Headphone Comparison',
      desc: 'Compare Sony XM5 vs Bose Ultra acoustic benchmarks and warranty policies',
      prompt: 'Compare Sony WH-1000XM5 and Bose QuietComfort Ultra focusing on noise cancellation benchmarks, return windows, and warranty terms.',
    },
    {
      title: 'Creator Laptop Architecture Evaluation',
      desc: 'Check thermal throttling and RAM upgradeability on M3 Pro vs XPS 15',
      prompt: 'Is the Dell XPS 15 or Apple MacBook Pro 14 better for heavy software development and sustained rendering?',
    },
    {
      title: 'Return Policy & Warranty Analysis',
      desc: 'Evaluate fine-print restocking fees and replacement terms across displays',
      prompt: 'Check the warranty coverage for OLED burn-in on the LG 27 UltraGear monitor.',
    },
  ];

  const budgetPercent = Math.min(100, Math.round((budget.spentThisMonth / budget.monthlyLimit) * 100));

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome & AI Launchpad Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-navy-750 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-electric-400" />
            <span>CartPilot Agentic Commerce • Prototype Demo Environment</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="bg-gradient-to-r from-electric-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">Alex</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your shopping agent is active. Ask questions in natural language, evaluate specifications, or inspect your digital purchase passports and active return deadlines. All catalogue items and orders are populated with realistic sample data for hackathon evaluation.
          </p>

          {/* Quick AI Prompt Input */}
          <form onSubmit={handleInputSubmit} className="mt-6">
            <div className="relative flex items-center shadow-lg shadow-black/40">
              <Bot className="absolute left-4 w-5 h-5 text-electric-400" />
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="Ask your shopping agent (e.g., 'Find me a travel-ready drone under ₹1,20,000 with obstacle avoidance')..."
                className="w-full bg-navy-950/90 border border-navy-700 focus:border-electric-400 rounded-2xl pl-12 pr-32 py-3.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 rounded-xl bg-gradient-to-r from-electric-500 to-violet-600 hover:from-electric-400 hover:to-violet-500 text-white text-xs font-bold shadow-glow-blue transition-all flex items-center space-x-1.5"
              >
                <span>Ask Agent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Quick Search Tag Pills */}
          <div className="mt-4 flex items-center flex-wrap gap-2 text-xs text-slate-400">
            <span className="text-[11px] font-semibold text-slate-400">Recent Searches:</span>
            {recentSearches.map((term, i) => (
              <button
                key={i}
                onClick={() => handleQuickPrompt(term)}
                className="px-2.5 py-1 rounded-lg bg-navy-800/80 hover:bg-navy-750 border border-navy-700 text-slate-300 text-[11px] hover:text-white transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Overview & Statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Monthly Budget */}
        <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Monthly Budget Cap</span>
            <div className="p-2 rounded-lg bg-electric-500/10 text-electric-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold font-mono text-white">
                {formatCurrency(budget.spentThisMonth)}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                / {formatCurrency(budget.monthlyLimit)}
              </span>
            </div>
            <div className="w-full bg-navy-950 rounded-full h-2 mt-2 overflow-hidden border border-navy-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  budgetPercent > 80 ? 'bg-amber-400' : 'bg-gradient-to-r from-electric-500 to-violet-500'
                }`}
                style={{ width: `${budgetPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {budgetPercent}% of monthly spending threshold utilized
            </p>
          </div>
        </div>

        {/* Metric 2: Active Passports */}
        <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Digital Passports</span>
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
              <FileKey className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold font-mono text-white">{passports.length}</span>
              <span className="text-xs text-violet-400 font-medium">Sample Records</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Simulated proof-of-purchase tokens, serial tracking, and warranty records
            </p>
            <Link to="/passport" className="text-[11px] text-electric-400 hover:underline mt-2 inline-flex items-center space-x-1">
              <span>View Passports</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Metric 3: Active Return Deadlines */}
        <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Return Deadlines</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold font-mono text-white">2 Active</span>
              <span className="text-xs text-amber-400 font-medium">10d & 22d left</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Automated reminders prevent missed refund cutoffs (Sample tracking)
            </p>
            <Link to="/passport" className="text-[11px] text-amber-400 hover:underline mt-2 inline-flex items-center space-x-1">
              <span>Inspect Deadlines</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Metric 4: Seed Inventory Coverage */}
        <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Catalogue Seed</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold font-mono text-white">{products.length} Items</span>
              <span className="text-xs text-emerald-400 font-medium">Sample Inventory</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Structured manufacturer specifications for demo testing
            </p>
            <Link to="/discover" className="text-[11px] text-emerald-400 hover:underline mt-2 inline-flex items-center space-x-1">
              <span>Browse Catalogue</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Suggested Shopping Prompts */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-electric-400" />
              <span>Suggested Agentic Inquiries</span>
            </h3>
            <p className="text-xs text-slate-400">
              Click any scenario to load a dialogue in the AI Assistant
            </p>
          </div>
          <Link
            to="/assistant"
            className="text-xs text-electric-400 hover:text-electric-300 font-medium flex items-center space-x-1"
          >
            <span>Open Assistant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestedPrompts.map((s, idx) => (
            <div
              key={idx}
              onClick={() => handleQuickPrompt(s.prompt)}
              className="p-5 rounded-2xl bg-navy-900 border border-navy-800 hover:border-electric-500/50 hover:bg-navy-850 cursor-pointer transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block mb-1">
                  Scenario #{idx + 1}
                </span>
                <h4 className="text-xs font-semibold text-slate-200 group-hover:text-electric-300 transition-colors">
                  {s.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-navy-800/80 flex items-center justify-between text-[11px] text-electric-400 group-hover:translate-x-1 transition-transform">
                <span>Start Evaluation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Verified Products & Recent Purchases Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Top Verified Hardware */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Featured Sample Hardware</span>
              </h3>
              <p className="text-xs text-slate-400">
                Sample products with structured specifications and policy terms
              </p>
            </div>
            <Link to="/discover" className="text-xs text-electric-400 hover:underline">
              View All ({products.length})
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="rounded-2xl bg-navy-900 border border-navy-800 p-4 hover:border-navy-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-navy-950 mb-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-navy-950/80 backdrop-blur-sm text-[10px] font-bold text-electric-300 border border-navy-750">
                      {product.tag}
                    </span>
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-navy-900/90 text-slate-300 text-[10px] font-medium border border-navy-750">
                      Sample Data
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    {product.brand} • {product.category}
                  </span>
                  <h4 className="text-xs font-semibold text-slate-200 mt-1 line-clamp-2">
                    {product.title}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-navy-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-black font-mono text-white">
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
                      title="Inspect Purchase Intelligence"
                      className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => addToCompare(product)}
                      title="Add to Comparison"
                      className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-2.5 py-1.5 rounded-lg bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold shadow-sm transition-colors"
                    >
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Purchases & Passport Alerts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <FileKey className="w-4 h-4 text-violet-400" />
                <span>Recent Purchases</span>
              </h3>
              <p className="text-xs text-slate-400">Sample order records</p>
            </div>
            <Link to="/orders" className="text-xs text-electric-400 hover:underline">
              Ledger
            </Link>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => {
              const item = order.items[0];
              return (
                <div
                  key={order.orderId}
                  className="p-4 rounded-2xl bg-navy-900 border border-navy-800 text-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-slate-400 text-[11px]">{order.orderId}</span>
                    <span className="px-2 py-0.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-[10px] font-semibold">
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-cover bg-navy-950 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-200 truncate">{item.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {formatCurrency(order.total)} • {order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-navy-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-amber-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.returnDaysRemaining > 0 ? `${item.returnDaysRemaining}d return window` : 'Return window closed'}</span>
                    </span>
                    <Link
                      to="/passport"
                      className="text-electric-400 hover:underline flex items-center space-x-0.5"
                    >
                      <span>Passport</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
