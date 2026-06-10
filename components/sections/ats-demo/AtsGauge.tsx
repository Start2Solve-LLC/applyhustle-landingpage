'use client';

/* Big ATS gauge — glowing progress ring + liquid fill that rises with the
   score. `value` is 0–100; the parent animates it (sweep in demo, count-up
   while analyzing). Port of the app's InteractiveAtsDemo gauge. */

/* Liquid-fill wave geometry (viewBox 0 0 200 200, one period = 60u) */
function buildWave(amp: number, startUp: boolean): string {
  const width = 320,
    half = 30,
    depth = 210;
  let d = 'M 0 0';
  let up = startUp;
  for (let x = 0; x < width; x += half) {
    d += ` q ${half / 2} ${up ? -amp : amp} ${half} 0`;
    up = !up;
  }
  return `${d} L ${width} ${depth} L 0 ${depth} Z`;
}
const WAVE_FRONT = buildWave(7, true);
const WAVE_BACK = buildWave(5, false);

export function AtsGauge({ value, size = 244 }: { value: number; size?: number }) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  const offset = circ - (v / 100) * circ;
  // Water surface in the 0–200 viewBox: 192 (empty) → 8 (full).
  const surfaceY = 192 - (v / 100) * 184;

  return (
    <div className="relative grid place-items-center">
      {/* Liquid fill, clipped to the inner disc */}
      <svg viewBox="0 0 200 200" width={size - 38} height={size - 38} className="absolute" aria-hidden>
        <defs>
          <clipPath id="atsWaveClip">
            <circle cx="100" cy="100" r="92" />
          </clipPath>
          <linearGradient id="atsWaveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--primary) 90%, white)" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
        </defs>
        <g clipPath="url(#atsWaveClip)">
          <circle cx="100" cy="100" r="92" fill="color-mix(in oklab, var(--primary) 7%, transparent)" />
          {/* back wave */}
          <g transform={`translate(0 ${surfaceY})`}>
            <g className="ats-wave--slow">
              <path d={WAVE_BACK} fill="url(#atsWaveFill)" opacity={0.4} />
            </g>
          </g>
          {/* front wave */}
          <g transform={`translate(0 ${surfaceY})`}>
            <g className="ats-wave">
              <path d={WAVE_FRONT} fill="url(#atsWaveFill)" opacity={0.82} />
            </g>
          </g>
        </g>
      </svg>

      {/* Outer neon halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-70 blur-[22px] [background:radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--primary)_30%,transparent),transparent_68%)]"
      />

      {/* Progress ring */}
      <svg
        width={size}
        height={size}
        className="-rotate-90 [filter:drop-shadow(0_0_10px_color-mix(in_oklab,var(--primary)_45%,transparent))]"
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
        />
      </svg>

      {/* Center readout */}
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-5xl font-extrabold tabular-nums tracking-tight text-foreground drop-shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_55%,transparent)]">
            {Math.round(v)}
            <span className="align-top text-2xl">%</span>
          </div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">ATS match</div>
        </div>
      </div>
    </div>
  );
}
