import { cn } from '@/lib/utils';

type BadgeProps = {
  label: string;
  tone?: 'accent' | 'muted' | 'success' | 'warning';
  className?: string;
};

export function Badge({ label, tone = 'muted', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-[11px] tracking-wide text-mute',
        tone === 'accent' && 'border-sand/30 text-sand',
        tone === 'muted' && 'border-line',
        tone === 'success' && 'border-haze/40 text-haze',
        tone === 'warning' && 'border-clay/40 text-clay',
        className,
      )}
    >
      {label}
    </span>
  );
}
