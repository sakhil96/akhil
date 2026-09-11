import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass relative overflow-hidden rounded-3xl p-6 md:p-7',
        hover &&
          'transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/16 hover:shadow-[0_30px_80px_-40px_rgba(139,124,255,0.45)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
