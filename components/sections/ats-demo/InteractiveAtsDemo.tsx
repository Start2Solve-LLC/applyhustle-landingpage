'use client';

import {
  ArrowRight,
  FileText,
  Loader2,
  Lock,
  CheckCircle2,
  ScanLine,
  TrendingUp,
  Briefcase,
  BadgeCheck,
  RotateCcw,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { SectionHeading, GlassCard } from '@/components/marketing/primitives';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { appUrl, cn } from '@/lib/utils';
import { AtsGauge } from './AtsGauge';
import { ResumePaper } from './ResumePaper';

type Phase = 'idle' | 'analyzing' | 'teaser';

const ALLOWED = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const STEPS = [
  'Reading your résumé…',
  'Extracting name & contact…',
  'Scanning keywords…',
  'Scoring against the ATS…',
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
  const skillsTotal = 15;
  return {
    score: r(68, 96),
    metrics: [
      { key: 'keyword', label: 'Keyword match', value: r(62, 96), icon: TrendingUp },
      { key: 'experience', label: 'Work experience', value: r(70, 95), icon: Briefcase },
      { key: 'readability', label: 'ATS readability', value: r(72, 98), icon: FileText },
    ],
    skillsMatched: r(10, 14),
    skillsTotal,
  };
}
type Result = ReturnType<typeof randomResult>;

/* A single metric row under the gauge (bar fills with `prog`). Width is
   computed at runtime, so the bar uses a dynamic inline width — the one
   place a utility class can't express the value. */
function MetricRow({
  icon: Icon,
  label,
  value,
  prog,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  prog: number;
  text?: string;
}) {
  const shown = text ?? `${Math.round(value * prog)}%`;
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-subtle text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-semibold tabular-nums text-foreground">{shown}</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
            style={{ width: `${Math.min(100, value * prog)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function InteractiveAtsDemo() {
  const reduce = useReducedMotion();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [phase, setPhase] = React.useState<Phase>('idle');
  const [error, setError] = React.useState('');
  const [name, setName] = React.useState('');
  const [stepIdx, setStepIdx] = React.useState(0);
  const [result, setResult] = React.useState<Result>(randomResult);
  const [gauge, setGauge] = React.useState(0); // 0–100 driving ring + fill

  const handleFile = (f: File) => {
    if (!ALLOWED.includes(f.type)) {
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
    setPhase('analyzing');
  };

  // Drive the gauge: idle → oscillate 0↔100 (attract); analyzing → count up to score.
  React.useEffect(() => {
    if (reduce) {
      setGauge(phase === 'idle' ? 64 : result.score);
      return;
    }
    let raf = 0;
    if (phase === 'idle') {
      const start = performance.now();
      const loop = (now: number) => {
        const t = ((now - start) / 3400) % 1; // 0..1 each cycle
        setGauge(((1 - Math.cos(t * 2 * Math.PI)) / 2) * 100); // 0→100→0
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else if (phase === 'analyzing') {
      const start = performance.now();
      const dur = 4600;
      const loop = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        setGauge((1 - Math.pow(1 - t, 3)) * result.score); // easeOutCubic to score
        if (t < 1) raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      setGauge(result.score);
    }
    return () => cancelAnimationFrame(raf);
  }, [phase, result.score, reduce]);

  // Run the ~5s "analysis", then reveal the gated teaser.
  React.useEffect(() => {
    if (phase !== 'analyzing') return;
    setStepIdx(0);
    let i = 0;
    const stepTimer = setInterval(() => {
      i += 1;
      if (i < STEPS.length) setStepIdx(i);
    }, 1200);
    const done = setTimeout(() => setPhase('teaser'), 5200);
    return () => {
      clearInterval(stepTimer);
      clearTimeout(done);
    };
  }, [phase]);

  const reset = () => {
    setPhase('idle');
    setName('');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  // Metric bars: sweep with the gauge in demo, fill to value while analyzing, full once done.
  const prog = Math.max(
    0,
    Math.min(
      1,
      phase === 'idle'
        ? gauge / 100
        : phase === 'analyzing'
          ? gauge / Math.max(1, result.score)
          : 1,
    ),
  );
  const gated = phase === 'teaser';

  return (
    <section id="ats-demo" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal from="up" distance={20}>
          <SectionHeading
            align="center"
            eyebrow="Free instant ATS preview"
            title={
              <>
                Watch an ATS read your résumé in <span className="text-gradient">real time</span>
              </>
            }
            sub="Drop your résumé and watch it get scanned and scored live. Sign up free to unlock your real ATS score, the exact keywords you're missing, and how to fix them."
          />
        </Reveal>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        <Reveal from="up" distance={24} delay={0.1}>
          <GlassCard glow className="relative mt-12 overflow-hidden p-5 sm:p-8">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              {/* ── Left: résumé + scan beam ── */}
              <div className="relative">
                <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <ScanLine className="h-3.5 w-3.5 text-primary" />
                  Résumé scan
                </div>
                <ResumePaper
                  scanning={phase === 'idle' || phase === 'analyzing'}
                  interactive={phase === 'idle'}
                  name={name}
                  onPick={() => inputRef.current?.click()}
                  onFile={handleFile}
                  error={error}
                />
                {/* Analyzing status ticker */}
                <AnimatePresence>
                  {phase === 'analyzing' && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground"
                    >
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                      {STEPS[stepIdx]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Right: ATS gauge + metric breakdown (gated when done) ── */}
              <div className="relative">
                <div className="mb-3 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground lg:justify-start">
                  <span className="relative inline-flex h-2 w-2">
                    {phase === 'analyzing' && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
                    )}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  {phase === 'analyzing'
                    ? 'Scoring…'
                    : phase === 'teaser'
                      ? 'Preview ready'
                      : 'Live ATS score'}
                </div>

                <div
                  className={cn(
                    'transition-[filter] duration-500',
                    gated && 'pointer-events-none select-none blur-[7px]',
                  )}
                  aria-hidden={gated}
                >
                  <div className="flex flex-col items-center gap-7 lg:flex-row lg:items-center lg:gap-8">
                    <AtsGauge value={gauge} />
                    <div className="w-full max-w-xs space-y-3.5">
                      {result.metrics.map((m) => (
                        <MetricRow
                          key={m.key}
                          icon={m.icon}
                          label={m.label}
                          value={m.value}
                          prog={prog}
                        />
                      ))}
                      <MetricRow
                        icon={BadgeCheck}
                        label="Required skills"
                        value={result.skillsMatched}
                        prog={prog}
                        text={`${Math.round(result.skillsMatched * prog)}/${result.skillsTotal} matched`}
                      />
                    </div>
                  </div>
                </div>

                {/* Sign-up gate overlay */}
                <AnimatePresence>
                  {gated && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-background/45 px-6 text-center backdrop-blur-[2px]"
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-elev-3">
                        <Lock className="h-5 w-5" />
                      </span>
                      <p className="text-base font-semibold text-foreground">
                        {name ? `${name}, your score is ready ✨` : 'Your score is ready ✨'}
                      </p>
                      <p className="max-w-xs text-sm text-muted-foreground">
                        Sign up free to reveal your real ATS score, the keywords you&apos;re
                        missing, and exactly how to fix them.
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
                        <ButtonLink href={appUrl('/signin')} variant="outline" size="sm">
                          Log in
                        </ButtonLink>
                      </div>
                      <button
                        type="button"
                        onClick={reset}
                        className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                      >
                        <RotateCcw className="h-3 w-3" /> Re-scan résumé
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Idle helper line */}
            {phase === 'idle' && (
              <div className="mt-7 flex flex-col items-center justify-center gap-3 border-t border-border/50 pt-6 sm:flex-row">
                <p className="text-sm text-muted-foreground">
                  This is a live demo — drop your résumé to scan yours.
                </p>
                <ButtonLink href={appUrl('/signup')} variant="glow" size="sm" className="group">
                  Create free account
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
              </div>
            )}
            {phase === 'teaser' && (
              <div className="mt-7 flex items-center justify-center gap-2 border-t border-border/50 pt-6 text-xs text-success">
                <CheckCircle2 className="h-4 w-4" /> Scan complete — sign up to see the full
                breakdown.
              </div>
            )}
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
