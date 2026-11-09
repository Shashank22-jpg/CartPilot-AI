import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bot,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { signUpWithEmail, signInWithEmail } from '../services/supabase';
import apiService from '../services/api';
import {
  motion,
  AnimatePresence,
  PageTransition,
  AnimatedButton,
  registerCard,
  registerStaggerContainer,
  staggerFieldItem,
  springButtonEntrance,
  fadeUp,
  scaleIn,
  springs,
} from '../animations';

// Common country dialing codes
const COUNTRY_CODES = [
  { code: '+91', country: 'IN', label: 'India (+91)' },
  { code: '+1', country: 'US', label: 'United States (+1)' },
  { code: '+44', country: 'GB', label: 'United Kingdom (+44)' },
  { code: '+65', country: 'SG', label: 'Singapore (+65)' },
  { code: '+971', country: 'AE', label: 'UAE (+971)' },
  { code: '+49', country: 'DE', label: 'Germany (+49)' },
  { code: '+61', country: 'AU', label: 'Australia (+61)' },
  { code: '+81', country: 'JP', label: 'Japan (+81)' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { user, authLoading, showToast } = useApp();

  // If already authenticated, redirect
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Form input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Independent show/hide toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status and submission states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  // Real-time password strength calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: 'None', color: 'bg-navy-800' };

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    if (score <= 4) return { score: 3, label: 'Good', color: 'bg-cyan-500' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
  }, [password]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const digitsOnly = phone.replace(/[^0-9]/g, '');
    if (!digitsOnly) {
      newErrors.phone = 'Phone number is required.';
    } else if (digitsOnly.length < 10) {
      newErrors.phone = 'Phone number must contain at least 10 digits.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    } else if (passwordStrength.score < 2) {
      newErrors.password = 'Please choose a stronger password.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service & Privacy Policy.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);
    const fullPhoneNumber = `${countryCode}${phone.replace(/[^0-9]/g, '')}`;

    try {
      // 1. Create real Supabase Auth user via backend API
      const regRes = await apiService.registerUser({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: fullPhoneNumber,
        password,
      });

      if (!regRes.success) {
        throw new Error(regRes.error || 'Registration failed.');
      }

      // 2. Establish live authenticated session via Supabase browser client
      const { data: signInData, error: signInError } = await signInWithEmail(email.trim(), password);

      if (signInError) {
        console.warn('[RegisterPage] Auto sign-in error:', signInError.message);
        setRegistrationSuccess({
          email: email.trim(),
          userId: regRes.user?.id,
        });
        showToast('Account created successfully!', 'success');
      } else if (signInData?.user) {
        showToast('Registration successful! Welcome to CartPilot AI.', 'success');
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      console.warn('[RegisterPage] Registration error:', err.message);
      let friendly = err.message || 'Registration could not be completed. Please try again.';
      if (
        err.message?.toLowerCase().includes('already') ||
        err.message?.toLowerCase().includes('registered') ||
        err.message?.toLowerCase().includes('exists')
      ) {
        friendly = 'A user with this email address has already been registered. Please sign in instead.';
      } else if (err.message?.includes('Password should be')) {
        friendly = 'Password does not satisfy Supabase security criteria. Please use at least 8 characters with numbers and symbols.';
      }
      setAuthError(friendly);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition className="min-h-screen bg-navy-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-electric-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-electric-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Glassmorphic Card Container */}
      <motion.div
        variants={registerCard}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full max-w-lg bg-navy-900/85 border border-navy-750/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 space-y-6"
      >
        {/* Brand Header */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="text-center space-y-2"
        >
          <div className="inline-flex p-0.5 rounded-2xl bg-gradient-to-tr from-electric-500 via-violet-600 to-electric-400 shadow-glow-blue mb-2">
            <div className="w-12 h-12 rounded-[14px] bg-navy-950 flex items-center justify-center">
              <Bot className="w-6 h-6 text-electric-400" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Create your <span className="bg-gradient-to-r from-electric-400 via-cyan-300 to-violet-300 bg-clip-text text-transparent">CartPilot Account</span>
          </h2>
          <p className="text-xs text-slate-400">
            Join the agentic commerce platform with hardware passports and AI intelligence
          </p>
        </motion.div>

        {/* Global Auth Error Alert */}
        <AnimatePresence>
          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Registration Notice</p>
                  <p className="text-[11px] text-rose-200/90 mt-0.5 leading-relaxed">{authError}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SUCCESS STATE: Verification Notice */}
        <AnimatePresence mode="wait">
          {registrationSuccess ? (
            <motion.div
              key="success-card"
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="p-6 rounded-2xl bg-navy-950 border border-navy-800 text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-emerald">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
                  Registration Successful
                </span>
                <h3 className="text-base font-bold text-white mt-2">
                  Account Created in Supabase
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  We've registered your account for <strong className="text-white">{registrationSuccess.email}</strong>. If your email requires confirmation, please click the link sent to your inbox.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/login"
                  className="w-full py-3 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-bold shadow-glow-blue flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Proceed to Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ) : (
            /* REGISTRATION FORM WITH STAGGERED FIELDS */
            <motion.form
              key="register-form"
              variants={registerStaggerContainer}
              initial="initial"
              animate="animate"
              onSubmit={handleSubmit}
              className="space-y-4"
              noValidate
            >
              {/* Full Name */}
              <motion.div variants={staggerFieldItem} className="space-y-1.5">
                <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-name"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: null }));
                    }}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                    className={`w-full bg-navy-950/90 border rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all duration-200 ${
                      errors.fullName
                        ? 'border-rose-500/70 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30'
                        : 'border-navy-750 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20'
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-[11px] text-rose-400 font-medium pl-1 overflow-hidden"
                    >
                      {errors.fullName}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email Address */}
              <motion.div variants={staggerFieldItem} className="space-y-1.5">
                <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                    }}
                    placeholder="name@domain.com"
                    disabled={isSubmitting}
                    className={`w-full bg-navy-950/90 border rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all duration-200 ${
                      errors.email
                        ? 'border-rose-500/70 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30'
                        : 'border-navy-750 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20'
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-[11px] text-rose-400 font-medium pl-1 overflow-hidden"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Phone Number with Country Code */}
              <motion.div variants={staggerFieldItem} className="space-y-1.5">
                <label htmlFor="reg-phone" className="block text-xs font-semibold text-slate-300">
                  Phone Number
                </label>
                <div className="flex space-x-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    disabled={isSubmitting}
                    aria-label="Country Dialing Code"
                    className="bg-navy-950 border border-navy-750 focus:border-electric-500 rounded-xl px-2.5 py-2.5 text-xs text-slate-200 focus:outline-none"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-navy-900 text-white">
                        {c.country} ({c.code})
                      </option>
                    ))}
                  </select>

                  <div className="relative flex-1">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="reg-phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
                      }}
                      placeholder="98765 43210"
                      disabled={isSubmitting}
                      className={`w-full bg-navy-950/90 border rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all duration-200 ${
                        errors.phone
                          ? 'border-rose-500/70 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30'
                          : 'border-navy-750 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20'
                      }`}
                    />
                  </div>
                </div>
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-[11px] text-rose-400 font-medium pl-1 overflow-hidden"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password & Confirm Password Grid */}
              <motion.div variants={staggerFieldItem} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Password */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                      }}
                      placeholder="Min 8 characters"
                      disabled={isSubmitting}
                      className={`w-full bg-navy-950/90 border rounded-xl pl-8 pr-8 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all duration-200 ${
                        errors.password
                          ? 'border-rose-500/70 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30'
                          : 'border-navy-750 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-lg focus:outline-none transition-colors"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {showPassword ? (
                          <motion.span
                            key="pw-off"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.15 }}
                            className="block"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="pw-on"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.15 }}
                            className="block"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-[10px] text-rose-400 font-medium pl-1 overflow-hidden"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-confirm" className="block text-xs font-semibold text-slate-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      id="reg-confirm"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword)
                          setErrors((prev) => ({ ...prev, confirmPassword: null }));
                      }}
                      placeholder="Re-enter password"
                      disabled={isSubmitting}
                      className={`w-full bg-navy-950/90 border rounded-xl pl-8 pr-8 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all duration-200 ${
                        errors.confirmPassword
                          ? 'border-rose-500/70 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30'
                          : 'border-navy-750 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide confirmed password' : 'Show confirmed password'}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-lg focus:outline-none transition-colors"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {showConfirmPassword ? (
                          <motion.span
                            key="cpw-off"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.15 }}
                            className="block"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="cpw-on"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.15 }}
                            className="block"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                  <AnimatePresence>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-[10px] text-rose-400 font-medium pl-1 overflow-hidden"
                      >
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Password Strength Animated Indicator */}
              <AnimatePresence>
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1.5 p-2.5 rounded-xl bg-navy-950/60 border border-navy-800 text-xs overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Password Strength:</span>
                      <motion.span
                        key={passwordStrength.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.15 }}
                        className={`font-mono font-bold ${
                          passwordStrength.score >= 3
                            ? 'text-emerald-400'
                            : passwordStrength.score === 2
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {passwordStrength.label}
                      </motion.span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 h-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className="h-full rounded-full bg-navy-800 overflow-hidden"
                        >
                          <motion.div
                            initial={false}
                            animate={{
                              scaleX: passwordStrength.score >= step ? 1 : 0,
                              opacity: passwordStrength.score >= step ? 1 : 0,
                            }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            style={{ originX: 0 }}
                            className={`h-full w-full rounded-full ${passwordStrength.color}`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="text-[10px] text-slate-400 flex items-center justify-between pt-0.5">
                      <span className={password.length >= 8 ? 'text-emerald-400' : 'text-slate-500'}>
                        ✓ 8+ chars
                      </span>
                      <span
                        className={
                          /[A-Z]/.test(password) && /[a-z]/.test(password)
                            ? 'text-emerald-400'
                            : 'text-slate-500'
                        }
                      >
                        ✓ Upper/lower
                      </span>
                      <span
                        className={
                          /[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)
                            ? 'text-emerald-400'
                            : 'text-slate-500'
                        }
                      >
                        ✓ Number/symbol
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Terms and Conditions Checkbox */}
              <motion.div variants={staggerFieldItem} className="space-y-1 pt-1">
                <label className="flex items-start space-x-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (errors.agreeTerms) setErrors((prev) => ({ ...prev, agreeTerms: null }));
                    }}
                    className="w-4 h-4 mt-0.5 rounded border-navy-700 bg-navy-950 text-electric-500 focus:ring-0 focus:ring-offset-0 cursor-pointer flex-shrink-0 transition-transform group-hover:scale-105"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                    I accept the{' '}
                    <span className="text-electric-400 hover:underline cursor-pointer">
                      Terms of Service
                    </span>{' '}
                    and acknowledge the{' '}
                    <span className="text-electric-400 hover:underline cursor-pointer">
                      Privacy Policy
                    </span>
                    .
                  </span>
                </label>
                <AnimatePresence>
                  {errors.agreeTerms && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-[11px] text-rose-400 font-medium pl-6 overflow-hidden"
                    >
                      {errors.agreeTerms}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Create Account Submit Button */}
              <motion.div variants={springButtonEntrance} className="pt-2">
                <AnimatedButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-600 via-electric-500 to-violet-600 hover:from-electric-500 hover:to-violet-500 text-white text-xs font-bold shadow-glow-blue flex items-center justify-center space-x-2 transition-all disabled:opacity-60 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Registering with Supabase Auth...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </AnimatedButton>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer Link to Login */}
        <div className="pt-2 border-t border-navy-800 text-center">
          <p className="text-xs text-slate-400">
            Already registered?{' '}
            <Link
              to="/login"
              className="font-bold text-electric-400 hover:text-electric-300 hover:underline transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Security Attestation */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="mt-6 flex items-center space-x-2 text-[11px] text-slate-400 font-medium"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Hardware Passports & Passwords Protected by Supabase PostgreSQL</span>
      </motion.div>
    </PageTransition>
  );
}
