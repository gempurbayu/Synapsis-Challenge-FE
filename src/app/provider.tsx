'use client';

import queryClientConfig from '@/config/query-client.config';
import { SessionProvider } from '@/context/session-provider.context';
import { ThemeProvider } from '@/context/theme-provider.context';
import RootStyleRegistry from '@/utils/root-style-registry.utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
interface ProviderProps {
  children: ReactNode;
}
export default function Provider({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClientConfig}>
      <RootStyleRegistry>
        <SessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </RootStyleRegistry>
    </QueryClientProvider>
  );
}
