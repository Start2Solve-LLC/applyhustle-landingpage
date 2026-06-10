'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Floating "back to top" button — appears once the user scrolls down a screenful. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
      className={cn(
        'fixed bottom-24 right-6 z-50 grid h-11 w-11 place-items-center rounded-full border border-border/60',
        'bg-card/90 text-foreground shadow-elev-3 backdrop-blur-xl transition-all duration-300 hover:bg-muted/70',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
