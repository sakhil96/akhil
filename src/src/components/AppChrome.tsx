'use client';

import { ConsoleProvider } from '@/components/ConsoleProvider';
import { CommandPalette } from '@/components/command/CommandPalette';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import type { ReactNode } from 'react';

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <ConsoleProvider>
      <CommandPalette />
      <SiteHeader />
      {children}
      <SiteFooter />
    </ConsoleProvider>
  );
}
