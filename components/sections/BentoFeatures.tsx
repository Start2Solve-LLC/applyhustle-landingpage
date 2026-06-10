'use client';

import {
  AutoApplyStream,
  InterviewReportCard,
  JobFeedMock,
  ResumeRedesignMock,
  LinkedInGapMock,
  CoverLetterMock,
  TrackerBoardMock,
} from '@/components/marketing/mocks';
import { GlassCard, SectionHeading } from '@/components/marketing/primitives';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Badge } from '@/components/ui/Badge';
import { bentoSection, type BentoMockId } from '@/data/features';
import { cn } from '@/lib/utils';
import type { ComponentType, ReactNode } from 'react';

interface BentoFeaturesProps {
  isUS?: boolean;
}

/** Single bento cell: icon+label header, optional badge, mock-filled body. */
function BentoTile({
  icon: Icon,
  label,
  badge,
  span,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  badge?: ReactNode;
  span?: string;
  children: ReactNode;
}) {
  return (
    <StaggerItem className={cn('min-h-[210px]', span)}>
      <GlassCard hover className="flex h-full flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-2 border-b border-border/60 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent-subtle text-primary">
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-foreground">{label}</span>
          </div>
          {badge}
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </GlassCard>
    </StaggerItem>
  );
}

/** Maps a tile's mockId to its product mock (Auto-Apply needs the region flag). */
function tileMock(mockId: BentoMockId, isUS: boolean): ReactNode {
  switch (mockId) {
    case 'auto-apply':
      return <AutoApplyStream guided={!isUS} />;
    case 'interview':
      return <InterviewReportCard />;
    case 'jobs':
      return <JobFeedMock />;
    case 'resume':
      return <ResumeRedesignMock />;
    case 'linkedin':
      return <LinkedInGapMock />;
    case 'cover-letter':
      return <CoverLetterMock />;
    case 'tracker':
      return <TrackerBoardMock />;
  }
}

export function BentoFeatures({ isUS = true }: BentoFeaturesProps) {
  const { eyebrow, title, subtitle, tiles } = bentoSection;

  return (
    <section id="features" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={
              <>
                {title.pre}
                <span className="text-gradient">{title.accent}</span>
              </>
            }
            sub={subtitle}
          />
        </Reveal>

        <Stagger
          gap={0.06}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:auto-rows-[210px] lg:grid-cols-6"
        >
          {tiles.map((tile) => {
            const badgeLabel = isUS ? tile.badgeUS : tile.badgeIntl;
            return (
              <BentoTile
                key={tile.mockId}
                icon={tile.icon}
                label={isUS ? tile.labelUS : tile.labelIntl}
                badge={
                  badgeLabel ? (
                    <Badge variant={isUS ? 'glow' : 'info'}>{badgeLabel}</Badge>
                  ) : undefined
                }
                span={tile.span}
              >
                {tileMock(tile.mockId, isUS)}
              </BentoTile>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
