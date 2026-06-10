import Image from 'next/image';
import { footerLinkColumns, footerTagline, footerBylineNote } from '@/data/nav';
import { ThemeToggle } from './ThemeToggle';

/** Site footer — port of the app's MarketingFooter (links resolve to the app via appUrl). */
export function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <a
              href="#top"
              className="flex items-center gap-2.5 rounded-md"
              aria-label="ApplyHustle — back to top"
            >
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
              <span className="font-extrabold tracking-tight text-foreground">
                Apply<span className="text-primary">Hustle</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {footerTagline}
            </p>
            <p className="mt-4 text-xs text-muted-foreground/70">{footerBylineNote}</p>
          </div>

          {footerLinkColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-overline text-muted-foreground/70">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {currentYear} ApplyHustle. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground/70">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
