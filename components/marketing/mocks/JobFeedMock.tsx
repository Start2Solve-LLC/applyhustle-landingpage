import { MapPin, BadgeCheck, Sparkles, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Curated job feed — sponsorship + match aware (illustrative data). */
export function JobFeedMock({ className }: { className?: string }) {
  const jobs = [
    {
      company: 'Stripe',
      role: 'Software Engineer',
      loc: 'New York, NY',
      salary: '$150k–$190k',
      match: 96,
      sponsors: true,
      tag: 'new' as const,
    },
    {
      company: 'Datadog',
      role: 'Frontend Engineer',
      loc: 'Remote (US)',
      salary: '$140k–$175k',
      match: 91,
      sponsors: true,
      tag: 'hot' as const,
    },
    {
      company: 'Ramp',
      role: 'Data Analyst',
      loc: 'San Francisco',
      salary: '$120k–$150k',
      match: 84,
      sponsors: false,
      tag: null,
    },
  ];

  return (
    <div className={cn('flex h-full flex-col gap-1.5 p-3', className)}>
      {/* Active filters */}
      <div className="mb-0.5 flex items-center gap-1 text-[9px]">
        {['Remote', 'Visa', '$150k+'].map((f) => (
          <span
            key={f}
            className="rounded-full border border-border/60 bg-background/40 px-1.5 py-0.5 font-medium text-muted-foreground"
          >
            {f}
          </span>
        ))}
      </div>

      {jobs.map((j) => (
        <div
          key={j.company}
          className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-background/40 p-2 transition-colors hover:border-accent-subtle-border"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-[10px] font-bold text-foreground">
            {j.company.slice(0, 2)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-[13px] font-semibold text-foreground">{j.role}</span>
              {j.tag === 'new' && (
                <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-accent-subtle px-1.5 text-[9px] font-semibold text-primary">
                  <Sparkles className="h-2.5 w-2.5" /> New
                </span>
              )}
              {j.tag === 'hot' && (
                <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-warning-subtle px-1.5 text-[9px] font-semibold text-warning">
                  <Flame className="h-2.5 w-2.5" /> Hot
                </span>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span>{j.company}</span>
              <span className="inline-flex items-center gap-0.5">
                <MapPin className="h-2.5 w-2.5" />
                {j.loc}
              </span>
              <span className="hidden lg:inline">· {j.salary}</span>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="rounded-full bg-success-subtle px-1.5 py-0.5 font-mono text-[10px] font-bold text-success">
              {j.match}%
            </span>
            {j.sponsors && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-info">
                <BadgeCheck className="h-2.5 w-2.5" /> Visa
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
