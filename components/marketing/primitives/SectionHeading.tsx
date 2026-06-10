import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/** Eyebrow → display heading → optional subhead (app primitive). */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left',
        className,
      )}
    >
      {eyebrow && (
        <div className={cn('flex items-center gap-2', align === 'center' && 'justify-center')}>
          <span className="text-overline text-primary">{eyebrow}</span>
        </div>
      )}
      <h2 className="mt-4 text-display-lg text-foreground">{title}</h2>
      {sub && <p className="mt-4 text-body-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}
