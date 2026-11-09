import React, { forwardRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { springs, isReducedMotionActive } from './motionConfig.js';

/**
 * Reusable AnimatedButton component.
 * Provides micro-tactile spring feedback on hover and press.
 * Supports form submission, button types, disabled states, and respects prefers-reduced-motion.
 */
const AnimatedButton = forwardRef(function AnimatedButton(
  {
    children,
    className = '',
    onClick,
    disabled = false,
    type = 'button',
    scaleOnHover = 1.025,
    scaleOnTap = 0.95,
    ...rest
  },
  ref
) {
  const browserPref = useReducedMotion();
  const shouldReduceMotion = isReducedMotionActive(browserPref);

  const hoverAnimation = !shouldReduceMotion && !disabled ? {
    scale: scaleOnHover,
    transition: springs.snappy,
  } : undefined;

  const tapAnimation = !shouldReduceMotion && !disabled ? {
    scale: scaleOnTap,
    transition: springs.tactile,
  } : undefined;

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      className={`select-none disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
});

export default AnimatedButton;
