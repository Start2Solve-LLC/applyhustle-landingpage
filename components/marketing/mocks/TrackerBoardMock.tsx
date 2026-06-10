import { cn } from '@/lib/utils';

/** Applications tracker — mini kanban (illustrative data, mirrors the app's mock). */
export function TrackerBoardMock({ className }: { className?: string }) {
  const cols = [
    { name: 'Applied', count: 42, tone: 'text-muted-foreground' },
    { name: 'Screen', count: 11, tone: 'text-info' },
    { name: 'Interview', count: 5, tone: 'text-primary' },
    { name: 'Offer', count: 2, tone: 'text-success' },
  ];
  return (
    <div className={cn('grid grid-cols-4 gap-1.5 p-4', className)}>
      {cols.map((c) => (
        <div key={c.name} className="rounded-lg border border-border/60 bg-background/40 p-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {c.name}
            </span>
            <span className={cn('text-xs font-bold', c.tone)}>{c.count}</span>
          </div>
          <div className="mt-2 space-y-1">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-5 rounded-md bg-secondary/70" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
