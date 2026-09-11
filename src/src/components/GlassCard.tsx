import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return <div className={cn('glass rounded-3xl p-6 md:p-8', className)}>{children}</div>;
}
