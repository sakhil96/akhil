import { cn } from '@/lib/utils';

type BadgeProps = {
  label: string;
  tone?: 'accent' | 'muted' | 'success' | 'warning';
  className?: string;
};

const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
  accent: 'border-iris/40 bg-iris/10 text-iris',
  muted: 'border-white/10 bg-white/5 text-mist',
  success: 'border-aqua/40 bg-aqua/10 text-aqua',
  warning: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
};

export function Badge({ label, tone = 'accent', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide',
        tones[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
