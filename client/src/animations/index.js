/**
 * CartPilot AI — Central Animation System Entry Point
 * Re-exports core Motion.dev primitives, configuration presets, and reusable UI wrappers.
 */

export { motion, AnimatePresence, useReducedMotion } from 'motion/react';

// Configuration, Presets & Physics
export * from './motionConfig.js';

// Reusable Component Wrappers
export { default as PageTransition } from './PageTransition.jsx';
export { default as AnimatedCard } from './AnimatedCard.jsx';
export { default as AnimatedButton } from './AnimatedButton.jsx';
export { default as StaggerContainer, StaggerItem } from './StaggerContainer.jsx';
