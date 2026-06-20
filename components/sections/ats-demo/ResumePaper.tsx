'use client';

import { UploadCloud, FileText } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '@/lib/utils';

/* Faux résumé skeleton-line widths, cycled per row. */
const LINE_WIDTH_CLASSES = ['w-[96%]', 'w-[88%]', 'w-[72%]', 'w-[80%]', 'w-[64%]'];

/* Faux résumé section — heading + skeleton lines. */
function ResumeSection({ title, lines }: { title: string; lines: number }) {
  return (
    <div className="space-y-1">
      <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/80">
        {title}
      </div>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn('h-1 rounded-full bg-foreground/10', LINE_WIDTH_CLASSES[i % 5])}
        />
      ))}
    </div>
  );
}

/**
 * Faux résumé page with a sweeping scan beam. Doubles as the dropzone while
 * idle. `name` personalizes the header once a file is chosen.
 */
export function ResumePaper({
  scanning,
  interactive,
  name,
  onPick,
  onFile,
  error,
}: {
  scanning: boolean;
  interactive: boolean;
  name: string;
  onPick: () => void;
  onFile: (f: File) => void;
  error: string;
}) {
  const reduce = useReducedMotion();
  const [drag, setDrag] = React.useState(false);

  return (
    <button
      type="button"
      onClick={interactive ? onPick : undefined}
      onDragOver={
        interactive
          ? (e) => {
              e.preventDefault();
              setDrag(true);
            }
          : undefined
      }
      onDragLeave={interactive ? () => setDrag(false) : undefined}
      onDrop={
        interactive
          ? (e) => {
              e.preventDefault();
              setDrag(false);
              if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]);
            }
          : undefined
      }
      className={cn(
        'group relative block w-full overflow-hidden rounded-xl border bg-card/80 p-4 text-left shadow-elev-2 transition-colors sm:p-5',
        interactive ? 'cursor-pointer border-dashed' : 'cursor-default border-solid',
        drag ? 'border-primary bg-accent-subtle' : 'border-border/70 hover:border-primary/50',
      )}
      aria-label={interactive ? 'Upload your résumé' : 'Résumé preview'}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-subtle text-primary">
          <FileText className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold text-foreground">{name || 'Your résumé'}</div>
          <div className="text-[11px] text-muted-foreground">
            {name ? 'Software Engineer' : 'PDF · DOCX · instant preview'}
          </div>
        </div>
      </div>

      {/* Body — faux sections (compact) */}
      <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-x-5 gap-y-2.5">
        <div className="col-span-2">
          <ResumeSection title="Profile" lines={1} />
        </div>
        <ResumeSection title="Experience" lines={3} />
        <ResumeSection title="Skills" lines={3} />
      </div>

      {/* Scan beam */}
      {scanning && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-4 z-10 h-[2px] rounded-full [background:linear-gradient(90deg,transparent,color-mix(in_oklab,var(--primary)_92%,white)_50%,transparent)] [box-shadow:0_0_16px_3px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
            initial={{ top: '8%', opacity: 0 }}
            animate={
              reduce ? { top: '50%', opacity: 0.5 } : { top: ['8%', '90%'], opacity: [0, 1, 1, 0] }
            }
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 2.4, ease: 'easeInOut', repeat: Infinity, times: [0, 0.12, 0.88, 1] }
            }
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 z-0 h-16 -translate-y-1/2 [background:linear-gradient(180deg,transparent,color-mix(in_oklab,var(--primary)_14%,transparent),transparent)]"
            initial={{ top: '8%', opacity: 0 }}
            animate={reduce ? { opacity: 0 } : { top: ['8%', '90%'], opacity: [0, 1, 1, 0] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 2.4, ease: 'easeInOut', repeat: Infinity, times: [0, 0.12, 0.88, 1] }
            }
          />
        </>
      )}

      {/* Idle dropzone hint */}
      {interactive && (
        <div className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-dashed border-border/70 bg-background/40 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-foreground">
          <UploadCloud className="h-4 w-4 text-primary" />
          Drop your résumé here, or <span className="text-primary">browse</span>
        </div>
      )}
      {error && <p className="mt-2 text-center text-xs text-destructive">{error}</p>}
    </button>
  );
}
