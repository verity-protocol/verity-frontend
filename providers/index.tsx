'use client';

import { type ReactNode } from 'react';
import { WalletProvider } from './wallet-provider';
import { AuthProvider } from './auth-provider';
import { ThemeProvider } from './theme-provider';

/**
 * Root providers wrapper — nests all context providers.
 *
 * Used by the root layout to provide wallet, auth, and theme state
 * to the entire application.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <WalletProvider>
        <AuthProvider>{children}</AuthProvider>
      </WalletProvider>
    </ThemeProvider>
  );
}
