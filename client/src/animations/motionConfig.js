/**
 * CartPilot AI — Centralized Animation Configuration
 * Powered by Motion.dev (`motion/react`)
 *
 * Tuned for clear visual fidelity (0.5s–0.7s entrance) and silky responsiveness.
 * Fully compliant with WCAG prefers-reduced-motion standards with a dev override.
 */

// 1. Animation Durations (in seconds)
export const durations = {
  instant: 0.1,
  fast: 0.25,
  normal: 0.45,
  smooth: 0.60,
  slow: 0.75,
  staggerLogin: 0.12,     // 120ms interval per requirement
  staggerRegister: 0.10,  // 100ms interval per requirement
  staggerDelay: 0.08,
};

// 2. High-Fidelity Easing Curves
export const easings = {
  // Ultra-smooth exponential deceleration for prominent natural entrances
  premiumOut: [0.16, 1, 0.3, 1],
  // Responsive cubic ease-out
  easeOutCubic: [0.33, 1, 0.68, 1],
  // Symmetric ease for continuous or hovering transitions
  easeInOutQuad: [0.45, 0, 0.55, 1],
  // Clean acceleration for exits
  easeInQuad: [0.5, 0, 0.75, 0],
};

// 3. Tuned Spring Physics
export const springs = {
  // Prominent gentle spring (for card scale, modal entrances)
  gentle: {
    type: 'spring',
    stiffness: 220,
    damping: 24,
    mass: 0.9,
  },
  // Snappy responsive spring (for buttons, pills, toggles)
  snappy: {
    type: 'spring',
    stiffness: 380,
    damping: 28,
    mass: 0.6,
  },
  // Bouncy entrance spring (for submit button entrance)
  buttonEntrance: {
    type: 'spring',
    stiffness: 320,
    damping: 22,
    mass: 0.7,
  },
  // Micro-tactile feedback (for press actions)
  tactile: {
    type: 'spring',
    stiffness: 450,
    damping: 25,
    mass: 0.5,
  },
};

// 4. Fallback for reduced motion (instant transition, opacity-only fade)
export const reducedMotionTransition = {
  duration: 0.01,
  ease: 'linear',
};

// Helper to determine if reduced motion should be enforced
export function isReducedMotionActive(browserPreference) {
  try {
    // If developer explicitly forced animations in dev, honor that
    if (typeof window !== 'undefined') {
      const devOverride = localStorage.getItem('cartpilot_force_motion');
      if (devOverride === 'true') return false;
      if (devOverride === 'false') return true;
    }
  } catch {}
  return Boolean(browserPreference);
}

// 5. Distinct & Impactful Reusable Presets

// --- Page & Card Presets ---
export const pageTransition = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: durations.smooth,
      ease: easings.premiumOut,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.98,
    transition: {
      duration: durations.fast,
      ease: easings.easeInQuad,
    },
  },
};

// Main Login Card: Fade in + scale from 0.90 to 1 over ~0.6s
export const loginCard = {
  initial: { opacity: 0, scale: 0.90, y: 25 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: durations.smooth,
      ease: easings.premiumOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: -18,
    transition: {
      duration: durations.fast,
      ease: easings.easeInQuad,
    },
  },
};

// Registration Card: Fade in + scale from 0.90 to 1 over ~0.6s
export const registerCard = {
  initial: { opacity: 0, scale: 0.90, y: 25 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: durations.smooth,
      ease: easings.premiumOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: -18,
    transition: {
      duration: durations.fast,
      ease: easings.easeInQuad,
    },
  },
};

// Login Heading: Fade upward from 30px
export const loginHeading = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal + 0.1,
      delay: 0.08,
      ease: easings.premiumOut,
    },
  },
};

// Stagger Container for Login: 120ms intervals
export const loginStaggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: durations.staggerLogin, // 0.12s
      delayChildren: 0.20,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// Stagger Container for Registration: 100ms intervals
export const registerStaggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: durations.staggerRegister, // 0.10s
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

// Stagger Field Item: Smooth slide-up with opacity
export const staggerFieldItem = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.premiumOut,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: durations.fast,
    },
  },
};

// Spring button entrance
export const springButtonEntrance = {
  initial: { opacity: 0, scale: 0.90, y: 15 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springs.buttonEntrance,
  },
};

// Standard Presets (Retained for general use)
export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.premiumOut,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: durations.fast,
      ease: easings.easeInQuad,
    },
  },
};

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.premiumOut,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: durations.fast,
      ease: easings.easeInQuad,
    },
  },
};

export const fadeDown = {
  initial: { opacity: 0, y: -24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.premiumOut,
    },
  },
  exit: {
    opacity: 0,
    y: 14,
    transition: {
      duration: durations.fast,
      ease: easings.easeInQuad,
    },
  },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.smooth,
      ease: easings.premiumOut,
    },
  },
  exit: {
    opacity: 0,
    x: -16,
    transition: {
      duration: durations.fast,
      ease: easings.easeInQuad,
    },
  },
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.smooth,
      ease: easings.premiumOut,
    },
  },
  exit: {
    opacity: 0,
    x: 16,
    transition: {
      duration: durations.fast,
      ease: easings.easeInQuad,
    },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.90 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.smooth,
      ease: easings.premiumOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: {
      duration: durations.fast,
      ease: easings.easeInQuad,
    },
  },
};

export const staggerContainer = loginStaggerContainer;
export const staggerItem = staggerFieldItem;

// 6. Reduced Motion Adapter Utility
export function adaptForReducedMotion(variants, shouldReduce) {
  if (!shouldReduce || !variants) return variants;

  const stripSpatial = (state) => {
    if (!state) return state;
    if (typeof state !== 'object') return state;

    const { x, y, z, scale, scaleX, scaleY, rotate, rotateX, rotateY, rotateZ, skew, skewX, skewY, ...rest } = state;
    return {
      ...rest,
      opacity: state.opacity !== undefined ? state.opacity : 1,
      transition: reducedMotionTransition,
    };
  };

  return {
    ...variants,
    initial: stripSpatial(variants.initial),
    animate: stripSpatial(variants.animate),
    exit: stripSpatial(variants.exit),
  };
}

// 7. Dynamic Factory Helpers
export function createStaggerContainer({ staggerDelay = 0.10, delayChildren = 0.15 } = {}) {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerDelay / 2,
        staggerDirection: -1,
      },
    },
  };
}

