import React from 'react';
import { Bot, Sparkles, MessageSquare } from 'lucide-react';

export default function ChatContainer() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between h-full min-h-[380px]">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">CartPilot Assistant</h3>
            <p className="text-xs text-slate-400">Agentic Commerce Engine</p>
          </div>
        </div>
        <span className="flex items-center space-x-1 text-[11px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
          <Sparkles className="w-3 h-3" />
          <span>Gemini Pro</span>
        </span>
      </div>

      <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
          <MessageSquare className="w-6 h-6" />
        </div>
        <p className="text-sm text-slate-300 font-medium">Ready for intelligent product discovery</p>
        <p className="text-xs text-slate-500 max-w-sm">
          Natural-language search, comparative analysis, budget guidance, and evidence-based risk assessment ready to activate.
        </p>
      </div>

      <div className="pt-4 border-t border-slate-800">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask CartPilot (e.g. Find me a noise-canceling headphone under $200 with solid warranty)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            disabled
          />
          <button
            disabled
            className="absolute right-2 top-2 px-3 py-1.5 bg-blue-600/50 text-white rounded-lg text-xs font-medium cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
