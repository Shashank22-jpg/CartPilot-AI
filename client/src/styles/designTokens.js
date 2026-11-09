/**
 * CartPilot AI — Centralized Design System Tokens
 * Primary visual reference: Emporium Bootstrap Template (Light) & Premium Navy AI Workspace (Dark)
 * Supports hybrid theme architecture: Storefront (Light) + AI Workspace (Dark)
 */

export const DESIGN_TOKENS = {
  // COLOR DIRECTION
  colors: {
    // 1. Light Shopping Experience (Emporium-inspired)
    light: {
      brand: {
        primary: '#0c6b58',     // Deep emerald green
        hover: '#0a5a4a',       // Darker emerald on hover
        active: '#084a3d',      // Deepest emerald pressed
        tint: '#e7f3ef',        // Soft emerald background wash
        borderTint: '#cfe8e0',  // Subtle emerald border
      },
      accent: {
        coral: '#f26430',       // Warm coral/sale accent
        coralHover: '#db521f',  // Hover coral
        coralSoft: '#fdeee7',   // Pill tag background
        gold: '#f5a623',        // Star ratings & highlights
        newBlue: '#2f7de1',     // New arrival tags
      },
      surface: {
        canvas: '#f8faf9',      // Warm off-white background
        card: '#ffffff',        // Pure white product cards
        tint: '#f4f8f6',        // Section backdrop
        border: '#e5eae8',      // Default component borders
        borderSubtle: '#eef2f0',// Subtle separators
      },
      text: {
        primary: '#16211d',     // Deep forest ink
        secondary: '#475a53',   // Secondary UI labels
        muted: '#6c7c76',       // Meta info and captions
        inverse: '#ffffff',     // Text on primary buttons
      },
    },

    // 2. Dark AI Intelligence Workspace (Premium Navy)
    dark: {
      brand: {
        primary: '#0070ba',     // PayPal/Electric Blue
        cyan: '#38bdf8',        // Glowing telemetry cyan
        violet: '#8b5cf6',      // Agent intelligence purple
        violetDark: '#7c3aed',
      },
      surface: {
        canvas: '#060a13',      // Deep navy workspace base
        card: '#0a101d',        // Elevated dark surface
        cardElevated: '#0f172a',// Layered interactive panel
        border: '#141e34',      // Deep border
        borderHover: '#1f2f52', // Interactive border hover
      },
      text: {
        primary: '#f8fafc',     // Crisp readable white
        secondary: '#cbd5e1',   // Slate secondary
        muted: '#94a3b8',       // Meta descriptors
        inverse: '#060a13',     // Dark text on bright badge
      },
    },

    // 3. Shared Semantic State Tokens
    semantic: {
      success: {
        light: '#0c6b58',
        lightBg: '#e7f3ef',
        dark: '#10b981',
        darkBg: 'rgba(16, 185, 129, 0.12)',
      },
      warning: {
        light: '#f5a623',
        lightBg: '#fef7ec',
        dark: '#f59e0b',
        darkBg: 'rgba(245, 158, 11, 0.12)',
      },
      error: {
        light: '#e53e3e',
        lightBg: '#fdf2f2',
        dark: '#f43f5e',
        darkBg: 'rgba(244, 63, 94, 0.12)',
      },
      info: {
        light: '#0070ba',
        lightBg: '#edf6fd',
        dark: '#38bdf8',
        darkBg: 'rgba(56, 189, 248, 0.12)',
      },
    },
  },

  // TYPOGRAPHY HIERARCHY
  typography: {
    fontFamilies: {
      display: '"Plus Jakarta Sans", Inter, system-ui, sans-serif',
      body: '"Manrope", Inter, system-ui, -apple-system, sans-serif',
      mono: '"JetBrains Mono", Fira Code, monospace',
    },
    scales: {
      displayHero: 'font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.12]',
      h1: 'font-display font-extrabold text-2xl sm:text-3xl tracking-tight leading-snug',
      h2: 'font-display font-bold text-xl sm:text-2xl tracking-tight leading-snug',
      h3: 'font-display font-bold text-lg sm:text-xl tracking-normal',
      h4: 'font-display font-bold text-base tracking-normal',
      lead: 'font-body font-normal text-base sm:text-lg leading-relaxed text-emp-ink-secondary',
      body: 'font-body font-normal text-sm sm:text-base leading-relaxed',
      bodySm: 'font-body font-normal text-xs sm:text-sm leading-normal',
      label: 'font-body font-semibold text-xs tracking-wide uppercase',
      caption: 'font-body font-medium text-[11px] text-emp-ink-muted',
    },
  },

  // SPACING & CONTAINER SCALES
  spacing: {
    containerMax: '1240px',
    radii: {
      sm: '8px',
      base: '14px',
      lg: '22px',
      pill: '9999px',
    },
    shadows: {
      sm: '0 1px 2px rgba(16, 33, 29, 0.05)',
      card: '0 6px 22px rgba(16, 33, 29, 0.08)',
      popover: '0 18px 48px rgba(16, 33, 29, 0.14)',
      glowEmerald: '0 8px 24px -4px rgba(12, 107, 88, 0.28)',
      glowCoral: '0 8px 24px -4px rgba(242, 100, 48, 0.32)',
      darkGlowBlue: '0 0 25px -5px rgba(2, 132, 199, 0.35)',
    },
  },

  // REUSABLE COMPONENT STYLES
  components: {
    // Buttons (Emporium Pill Style & Responsive Interaction)
    buttons: {
      primary:
        'inline-flex items-center justify-center gap-2 font-body font-bold text-sm px-6 py-3 rounded-pill bg-emp-brand text-white shadow-emp hover:bg-emp-brand-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
      secondary:
        'inline-flex items-center justify-center gap-2 font-body font-semibold text-sm px-5 py-2.5 rounded-pill bg-white text-emp-brand-700 border border-emp-surface-line hover:bg-emp-brand-50 hover:border-emp-brand-100 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer',
      accentSale:
        'inline-flex items-center justify-center gap-2 font-body font-bold text-sm px-6 py-3 rounded-pill bg-emp-accent text-white shadow-glow-coral hover:bg-emp-accent-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer',
      ghost:
        'inline-flex items-center justify-center gap-1.5 font-body font-semibold text-xs px-3 py-1.5 rounded-pill text-emp-brand hover:text-emp-brand-700 hover:bg-emp-brand-50 transition-colors',
      darkAi:
        'inline-flex items-center justify-center gap-2 font-body font-bold text-xs px-5 py-2.5 rounded-xl bg-gradient-to-r from-electric-600 to-blue-600 hover:from-electric-500 hover:to-blue-500 text-white shadow-glow-blue hover:-translate-y-0.5 active:translate-y-0 transition-all',
    },

    // Form Inputs & Search Bars
    inputs: {
      text:
        'w-full bg-white border border-emp-surface-line rounded-xl px-4 py-2.5 text-sm font-body text-emp-ink placeholder-emp-ink-muted focus:outline-none focus:border-emp-brand focus:ring-2 focus:ring-emp-brand-50 transition-all duration-200',
      searchPill:
        'w-full bg-emp-surface-tint border border-emp-surface-line rounded-pill px-5 py-2.5 text-sm font-body text-emp-ink placeholder-emp-ink-muted focus:outline-none focus:border-emp-brand focus:bg-white transition-all duration-200',
      dark:
        'w-full bg-navy-900 border border-navy-750 rounded-xl px-4 py-2.5 text-sm font-body text-slate-100 placeholder-slate-500 focus:outline-none focus:border-electric-500 transition-colors',
    },

    // Product Cards
    cards: {
      product:
        'bg-white border border-emp-surface-line rounded-emp overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-emp hover:border-emp-brand-100 transition-all duration-200 group',
      panel:
        'bg-white border border-emp-surface-line rounded-emp-lg p-6 shadow-emp-sm',
      darkPanel:
        'bg-navy-900 border border-navy-800 rounded-2xl p-6 shadow-xl',
    },

    // Badges & Status Indicators
    badges: {
      sale:
        'inline-flex items-center px-2.5 py-1 rounded-pill bg-emp-accent text-white font-body font-bold text-[11px] uppercase tracking-wider',
      deal:
        'inline-flex items-center px-2.5 py-1 rounded-pill bg-emp-accent-50 text-emp-accent font-body font-bold text-[11px] uppercase tracking-wider',
      best:
        'inline-flex items-center px-2.5 py-1 rounded-pill bg-emp-brand text-white font-body font-bold text-[11px] uppercase tracking-wider',
      new:
        'inline-flex items-center px-2.5 py-1 rounded-pill bg-emp-new text-white font-body font-bold text-[11px] uppercase tracking-wider',
      verified:
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-emp-brand-50 text-emp-brand font-body font-semibold text-xs border border-emp-brand-100',
      darkAgent:
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-electric-500/10 text-electric-300 font-mono text-[10px] font-bold border border-electric-500/30',
    },

    // Navigation & Header
    navigation: {
      headerLight:
        'sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emp-surface-line transition-all duration-200',
      headerDark:
        'sticky top-0 z-40 bg-navy-950/90 backdrop-blur-md border-b border-navy-800 transition-all duration-200',
      navLinkLight:
        'inline-flex items-center gap-2 px-3.5 py-2 rounded-pill font-body font-semibold text-sm text-emp-ink-secondary hover:text-emp-brand hover:bg-emp-brand-50 transition-colors',
      navLinkLightActive:
        'inline-flex items-center gap-2 px-3.5 py-2 rounded-pill font-body font-bold text-sm bg-emp-brand text-white shadow-emp-sm',
    },

    // Empty & Loading States
    states: {
      emptyLight:
        'p-16 text-center rounded-emp-lg bg-white border border-emp-surface-line space-y-4 max-w-md mx-auto shadow-emp-sm',
      skeletonLight:
        'animate-pulse bg-emp-surface-tint rounded-xl',
      skeletonDark:
        'animate-pulse bg-navy-800 rounded-xl',
    },
  },
};

export default DESIGN_TOKENS;
