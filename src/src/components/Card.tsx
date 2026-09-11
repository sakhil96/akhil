import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return <GlassCard className={cn(className)}>{children}</GlassCard>;
}
