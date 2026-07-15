'use client';

import Link from 'next/link';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { ROUTES } from '@/lib/constants';

/**
 * Onboarding step 3 — verification confirmed.
 *
 * Celebration moment with green badge.
 * Clear next steps: go to dashboard, explore connected apps.
 *
 * TODO: Implement:
 * - Poll KYC status until verified
 * - Show animated progress while waiting
 * - Show celebration state when verified
 * - Auto-redirect to dashboard after 5 seconds
 */
export default function CreateConfirmationPage() {
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
                You&apos;re verified!
              </h1>
              <p className="mt-3 text-sm text-navy-300">
                Your {process.env.NEXT_PUBLIC_APP_NAME || 'Verity'} identity is
                active. You can now prove your verified status to any connected
                app — without sharing your wallet or documents.
              </p>

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
