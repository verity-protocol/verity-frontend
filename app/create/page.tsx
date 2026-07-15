'use client';

import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/providers/wallet-provider';
import { APP_NAME, ROUTES } from '@/lib/constants';

/**
 * Onboarding step 1 — connect wallet.
 *
 * Multi-step flow with clear progress indicator.
 * Minimal, reassuring message that Verity pays the setup fee.
 *
 * TODO: Implement full flow:
 * - Check if wallet is already connected
 * - Handle Freighter connection
 * - Redirect to step 2 after successful connection
 * - Show error state if Freighter is not installed
 */
export default function CreatePage() {
  const { isConnected, connect, isLoading } = useWallet();

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div className="w-full max-w-md">
          {/* Progress indicator */}
          <div className="mb-8 flex items-center justify-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              1
            </span>
            <span className="h-0.5 w-12 bg-surface-300" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-300 text-sm font-medium text-navy-200">
              2
            </span>
            <span className="h-0.5 w-12 bg-surface-300" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-300 text-sm font-medium text-navy-200">
              3
            </span>
          </div>

          {/* Card */}
          <div className="rounded-xl border border-surface-300 bg-white p-8 text-center">
            <h1 className="text-xl font-bold text-navy">
              Create your {APP_NAME} identity
            </h1>
            <p className="mt-3 text-sm text-navy-300">
              Step 1: Connect your Stellar wallet. Don&apos;t worry — there&apos;s
              no setup fee. {APP_NAME} covers the network cost.
            </p>

            <div className="mt-8">
              {isConnected ? (
                <div>
                  <p className="mb-4 text-sm text-verified">Wallet connected</p>
                  <a href={ROUTES.createVerify}>
                    <Button variant="primary" size="lg" className="w-full">
                      Continue to verification
                    </Button>
                  </a>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isLoading}
                  onClick={connect}
                >
                  Connect Wallet
                </Button>
              )}
            </div>

            <p className="mt-6 text-xs text-navy-200">
              Requires the{' '}
              <a
                href="https://www.freighter.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Freighter
              </a>{' '}
              browser extension.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
