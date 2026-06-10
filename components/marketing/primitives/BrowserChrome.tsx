import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/** Faux browser/app window frame (app primitive). */
export function BrowserChrome({
  url = 'app.applyhustle.com',
  children,
  className,
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border/70 bg-card shadow-elev-3',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/60 bg-secondary/40 px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </span>
        <span className="mx-auto inline-flex items-center gap-1.5 rounded-md bg-background/60 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          {url}
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
