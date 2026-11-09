import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/currency';

export default function AssistantPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    addToCompare,
    setSelectedIntelligenceProduct,
    budget,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');
  const messagesEndRef = useRef(null);

  // Initial High-Fidelity Multi-turn Conversation with Transparent Sample Labels
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'assistant',
      timestamp: '12:00 PM',
      text: `Hello Alex! I am your CartPilot AI shopping agent prototype. I can compare structured specifications, check return policies for restocking conditions, and safeguard your monthly budget of ${formatCurrency(budget.monthlyLimit)}. What hardware or gear can I evaluate for you today?`,
      activityLog: null,
      recommendations: null,
      comparison: null,
    },
    {
      id: 'msg-2',
      sender: 'user',
      timestamp: '12:01 PM',
      text: 'I travel frequently and need top-tier noise canceling headphones with at least 24 hours of battery life and a solid return policy. Can you compare the Sony XM5 and Bose QuietComfort Ultra?',
      activityLog: null,
      recommendations: null,
      comparison: null,
    },
    {
      id: 'msg-3',
      sender: 'assistant',
      timestamp: '12:01 PM',
      text: 'I evaluated the sample specifications for the Sony WH-1000XM5 and Bose QuietComfort Ultra based on published acoustic benchmarks and sample manufacturer terms. Here is the comparative assessment:',
      activityLog: [
        'Sample Telemetry: Sony XM5 30-hour battery life confirmed via FCC test filing.',
        'Sample Telemetry: Bose QuietComfort Ultra CustomTune 32dB low-frequency attenuation.',
        'Policy Check: Bose offers 90-day trial period vs. Sony 30-day window in sample terms.',
        `Budget Check: Both headphones fit comfortably within your remaining ${formatCurrency(budget.monthlyLimit - budget.spentThisMonth)} monthly budget.`,
      ],
      comparison: {
        title: 'Sony WH-1000XM5 vs. Bose QuietComfort Ultra (Sample Comparison)',
        items: [
          {
            product: products.find(p => p.id === 'prod-sony-wh1000xm5') || products[0],
            keyStrengths: 'Longer battery (30h vs 24h), lighter chassis (250g), 8-mic beamforming array.',
            verdict: 'Best for battery longevity, remote work calls, and Android LDAC lossless streaming.',
          },
          {
            product: products.find(p => p.id === 'prod-bose-qc-ultra') || products[3],
            keyStrengths: 'Inward folding travel headband, 90-day trial period, superior sub-100Hz engine drone isolation.',
            verdict: 'Best for frequent air travelers due to compact clamshell footprint and 90-day return safety.',
          }
        ]
      },
      recommendations: [
        products.find(p => p.id === 'prod-bose-qc-ultra') || products[3],
        products.find(p => p.id === 'prod-sony-wh1000xm5') || products[0]
      ],
    }
  ]);

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

  const handleUserSubmit = (customText = null) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend,
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsThinking(true);

    // Realistic Agentic Simulation Steps
    setThinkingStep('Analyzing natural language requirements and constraints...');

    setTimeout(() => {
      setThinkingStep('Scanning structured specification database (sample catalogue)...');
    }, 700);

    setTimeout(() => {
      setThinkingStep('Auditing sample merchant terms and return policy conditions...');
    }, 1400);

    setTimeout(() => {
      setIsThinking(false);

      // Tailor response based on keywords
      const lower = textToSend.toLowerCase();
      let matchedProducts = [];
      let replyText = '';
      let logs = [];

      if (lower.includes('laptop') || lower.includes('macbook') || lower.includes('xps') || lower.includes('dev')) {
        matchedProducts = products.filter(p => p.category === 'Laptops');
        replyText = 'Here is how the Apple MacBook Pro 14" (M3 Pro) compares to the Dell XPS 15 OLED based on structured sample benchmarks:';
        logs = [
          'Sample Benchmark: M3 Pro Cinebench R24 multi-core scored 1,048 with 0% thermal drop.',
          'Sample Benchmark: Dell XPS 15 13700H provides 32GB modular RAM and 3.5K OLED touch.',
          'Policy Check: MacBook sample return window is 14 days, while Dell allows 30 days.',
        ];
      } else if (lower.includes('drone') || lower.includes('camera') || lower.includes('dji')) {
        matchedProducts = products.filter(p => p.category === 'Cameras & Drones');
        replyText = 'I evaluated the DJI Mini 4 Pro Fly More Combo against regulatory guidelines and sample wind tunnel data:';
        logs = [
          'Regulatory: Sub-249g takeoff weight exempts drone from recreational registration requirements.',
          'Safety: Omnidirectional Active Vision obstacle sensors verified with 99.4% branch avoidance in tests.',
          'Notice: Standard 14-day sample return policy requires unbinding DJI account prior to return.',
        ];
      } else if (lower.includes('keyboard') || lower.includes('keychron')) {
        matchedProducts = products.filter(p => p.category === 'Keyboards');
        replyText = 'Here is the hardware analysis for the Keychron Q1 Pro custom mechanical keyboard:';
        logs = [
          'Chassis: Full CNC 6063 Aluminum chassis weighs 1.73kg with acoustic silicone gaskets.',
          'Firmware: Open-source QMK/VIA key remapping supported directly in browser.',
        ];
      } else {
        matchedProducts = products.slice(0, 2);
        replyText = `Based on your query "${textToSend}", here are recommended items from our sample inventory within your ${formatCurrency(budget.monthlyLimit)} budget cap:`;
        logs = [
          'Matched specifications against sample hardware catalogue.',
          'Confirmed active merchant logistics tier and return window.',
        ];
      }

      const agentMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: replyText,
        activityLog: logs,
        recommendations: matchedProducts,
      };

      setMessages(prev => [...prev, agentMsg]);
    }, 2100);
  };

  const promptSuggestions = [
    'Compare Sony WH-1000XM5 vs. Bose QC Ultra for travel',
    'Best laptop for heavy software development under ₹2,00,000',
    'Evaluate return policy and OLED burn-in warranty for LG UltraGear',
    'Does the DJI Mini 4 Pro require recreational registration?',
  ];

  const clearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Chat history reset. How can I assist your product discovery and specification review today?',
        activityLog: null,
        recommendations: null,
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-6xl mx-auto space-y-4">
      {/* Top Assistant Status Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-navy-900 border border-navy-800 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electric-500 to-violet-600 p-0.5 flex items-center justify-center shadow-glow-blue">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-electric-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-white">CartPilot Autonomous Shopping Agent</h2>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-electric-500/10 border border-electric-500/30 text-electric-300 rounded-full">
                Simulated Dialog
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Tool Calling Framework • Specification Review • Sample Return Terms
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
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
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Sender Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-violet-600 text-white'
                  : 'bg-navy-800 border border-navy-700 text-electric-400'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message Body */}
            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-violet-600 to-electric-600 text-white rounded-tr-none shadow-md'
                  : 'bg-navy-850 border border-navy-750 text-slate-200 rounded-tl-none space-y-4'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">
                  {msg.sender === 'user' ? 'Alex Mercer (Demo Profile)' : 'CartPilot Agent'}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              <p className="text-slate-100">{msg.text}</p>

              {/* Agentic Activity Trace Accordion */}
              {msg.activityLog && (
                <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center space-x-1.5 text-electric-400 font-semibold mb-1">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Sample Agent Activity & Verification Trace</span>
                  </div>
                  {msg.activityLog.map((log, i) => (
                    <div key={i} className="flex items-start space-x-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Embedded In-Conversation Comparison Matrix */}
              {msg.comparison && (
                <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-750 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-white border-b border-navy-800 pb-2">
                    <Layers className="w-4 h-4 text-violet-400" />
                    <span>{msg.comparison.title}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {msg.comparison.items.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-navy-950 border border-navy-800 space-y-2">
                        <div className="flex items-center space-x-2">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-10 h-10 rounded-lg object-cover bg-navy-900"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-white block truncate">{item.product.brand}</span>
                            <span className="text-emerald-400 font-mono">{formatCurrency(item.product.price)}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          <strong className="text-slate-200">Strengths:</strong> {item.keyStrengths}
                        </p>
                        <p className="text-[10px] text-electric-300 bg-electric-500/10 p-1.5 rounded border border-electric-500/20">
                          <strong>Verdict:</strong> {item.verdict}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Product Cards */}
              {msg.recommendations && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-electric-400" />
                    <span>Sample Hardware Matches</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {msg.recommendations.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3 rounded-xl bg-navy-900 border border-navy-800 hover:border-navy-700 transition-colors flex flex-col justify-between"
                      >
                        <div className="flex items-start space-x-3">
                          <img
                            src={prod.image}
                            alt={prod.title}
                            className="w-14 h-14 rounded-lg object-cover bg-navy-950 flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] text-electric-400 font-bold uppercase tracking-wider">
                              {prod.brand} • {prod.tag}
                            </span>
                            <h4 className="font-semibold text-slate-200 text-xs truncate mt-0.5">
                              {prod.title}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="font-mono font-bold text-white">{formatCurrency(prod.price)}</span>
                              <span className="text-[10px] text-slate-400 bg-navy-950 px-1.5 rounded border border-navy-800">
                                Sample Data
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
                              onClick={() => addToCart(prod)}
                              className="px-2.5 py-1 rounded bg-electric-600 hover:bg-electric-500 text-white font-semibold text-[11px]"
                            >
                              + Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
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
            className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-navy-900 border border-navy-750 hover:border-electric-500/40 text-slate-300 text-[11px] hover:text-white transition-colors"
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
          placeholder="Ask CartPilot: e.g. 'Compare Sony WH-1000XM5 vs. Bose QC Ultra' or 'Evaluate return policy for LG monitor'..."
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
