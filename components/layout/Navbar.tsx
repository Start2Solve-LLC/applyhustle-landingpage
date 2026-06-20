'use client';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { RegionToggle } from '@/components/marketing/primitives';
import { ButtonLink } from '@/components/ui/Button';
import { navLinks, loginCta, getStartedCta } from '@/data/nav';
import { EASE_OUT } from '@/lib/motion';
import { appUrl, cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  isUS: boolean;
  onRegionChange: (isUS: boolean) => void;
}

/** Brand lockup — logo image + wordmark (shared by the bar and the drawer).
   `collapsible` hides the wordmark on the smallest screens to free space. */
function Brand({ collapsible = false }: { collapsible?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <Image
        src="/images/applyhustle-logo-latte.png"
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 rounded-lg bg-background object-contain dark:hidden"
      />
      <Image
        src="/images/applyhustle-logo-dark-latte.png"
        alt=""
        width={32}
        height={32}
        className="hidden h-8 w-8 rounded-lg bg-background object-contain dark:block"
      />
      <span
        className={cn(
          'font-nav text-lg font-extrabold tracking-tight text-foreground',
          collapsible && 'hidden min-[420px]:inline',
        )}
      >
        Apply<span className="text-primary">Hustle</span>
      </span>
    </span>
  );
}

/** Primer-style navbar — logo + hamburger on the left, auth on the right, full
    drawer with the nav links + CTAs on open. */
export function Navbar({ isUS, onRegionChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the drawer is open: lock body scroll, trap focus inside it, close on
  // Escape, and restore focus to the trigger when it closes.
  useEffect(() => {
    if (!menuOpen) return;
    const trigger = triggerRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      ).filter((el) => el.offsetParent !== null);

    // Move focus into the panel (the close button is first).
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full font-nav transition-colors duration-300',
          scrolled ? 'bg-background/70 backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Left: bordered logo + hamburger box */}
          <div className="flex items-center overflow-hidden rounded-xl border border-border/70 bg-card/60 backdrop-blur-sm">
            <a
              href="#top"
              className="flex items-center gap-2 px-3 py-1.5 transition-colors hover:bg-muted/50"
              aria-label="ApplyHustle — back to top"
            >
              <Brand collapsible />
            </a>
            <span className="h-6 w-px bg-border/70" aria-hidden />
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-10 w-11 place-items-center text-foreground transition-colors hover:bg-muted/50"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Right: auth only (links live in the drawer) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <ButtonLink
              href={appUrl(loginCta.appPath)}
              variant="ghost"
              size="sm"
              className="sm:h-10 sm:px-5"
            >
              {loginCta.label}
            </ButtonLink>
            <ButtonLink
              href={appUrl(getStartedCta.appPath)}
              variant="default"
              size="sm"
              className="rounded-full sm:h-10 sm:px-5"
            >
              {getStartedCta.label}
            </ButtonLink>
          </div>
        </div>
      </header>

      {/* Drawer — rendered OUTSIDE <header> so the scrolled header's
          backdrop-filter doesn't become the containing block for these
          fixed elements (which would clip the panel). */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-md"
              aria-hidden
            />

            {/* Panel */}
            <motion.aside
              key="panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              initial={reduce ? { opacity: 0 } : { x: '-100%' }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: '-100%' }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="fixed inset-y-0 left-0 z-[70] flex h-full w-full flex-col border-r border-border/70 bg-card shadow-elev-4 sm:w-[420px]"
              aria-label="Menu"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
                <Brand />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-muted/60"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-5" aria-label="Primary">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between gap-4 border-b border-border/60 py-5 text-left text-xl font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </a>
                ))}
              </nav>

              {/* Preferences */}
              <div className="flex items-center justify-between gap-3 border-t border-border/70 px-5 py-4">
                <RegionToggle isUS={isUS} onChange={onRegionChange} pillId="region-pill-drawer" />
                <ThemeToggle />
              </div>

              {/* CTAs */}
              <div className="space-y-3 px-5 pb-6">
                <ButtonLink
                  href={appUrl(getStartedCta.appPath)}
                  variant="default"
                  size="lg"
                  className="w-full rounded-full"
                >
                  {getStartedCta.label}
                </ButtonLink>
                <ButtonLink
                  href={appUrl(loginCta.appPath)}
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full"
                >
                  {loginCta.label}
                </ButtonLink>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
