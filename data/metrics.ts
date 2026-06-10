/* Mirrors frontend/src/components/marketing/sections/MetricsBand.tsx. */

export interface Metric {
  to: number;
  suffix: string;
  label: string;
}

export const metrics: Metric[] = [
  { to: 1100, suffix: '+', label: 'Résumés ATS-checked' },
  { to: 40, suffix: '+', label: 'Candidates shortlisted' },
  { to: 600, suffix: '+', label: 'Placements & offers in pipeline (2026)' },
  { to: 2800, suffix: '+', label: 'US roles surfaced in-network' },
];
