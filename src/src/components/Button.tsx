import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const base =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition-colors duration-200';

const variants = {
  primary: 'bg-ink text-obsidian hover:bg-sand',
  ghost: 'border border-line text-ink hover:border-sand/50 hover:text-sand',
};

type Common = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
};

type ButtonAsLink = Common & { href: string };
type ButtonAsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  if ('href' in props && props.href) {
    const { href, children, className, variant = 'primary' } = props;
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {children}
      </Link>
    );
  }

  const { children, className, variant = 'primary', ...rest } = props;
  return (
    <button type="button" {...rest} className={cn(base, variants[variant], className)}>
      {children}
    </button>
  );
}
