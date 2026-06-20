'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/** US / International segmented control with sliding indicator (app primitive). */
export function RegionToggle({
  isUS,
  onChange,
  className,
  /** Unique layout-animation id — set per instance when several toggles mount at once. */
  pillId = 'region-pill',
}: {
  isUS: boolean;
  onChange: (isUS: boolean) => void;
  className?: string;
  pillId?: string;
}) {
  const reduce = useReducedMotion();
  const options = [
    { key: true, label: 'United States', flag: '🇺🇸' },
    { key: false, label: 'International', flag: '🌍' },
  ];
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-border/70 bg-card/60 p-1 backdrop-blur-sm',
        className,
      )}
      role="tablist"
      aria-label="Region"
    >
      {options.map((opt) => {
        const active = opt.key === isUS;
        return (
          <button
            key={String(opt.key)}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.key)}
            className={cn(
              'relative isolate rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm',
              active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {active && (
              <motion.span
                layoutId={pillId}
                className="absolute inset-0 -z-10 rounded-full bg-primary shadow-[0_2px_8px_-2px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
                transition={
                  reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 32 }
                }
              />
            )}
            <span className="relative z-10 inline-flex items-center whitespace-nowrap">
              <span className="mr-1">{opt.flag}</span>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
