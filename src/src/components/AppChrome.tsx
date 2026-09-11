'use client';

import { CommandPalette } from '@/components/CommandPalette';
import { ConsoleProvider } from '@/components/ConsoleProvider';
import type { ReactNode } from 'react';

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <ConsoleProvider>
      {children}
      <CommandPalette />
    </ConsoleProvider>
  );
}
