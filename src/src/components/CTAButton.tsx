import { Button } from '@/components/Button';

type CTAButtonProps = {
  href: string;
  label: string;
  variant?: 'primary' | 'ghost';
  className?: string;
};

export function CTAButton({ href, label, variant = 'primary', className }: CTAButtonProps) {
  return (
    <Button href={href} variant={variant} className={className}>
      {label}
    </Button>
  );
}
