import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Bot,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Phone,
  KeyRound,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { signInWithEmailOrPhone, resetPasswordForEmail } from '../services/supabase';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, authLoading, showToast } = useApp();

  // If user is already authenticated, redirect to dashboard or requested page
  useEffect(() => {
    if (!authLoading && user) {
      const destination = location.state?.from?.pathname || '/dashboard';
      navigate(destination, { replace: true });
    }
  }, [user, authLoading, navigate, location]);

  // Form states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState(null);
  const [resetError, setResetError] = useState(null);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    const trimmedId = identifier.trim();

    if (!trimmedId) {
      newErrors.identifier = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedId)) {
        newErrors.identifier = 'Please enter a valid email address.';
      }
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await signInWithEmailOrPhone(identifier, password);

      if (error) {
        throw error;
      }

      if (data?.user) {
        showToast('Welcome back to CartPilot AI!', 'success');
        const destination = location.state?.from?.pathname || '/dashboard';
        navigate(destination, { replace: true });
      }
    } catch (err) {
      console.warn('[LoginPage] Authentication error:', err.message);
      let friendlyMessage = err.message || 'Unable to sign in. Please verify your credentials.';
      if (err.message?.includes('Invalid login credentials')) {
        friendlyMessage = 'Invalid email/phone or password. Please check your credentials and try again.';
      } else if (err.message?.includes('Email not confirmed')) {
        friendlyMessage = 'Your email address has not been confirmed yet. Please check your inbox for the Supabase confirmation link.';
      }
      setAuthError(friendlyMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoFill = () => {
    setIdentifier('demo@cartpilot.ai');
    setPassword('DemoUserCartPilot2026!');
    setErrors({});
    setAuthError(null);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetError(null);
    setResetSuccessMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!resetEmail.trim() || !emailRegex.test(resetEmail.trim())) {
      setResetError('Please enter a valid email address to receive reset instructions.');
      return;
    }

    setResetSubmitting(true);
    try {
      const { error } = await resetPasswordForEmail(resetEmail.trim());
      if (error) throw error;
      setResetSuccessMessage(
        `Password reset instructions have been dispatched to ${resetEmail}. Check your inbox.`
      );
    } catch (err) {
      console.warn('[LoginPage] Reset password error:', err.message);
      if (err.message?.toLowerCase().includes('rate limit')) {
        setResetError('Supabase email rate limit exceeded. Please wait a few minutes before requesting another reset email.');
      } else {
        setResetError(err.message || 'Failed to send password reset email.');
      }
    } finally {
      setResetSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-electric-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Glassmorphic Card Container */}
      <div className="relative z-10 w-full max-w-md bg-navy-900/80 border border-navy-750/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-0.5 rounded-2xl bg-gradient-to-tr from-electric-500 via-violet-600 to-electric-400 shadow-glow-blue mb-2">
            <div className="w-12 h-12 rounded-[14px] bg-navy-950 flex items-center justify-center">
              <Bot className="w-6 h-6 text-electric-400" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Sign In to <span className="bg-gradient-to-r from-electric-400 via-cyan-300 to-violet-300 bg-clip-text text-transparent">CartPilot</span>
          </h2>
          <p className="text-xs text-slate-400">
            Access your AI Shopping Agent, hardware passports & orders
          </p>
        </div>

        {/* Global Auth Error Alert */}
        {authError && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-start space-x-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Authentication Notice</p>
              <p className="text-[11px] text-rose-200/90 mt-0.5 leading-relaxed">{authError}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email or Phone Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-identifier"
              className="block text-xs font-semibold text-slate-300"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="login-identifier"
                type="email"
                autoComplete="username"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: null }));
                }}
                placeholder="name@domain.com"
                disabled={isSubmitting}
                className={`w-full bg-navy-950/90 border rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.identifier
                    ? 'border-rose-500/70 focus:border-rose-400'
                    : 'border-navy-750 focus:border-electric-500'
                }`}
              />
            </div>
            {errors.identifier && (
              <p className="text-[11px] text-rose-400 font-medium pl-1">{errors.identifier}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="block text-xs font-semibold text-slate-300"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotModalOpen(true);
                  setResetEmail(identifier.includes('@') ? identifier : '');
                }}
                className="text-[11px] font-medium text-electric-400 hover:text-electric-300 hover:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                }}
                placeholder="Enter your account password"
                disabled={isSubmitting}
                className={`w-full bg-navy-950/90 border rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.password
                    ? 'border-rose-500/70 focus:border-rose-400'
                    : 'border-navy-750 focus:border-electric-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-lg focus:outline-none transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-rose-400 font-medium pl-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-navy-700 bg-navy-950 text-electric-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-xs text-slate-300 font-medium">Remember my session</span>
            </label>

            {/* Quick Demo Fill Shortcut */}
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[10px] font-mono text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 px-2 py-0.5 rounded-full transition-colors flex items-center space-x-1"
              title="Autofill verified demo test credentials"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Fill Demo Credentials</span>
            </button>
          </div>

          {/* Sign In Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-600 via-electric-500 to-violet-600 hover:from-electric-500 hover:to-violet-500 text-white text-xs font-bold shadow-glow-blue flex items-center justify-center space-x-2 transition-all transform active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Signing In to Supabase...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Link to Register */}
        <div className="pt-2 border-t border-navy-800 text-center">
          <p className="text-xs text-slate-400">
            Don't have an account yet?{' '}
            <Link
              to="/register"
              className="font-bold text-electric-400 hover:text-electric-300 hover:underline transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-navy-900 border border-navy-750 rounded-2xl p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => {
                setForgotModalOpen(false);
                setResetError(null);
                setResetSuccessMessage(null);
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/40 text-violet-400 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Reset Account Password</h3>
                <p className="text-xs text-slate-400">We'll dispatch a secure recovery link</p>
              </div>
            </div>

            {resetSuccessMessage ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>{resetSuccessMessage}</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enter the email associated with your CartPilot AI account. Supabase Auth will send a secure password reset link.
                </p>

                <div className="space-y-1">
                  <label htmlFor="reset-email" className="block text-xs font-semibold text-slate-300">
                    Email Address
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="name@domain.com"
                    disabled={resetSubmitting}
                    className="w-full bg-navy-950 border border-navy-750 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-electric-500"
                  />
                </div>

                {resetError && (
                  <p className="text-[11px] text-rose-400 font-medium">{resetError}</p>
                )}

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 text-xs font-semibold"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={resetSubmitting}
                    className="flex-1 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-bold"
                  >
                    {resetSubmitting ? 'Sending Link...' : 'Send Recovery Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Subtle Security Attestation */}
      <div className="mt-6 flex items-center space-x-2 text-[11px] text-slate-400 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>End-to-End Encrypted Authentication via Supabase Auth</span>
      </div>
    </div>
  );
}
