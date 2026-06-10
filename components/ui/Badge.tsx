import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/* Variant recipes ported from frontend/src/components/ui/badge.tsx. */

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'info' | 'glow';

const variantClasses: Record<BadgeVariant, string> = {
  default: 'border border-accent-subtle-border bg-accent-subtle text-primary',
  secondary: 'border border-border bg-secondary text-secondary-foreground',
  outline: 'border border-border text-muted-foreground',
  success: 'border border-success/30 bg-success-subtle text-success',
  warning: 'border border-warning/30 bg-warning-subtle text-warning',
  info: 'border border-info/30 bg-info-subtle text-info',
  glow: 'border border-accent-subtle-border bg-accent-subtle text-primary shadow-[0_0_18px_-6px_color-mix(in_oklab,var(--primary)_75%,transparent)]',
};

export function Badge({
  variant = 'default',
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium leading-tight transition-colors [&_svg]:size-3',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
