/* Mirrors frontend/src/components/marketing/sections/MetricsBand.tsx. */

import { ScanLine, UserCheck, Trophy, Briefcase } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Metric {
  to: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
}

export const metrics: Metric[] = [
  { to: 1100, suffix: '+', label: 'Résumés ATS-checked', icon: ScanLine },
  { to: 40, suffix: '+', label: 'Candidates shortlisted', icon: UserCheck },
  { to: 600, suffix: '+', label: 'Placements & offers in pipeline (2026)', icon: Trophy },
  { to: 2800, suffix: '+', label: 'US roles surfaced in-network', icon: Briefcase },
];
