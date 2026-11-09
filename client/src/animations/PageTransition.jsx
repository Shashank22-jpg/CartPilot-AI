import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { pageTransition, adaptForReducedMotion, isReducedMotionActive } from './motionConfig.js';

/**
 * Reusable PageTransition wrapper for router views.
 * Ensures smooth, layout-safe transitions between routes.
 * Automatically respects system prefers-reduced-motion settings with dev override support.
 */
export default function PageTransition({
  children,
  className = '',
  variant = pageTransition,
  ...rest
}) {
  const browserPref = useReducedMotion();
  const shouldReduceMotion = isReducedMotionActive(browserPref);
  const activeVariant = adaptForReducedMotion(variant, shouldReduceMotion);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={activeVariant}
      className={`w-full ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
