'use client';

import * as React from 'react';

interface LazyMountProps {
  children: React.ReactNode;
  /**
   * Reserved vertical space (px) shown before the section mounts, so the page
   * height stays stable and scrolling doesn't jump (avoids layout shift / CLS).
   */
  minHeight?: number;
  /**
   * How far outside the viewport to start loading. A generous margin means the
   * chunk has fetched and hydrated by the time the section actually scrolls in,
   * so the user never sees a placeholder.
   */
  rootMargin?: string;
  className?: string;
}

/**
 * Defers mounting (and therefore the dynamic-import chunk fetch + hydration) of
 * its children until they are about to enter the viewport. Pair with
 * `next/dynamic` so each below-the-fold section ships as its own JS chunk that
 * is downloaded on demand instead of in the initial bundle.
 */
export function LazyMount({
  children,
  minHeight = 480,
  rootMargin = '600px 0px',
  className,
}: LazyMountProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (old browser / SSR edge) → render immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className={className} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
