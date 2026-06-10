'use client';

import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/**
 * Infinite horizontal marquee with edge fades. Pauses on hover; static under
 * reduced motion. Speed is set with an arbitrary animation-duration class so
 * no inline styles are needed (keyframes `marquee` live in globals.css).
 */
export function MarqueeRow({
  children,
  durationClassName = '[animation-duration:32s]',
  className,
}: {
  children: ReactNode;
  /** e.g. "[animation-duration:36s]" — seconds for one full loop. */
  durationClassName?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const items = (
    <div className="flex shrink-0 items-center gap-14 pr-14" aria-hidden>
      {children}
    </div>
  );

  if (reduce) {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-x-12 gap-y-4', className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
      <div
        className={cn(
          'flex w-max [animation:marquee_linear_infinite] hover:[animation-play-state:paused]',
          durationClassName,
        )}
      >
        {items}
        {items}
      </div>
    </div>
  );
}
