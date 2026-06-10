'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/** US / International segmented control with sliding indicator (app primitive). */
export function RegionToggle({
  isUS,
  onChange,
  className,
}: {
  isUS: boolean;
  onChange: (isUS: boolean) => void;
  className?: string;
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
              'relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm',
              active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {active && (
              <motion.span
                layoutId="region-pill"
                className="absolute inset-0 -z-10 rounded-full bg-primary"
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="mr-1">{opt.flag}</span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
