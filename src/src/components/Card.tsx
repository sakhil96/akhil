import type { ReactNode } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { cn } from '@/lib/utils';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return <GlassCard className={cn('transition-colors duration-300 hover:border-sand/25', className)}>{children}</GlassCard>;
}
