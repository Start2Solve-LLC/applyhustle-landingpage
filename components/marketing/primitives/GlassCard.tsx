import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/** Glass surface card with optional accent glow + hover lift (app primitive). */
export function GlassCard({
  children,
  className,
  glow = false,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-border/70 bg-card/70 backdrop-blur-xl shadow-elev-2',
        hover &&
          'transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-accent-subtle-border hover:shadow-elev-3',
        className,
      )}
    >
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-60 blur-[24px] [background:radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_70%)]"
        />
      )}
      {children}
    </div>
  );
}
