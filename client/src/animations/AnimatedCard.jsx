import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, springs, adaptForReducedMotion, isReducedMotionActive } from './motionConfig.js';

/**
 * Reusable AnimatedCard component.
 * Provides subtle entry animation and responsive hover/tap physics
 * tailored for CartPilot's cards (product cards, metrics, passport items).
 */
export default function AnimatedCard({
  children,
  className = '',
  variant = fadeUp,
  hoverLift = true,
  hoverGlow = false,
  tapEffect = true,
  delay = 0,
  onClick,
  ...rest
}) {
  const browserPref = useReducedMotion();
  const shouldReduceMotion = isReducedMotionActive(browserPref);
  const baseVariant = adaptForReducedMotion(variant, shouldReduceMotion);

  // Custom delay if specified
  const effectiveVariant = delay > 0 ? {
    ...baseVariant,
    animate: {
      ...baseVariant.animate,
      transition: {
        ...(baseVariant.animate?.transition || {}),
        delay,
      },
    },
  } : baseVariant;

  const hoverAnimation = !shouldReduceMotion && hoverLift ? {
    y: -3,
    transition: springs.snappy,
  } : undefined;

  const tapAnimation = !shouldReduceMotion && tapEffect && onClick ? {
    scale: 0.985,
    transition: springs.tactile,
  } : undefined;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={effectiveVariant}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      onClick={onClick}
      className={`transition-colors ${
        hoverGlow ? 'hover:shadow-glow-blue' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
