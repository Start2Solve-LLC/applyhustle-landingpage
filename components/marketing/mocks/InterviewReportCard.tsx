'use client';

import { Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GaugeRing } from '../primitives';

/** AI mock-interview report (illustrative data, mirrors the app's mock). */
export function InterviewReportCard({ className }: { className?: string }) {
  const dims = [
    { label: 'Structure (STAR)', score: 88 },
    { label: 'Clarity', score: 82 },
    { label: 'Relevance', score: 86 },
  ];
  return (
    <div className={cn('flex flex-col gap-4 p-5', className)}>
      <div className="flex items-center gap-4">
        <GaugeRing value={84} size={96} stroke={8} label="Overall" />
        <div className="space-y-2.5">
          {dims.map((d) => (
            <div key={d.label} className="flex items-center gap-2 text-xs">
              <Mic className="h-3.5 w-3.5 text-primary" />
              <span className="text-muted-foreground">{d.label}</span>
              <span className="font-semibold text-foreground">{d.score}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="rounded-lg border border-border/60 bg-background/40 p-3 text-[11px] leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">Coach:</span> Strong STAR framing on the
        system-design answer. Quantify the impact next time — &ldquo;cut latency 40%&rdquo; lands
        harder than &ldquo;improved performance.&rdquo;
      </p>
    </div>
  );
}
