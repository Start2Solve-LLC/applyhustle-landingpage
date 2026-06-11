'use client';

// App Router global error boundary — catches errors in the root layout that
// normal error.tsx boundaries can't, and reports them to Sentry (client-side).
import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        {/* Minimal fallback UI — global-error replaces the entire document. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
