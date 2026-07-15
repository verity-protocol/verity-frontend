'use client';

import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';

/**
 * Onboarding step 2 — document upload for verification.
 *
 * Clean upload interface with prominent deletion notice.
 * The deletion notice is a trust signal — make it visible, not fine print.
 *
 * TODO: Implement full flow:
 * - Document type selector (passport, driver's license, national ID)
 * - Drag-and-drop upload area
 * - Bold deletion notice: "Your document is sent directly to the
 *   verification provider and immediately deleted. Verity never stores it."
 * - Progress indicator during upload
 * - Submit to KYC provider via services/kyc.ts
 * - Redirect to confirmation step on success
 */
export default function CreateVerifyPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div className="w-full max-w-md">
          {/* Progress indicator */}
          <div className="mb-8 flex items-center justify-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-verified text-sm font-bold text-white">
              ✓
            </span>
            <span className="h-0.5 w-12 bg-verified" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              2
            </span>
            <span className="h-0.5 w-12 bg-surface-300" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-300 text-sm font-medium text-navy-200">
              3
            </span>
          </div>

          <Card>
            <CardBody className="p-8">
              <h1 className="text-center text-xl font-bold text-navy">
                Verify your identity
              </h1>

              {/* Trust signal — prominent deletion notice */}
              <div className="mt-6 rounded-lg border border-verified/20 bg-verified/5 p-4 text-center">
                <p className="text-sm font-semibold text-verified">
                  Your document is never stored
                </p>
                <p className="mt-1 text-xs text-navy-300">
                  It is sent directly to the verification provider and immediately
                  deleted. {process.env.NEXT_PUBLIC_APP_NAME || 'Verity'} never
                  sees, saves, or transmits your documents.
                </p>
              </div>

              {/* Document type selector */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-navy">
                  Document type
                </label>
                <select className="mt-2 w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 text-sm text-navy">
                  <option value="passport">Passport</option>
                  <option value="drivers_license">Driver&apos;s License</option>
                  <option value="national_id">National ID</option>
                </select>
              </div>

              {/* Upload area */}
              <div className="mt-4 rounded-lg border-2 border-dashed border-surface-300 p-8 text-center">
                <p className="text-sm text-navy-300">
                  TODO — Drag-and-drop upload area
                </p>
                <p className="mt-1 text-xs text-navy-200">
                  Or click to browse files
                </p>
              </div>

              <Button variant="primary" size="lg" className="mt-6 w-full" disabled>
                Submit for verification
              </Button>
            </CardBody>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
