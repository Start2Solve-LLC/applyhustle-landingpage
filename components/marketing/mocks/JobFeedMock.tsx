import { Briefcase, MapPin, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Curated job feed — sponsorship-aware (illustrative data, mirrors the app's mock). */
export function JobFeedMock({ className }: { className?: string }) {
  const jobs = [
    {
      company: 'Stripe',
      role: 'Software Engineer',
      loc: 'New York, NY',
      salary: '$150k–$190k',
      sponsors: true,
    },
    {
      company: 'Datadog',
      role: 'Frontend Engineer',
      loc: 'Remote (US)',
      salary: '$140k–$175k',
      sponsors: true,
    },
    {
      company: 'Ramp',
      role: 'Data Analyst',
      loc: 'San Francisco',
      salary: '$120k–$150k',
      sponsors: false,
    },
  ];
  return (
    <div className={cn('space-y-2 p-4', className)}>
      {jobs.map((j) => (
        <div
          key={j.company}
          className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary text-xs font-bold text-foreground">
            {j.company.slice(0, 2)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Briefcase className="h-3.5 w-3.5 text-muted-foreground" /> {j.role}
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span>{j.company}</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {j.loc}
              </span>
              <span className="hidden sm:inline">{j.salary}</span>
            </div>
          </div>
          {j.sponsors && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success-subtle px-2 py-0.5 text-[10px] font-semibold text-success">
              <BadgeCheck className="h-3 w-3" /> Sponsors visa
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
