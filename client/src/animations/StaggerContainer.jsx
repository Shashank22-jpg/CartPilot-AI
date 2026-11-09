import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  staggerContainer,
  staggerItem,
  createStaggerContainer,
  adaptForReducedMotion,
  isReducedMotionActive,
} from './motionConfig.js';

/**
 * Reusable StaggerContainer component.
 * Coordinates cascading entrance animations for grids, lists, or metric groups.
 */
export function StaggerContainer({
  children,
  className = '',
  as = 'div',
  staggerDelay = 0.10,
  delayChildren = 0.15,
  animateOnView = false,
  viewport = { once: true, amount: 0.1 },
  ...rest
}) {
  const browserPref = useReducedMotion();
  const shouldReduceMotion = isReducedMotionActive(browserPref);
  const baseVariants = createStaggerContainer({ staggerDelay, delayChildren });
  const activeVariants = adaptForReducedMotion(baseVariants, shouldReduceMotion);

  const Component = motion[as] || motion.div;

  if (animateOnView) {
    return (
      <Component
        initial="initial"
        whileInView="animate"
        exit="exit"
        viewport={viewport}
        variants={activeVariants}
        className={className}
        {...rest}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      initial="initial"
      animate="animate"
      exit="exit"
      variants={activeVariants}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Reusable StaggerItem component.
 * Child element designed to be wrapped inside a <StaggerContainer>.
 */
export function StaggerItem({
  children,
  className = '',
  as = 'div',
  variant = staggerItem,
  ...rest
}) {
  const browserPref = useReducedMotion();
  const shouldReduceMotion = isReducedMotionActive(browserPref);
  const activeVariant = adaptForReducedMotion(variant, shouldReduceMotion);

  const Component = motion[as] || motion.div;

  return (
    <Component
      variants={activeVariant}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default StaggerContainer;
