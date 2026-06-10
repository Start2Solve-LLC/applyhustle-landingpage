import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/** Keyboard-key pill — the "fast tool" motif. */
export function KeyCap({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-[6px] border border-border bg-card px-1.5',
        'font-mono text-[11px] font-medium text-muted-foreground',
        'shadow-[inset_0_-1px_0_0_var(--hairline),0_1px_1px_0_color-mix(in_oklab,var(--foreground)_8%,transparent)]',
        className,
      )}
    >
      {children}
    </kbd>
  );
}
