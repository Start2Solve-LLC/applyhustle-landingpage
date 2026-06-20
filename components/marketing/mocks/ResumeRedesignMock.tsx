import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Resume redesign — before/after score, what-changed chips, template picks. */
export function ResumeRedesignMock({ className }: { className?: string }) {
  const changes = ['+12 keywords', 'Format fixed', 'Action verbs'];

  return (
    <div className={cn('grid h-full grid-cols-[1.15fr_1fr] gap-3 p-4', className)}>
      {/* Left: before → after + what changed */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <div className="rounded-lg border border-border/60 bg-background/40 px-2.5 py-1.5 text-center">
            <div className="text-lg font-extrabold leading-none text-destructive">62</div>
            <div className="text-[9px] uppercase tracking-wide text-muted-foreground">Before</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="rounded-full bg-success-subtle px-1.5 text-[10px] font-bold text-success">
              +34
            </span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
          <div className="rounded-lg border border-accent-subtle-border bg-accent-subtle px-2.5 py-1.5 text-center">
            <div className="text-lg font-extrabold leading-none text-success">96</div>
            <div className="text-[9px] uppercase tracking-wide text-muted-foreground">After</div>
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1">
          {changes.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border/60 bg-background/40 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Right: template picks */}
      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'aspect-[3/4] rounded-md border bg-background/60 p-1',
                i === 0 ? 'border-primary ring-1 ring-primary/30' : 'border-border/60',
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
        <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
          5 ATS-ready templates
        </p>
      </div>
    </div>
  );
}
