'use client';

import { MousePointer2 } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import * as React from 'react';

/**
 * Custom pointer: a small dot tracks the cursor exactly while a larger ring
 * lazily trails behind with eased smoothing (lerp). The ring grows over
 * interactive elements and contracts on click. Activates only on fine-pointer
 * (mouse) devices and bows out under reduced-motion (native cursor stays).
 */
const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';

/** How much the ring closes the gap to the pointer each frame (lower = lazier). */
const RING_EASE = 0.16;

export function CustomCursor() {
  const reduce = useReducedMotion();
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (reduce) return;
    // Mouse-only: skip touch / coarse pointers entirely.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let shown = false;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const render = () => {
      // Dot is exact; ring eases toward the pointer for the "lazy" trail.
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      ringX = lerp(ringX, mouseX, RING_EASE);
      ringY = lerp(ringY, mouseY, RING_EASE);
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!shown) {
        shown = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      const interactive = (e.target as Element)?.closest?.(INTERACTIVE);
      ring.classList.toggle('is-hover', Boolean(interactive));
    };

    const onLeave = () => {
      shown = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onDown = () => ring.classList.add('is-press');
    const onUp = () => ring.classList.remove('is-press');

    document.documentElement.classList.add('has-custom-cursor');
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [reduce]);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden>
        <span className="cursor-ring__circle" />
      </div>
      <div ref={dotRef} className="cursor-arrow" aria-hidden>
        <MousePointer2 className="cursor-arrow__icon" strokeWidth={1.5} />
      </div>
    </>
  );
}
