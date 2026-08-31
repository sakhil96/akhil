'use client';

import { ConsoleProvider } from '@/components/ConsoleProvider';
import { InferenceConsole } from '@/components/InferenceConsole';
import { Navbar } from '@/components/Navbar';
import { StatusTicker } from '@/components/StatusTicker';
import type { ReactNode } from 'react';

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <ConsoleProvider>
      <Navbar />
      <StatusTicker />
      {children}
      <InferenceConsole variant="dock" />
    </ConsoleProvider>
  );
}
