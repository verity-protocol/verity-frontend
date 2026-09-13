'use client';

import { useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/providers/wallet-provider';
import { APP_NAME } from '@/lib/constants';
import { useCreateDid } from '@/hooks/use-create-did';

/**
 * Onboarding step 1 — create your identity.
 *
 * Runs the two-phase flow: prepare (unsigned tx) → sign in Freighter →
 * confirm (signed tx back to the backend). The backend covers the network
 * fee, so the Freighter signature is free for the user.
 *
 * On success the new `did:verity:` identifier is shown and the user continues
 * to identity verification.
 */
export default function CreatePage() {
  const { isConnected, address, connect, isLoading } = useWallet();
  const { phase, did, error, run, retry } = useCreateDid(address ?? '');
  const [copied, setCopied] = useState(false);

  const copyDid = async () => {
    if (!did) return;
    try {
      await navigator.clipboard.writeText(did);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const continueUrl = did ? `/create/verify?did=${encodeURIComponent(did)}` : null;

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

            {!isConnected ? (
              <>
                <p className="mt-3 text-sm text-navy-300">
                  Step 1: Connect your Stellar wallet. Don&apos;t worry —
                  there&apos;s no setup fee. {APP_NAME} covers the network cost.
                </p>
                <div className="mt-8">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                    onClick={connect}
                  >
                    Connect Wallet
                  </Button>
                </div>
              </>
            ) : phase === 'success' && did ? (
              <>
                <div className="mt-6 rounded-lg border border-verified/20 bg-verified/5 p-4">
                  <p className="text-sm font-semibold text-verified">
                    Identity created
                  </p>
                  <p
                    className="mt-2 break-all font-mono text-xs text-navy-300"
                    title={did}
                  >
                    {did}
                  </p>
                  <button
                    type="button"
                    onClick={copyDid}
                    className="mt-2 text-xs font-medium text-accent hover:underline"
                  >
                    {copied ? 'Copied' : 'Copy identifier'}
                  </button>
                </div>
                {continueUrl && (
                  <a href={continueUrl}>
                    <Button variant="primary" size="lg" className="mt-6 w-full">
                      Continue to verification
                    </Button>
                  </a>
                )}
              </>
            ) : phase === 'error' ? (
              <>
                <div className="mt-6 rounded-lg border border-error/20 bg-error/5 p-4">
                  <p className="text-sm font-semibold text-error">
                    We couldn&apos;t create your identity
                  </p>
                  <p className="mt-1 text-xs text-navy-300">{error}</p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-6 w-full"
                  onClick={retry}
                >
                  Try again
                </Button>
              </>
            ) : (
              <>
                <p className="mt-3 text-sm text-navy-300">
                  Your identity is minted on the Stellar network. {APP_NAME}
                  covers the network cost — you&apos;ll only approve the free
                  transaction in Freighter.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-8 w-full"
                  isLoading={phase !== 'idle'}
                  onClick={() => void run()}
                >
                  {phase === 'preparing'
                    ? 'Preparing…'
                    : phase === 'signing'
                      ? 'Approve the signature in Freighter…'
                      : phase === 'confirming'
                        ? 'Confirming on the network…'
                        : 'Create your identity'}
                </Button>
              </>
            )}

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