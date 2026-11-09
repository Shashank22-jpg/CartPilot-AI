import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';
import TiltCard from '../components/common/TiltCard';
import apiService from '../services/api';

const AIOrb = lazy(() => import('../components/3d/AIOrb'));

/**
 * Lightweight formatting helper for Gemini Markdown responses
 */
function FormattedText({ text }) {
  if (!text) return null;
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-slate-100 text-xs leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Headers
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="text-xs font-bold text-electric-300 pt-1 pb-0.5 tracking-wide">
              {renderInlineStyles(trimmed.replace('### ', ''))}
            </h4>
          );
        }
        if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
          return (
            <h3 key={idx} className="text-sm font-extrabold text-white pt-1.5 pb-0.5">
              {renderInlineStyles(trimmed.replace(/^#+\s/, ''))}
            </h3>
          );
        }

        // Bullet lists
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          return (
            <div key={idx} className="flex items-start space-x-2 pl-2">
              <span className="text-electric-400 text-[10px] mt-1">•</span>
              <span className="text-slate-200 flex-1">{renderInlineStyles(trimmed.slice(2))}</span>
            </div>
          );
        }

        // Horizontal Rule
        if (trimmed === '***' || trimmed === '---') {
          return <hr key={idx} className="border-navy-750 my-2" />;
        }

        return <p key={idx}>{renderInlineStyles(trimmed)}</p>;
      })}
    </div>
  );
}

function renderInlineStyles(str) {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function AssistantPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    addToCompare,
    setSelectedIntelligenceProduct,
    budget,
    showToast,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');
  const [agentState, setAgentState] = useState('idle');
  const messagesEndRef = useRef(null);

  // Suggested Prompts State
  const [promptSuggestions, setPromptSuggestions] = useState([
    'Compare Sony WH-1000XM5 vs. Bose QC Ultra for travel',
    'Best laptop for heavy software development under ₹2,00,000',
    'I want a wireless mechanical keyboard under ₹20,000',
    'Recommend a handheld gaming console with high refresh rate',
  ]);

  // Initial Welcome Message
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Hello! I am CartPilot AI, your autonomous shopping assistant powered by Google Gemini and Supabase PostgreSQL.

I research verified hardware specifications, compare models side-by-side, inspect return policies and warranties, and help you stage approved items directly into your cart within your ${formatCurrency(budget.monthlyLimit)} monthly budget limit.

What hardware or gear can I discover and evaluate for you today?`,
      activityLog: null,
      recommendations: null,
      comparison: null,
      cartAction: null,
    },
  ]);

  // Fetch dynamic suggestions on mount
  useEffect(() => {
    let isMounted = true;
    apiService.getAiPrompts()
      .then(res => {
        if (isMounted && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setPromptSuggestions(res.data.map(p => p.prompt));
        }
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  // Handle incoming prompt from URL (e.g. ?q=...)
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      handleUserSubmit(query);
    }
  }, [searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

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

    // Update messages with user input
    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');

    // Set UI to thinking state
    setIsThinking(true);
    setAgentState('thinking');
    setThinkingStep('Analyzing natural language shopping constraints...');

    // Progress to searching state
    const searchTimeout = setTimeout(() => {
      setAgentState('searching');
      setThinkingStep('Querying Supabase PostgreSQL catalogue via Gemini tool calling...');
    }, 600);

    try {
      // Build conversation history for context
      const historyPayload = messages
        .filter(m => m.id !== 'msg-welcome')
        .slice(-6)
        .map(m => ({ sender: m.sender, text: m.text }));

      // Call backend Gemini AI chat endpoint
      const response = await apiService.chatWithAi(textToSend.trim(), historyPayload, {
        budgetLimit: budget.monthlyLimit,
        spentThisMonth: budget.spentThisMonth,
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
              currency: cartAction.product.currency || 'INR',
              image: cartAction.product.image || cartAction.product.image_url,
              stock: cartAction.product.stock,
            },
            cartAction.quantity || 1
          );
          if (showToast) {
            showToast(`🛒 Staged ${cartAction.quantity || 1}x "${cartAction.product.title}" into cart`, 'success');
          }
        }

        // Normalize recommendations images & fields
        const normalizedRecs = (recommendations || []).map(p => ({
          ...p,
          image: p.image_url || p.image,
          price: Number(p.price) || 0,
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

        setMessages(prev => [...prev, assistantMsg]);
      }
    } catch (err) {
      clearTimeout(searchTimeout);
      console.error('[Assistant] Chat error:', err);

      const errorMsg = {
        id: `msg-err-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `I encountered an issue connecting to the AI shopping agent: ${err.message || 'Please check your connection and try again.'}`,
        isError: true,
      };

      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
      setTimeout(() => {
        setAgentState('idle');
      }, 1500);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Chat history cleared. What hardware or specifications can I evaluate for you?',
        activityLog: null,
        recommendations: null,
        comparison: null,
        cartAction: null,
      },
    ]);
    setAgentState('idle');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-6xl mx-auto space-y-4">
      {/* Top Assistant Status Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-navy-900 border border-navy-800 shadow-md">
        <div className="flex items-center space-x-3.5">
          {/* Signature 3D AI Core Avatar */}
          <div className="w-11 h-11 relative flex-shrink-0 flex items-center justify-center">
            <Suspense fallback={<div className="w-10 h-10 rounded-full bg-electric-500/20 animate-pulse" />}>
              <AIOrb state={agentState} size="sm" className="w-11 h-11" />
            </Suspense>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-white">CartPilot Autonomous Shopping Agent</h2>
              <span
                className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border transition-colors ${
                  agentState === 'thinking'
                    ? 'bg-violet-500/10 border-violet-500/30 text-violet-300 animate-pulse'
                    : agentState === 'searching'
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 animate-pulse'
                    : agentState === 'responding'
                    ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300'
                    : 'bg-electric-500/10 border-electric-500/30 text-electric-300'
                }`}
              >
                {agentState === 'idle' ? 'GEMINI 3.5 FLASH • ONLINE' : agentState.toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center space-x-1.5 mt-0.5">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Supabase Live DB</span>
              <span>•</span>
              <span>Tool Calling Verified</span>
              <span>•</span>
              <span>Currency: INR (₹)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* State indicators */}
          <div className="hidden md:flex items-center space-x-1 text-[10px] font-mono bg-navy-950 p-1 rounded-xl border border-navy-800">
            {['idle', 'thinking', 'searching', 'responding'].map((st) => (
              <span
                key={st}
                className={`px-2 py-0.5 rounded-lg capitalize transition-colors ${
                  agentState === st
                    ? 'bg-electric-600 text-white font-bold'
                    : 'text-slate-500'
                }`}
              >
                {st}
              </span>
            ))}
          </div>
          <button
            onClick={clearChat}
            className="p-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-400 hover:text-rose-400 border border-navy-700 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Conversation Stream */}
      <div className="flex-1 overflow-y-auto space-y-6 p-4 rounded-2xl bg-navy-900/60 border border-navy-800 backdrop-blur-sm">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Sender Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-violet-600 text-white'
                  : msg.isError
                  ? 'bg-rose-950 border border-rose-700 text-rose-400'
                  : 'bg-navy-800 border border-navy-700 text-electric-400'
              }`}
            >
              {msg.sender === 'user' ? (
                <User className="w-4 h-4" />
              ) : msg.isError ? (
                <AlertCircle className="w-4 h-4 text-rose-400" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>

            {/* Message Body */}
            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-violet-600 to-electric-600 text-white rounded-tr-none shadow-md'
                  : msg.isError
                  ? 'bg-rose-950/40 border border-rose-500/30 text-rose-200 rounded-tl-none space-y-3'
                  : 'bg-navy-850 border border-navy-750 text-slate-200 rounded-tl-none space-y-4'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">
                  {msg.sender === 'user' ? 'You' : 'CartPilot Agent (Gemini + Supabase)'}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Formatted Message Content */}
              <FormattedText text={msg.text} />

              {/* Agentic Activity Trace Accordion */}
              {msg.activityLog && msg.activityLog.length > 0 && (
                <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center space-x-1.5 text-electric-400 font-semibold mb-1">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Agent Execution & Verification Trace</span>
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
                <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Staged into Cart</span>
                      <span className="text-[11px] text-emerald-300 font-mono">
                        {msg.cartAction.message}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/cart')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center space-x-1"
                  >
                    <span>View Cart</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Embedded In-Conversation Comparison Matrix */}
              {msg.comparison && msg.comparison.items && (
                <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-750 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-white border-b border-navy-800 pb-2">
                    <Layers className="w-4 h-4 text-violet-400" />
                    <span>{msg.comparison.title || 'Side-by-Side Product Comparison'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {msg.comparison.items.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-navy-950 border border-navy-800 space-y-2">
                        <div className="flex items-center space-x-2">
                          <img
                            src={item.image_url || item.product?.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'}
                            alt={item.title || item.product?.title}
                            className="w-10 h-10 rounded-lg object-cover bg-navy-900"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-white block truncate">{item.title || item.product?.title}</span>
                            <span className="text-emerald-400 font-mono font-bold">{formatCurrency(item.price)}</span>
                          </div>
                        </div>
                        {item.keyStrengths && (
                          <p className="text-[11px] text-slate-300">
                            <strong className="text-slate-200">Strengths:</strong> {item.keyStrengths}
                          </p>
                        )}
                        <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-navy-800/80">
                          <span>Warranty: {item.warranty || '1 Year Standard'}</span>
                          <span>Returns: {item.returnWindow || '30 Days'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Product Cards */}
              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-electric-400" />
                    <span>Supabase Hardware Matches ({msg.recommendations.length})</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {msg.recommendations.map((prod) => (
                      <TiltCard
                        key={prod.id || prod.slug}
                        className="p-3 rounded-xl bg-navy-900 border border-navy-800 hover:border-navy-750 transition-colors flex flex-col justify-between"
                      >
                        <div className="flex items-start space-x-3">
                          <img
                            src={prod.image || prod.image_url}
                            alt={prod.title}
                            className="w-14 h-14 rounded-lg object-cover bg-navy-950 flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-electric-400 font-bold uppercase tracking-wider">
                                {prod.brand} • {prod.category}
                              </span>
                              <span className="text-[9px] font-mono text-emerald-400">
                                {prod.stock !== undefined ? `${prod.stock} in stock` : 'In stock'}
                              </span>
                            </div>
                            <h4 className="font-semibold text-slate-200 text-xs truncate mt-0.5">
                              {prod.title}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="font-mono font-bold text-white">{formatCurrency(prod.price)}</span>
                              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center space-x-1">
                                <Database className="w-2.5 h-2.5" />
                                <span>DB Verified</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-navy-800/80 flex items-center justify-between text-xs">
                          <button
                            onClick={() => {
                              setSelectedIntelligenceProduct(prod);
                              navigate('/intelligence');
                            }}
                            className="text-[11px] text-slate-300 hover:text-white flex items-center space-x-1"
                          >
                            <span>Inspect</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                          <div className="flex items-center space-x-1.5">
                            <button
                              onClick={() => addToCompare(prod)}
                              className="px-2 py-1 rounded bg-navy-800 hover:bg-navy-750 text-slate-300 text-[11px]"
                            >
                              Compare
                            </button>
                            <button
                              onClick={() => {
                                addToCart(prod);
                                if (showToast) showToast(`Added "${prod.title}" to cart`, 'success');
                              }}
                              className="px-2.5 py-1 rounded bg-electric-600 hover:bg-electric-500 text-white font-semibold text-[11px]"
                            >
                              + Cart
                            </button>
                          </div>
                        </div>
                      </TiltCard>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Live AI Thinking Indicator */}
        {isThinking && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center text-electric-400 flex-shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-navy-850 border border-navy-750 text-xs text-slate-300 rounded-tl-none flex items-center space-x-3 shadow-lg">
              <RefreshCw className="w-4 h-4 text-electric-400 animate-spin" />
              <div className="flex flex-col">
                <span className="font-semibold text-white">CartPilot Agent Thinking...</span>
                <span className="text-[11px] text-electric-300 font-mono mt-0.5">{thinkingStep}</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs text-slate-400 scrollbar-none">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex-shrink-0">
          Suggestions:
        </span>
        {promptSuggestions.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleUserSubmit(prompt)}
            disabled={isThinking}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-navy-900 border border-navy-750 hover:border-electric-500/40 text-slate-300 text-[11px] hover:text-white transition-colors disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUserSubmit();
        }}
        className="relative flex items-center shadow-2xl"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask CartPilot: e.g. 'Compare Sony WH-1000XM5 vs. Bose QC Ultra' or 'Find laptops under ₹2,00,000'..."
          disabled={isThinking}
          className="w-full bg-navy-900 border border-navy-750 focus:border-electric-500 rounded-2xl pl-4 pr-24 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isThinking}
          className="absolute right-2 px-4 py-2 rounded-xl bg-gradient-to-r from-electric-600 to-violet-600 hover:from-electric-500 hover:to-violet-500 text-white text-xs font-bold shadow-glow-blue transition-all disabled:opacity-40 flex items-center space-x-1.5"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
