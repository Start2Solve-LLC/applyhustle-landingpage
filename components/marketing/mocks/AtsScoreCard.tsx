'use client';

import { motion } from 'motion/react';
import { Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE_OUT } from '@/lib/motion';
import { GaugeRing } from '../primitives';

const ScoreBar = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="flex items-center justify-between text-[11px]">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}%</span>
    </div>
    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      />
    </div>
  </div>
);

/** ATS score card — gauge + breakdown + matched/missing keywords. */
export function AtsScoreCard({
  score = 92,
  bars = [
    { label: 'Keyword match', value: 94 },
    { label: 'Work experience', value: 90 },
    { label: 'ATS readability', value: 96 },
  ],
  matched = ['React', 'TypeScript', 'CI/CD'],
  missing = ['Kubernetes'],
  className,
}: {
  score?: number;
  bars?: { label: string; value: number }[];
  matched?: string[];
  missing?: string[];
  className?: string;
}) {
  return (
    <div className={cn('p-5 sm:p-6', className)}>
      <div className="flex items-center gap-5">
        <GaugeRing value={score} label="ATS score" />
        <div className="flex-1 space-y-3">
          {bars.map((b) => (
            <ScoreBar key={b.label} {...b} />
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {matched.map((k) => (
          <span key={k} className="inline-flex items-center gap-1 rounded-full bg-success-subtle px-2 py-0.5 text-[11px] font-medium text-success">
            <Check className="h-3 w-3" /> {k}
          </span>
        ))}
        {missing.map((k) => (
          <span key={k} className="inline-flex items-center gap-1 rounded-full bg-warning-subtle px-2 py-0.5 text-[11px] font-medium text-warning">
            <Plus className="h-3 w-3" /> {k}
          </span>
        ))}
      </div>
    </div>
  );
}
