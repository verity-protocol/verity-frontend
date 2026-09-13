'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { ROUTES } from '@/lib/constants';
import { isDemoKycEnabled } from '@/lib/demo-kyc';
import { isDidIdentifier } from '@/lib/did';

function CopyButton({ did }: { did: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(did);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="mt-3 text-xs font-medium text-accent hover:underline"
    >
      {copied ? 'Copied' : 'Copy identifier'}
    </button>
  );
}

function CreateConfirmationPageInner() {
  const demoEnabled = isDemoKycEnabled();
  const searchParams = useSearchParams();
  const did = searchParams.get('did') ?? '';
  const validDid = isDidIdentifier(did);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div className="w-full max-w-md">
          {/* Progress indicator — all complete */}
          <div className="mb-8 flex items-center justify-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-verified text-sm font-bold text-white">
              ✓
            </span>
            <span className="h-0.5 w-12 bg-verified" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-verified text-sm font-bold text-white">
              ✓
            </span>
            <span className="h-0.5 w-12 bg-verified" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-verified text-sm font-bold text-white">
              ✓
            </span>
          </div>

          <Card>
            <CardBody className="p-8 text-center">
              {/* Success icon */}
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-verified/10 text-3xl">
                ✓
              </div>

              <h1 className="text-xl font-bold text-navy">
                {demoEnabled
                  ? 'Onboarding complete (demo)'
                  : 'You\u2019re verified!'}
              </h1>

              {demoEnabled && (
                <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-center">
                  <p className="text-sm font-semibold text-amber-800">
                    Demo mode — KYC provider not yet wired
                  </p>
                  <p className="mt-0.5 text-xs text-amber-700">
                    This was a simulated verification. No on-chain state was
                    changed and this is disabled in production builds.
                  </p>
                </div>
              )}

              <p className="mt-3 text-sm text-navy-300">
                Your {process.env.NEXT_PUBLIC_APP_NAME || 'Verity'} identity is
                active. You can now prove your verified status to any connected
                app — without sharing your wallet or documents.
              </p>

              {validDid && (
                <div className="mt-6 rounded-lg border border-surface-300 bg-surface p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-navy-200">
                    Your identity
                  </p>
                  <p
                    className="mt-2 break-all font-mono text-xs text-navy-300"
                    title={did}
                  >
                    {did}
                  </p>
                  <CopyButton did={did} />
                </div>
              )}

              {!validDid && (
                <p className="mt-6 text-xs text-navy-200">
                  Tip: keep the identity from step 1 handy — it&apos;s your
                  permanent `did:verity:` identifier.
                </p>
              )}

              <div className="mt-8 space-y-3">
                <Link href={ROUTES.dashboard}>
                  <Button variant="primary" size="lg" className="w-full">
                    Go to Dashboard
                  </Button>
                </Link>
                <Link href={ROUTES.developers}>
                  <Button variant="outline" size="md" className="w-full">
                    Explore for Developers
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CreateConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <CreateConfirmationPageInner />
    </Suspense>
  );
}