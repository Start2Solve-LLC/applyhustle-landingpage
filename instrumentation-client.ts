// Sentry — BROWSER runtime init (Next.js App Router, loaded automatically).
//
// This is the only Sentry runtime that executes on a static export (GitHub
// Pages has no Node/Edge server). It is a no-op unless NEXT_PUBLIC_SENTRY_DSN
// is set, and only sends events in production builds.
import * as Sentry from '@sentry/nextjs';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENV ?? process.env.NODE_ENV,

    // Performance tracing — sample modestly on a marketing page to control quota.
    tracesSampleRate: 0.1,

    // Session Replay is opt-in (it adds ~40KB to the client bundle, which works
    // against this site's page-speed goals). Enable with NEXT_PUBLIC_SENTRY_REPLAY=true.
    // When off, the dead branch lets the bundler tree-shake the replay code out.
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    integrations:
      process.env.NEXT_PUBLIC_SENTRY_REPLAY === 'true'
        ? [Sentry.replayIntegration({ maskAllText: true, blockAllMedia: true })]
        : [],

    // Don't ship dev errors to Sentry.
    enabled: process.env.NODE_ENV === 'production',
  });
}

// Instruments App Router client-side navigations so route changes are traced.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
