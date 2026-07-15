import type { Metadata } from 'next';
import { Providers } from '@/providers';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Verity — Prove who you are, reveal nothing',
    template: '%s | Verity',
  },
  description:
    'Self-sovereign identity on Stellar. Create your Verity identity, verify once, and prove who you are to any app — without sharing your wallet or documents.',
  keywords: ['identity', 'stellar', 'soroban', 'self-sovereign', 'KYC', 'verification'],
};

/**
 * Root layout — wraps all pages with providers and global styles.
 *
 * The Providers component nests WalletProvider, AuthProvider, and ThemeProvider.
 * Global CSS includes Tailwind directives and Inter/DM Sans font imports.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface font-sans text-navy antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
