/**
 * ApplyHustle design tokens — replicated from frontend/src/index.css so the
 * landing page and the main app share one visual language. Every color maps
 * to a CSS variable defined in app/globals.css; light/dark theming works via
 * the `.dark` class on <html>, exactly like the app.
 *
 * Opaque tokens are wrapped in CSS relative-color syntax
 * (`rgb(from var(--x) r g b / <alpha-value>)`) so Tailwind slash opacity
 * modifiers (bg-card/70, border-border/60 …) work like they do in the app.
 * Translucent *-subtle tokens are color-mix() values and keep their own
 * alpha — never use slash modifiers on those.
 */

/** Opaque token → slash-opacity-capable color value. */
const tokenColor = (variable) => `rgb(from var(${variable}) r g b / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // --font-sans is set by next/font (Inter) in app/layout.tsx
        sans: [
          'var(--font-sans)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'SF Mono',
          'Cascadia Code',
          'Segoe UI Mono',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      colors: {
        background: tokenColor('--background'),
        foreground: tokenColor('--foreground'),
        card: {
          DEFAULT: tokenColor('--card'),
          foreground: tokenColor('--card-foreground'),
        },
        popover: {
          DEFAULT: tokenColor('--popover'),
          foreground: tokenColor('--popover-foreground'),
        },
        primary: {
          DEFAULT: tokenColor('--primary'),
          foreground: tokenColor('--primary-foreground'),
        },
        secondary: {
          DEFAULT: tokenColor('--secondary'),
          foreground: tokenColor('--secondary-foreground'),
        },
        muted: {
          DEFAULT: tokenColor('--muted'),
          foreground: tokenColor('--muted-foreground'),
        },
        accent: {
          DEFAULT: tokenColor('--accent'),
          foreground: tokenColor('--accent-foreground'),
          subtle: 'var(--accent-subtle)',
          'subtle-border': 'var(--accent-subtle-border)',
        },
        destructive: {
          DEFAULT: tokenColor('--destructive'),
          foreground: tokenColor('--destructive-foreground'),
          subtle: 'var(--destructive-subtle)',
        },
        success: {
          DEFAULT: tokenColor('--success'),
          foreground: tokenColor('--success-foreground'),
          subtle: 'var(--success-subtle)',
        },
        warning: {
          DEFAULT: tokenColor('--warning'),
          foreground: tokenColor('--warning-foreground'),
          subtle: 'var(--warning-subtle)',
        },
        info: {
          DEFAULT: tokenColor('--info'),
          foreground: tokenColor('--info-foreground'),
          subtle: 'var(--info-subtle)',
        },
        border: tokenColor('--border'),
        input: tokenColor('--input'),
        ring: tokenColor('--ring'),
        hairline: {
          DEFAULT: 'var(--hairline)',
          strong: 'var(--hairline-strong)',
        },
      },
      // Radius scale anchored at --radius = 12px (matches frontend @theme block)
      borderRadius: {
        xs: 'calc(var(--radius) - 6px)',
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
      },
      // Elevation system (frontend --elev-1..4)
      boxShadow: {
        'elev-1': 'var(--elev-1)',
        'elev-2': 'var(--elev-2)',
        'elev-3': 'var(--elev-3)',
        'elev-4': 'var(--elev-4)',
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
        snug: '-0.01em',
        wide: '0.02em',
        wider: '0.08em',
      },
      maxWidth: {
        prose: '42rem',
        content: '64rem',
        wide: '80rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.55' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 5s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};
