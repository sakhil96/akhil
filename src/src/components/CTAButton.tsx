import Link from 'next/link';
import { cn } from '@/lib/utils';

type CTAButtonProps = {
  href: string;
  label: string;
  variant?: 'primary' | 'ghost';
  className?: string;
};

export function CTAButton({ href, label, variant = 'primary', className }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'btn',
        variant === 'primary' ? 'btn--primary' : 'btn--ghost',
        className,
      )}
    >
      {label}
    </Link>
  );
}
