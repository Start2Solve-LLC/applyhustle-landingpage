'use client';

import * as React from 'react';
import { useReducedMotion } from 'motion/react';
import { Briefcase, FileText, Send, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Live counter: ticks up from 0 on mount, lands on a randomized point near
 * `base` (so it differs every visit), then — if `live` — keeps nudging upward
 * like a real-time feed. Respects reduced-motion (renders final value, no ticks).
 */
function LiveNumber({
  base,
  jitter = 0,
  live = false,
  liveEveryMs = 3500,
  duration = 1.4,
}: {
  base: number;
  jitter?: number;
  live?: boolean;
  liveEveryMs?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  // Randomized landing target, fixed for this mount.
  const target = React.useRef(base + Math.round(Math.random() * jitter)).current;
  const [val, setVal] = React.useState(reduce ? target : 0);

  // Count up to the target.
  React.useEffect(() => {
    if (reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setVal(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduce]);

  // After landing, keep nudging up for a live feel.
  React.useEffect(() => {
    if (!live || reduce) return;
    let interval: ReturnType<typeof setInterval>;
    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setVal((v) => v + 1 + Math.floor(Math.random() * 3)); // +1..3
      }, liveEveryMs);
    }, duration * 1000 + 200);
    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, [live, liveEveryMs, duration, reduce]);

  return <>{val.toLocaleString()}</>;
}

/** Live platform stats — social proof for the hero (jobs, sign-ups, interviews). */
export function LiveStatsCard({ className }: { className?: string }) {
  const stats: {
    icon: typeof Briefcase;
    label: string;
    base: number;
    jitter: number;
    live?: boolean;
    liveEveryMs?: number;
    tone: string;
  }[] = [
    { icon: Briefcase, label: 'Jobs live today', base: 1840, jitter: 60, tone: 'text-foreground' },
    { icon: Users, label: 'Early members', base: 268, jitter: 9, tone: 'text-foreground' },
    { icon: FileText, label: 'Résumés ATS-checked', base: 1124, jitter: 32, live: true, liveEveryMs: 6000, tone: 'text-success' },
    { icon: Send, label: 'Applications sent today', base: 540, jitter: 22, live: true, liveEveryMs: 3200, tone: 'text-primary' },
  ];
  return (
    <div className={cn('p-5 sm:p-6', className)}>
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Live on ApplyHustle
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/70">updated just now</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border/60 bg-background/40 p-3.5">
            <s.icon className="h-4 w-4 text-muted-foreground/70" />
            <div className={cn('mt-2 text-2xl font-extrabold tabular-nums', s.tone)}>
              <LiveNumber base={s.base} jitter={s.jitter} live={s.live} liveEveryMs={s.liveEveryMs} />
            </div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-3.5 flex items-center gap-1.5 rounded-lg border border-border/50 bg-success-subtle px-3 py-2 text-[11px] text-muted-foreground">
        <TrendingUp className="h-3.5 w-3.5 shrink-0 text-success" />
        <span>
          <span className="font-semibold text-foreground">37 people</span> joined this week
        </span>
      </div>
    </div>
  );
}
