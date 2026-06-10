'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import * as React from 'react';
import { fadeUp, reducedFade, staggerParent, viewportOnce, EASE_OUT, DUR } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Dir = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction the element rises from. */
  from?: Dir;
  /** Distance (px) of the entrance offset. */
  distance?: number;
  /** Seconds to delay the reveal. */
  delay?: number;
  as?: 'div' | 'section' | 'span' | 'li' | 'article' | 'header' | 'footer';
  children: React.ReactNode;
}

const offset = (from: Dir, d: number) => {
  switch (from) {
    case 'up':
      return { y: d };
    case 'down':
      return { y: -d };
    case 'left':
      return { x: d };
    case 'right':
      return { x: -d };
    default:
      return {};
  }
};

/**
 * Scroll-triggered reveal. Single source of truth for entrance motion.
 * Honors prefers-reduced-motion (opacity-only, instant).
 */
export function Reveal({
  from = 'up',
  distance = 16,
  delay = 0,
  as = 'div',
  className,
  children,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = reduce
    ? reducedFade
    : {
        hidden: { opacity: 0, ...offset(from, distance) },
        show: { opacity: 1, x: 0, y: 0, transition: { duration: DUR.slow, ease: EASE_OUT, delay } },
      };

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={variants}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Delay between children, seconds. */
  gap?: number;
  delayChildren?: number;
  as?: 'div' | 'section' | 'ul' | 'ol';
  children: React.ReactNode;
}

/** Parent that staggers its <StaggerItem> children as they scroll in. */
export function Stagger({
  gap = 0.07,
  delayChildren = 0.04,
  as = 'div',
  className,
  children,
  ...rest
}: StaggerProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={reduce ? reducedFade : staggerParent(gap, delayChildren)}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'li' | 'article' | 'span';
  children: React.ReactNode;
}

/** Child of <Stagger>. Rises in sequence. */
export function StaggerItem({ as = 'div', className, children, ...rest }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={cn(className)}
      variants={reduce ? reducedFade : fadeUp}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </MotionTag>
  );
}
