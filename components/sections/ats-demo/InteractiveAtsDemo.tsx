'use client';

import {
  ArrowRight,
  FileText,
  Lock,
  ScanLine,
  TrendingUp,
  Briefcase,
  BadgeCheck,
  RotateCcw,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';
import { GlassCard } from '@/components/marketing/primitives';
import { Reveal } from '@/components/motion/Reveal';
import { Button, ButtonLink } from '@/components/ui/Button';
import { appUrl, cn } from '@/lib/utils';
import { AtsGauge } from './AtsGauge';
import { ResumePaper } from './ResumePaper';

type Phase = 'idle' | 'analyzing' | 'teaser';

const ALLOWED = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

/** Best-effort first/last name from the uploaded file name — purely client-side. */
function nameFromFile(filename: string): string {
  let base = filename.replace(/\.(pdf|docx|doc)$/i, '');
  base = base
    .replace(/[_\-.]+/g, ' ')
    .replace(/\b(resume|cv|final|updated|copy|latest|new|\d+)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!base) return '';
  return base
    .split(' ')
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function randomResult() {
  const r = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));
  return {
    score: r(68, 96),
    metrics: [
      { key: 'keyword', label: 'Keyword match', value: r(62, 96), icon: TrendingUp },
      { key: 'experience', label: 'Work experience', value: r(70, 95), icon: Briefcase },
      { key: 'readability', label: 'ATS readability', value: r(72, 98), icon: FileText },
    ],
    skillsMatched: r(10, 14),
    skillsTotal: 15,
  };
}
type Result = ReturnType<typeof randomResult>;

/** A single metric row — bar fills to `value` with one smooth CSS transition. */
function MetricRow({
  icon: Icon,
  label,
  value,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  text?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-subtle text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-semibold tabular-nums text-foreground">{text ?? `${value}%`}</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${Math.min(100, value)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* Static "what you get" bullets for the left copy column. */
const HIGHLIGHTS = [
  { icon: TrendingUp, text: 'Keyword & skill gap detection' },
  { icon: ScanLine, text: 'Recruiter-grade ATS readability' },
  { icon: BadgeCheck, text: 'Exact fixes, ranked by impact' },
];

/* Loading status lines cycled during the 5s scan (one per ~830ms). */
const SCAN_STEPS = [
  'Uploading résumé…',
  'Parsing layout & sections…',
  'Extracting skills & experience…',
  'Matching 1,200+ ATS keywords…',
  'Scoring readability & format…',
  'Compiling your results…',
];
const SCAN_MS = 5000;

/* Compact, engaging loading panel — pulsing scanner, cycling mono status text,
   and a determinate progress bar that fills across the full 5s scan. */
function ScanningPanel({ step }: { step: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
      <div className="relative grid h-14 w-14 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/25" />
        <span className="absolute inset-0 rounded-full bg-primary/10" />
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-accent-subtle text-primary">
          <ScanLine className="h-6 w-6" />
        </span>
      </div>

      {/* Cycling status text — each line slides up as the next arrives */}
      <div className="flex h-5 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-sm font-medium text-foreground"
          >
            {SCAN_STEPS[step]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar fills once across the whole scan */}
      <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: '4%' }}
          animate={{ width: '100%' }}
          transition={{ duration: SCAN_MS / 1000, ease: 'easeInOut' }}
        />
      </div>

      <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
        <Loader2 className="h-3 w-3 animate-spin text-primary" />
        running ats engine
      </p>
    </div>
  );
}

export function InteractiveAtsDemo() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [phase, setPhase] = React.useState<Phase>('idle');
  const [error, setError] = React.useState('');
  const [name, setName] = React.useState('');
  const [result, setResult] = React.useState<Result>(randomResult);
  const [step, setStep] = React.useState(0);
  // Bumped on every upload so the scan timers reset even when re-uploading
  // while already analyzing (phase stays "analyzing", so it can't be the dep).
  const [scanId, setScanId] = React.useState(0);

  const handleFile = (f: File) => {
    // Validate by MIME, falling back to extension — some systems report an
    // empty/octet-stream type for valid .docx files.
    const okType = ALLOWED.includes(f.type);
    const okExt = /\.(pdf|docx?)$/i.test(f.name);
    if (!okType && !okExt) {
      setError('Please upload a PDF or DOCX file.');
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError('File too large. Maximum 5 MB.');
      return;
    }
    setError('');
    setName(nameFromFile(f.name));
    setResult(randomResult());
    setScanId((n) => n + 1);
    setPhase('analyzing');
  };

  // 5s scan: cycle the status lines, then reveal the gated result. No score
  // count-up — only the loader's progress bar animates while analyzing.
  React.useEffect(() => {
    if (phase !== 'analyzing') return;
    setStep(0);
    const perStep = SCAN_MS / SCAN_STEPS.length;
    let i = 0;
    const ticker = setInterval(() => {
      i += 1;
      if (i < SCAN_STEPS.length) setStep(i);
    }, perStep);
    const done = setTimeout(() => setPhase('teaser'), SCAN_MS);
    return () => {
      clearInterval(ticker);
      clearTimeout(done);
    };
  }, [phase, scanId]);

  const reset = () => {
    setPhase('idle');
    setName('');
    setError('');
    setResult(randomResult());
    if (inputRef.current) inputRef.current.value = '';
  };

  const gated = phase === 'teaser';
  const statusLabel =
    phase === 'analyzing' ? 'Scanning' : phase === 'teaser' ? 'Preview ready' : 'Ready';

  return (
    <section id="ats-demo" className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        {/* ── Left: techy copy column ── */}
        <Reveal from="up" distance={20}>
          <div className="text-center lg:text-left">
            {/* Terminal-style eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-card/60 px-2.5 py-1 font-mono text-[11px] font-medium tracking-tight text-muted-foreground backdrop-blur-sm">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-primary">›_</span>
              ats-scan&nbsp;<span className="text-foreground/70">--live</span>
            </div>

            <h2 className="mt-5 text-display-lg text-foreground">
              See your résumé through an <span className="text-gradient">ATS&apos;s eyes</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground lg:mx-0">
              Drop your résumé and watch it get parsed and scored in seconds. Sign up free to unlock
              your real score and the exact keywords you&apos;re missing.
            </p>

            <ul className="mx-auto mt-6 flex max-w-md flex-col gap-2.5 text-left">
              {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent-subtle text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start">
              <ButtonLink href={appUrl('/signup')} variant="glow" size="lg" className="group">
                Get my real score
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
              <Button variant="outline" size="lg" onClick={() => inputRef.current?.click()}>
                Upload résumé
              </Button>
            </div>
          </div>
        </Reveal>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {/* ── Right: live scanner card ── */}
        <Reveal from="up" distance={24} delay={0.1}>
          <GlassCard glow className="relative overflow-hidden p-4 sm:p-5">
            {/* Card header — mono filename + status chip */}
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2 font-mono text-[11px] text-muted-foreground">
                <ScanLine className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="truncate">
                  {name ? `${name.toLowerCase().replace(/\s+/g, '_')}.pdf` : 'resume_scan'}
                </span>
              </div>
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                  phase === 'teaser'
                    ? 'border-success/30 bg-success-subtle text-success'
                    : 'border-accent-subtle-border bg-accent-subtle text-primary',
                )}
              >
                <span className="relative inline-flex h-1.5 w-1.5">
                  {phase === 'analyzing' && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
                  )}
                  <span
                    className={cn(
                      'relative inline-flex h-1.5 w-1.5 rounded-full',
                      phase === 'teaser' ? 'bg-success' : 'bg-primary',
                    )}
                  />
                </span>
                {statusLabel}
              </span>
            </div>

            {/* Résumé dropzone / preview with scan beam (beam only while scanning) */}
            <ResumePaper
              scanning={phase === 'analyzing'}
              interactive={phase === 'idle'}
              name={name}
              onPick={() => inputRef.current?.click()}
              onFile={handleFile}
              error={error}
            />

            {/* Score panel (swaps to the loader during the scan) */}
            <div className="relative mt-3 flex min-h-[196px] items-center rounded-xl border border-border/60 bg-background/30 p-4">
              {phase === 'analyzing' ? (
                <div className="w-full" key={scanId}>
                  <ScanningPanel step={step} />
                </div>
              ) : (
                <div
                  className={cn(
                    'w-full transition-[filter] duration-500',
                    gated && 'pointer-events-none select-none blur-[7px]',
                  )}
                  aria-hidden={gated}
                >
                  <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
                    <AtsGauge value={result.score} />
                    <div className="w-full flex-1 space-y-3">
                      {result.metrics.map((m) => (
                        <MetricRow key={m.key} icon={m.icon} label={m.label} value={m.value} />
                      ))}
                      <MetricRow
                        icon={BadgeCheck}
                        label="Required skills"
                        value={Math.round((result.skillsMatched / result.skillsTotal) * 100)}
                        text={`${result.skillsMatched}/${result.skillsTotal} matched`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sign-up gate overlay */}
              <AnimatePresence>
                {gated && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-xl bg-background/50 px-6 text-center backdrop-blur-[2px]"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-elev-3">
                      <Lock className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {name ? `${name}, your score is ready` : 'Your score is ready'}
                    </p>
                    <p className="max-w-xs text-xs text-muted-foreground">
                      Sign up free to reveal your real ATS score and the keywords you&apos;re
                      missing.
                    </p>
                    <div className="mt-1 flex flex-col gap-2 sm:flex-row">
                      <ButtonLink
                        href={appUrl('/signup')}
                        variant="glow"
                        size="sm"
                        className="group"
                      >
                        View full analysis
                        <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                      </ButtonLink>
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center justify-center gap-1 rounded-lg px-3 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                      >
                        <RotateCcw className="h-3 w-3" /> Re-scan
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Idle helper line */}
            {phase === 'idle' && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" />
                Sample scores shown — drop your résumé to scan yours.
              </p>
            )}
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
