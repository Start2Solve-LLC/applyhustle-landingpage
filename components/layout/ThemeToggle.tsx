'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

/* Must match the storage key read by the no-flash init script in app/layout.tsx. */
export const THEME_STORAGE_KEY = 'applyhustle-landing-theme';

/** Light/dark switch — toggles the `.dark` class on <html> and persists the choice. */
export function ThemeToggle() {
  // null until mounted: the server can't know the active theme, so render a neutral placeholder
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !(isDarkMode ?? false);
    document.documentElement.classList.toggle('dark', nextIsDark);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? 'dark' : 'light');
    } catch {
      // localStorage unavailable (private mode) — theme still toggles for this visit
    }
    setIsDarkMode(nextIsDark);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {isDarkMode === null ? (
        <span aria-hidden className="h-[18px] w-[18px]" />
      ) : isDarkMode ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
