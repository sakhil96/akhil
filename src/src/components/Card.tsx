import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('card card-hover', className)}>{children}</div>
  );
}
