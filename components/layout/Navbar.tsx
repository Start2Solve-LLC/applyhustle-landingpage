'use client';

import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { navLinks, loginCta, getStartedCta } from '@/data/nav';
import { EASE_OUT } from '@/lib/motion';
import { appUrl, cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

/** Sticky marketing navbar — port of the app's Navbar (logged-out state). */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy — highlight the in-view section in the nav.
  useEffect(() => {
    const ids = navLinks.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-border/60 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-md"
          aria-label="ApplyHustle — back to top"
        >
          <Image
            src="/images/applyhustle-logo-latte.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl bg-background object-contain transition-transform group-hover:scale-105 dark:hidden"
          />
          <Image
            src="/images/applyhustle-logo-dark-latte.png"
            alt=""
            width={36}
            height={36}
            className="hidden h-9 w-9 rounded-xl bg-background object-contain transition-transform group-hover:scale-105 dark:block"
          />
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            Apply<span className="text-primary">Hustle</span>
          </span>
        </a>

        {/* Center links — desktop */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = link.href === `#${activeId}`;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-muted/60 text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <ButtonLink
            href={appUrl(loginCta.appPath)}
            variant="ghost"
            className="hidden sm:inline-flex"
          >
            {loginCta.label}
          </ButtonLink>
          <ButtonLink
            href={appUrl(getStartedCta.appPath)}
            variant="default"
            className="hidden sm:inline-flex"
          >
            {getStartedCta.label}
          </ButtonLink>
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 text-foreground transition-colors hover:bg-muted/60 lg:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: EASE_OUT }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <nav
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
              aria-label="Mobile"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-left text-base font-medium text-foreground transition-colors hover:bg-muted/60"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <ButtonLink href={appUrl(loginCta.appPath)} variant="outline">
                  {loginCta.label}
                </ButtonLink>
                <ButtonLink href={appUrl(getStartedCta.appPath)} variant="default">
                  {getStartedCta.label}
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
