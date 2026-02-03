import { cn } from '@/lib/utils';

type BadgeProps = {
  label: string;
  tone?: 'accent' | 'muted' | 'success' | 'warning';
  className?: string;
};

const toneStyles: Record<NonNullable<BadgeProps['tone']>, string> = {
  accent: 'badge--accent',
  muted: 'badge--muted',
  success: 'badge--success',
  warning: 'badge--warning',
};

export function Badge({ label, tone = 'accent', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        toneStyles[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
