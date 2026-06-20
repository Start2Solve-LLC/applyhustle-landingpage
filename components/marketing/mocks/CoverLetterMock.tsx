'use client';

import { Sparkles, Zap } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '@/lib/utils';

/* Tailored opening sentences the generator cycles through — each name-drops
   the role/company so the demo reads as genuinely personalized. */
const PHRASES = [
  "I'm drawn to Stripe's scale in payments infrastructure.",
  'I bring 5 years shipping production React and AWS.',
  'At my last role I cut p95 latency by 40%.',
];
const KEYWORDS = ['React', 'AWS', 'leadership'];

/** Looping typewriter — types a phrase, holds, deletes, advances. Static
   (full first phrase) under reduced motion. */
function useTypewriter(phrases: string[], enabled: boolean): string {
  const [text, setText] = React.useState(enabled ? '' : phrases[0]);

  React.useEffect(() => {
    if (!enabled) return;
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = phrases[phraseIdx];
      if (!deleting) {
        charIdx += 1;
        setText(full.slice(0, charIdx));
        if (charIdx === full.length) {
          deleting = true;
          timer = setTimeout(tick, 1500); // hold the finished line
          return;
        }
        timer = setTimeout(tick, 38 + Math.random() * 42);
      } else {
        charIdx -= 1;
        setText(full.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          timer = setTimeout(tick, 320);
          return;
        }
        timer = setTimeout(tick, 18);
      }
    };

    timer = setTimeout(tick, 450);
    return () => clearTimeout(timer);
  }, [phrases, enabled]);

  return text;
}

/** Cover-letter generator — live typewriter, matched keywords, speed signal. */
export function CoverLetterMock({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const typed = useTypewriter(PHRASES, !reduce);

  return (
    <div className={cn('flex h-full flex-col p-4', className)}>
      {/* Generator header */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          cover-letter · generating
        </span>
        <span className="inline-flex items-center gap-0.5 rounded-full bg-success-subtle px-1.5 py-0.5 text-[9px] font-semibold text-success">
          <Zap className="h-2.5 w-2.5" /> 8s
        </span>
      </div>

      {/* Letter body */}
      <div className="mt-2.5 rounded-lg border border-border/60 bg-background/40 p-2.5">
        <p className="text-[11px] font-semibold text-foreground">Dear Stripe team,</p>
        <p className="mt-1 min-h-[2.4em] text-[11px] leading-relaxed text-muted-foreground">
          {typed}
          <span className="ml-0.5 inline-block h-3 w-[2px] -translate-y-[1px] animate-pulse rounded-full bg-primary align-middle" />
        </p>
      </div>

      {/* Matched keywords */}
      <div className="mt-auto flex flex-wrap items-center gap-1 pt-2.5">
        <Sparkles className="h-3 w-3 text-primary" />
        <span className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground/80">
          Matched
        </span>
        {KEYWORDS.map((k) => (
          <span
            key={k}
            className="rounded-full border border-accent-subtle-border bg-accent-subtle px-1.5 py-0.5 text-[9px] font-semibold text-primary"
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}
