'use client';

/* Clean ATS gauge — glowing progress ring + center readout. The ring settles
   to `value` (0–100) with a single smooth CSS transition (no count-up sweep),
   so it stays calm and "techy" rather than busy. */

export function AtsGauge({ value, size = 150 }: { value: number; size?: number }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  const offset = circ - (v / 100) * circ;

  return (
    <div
      className="relative grid aspect-square w-full shrink-0 place-items-center"
      style={{ maxWidth: size }}
    >
      {/* Soft neon halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-70 blur-[20px] [background:radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_68%)]"
      />

      {/* Progress ring */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full -rotate-90 [filter:drop-shadow(0_0_8px_color-mix(in_oklab,var(--primary)_40%,transparent))]"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          stroke="color-mix(in oklab, var(--foreground) 10%, transparent)"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          stroke="var(--primary)"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>

      {/* Center readout */}
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-4xl font-extrabold tabular-nums tracking-tight text-foreground drop-shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_55%,transparent)]">
            {Math.round(v)}
            <span className="align-top text-lg">%</span>
          </div>
          <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            ATS match
          </div>
        </div>
      </div>
    </div>
  );
}
