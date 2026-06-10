import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Resume redesign — before/after score + template thumbnails. */
export function ResumeRedesignMock({ className }: { className?: string }) {
  return (
    <div className={cn('p-5', className)}>
      <div className="flex items-center justify-center gap-3 text-center">
        <div className="rounded-xl border border-border/60 bg-background/40 px-4 py-3">
          <div className="text-2xl font-extrabold text-destructive">62</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Before</div>
        </div>
        <ArrowUpRight className="h-5 w-5 text-primary" />
        <div className="rounded-xl border border-accent-subtle-border bg-accent-subtle px-4 py-3">
          <div className="text-2xl font-extrabold text-success">96</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">After</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'aspect-[3/4] rounded-md border bg-background/60 p-1',
              i === 0 ? 'border-primary' : 'border-border/60',
            )}
          >
            <div className="space-y-0.5">
              <div className="h-1 w-3/4 rounded-full bg-foreground/30" />
              <div className="h-0.5 w-full rounded-full bg-foreground/10" />
              <div className="h-0.5 w-full rounded-full bg-foreground/10" />
              <div className="h-0.5 w-2/3 rounded-full bg-foreground/10" />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">5 ATS-ready templates</p>
    </div>
  );
}
