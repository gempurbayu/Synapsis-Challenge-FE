'use client';

import queryClientConfig from '@/config/query-client.config';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
interface ProviderProps {
  children: ReactNode;
}
export default function Provider({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClientConfig}>
      {children}
    </QueryClientProvider>
  );
}
