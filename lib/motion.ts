import type { Variants, Transition } from 'motion/react';

/*
 * Shared motion vocabulary — ported from frontend/src/lib/motion.ts so JS
 * motion matches the CSS easing/duration tokens in globals.css.
 * All scroll-in usage flows through <Reveal>/<Stagger>, which gate these
 * behind useReducedMotion() — one accessibility source.
 */

// cubic-bezier(0.22, 1, 0.36, 1) — matches --ease-out-quint
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
// cubic-bezier(0.34, 1.56, 0.64, 1) — matches --ease-spring
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

export const DUR = {
  fast: 0.14,
  base: 0.22,
  slow: 0.36,
  slower: 0.6,
} as const;

const baseTransition: Transition = { duration: DUR.slow, ease: EASE_OUT };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

/** Parent container that staggers its direct <StaggerItem> children. */
export const staggerParent = (gap = 0.07, delayChildren = 0.04): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren } },
});

/** Reduced-motion fallbacks — opacity only, no transforms, instant. */
export const reducedFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0 } },
};

/** Standard viewport config for whileInView reveals. */
export const viewportOnce = { once: true, margin: '-10% 0px -10% 0px' } as const;
