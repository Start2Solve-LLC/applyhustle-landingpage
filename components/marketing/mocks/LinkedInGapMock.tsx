import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LinkedInGlyph } from '../primitives';

/** LinkedIn gap analysis (illustrative data, mirrors the app's mock). */
export function LinkedInGapMock({ className }: { className?: string }) {
  const gaps = [
    { text: 'Add a keyword-rich headline', done: true },
    { text: 'Quantify your top 3 achievements', done: true },
    { text: 'Expand "About" with target keywords', done: false },
  ];
  return (
    <div className={cn('p-5', className)}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-info-subtle text-info">
          <LinkedInGlyph className="h-5 w-5" />
        </span>
        <div>
          <div className="text-sm font-semibold text-foreground">Profile strength</div>
          <div className="text-[11px] text-muted-foreground">7.4 / 10 · 3 quick wins</div>
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {gaps.map((g) => (
          <li key={g.text} className="flex items-center gap-2 text-xs">
            <span className={cn('grid h-4 w-4 place-items-center rounded-full', g.done ? 'bg-success-subtle text-success' : 'bg-secondary text-muted-foreground')}>
              {g.done ? <Check className="h-2.5 w-2.5" /> : <Circle className="h-2 w-2" />}
            </span>
            <span className={cn(g.done ? 'text-muted-foreground line-through' : 'text-foreground')}>{g.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
