import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Bot, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useApp();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-navy-950 flex flex-col items-center justify-center p-4">
        {/* Glowing backdrop elements */}
        <div className="absolute w-72 h-72 rounded-full bg-electric-500/10 blur-3xl pointer-events-none" />
        <div className="absolute w-72 h-72 rounded-full bg-violet-600/10 blur-3xl pointer-events-none translate-x-12 translate-y-12" />

        <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-electric-500 via-violet-600 to-electric-400 p-0.5 shadow-glow-blue animate-pulse">
            <div className="w-full h-full bg-navy-900 rounded-[14px] flex items-center justify-center">
              <Bot className="w-8 h-8 text-electric-400" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-white tracking-tight">
              CartPilot<span className="text-electric-400">.AI</span>
            </h3>
            <p className="text-xs text-slate-400 flex items-center justify-center space-x-1.5 font-medium">
              <Loader2 className="w-3.5 h-3.5 text-electric-400 animate-spin" />
              <span>Verifying authenticated session...</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
