import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  RotateCcw,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Layers,
  MousePointer,
  Sliders,
  Shield,
  Bot,
  Zap,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  PageTransition,
  AnimatedButton,
  AnimatedCard,
  StaggerContainer,
  StaggerItem,
  fadeIn,
  fadeUp,
  scaleIn,
  slideInLeft,
  slideInRight,
  springs,
} from '../animations';

export default function AnimationTestPage() {
  const [replayKey, setReplayKey] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [tapCounter, setTapCounter] = useState(0);
  const [reducedMotionOverride, setReducedMotionOverride] = useState(() => {
    try {
      return localStorage.getItem('cartpilot_force_motion') === 'false';
    } catch {
      return false;
    }
  });

  const toggleReducedMotion = () => {
    const nextVal = !reducedMotionOverride;
    setReducedMotionOverride(nextVal);
    try {
      localStorage.setItem('cartpilot_force_motion', nextVal ? 'false' : 'true');
    } catch {}
    setReplayKey((k) => k + 1);
  };

  const triggerReplay = () => {
    setReplayKey((k) => k + 1);
  };

  return (
    <PageTransition key={replayKey} className="min-h-screen bg-navy-950 text-white p-6 sm:p-10 space-y-8 select-none">
      {/* Test Page Header & Control Strip */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-navy-900 border border-navy-800 shadow-2xl">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5 text-electric-400" />
            <span>Motion.dev Interactive Animation Test Lab</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            CartPilot Animation Foundation
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Live interactive test harness for Motion.dev presets: fade, scale, slide, staggered cascading lists, spring physics, and micro-interactions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Replay Trigger */}
          <button
            onClick={triggerReplay}
            className="px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-bold shadow-glow-blue flex items-center space-x-1.5 transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay All</span>
          </button>

          {/* Toggle Reduced Motion Override */}
          <button
            onClick={toggleReducedMotion}
            className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
              reducedMotionOverride
                ? 'bg-amber-950/80 border-amber-500/60 text-amber-300'
                : 'bg-navy-800 hover:bg-navy-750 border-navy-700 text-slate-300'
            }`}
          >
            Reduced Motion: {reducedMotionOverride ? 'FORCED ON' : 'DISABLED (Full Motion)'}
          </button>

          {/* Quick Route Links */}
          <Link
            to="/login"
            className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 border border-navy-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            Go to Login →
          </Link>
          <Link
            to="/register"
            className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 border border-navy-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            Go to Register →
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* TEST 1: CORE PRESETS (Clearly Visible) */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-electric-400" />
            <span>1. Core Entrance Presets (Duration: 0.6s)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Fade In */}
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-2 text-center"
            >
              <span className="px-2 py-0.5 rounded-full bg-electric-500/10 text-electric-300 text-[10px] font-mono font-bold">
                fadeIn
              </span>
              <h3 className="text-sm font-bold text-white">Smooth Fade In</h3>
              <p className="text-[11px] text-slate-400">Pure opacity transition from 0 to 1 over 0.45s</p>
            </motion.div>

            {/* Slide / Fade Up */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-2 text-center"
            >
              <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 text-[10px] font-mono font-bold">
                fadeUp (30px)
              </span>
              <h3 className="text-sm font-bold text-white">Slide & Fade Up</h3>
              <p className="text-[11px] text-slate-400">Upward motion + opacity with premium easing</p>
            </motion.div>

            {/* Scale In */}
            <motion.div
              variants={scaleIn}
              initial="initial"
              animate="animate"
              className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-2 text-center"
            >
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-mono font-bold">
                scaleIn (0.90 → 1)
              </span>
              <h3 className="text-sm font-bold text-white">Scale & Bloom</h3>
              <p className="text-[11px] text-slate-400">Prominent card scale from 90% to 100%</p>
            </motion.div>

            {/* Slide In Left / Right */}
            <motion.div
              variants={slideInRight}
              initial="initial"
              animate="animate"
              className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-2 text-center"
            >
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-mono font-bold">
                slideInRight (30px)
              </span>
              <h3 className="text-sm font-bold text-white">Horizontal Slide</h3>
              <p className="text-[11px] text-slate-400">Lateral entrance with subtle deceleration</p>
            </motion.div>
          </div>
        </section>

        {/* TEST 2: STAGGERED CHILDREN (Cascading List) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-violet-400" />
              <span>2. Staggered Cascading Elements (120ms intervals)</span>
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">Sequential delay coordination</span>
          </div>

          <StaggerContainer
            staggerDelay={0.12}
            delayChildren={0.15}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3"
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <StaggerItem key={item}>
                <div className="p-4 rounded-2xl bg-navy-900/90 border border-navy-800 hover:border-violet-500/50 transition-colors text-center space-y-1">
                  <div className="w-8 h-8 rounded-xl bg-violet-600/20 text-violet-400 font-mono font-bold text-xs flex items-center justify-center mx-auto">
                    #{item}
                  </div>
                  <h4 className="text-xs font-semibold text-white">Stagger Step {item}</h4>
                  <p className="text-[10px] text-slate-400">+{item * 120}ms delay</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* TEST 3: INTERACTIVE MICRO-INTERACTIONS (Hover & Tap) */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
            <MousePointer className="w-4 h-4 text-cyan-400" />
            <span>3. Micro-Interactions: Spring Hover & Tactile Press</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Animated Button */}
            <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Tactile Spring Button</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Scales up to 1.03 on hover, springs down to 0.95 on click.
                </p>
              </div>

              <div className="pt-2">
                <AnimatedButton
                  onClick={() => setTapCounter((c) => c + 1)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-electric-500 to-violet-600 text-white text-xs font-bold shadow-glow-blue flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Click Me! (Tapped {tapCounter}x)</span>
                </AnimatedButton>
              </div>
            </div>

            {/* Animated Card with Hover Lift */}
            <AnimatedCard
              hoverLift
              hoverGlow
              className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-3 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="px-2 py-0.5 rounded-full bg-electric-500/20 text-electric-300 text-[10px] font-mono font-bold">
                  AnimatedCard Wrapper
                </span>
                <h4 className="text-xs font-bold text-white mt-2">Hover Lift & Glow</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Hover your cursor over this card to witness smooth 3px elevation with ambient shadow glow.
                </p>
              </div>
              <div className="text-[11px] text-electric-400 font-semibold flex items-center space-x-1">
                <span>Interactive Feedback</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </AnimatedCard>

            {/* Password Eye Cross-Fade & Error Message Slide */}
            <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Icon Toggle & Alert Animation</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Show/hide password smooth cross-fade with AnimatePresence.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex-1 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-xs font-semibold flex items-center justify-center space-x-2"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {showPassword ? (
                        <motion.span
                          key="eye-off"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.15 }}
                        >
                          <EyeOff className="w-4 h-4 text-electric-400" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="eye"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Eye className="w-4 h-4 text-slate-400" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <span>{showPassword ? 'Hide Icon' : 'Show Icon'}</span>
                  </button>

                  <button
                    onClick={() => setShowError(!showError)}
                    className="flex-1 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-xs font-semibold text-rose-300"
                  >
                    Toggle Error
                  </button>
                </div>

                <AnimatePresence>
                  {showError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -6 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/40 text-[10px] text-rose-300 flex items-center space-x-1.5 overflow-hidden"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                      <span>Smooth Animated Validation Error Notice</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
