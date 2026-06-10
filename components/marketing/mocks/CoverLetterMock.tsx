'use client';

import { FileText, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Cover-letter generator — typing lines. */
export function CoverLetterMock({ className }: { className?: string }) {
  const lines = ['w-3/4', 'w-full', 'w-full', 'w-5/6', 'w-2/3'];
  return (
    <div className={cn('p-5', className)}>
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <FileText className="h-4 w-4 text-primary" /> Dear Hiring Manager,
      </div>
      <div className="mt-3 space-y-2">
        {lines.map((w, i) => (
          <motion.div
            key={i}
            className={cn('h-2 origin-left rounded-full bg-foreground/[0.12]', w)}
            initial={{ opacity: 0, scaleX: 0.2 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12, ease: EASE_OUT }}
          />
        ))}
      </div>
      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-subtle px-2.5 py-1 text-[11px] font-medium text-primary">
        <Sparkles className="h-3 w-3" /> Tailored to the job description
      </div>
    </div>
  );
}
