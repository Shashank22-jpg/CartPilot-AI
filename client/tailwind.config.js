/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Emporium Light Shopping Experience Palette
        emp: {
          brand: {
            DEFAULT: '#0c6b58', // Deep Emerald
            50: '#e7f3ef',      // Soft emerald tint
            100: '#cfe8e0',     // Subtle emerald border
            600: '#0a5a4a',     // Hover emerald
            700: '#084a3d',     // Active / Dark emerald
          },
          accent: {
            DEFAULT: '#f26430', // Warm Coral / Sale Accent
            50: '#fdeee7',      // Soft coral tint
            600: '#db521f',     // Hover coral
          },
          ink: {
            DEFAULT: '#16211d', // Primary deep forest ink text
            secondary: '#475a53',// Secondary UI text
            muted: '#6c7c76',   // Captions & placeholders
          },
          surface: {
            white: '#ffffff',
            tint: '#f4f8f6',    // Warm off-white section background
            soft: '#f8faf9',    // Page base background
            line: '#e5eae8',    // Standard card & divider border
            lineSubtle: '#eef2f0',
          },
          gold: '#f5a623',      // Rating stars & highlights
          new: '#2f7de1',       // New release badge
        },
        // AI Workspace Dark Palette (Preserved & Enhanced)
        navy: {
          950: '#060A13',
          900: '#0A101D',
          850: '#0F172A',
          800: '#141E34',
          750: '#192642',
          700: '#1F2F52',
          600: '#2A3F6D',
        },
        electric: {
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0284C7',
          600: '#0070BA', // Official PayPal Blue
        },
        violet: {
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        brand: {
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['"Manrope"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['"Manrope"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      borderRadius: {
        'emp-sm': '8px',
        'emp': '14px',
        'emp-lg': '22px',
        'pill': '9999px',
      },
      boxShadow: {
        'emp-sm': '0 1px 2px rgba(16, 33, 29, 0.05)',
        'emp': '0 6px 22px rgba(16, 33, 29, 0.08)',
        'emp-lg': '0 18px 48px rgba(16, 33, 29, 0.14)',
        'glow-emerald': '0 8px 24px -4px rgba(12, 107, 88, 0.28)',
        'glow-coral': '0 8px 24px -4px rgba(242, 100, 48, 0.32)',
        'glow-blue': '0 0 25px -5px rgba(2, 132, 199, 0.35)',
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
