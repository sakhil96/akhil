'use client';

import { ConsoleProvider } from '@/components/ConsoleProvider';
import { InferenceConsole } from '@/components/InferenceConsole';
import type { ReactNode } from 'react';

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <ConsoleProvider>
      {children}
      <InferenceConsole variant="dock" />
    </ConsoleProvider>
  );
}
