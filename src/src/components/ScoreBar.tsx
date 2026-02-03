'use client';

import { cn } from '@/lib/utils';

interface ScoreBarProps {
  score: number;
  maxScore?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
  gradient?: string;
}

const getScoreGradient = (score: number): string => {
  if (score >= 80) return 'from-accent-success via-accent-info to-accent-success';
  if (score >= 60) return 'from-accent-primary via-accent-secondary to-accent-primary';
  if (score >= 40) return 'from-accent-warning via-accent-gold to-accent-warning';
  return 'from-accent-danger via-accent-rose to-accent-danger';
};

export function ScoreBar({
  score,
  maxScore = 100,
  showValue = true,
  size = 'md',
  animated = true,
  className,
  gradient,
}: ScoreBarProps) {
  const percentage = Math.min((score / maxScore) * 100, 100);
  const barGradient = gradient || getScoreGradient(score);

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'flex-1 bg-surface-tertiary rounded-full overflow-hidden relative',
          heights[size]
        )}
      >
        {/* Glow effect underneath */}
        <div
          className={cn(
            'absolute inset-0 rounded-full bg-gradient-to-r blur-sm opacity-50',
            barGradient
          )}
          style={{ width: `${percentage}%` }}
        />
        {/* Main bar */}
        <div
          className={cn(
            'h-full rounded-full bg-gradient-to-r relative transition-all duration-700 ease-out',
            barGradient,
            animated && 'animate-grow-width'
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-text-primary min-w-[3ch] text-right tabular-nums">
          {Math.round(score)}
        </span>
      )}
    </div>
  );
}
