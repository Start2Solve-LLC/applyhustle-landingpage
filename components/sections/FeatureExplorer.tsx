'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { EASE_OUT } from '@/lib/motion';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading, BrowserChrome } from '@/components/marketing/primitives';
import {
  AtsScoreCard, ResumeRedesignMock, JobFeedMock,
  InterviewReportCard, LinkedInGapMock, AutoApplyStream,
} from '@/components/marketing/mocks';
import { explorerSection, type ExplorerTabId } from '@/data/featureExplorer';

/** Maps a tab id to its product mock. */
function tabMock(id: ExplorerTabId): React.ReactNode {
  switch (id) {
    case 'ats': return <AtsScoreCard />;
    case 'resume': return <ResumeRedesignMock />;
    case 'jobs': return <JobFeedMock />;
    case 'interview': return <InterviewReportCard />;
    case 'linkedin': return <LinkedInGapMock />;
    case 'auto': return <AutoApplyStream />;
  }
}

export function FeatureExplorer() {
  const reduce = useReducedMotion();
  const { eyebrow, title, tabs } = explorerSection;
  const [active, setActive] = React.useState<ExplorerTabId>('ats');
  const touched = React.useRef(false);

  // Auto-advance the tour until the user picks a tab themselves.
  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (touched.current) return;
      setActive((cur) => {
        const i = tabs.findIndex((t) => t.id === cur);
        return tabs[(i + 1) % tabs.length].id;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [reduce, tabs]);

  const select = (id: ExplorerTabId) => {
    touched.current = true;
    setActive(id);
  };

  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section id="explore" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={<>{title.pre}<span className="text-gradient">{title.accent}</span>{title.post}</>}
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Tab list — horizontal scroll on mobile, vertical on desktop */}
          <Reveal from="left" distance={20}>
            <div
              role="tablist"
              aria-label="Feature explorer"
              className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0"
            >
              {tabs.map((tab) => {
                const isActive = tab.id === active;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => select(tab.id)}
                    className={cn(
                      'group relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors lg:w-full',
                      isActive
                        ? 'border-accent-subtle-border bg-accent-subtle text-primary'
                        : 'border-transparent text-muted-foreground hover:bg-muted/60',
                    )}
                  >
                    <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground')} />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{tab.label}</span>
                      <span className="hidden truncate text-xs text-muted-foreground lg:block">{tab.blurb}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Active mock inside browser chrome */}
          <Reveal from="up" distance={24} delay={0.05}>
            <BrowserChrome url={activeTab.url}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }}
                  transition={{ duration: reduce ? 0 : 0.3, ease: EASE_OUT }}
                >
                  {tabMock(activeTab.id)}
                </motion.div>
              </AnimatePresence>
            </BrowserChrome>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
