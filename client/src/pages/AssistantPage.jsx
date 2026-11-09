import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Bot,
  User,
  Sparkles,
  Send,
  RefreshCw,
  ShieldCheck,
  Layers,
  ShoppingCart,
  ExternalLink,
  Cpu,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Database,
  DollarSign,
  Calendar,
  Eye,
  ArrowRight,
  TrendingUp,
  Info,
  CornerDownLeft,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatProductPrice } from '../utils/currency';
import apiService from '../services/api';

/**
 * Lightweight formatting helper for Gemini Markdown responses
 */
function FormattedMessageText({ text }) {
  if (!text) return null;
  const lines = text.split('\n');

  return (
    <div className="space-y-2 text-slate-100 text-xs sm:text-sm leading-relaxed font-body">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Subheaders
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="font-display font-bold text-xs sm:text-sm text-sky-300 pt-2 pb-0.5 tracking-wide">
              {renderInlineStyles(trimmed.replace('### ', ''))}
            </h4>
          );
        }
        if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
          return (
            <h3 key={idx} className="font-display font-extrabold text-sm sm:text-base text-white pt-2.5 pb-1">
              {renderInlineStyles(trimmed.replace(/^#+\s/, ''))}
            </h3>
          );
        }

        // Bullet lists
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          return (
            <div key={idx} className="flex items-start space-x-2 pl-2">
              <span className="text-sky-400 text-xs mt-0.5 font-bold">•</span>
              <span className="text-slate-200 flex-1">{renderInlineStyles(trimmed.slice(2))}</span>
            </div>
          );
        }

        // Numbered lists (e.g. "1. ", "2. ")
        if (/^\d+\.\s/.test(trimmed)) {
          const num = trimmed.match(/^(\d+)\.\s/)[1];
          const rest = trimmed.replace(/^\d+\.\s/, '');
          return (
            <div key={idx} className="flex items-start space-x-2 pl-2">
              <span className="font-mono text-sky-400 text-xs mt-0.5 font-bold">{num}.</span>
              <span className="text-slate-200 flex-1">{renderInlineStyles(rest)}</span>
            </div>
          );
        }

        // Horizontal Rule
        if (trimmed === '***' || trimmed === '---') {
          return <hr key={idx} className="border-navy-800 my-3" />;
        }

        return <p key={idx}>{renderInlineStyles(trimmed)}</p>;
      })}
    </div>
  );
}

function renderInlineStyles(str) {
  const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-navy-950 border border-navy-800 text-[11px] font-mono text-sky-300">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

/**
 * AssistantPage - Premium AI Shopping Intelligence Workspace
 * CartPilot AI Hybrid Architecture:
 * - Deep navy dark intelligence workspace
 * - Subtle blue & electric accents with high-contrast readability
 * - Verified Aptdot Supabase catalogue tool-calling integration
 * - Real product recommendations with USD pricing and Cart integration
 * - Strict Welcome Screen requirements and suggested prompts
 */
export default function AssistantPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  const {
    products = [],
    addToCart,
    addToCompare,
    isInCompare,
    setSelectedIntelligenceProduct,
    budget,
    showToast,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');
  const [agentState, setAgentState] = useState('idle');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Suggested Starter Prompts (UI Fix specification)
  const starterPrompts = [
    {
      id: 'p1',
      title: 'Find products within my budget.',
      desc: 'Discover top-rated Aptdot items matching your monthly spending ceiling.',
      icon: DollarSign,
      prompt: 'Find products within my budget.',
    },
    {
      id: 'p2',
      title: 'Compare two products.',
      desc: 'Evaluate side-by-side specifications, prices, and hardware trade-offs.',
      icon: Layers,
      prompt: 'Compare two products in the catalogue and highlight key differences.',
    },
    {
      id: 'p3',
      title: 'Find the best value option.',
      desc: 'Identify items with the best price-to-specification ratio and verified warranty.',
      icon: ShieldCheck,
      prompt: 'Find the best value option across the catalogue.',
    },
    {
      id: 'p4',
      title: 'Explain the risks before buying.',
      desc: 'Evaluate return windows, synthetic catalogue guardrails, and seller verification.',
      icon: Calendar,
      prompt: 'Explain the risks before buying products in this catalogue.',
    },
  ];

  // Conversation state (starts empty so welcome screen is displayed initially)
  const [messages, setMessages] = useState([]);

  // Auto-grow textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputMessage]);

  // Handle incoming query from search param (?q=...)
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      handleUserSubmit(query);
      // Clean query parameter after trigger
      setSearchParams({}, { replace: true });
    }
  }, [searchParams]);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking, thinkingStep]);

  /**
   * Submit user message to Gemini Backend API
   */
  const handleUserSubmit = async (customText = null) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isThinking) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setIsThinking(true);
    setAgentState('thinking');
    setThinkingStep('Analyzing natural language shopping constraints...');

    const searchTimeout = setTimeout(() => {
      setAgentState('searching');
      setThinkingStep('Querying Supabase PostgreSQL catalogue via Gemini tool calling...');
    }, 600);

    try {
      // Build conversation history for context
      const historyPayload = messages.slice(-8).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      // Call backend Gemini AI chat endpoint
      const response = await apiService.chatWithAi(textToSend.trim(), historyPayload, {
        budgetLimit: budget?.monthlyLimit || 3000,
        spentThisMonth: budget?.spentThisMonth || 0,
      });

      clearTimeout(searchTimeout);
      setAgentState('responding');

      if (response && response.data) {
        const { reply, activityLog, recommendations, comparison, cartAction } = response.data;

        // If add_to_cart tool executed successfully, sync with client AppContext cart!
        if (cartAction && cartAction.success && cartAction.product) {
          addToCart(
            {
              id: cartAction.product.id,
              title: cartAction.product.title,
              price: cartAction.product.price,
              currency: cartAction.product.currency || 'USD',
              image: cartAction.product.image || cartAction.product.image_url,
              stock: cartAction.product.stock,
            },
            cartAction.quantity || 1
          );
          if (showToast) {
            showToast(`🛒 Staged ${cartAction.quantity || 1}× "${cartAction.product.title}" into cart`, 'success');
          }
        }

        // Normalize recommendations images & fields
        const normalizedRecs = (recommendations || []).map((p) => ({
          ...p,
          image: p.image_url || p.image,
          price: typeof p.price === 'number' ? p.price : Number(p.price) || 0,
        }));

        const assistantMsg = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: reply || 'Here are the verified hardware records from our catalogue.',
          activityLog: activityLog && activityLog.length > 0 ? activityLog : null,
          recommendations: normalizedRecs.length > 0 ? normalizedRecs : null,
          comparison: comparison || null,
          cartAction: cartAction || null,
        };

        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (err) {
      clearTimeout(searchTimeout);
      console.error('[Assistant] Chat error:', err);

      const errorMsg = {
        id: `msg-err-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `I encountered an issue connecting to the AI shopping agent: ${err.message || 'Please verify that the backend server is running and try again.'}`,
        isError: true,
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
      setTimeout(() => {
        setAgentState('idle');
      }, 1500);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setAgentState('idle');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserSubmit();
    }
  };

  const monthlyLimit = budget?.monthlyLimit || 3000;
  const spentThisMonth = budget?.spentThisMonth || 0;

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-6xl mx-auto space-y-4 font-body text-slate-100">
      {/* 1. CLEAN CONVERSATION HEADER */}
      <header className="flex items-center justify-between p-4 sm:px-6 rounded-2xl bg-navy-900/90 border border-navy-800 shadow-xl flex-shrink-0 backdrop-blur-md">
        <div className="flex items-center space-x-3.5 min-w-0">
          {/* Agent Identity Avatar */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-glow-blue flex-shrink-0">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-sky-400" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <h1 className="font-display font-extrabold text-sm sm:text-base text-white truncate">
                CartPilot AI Shopping Assistant
              </h1>
              <span
                className={`hidden sm:inline-flex px-2 py-0.5 text-[10px] font-mono font-bold rounded-full border transition-colors ${
                  agentState === 'thinking'
                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 animate-pulse'
                    : agentState === 'searching'
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 animate-pulse'
                    : agentState === 'responding'
                    ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300'
                    : 'bg-sky-500/10 border-sky-500/30 text-sky-300'
                }`}
              >
                {agentState === 'idle' ? 'GEMINI 2.5 • ONLINE' : agentState.toUpperCase()}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 flex items-center space-x-2 mt-0.5 truncate">
              <span className="flex items-center space-x-1 text-emerald-400">
                <Database className="w-3 h-3 flex-shrink-0" />
                <span>Supabase Live DB</span>
              </span>
              <span>•</span>
              <span className="truncate">Autonomous Tool Calling</span>
              <span>•</span>
              <span className="font-mono text-slate-300">USD ($)</span>
            </p>
          </div>
        </div>

        {/* Right Controls: Budget & Reset */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <div className="hidden md:flex flex-col text-right text-xs">
            <span className="text-[10px] text-slate-400">Monthly Budget</span>
            <span className="font-mono font-bold text-emerald-400 text-[11px]">
              {formatCurrency(spentThisMonth, 'USD')} / {formatCurrency(monthlyLimit, 'USD')}
            </span>
          </div>

          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearChat}
              className="p-2 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-400 hover:text-rose-400 border border-navy-750 transition-colors"
              title="Reset Conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* 2. MAIN CONVERSATION / WELCOME WORKSPACE */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 rounded-2xl bg-navy-900/60 border border-navy-800 backdrop-blur-sm space-y-6">
        {messages.length === 0 ? (
          /* INITIAL WELCOME SCREEN */
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="h-full flex flex-col justify-center items-center text-center max-w-2xl mx-auto py-8 sm:py-12 space-y-8"
          >
            {/* Center Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-emerald-400 p-0.5 shadow-glow-blue flex-shrink-0">
              <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-sky-400" />
              </div>
            </div>

            {/* Welcome Screen Headline & Supporting Text */}
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your AI shopping companion</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                Your smarter shopping journey starts here.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body max-w-lg mx-auto">
                Tell CartPilot what you need. I'll help you discover products, compare your options, and evaluate warranty and specifications.
              </p>
            </div>

            {/* Suggested Prompts Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left pt-2">
              {starterPrompts.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleUserSubmit(item.prompt)}
                    className="p-4 rounded-xl bg-navy-850/80 hover:bg-navy-800 border border-navy-750 hover:border-sky-500/50 transition-all text-left group flex items-start space-x-3.5 shadow-sm hover:shadow-glow-blue/20"
                  >
                    <div className="w-8 h-8 rounded-lg bg-navy-900 border border-navy-700 text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <strong className="block text-xs sm:text-sm font-display font-bold text-white group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </strong>
                      <span className="text-[11px] text-slate-400 block mt-0.5 leading-snug">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Synthetic Data Reassurance */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy-950 border border-navy-800 text-[11px] text-slate-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Aptdot CC0 Synthetic Dataset • PayPal Orders v2 Sandbox</span>
            </div>
          </motion.div>
        ) : (
          /* CONVERSATION MESSAGE STREAM */
          <div className="space-y-6">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <motion.div
                  key={msg.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  {/* Sender Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      isUser
                        ? 'bg-sky-600 text-white shadow-sm'
                        : msg.isError
                        ? 'bg-rose-950 border border-rose-700 text-rose-400'
                        : 'bg-navy-850 border border-navy-750 text-sky-400'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : msg.isError ? <AlertCircle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-2xl sm:max-w-3xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-4 shadow-sm ${
                      isUser
                        ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-tr-none shadow-glow-blue/20'
                        : msg.isError
                        ? 'bg-rose-950/40 border border-rose-500/30 text-rose-200 rounded-tl-none'
                        : 'bg-navy-850 border border-navy-750 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {/* Header info */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-white/10">
                      <span className="font-bold text-slate-300">
                        {isUser ? 'You' : 'CartPilot Shopping Agent'}
                      </span>
                      <span className="font-mono text-slate-400">{msg.timestamp}</span>
                    </div>

                    {/* Formatted Content */}
                    <FormattedMessageText text={msg.text} />

                    {/* Agent Activity Trace (Tool Calling verification) */}
                    {Array.isArray(msg.activityLog) && msg.activityLog.length > 0 && (
                      <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 space-y-1.5 font-mono text-[11px]">
                        <div className="flex items-center space-x-1.5 text-sky-400 font-semibold mb-1">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>Tool-Calling Verification Trace</span>
                        </div>
                        {msg.activityLog.map((log, i) => (
                          <div key={i} className="flex items-start space-x-2 text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Cart Action Success Banner */}
                    {msg.cartAction && msg.cartAction.success && (
                      <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-between gap-3">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                            <ShoppingCart className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">Staged into Cart</span>
                            <span className="text-[11px] text-emerald-300 font-mono">
                              {msg.cartAction.message}
                            </span>
                          </div>
                        </div>
                        <Link
                          to="/cart"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center space-x-1 flex-shrink-0"
                        >
                          <span>View Cart</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    )}

                    {/* Embedded Side-by-Side Comparison Matrix */}
                    {msg.comparison && Array.isArray(msg.comparison.items) && msg.comparison.items.length > 0 && (
                      <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-navy-800">
                          <div className="flex items-center space-x-2 text-xs font-bold text-white font-display">
                            <Layers className="w-4 h-4 text-indigo-400" />
                            <span>{msg.comparison.title || 'Side-by-Side Product Comparison'}</span>
                          </div>
                          <span className="badge-emp badge-emp-verified text-[10px]">
                            Aptdot Records
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {msg.comparison.items.map((item, idx) => (
                            <div key={idx} className="p-3.5 rounded-lg bg-navy-950 border border-navy-800 space-y-2">
                              <div className="flex items-center space-x-2.5">
                                <img
                                  src={item.image_url || item.product?.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'}
                                  alt={item.title || item.product?.title}
                                  className="w-12 h-12 rounded-lg object-contain bg-navy-900 border border-navy-800 p-1 flex-shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                  <span className="font-display font-bold text-white block truncate text-xs">
                                    {item.title || item.product?.title}
                                  </span>
                                  <span className="text-emerald-400 font-mono font-bold text-xs">
                                    {formatCurrency(item.price, item.currency || item.product?.currency || 'USD')}
                                  </span>
                                </div>
                              </div>

                              {item.keyStrengths && (
                                <p className="text-[11px] text-slate-300">
                                  <strong className="text-slate-100 font-semibold">Strengths:</strong> {item.keyStrengths}
                                </p>
                              )}

                              <div className="flex justify-between text-[10px] text-slate-400 pt-1.5 border-t border-navy-800">
                                <span>
                                  Warranty:{' '}
                                  {typeof item.warranty === 'object' && item.warranty !== null
                                    ? [item.warranty.duration, item.warranty.terms].filter(Boolean).join(' • ')
                                    : (item.warranty || '1 Year Standard')}
                                </span>
                                <span>Returns: {item.returnWindow || '30 Days'}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommended Product Cards Grid */}
                    {Array.isArray(msg.recommendations) && msg.recommendations.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider flex items-center space-x-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                            <span>Database Recommendations ({msg.recommendations.length})</span>
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Aptdot Verified
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {msg.recommendations.map((prod) => {
                            const isSoldOut = prod.stock <= 0 || prod.in_stock === false;
                            const price = typeof prod.price === 'number' ? prod.price : Number(prod.price) || 0;

                            return (
                              <div
                                key={prod.id || prod.slug}
                                className="p-3.5 rounded-xl bg-navy-900 border border-navy-750 hover:border-navy-700 transition-colors flex flex-col justify-between space-y-3 shadow-sm"
                              >
                                <div className="flex items-start space-x-3">
                                  <img
                                    src={prod.image || prod.image_url}
                                    alt={prod.title}
                                    className="w-14 h-14 rounded-lg object-contain bg-navy-950 border border-navy-800 p-1 flex-shrink-0"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider truncate max-w-[120px]">
                                        {prod.brand || 'Aptdot'}
                                      </span>
                                      <span className={`text-[9px] font-mono ${isSoldOut ? 'text-rose-400' : 'text-emerald-400'}`}>
                                        {isSoldOut ? 'Sold out' : `${prod.stock || 10} in stock`}
                                      </span>
                                    </div>

                                    <h4 className="font-display font-bold text-white text-xs truncate mt-0.5">
                                      {prod.title}
                                    </h4>

                                    <div className="flex items-center space-x-2 mt-1">
                                      <span className="font-mono font-bold text-white text-xs">
                                        {formatCurrency(price, prod.currency || 'USD')}
                                      </span>
                                      <span className="text-[9px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">
                                        Synthetic CC0
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-xs">
                                  <button
                                    type="button"
                                    onClick={() => navigate(`/discover?product=${prod.id || prod.slug}`)}
                                    className="text-[11px] text-sky-300 hover:text-white flex items-center space-x-1 font-semibold"
                                  >
                                    <span>Details</span>
                                    <Eye className="w-3 h-3" />
                                  </button>

                                  <div className="flex items-center space-x-2">
                                    <button
                                      type="button"
                                      onClick={() => addToCompare && addToCompare(prod)}
                                      className="px-2.5 py-1 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white text-[11px] font-medium border border-navy-700 transition-colors"
                                    >
                                      Compare
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        addToCart(prod, 1);
                                        if (showToast) showToast(`Added "${prod.title}" to cart`, 'success');
                                      }}
                                      disabled={isSoldOut}
                                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm transition-colors disabled:opacity-40"
                                    >
                                      + Cart
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Live Thinking Indicator */}
            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3"
              >
                <div className="w-8 h-8 rounded-xl bg-navy-850 border border-navy-750 flex items-center justify-center text-sky-400 flex-shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-4 rounded-2xl bg-navy-850 border border-navy-750 text-xs text-slate-300 rounded-tl-none flex items-center space-x-3 shadow-lg">
                  <RefreshCw className="w-4 h-4 text-sky-400 animate-spin" />
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-white">CartPilot Agent Reasoning</span>
                    <span className="text-[11px] text-sky-300 font-mono mt-0.5">{thinkingStep}</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* 3. MESSAGE COMPOSER & SUGGESTION CAROUSEL */}
      <div className="space-y-3 flex-shrink-0">
        {/* Quick Follow-up Chips (When conversation is active) */}
        {messages.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs text-slate-400 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex-shrink-0">
              Suggestions:
            </span>
            {[
              'Compare warranty terms for top products',
              'Show me options under $50 USD',
              'What variants exist for water bottles?',
              'Show specifications for headphones',
            ].map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleUserSubmit(sug)}
                disabled={isThinking}
                className="flex-shrink-0 px-3 py-1 rounded-pill bg-navy-900 border border-navy-800 hover:border-sky-500/50 text-slate-300 text-[11px] hover:text-white transition-colors disabled:opacity-40"
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Multiline Composer Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserSubmit();
          }}
          className="relative rounded-2xl bg-navy-900 border border-navy-800 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/10 transition-all shadow-2xl p-2.5 flex items-end gap-2"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask CartPilot: e.g. 'Compare ANC headphones' or 'Find items under $100'…"
            disabled={isThinking}
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none resize-none max-h-32 min-h-[38px] leading-relaxed disabled:opacity-50"
          />

          <div className="flex items-center space-x-2 flex-shrink-0 pb-1">
            <span className="hidden sm:inline text-[10px] text-slate-500 font-mono">
              Press ↵
            </span>
            <button
              type="submit"
              disabled={!inputMessage.trim() || isThinking}
              className="p-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-glow-blue transition-all disabled:opacity-40 flex items-center justify-center active:scale-95"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
