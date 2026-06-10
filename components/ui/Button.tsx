import { cn } from '@/lib/utils';
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

/* Variant recipes ported from frontend/src/components/ui/button.tsx
   (cva replaced with plain Record maps — no extra dependencies). */

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'glow';
type ButtonSize = 'default' | 'sm' | 'lg' | 'xl' | 'icon';

const baseClasses = [
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg',
  'text-sm font-semibold leading-none select-none cursor-pointer',
  'transition-[transform,background-color,box-shadow,color,border-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]',
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
  '[&_svg]:size-4 [&_svg]:shrink-0',
].join(' ');

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-primary text-primary-foreground shadow-elev-1 hover:bg-[color-mix(in_oklab,var(--primary)_92%,white)] dark:hover:bg-[color-mix(in_oklab,var(--primary)_88%,white)]',
  outline:
    'border border-border bg-transparent text-foreground hover:bg-muted/60 hover:border-hairline-strong',
  ghost: 'text-foreground/80 hover:text-foreground hover:bg-muted/60',
  glow: 'bg-primary text-primary-foreground shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_35%,transparent),0_4px_16px_-8px_color-mix(in_oklab,var(--primary)_45%,transparent)] hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_45%,transparent),0_6px_20px_-8px_color-mix(in_oklab,var(--primary)_55%,transparent)] hover:-translate-y-px',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-10 px-5 py-2',
  sm: 'h-8 px-3 text-xs',
  lg: 'h-12 px-7 text-base',
  xl: 'h-14 px-8 text-base',
  icon: 'h-10 w-10',
};

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

/** Native button for interactive components. */
export function Button({
  variant = 'default',
  size = 'default',
  className,
  children,
  ...buttonAttributes
}: ButtonStyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...buttonAttributes}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
    </button>
  );
}

/** Anchor styled as a button — used for CTAs that link into the main app. */
export function ButtonLink({
  href,
  variant = 'default',
  size = 'default',
  className,
  children,
  ...anchorAttributes
}: ButtonStyleProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      {...anchorAttributes}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
    </a>
  );
}
