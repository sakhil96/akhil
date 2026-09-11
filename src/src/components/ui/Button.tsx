import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  primary:
    'bg-fog text-obsidian shadow-[0_0_40px_rgba(139,124,255,0.22)] hover:-translate-y-0.5',
  ghost:
    'border border-white/12 bg-white/5 text-fog hover:border-iris/50 hover:bg-white/8',
};

type Variant = keyof typeof variants;

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200';

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function Button({
  href,
  children,
  variant = 'primary',
  className,
  type = 'button',
  onClick,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  disabled?: boolean;
}) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export type { LinkButtonProps };
