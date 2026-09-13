'use client';

import { Suspense, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { ROUTES } from '@/lib/constants';
import { isDemoKycEnabled, runDemoVerification } from '@/lib/demo-kyc';
import { isDidIdentifier } from '@/lib/did';
import Link from 'next/link';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];
const MAX_FILE_BYTES = 10 * 1024 * 1024;

type DocType = 'passport' | 'drivers_license' | 'national_id';
type DemoStatus = 'idle' | 'processing' | 'verified';

interface VerifyFormProps {
  did: string;
}

/**
 * Onboarding step 2 — document upload + identity verification.
 *
 * The real KYC provider is still being wired up. In demo mode (see
 * lib/demo-kyc.ts) the form advances with a pure client-side simulation and
 * NEVER touches the network — crucially it never calls the admin-gated
 * `PATCH /did/:identifier/verification` or `POST /credentials` endpoints,
 * which would mint real, permanent on-chain state from fabricated input.
 * In a production build demo mode is structurally impossible (NODE_ENV guard
 * inlines to false), so the submit button is simply disabled.
 */
function VerifyForm({ did }: VerifyFormProps) {
  const demoEnabled = isDemoKycEnabled();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [docType, setDocType] = useState<DocType>('passport');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [demoStatus, setDemoStatus] = useState<DemoStatus>('idle');

  const hasFile = fileName !== null && fileError === null;

  const acceptFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError('Please upload a PNG, JPG, or PDF document.');
      setFileName(null);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError('Document must be 10 MB or smaller.');
      setFileName(null);
      return;
    }
    setFileError(null);
    setFileName(file.name);
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) acceptFile(file);
  };

  const submit = async () => {
    if (!demoEnabled || !hasFile || demoStatus === 'processing') return;
    setDemoStatus('processing');
    // Demo only: pure client-side simulation (see lib/demo-kyc.ts). Zero
    // network I/O — the real KYC provider + backend verification wiring is
    // intentionally not called from here.
    await runDemoVerification();
    setDemoStatus('verified');
  };

  const continueUrl = `/create/confirmation?did=${encodeURIComponent(did)}`;

  return (
    <Card>
      <CardBody className="p-8">
        <h1 className="text-center text-xl font-bold text-navy">
          Verify your identity
        </h1>

        {demoEnabled && (
          <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-center">
            <p className="text-sm font-semibold text-amber-800">
              Demo mode — KYC provider not yet wired
            </p>
            <p className="mt-0.5 text-xs text-amber-700">
              This is a simulated verification for development. It changes no
              on-chain state and is disabled in production builds.
            </p>
          </div>
        )}

        {/* Trust signal — prominent deletion notice */}
        <div className="mt-4 rounded-lg border border-verified/20 bg-verified/5 p-4 text-center">
          <p className="text-sm font-semibold text-verified">
            Your document is never stored
          </p>
          <p className="mt-1 text-xs text-navy-300">
            It is sent directly to the verification provider and immediately
            deleted. {process.env.NEXT_PUBLIC_APP_NAME || 'Verity'} never sees,
            saves, or transmits your documents.
          </p>
        </div>

        {/* Document type selector */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-navy">
            Document type
          </label>
          <select
            className="mt-2 w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 text-sm text-navy"
            value={docType}
            onChange={(event) => setDocType(event.target.value as DocType)}
          >
            <option value="passport">Passport</option>
            <option value="drivers_license">Driver&apos;s License</option>
            <option value="national_id">National ID</option>
          </select>
        </div>

        {/* Upload area — drag & drop + click to browse */}
        <div
          className={`mt-4 rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            dragActive ? 'border-accent bg-accent/5' : 'border-surface-300'
          }`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(',')}
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) acceptFile(file);
              event.target.value = '';
            }}
          />
          {fileName ? (
            <p className="break-all text-sm font-medium text-navy">
              {fileName}
            </p>
          ) : (
            <p className="text-sm text-navy-300">
              Drag &amp; drop your document here
            </p>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-1 text-xs text-accent hover:underline"
          >
            Or click to browse files
          </button>
          <p className="mt-1 text-xs text-navy-200">
            PNG, JPG, or PDF — 10 MB max
          </p>
          {fileError && (
            <p className="mt-2 text-xs font-medium text-error">{fileError}</p>
          )}
        </div>

        {/* Submit — gated by demo mode */}
        {demoStatus === 'verified' ? (
          <div className="mt-6">
            <div className="rounded-lg border border-verified/20 bg-verified/5 p-4 text-center">
              <p className="text-sm font-semibold text-verified">
                Verification complete
              </p>
              {demoEnabled && (
                <p className="mt-0.5 text-xs text-amber-700">
                  Demo mode — no on-chain verification was performed.
                </p>
              )}
            </div>
            <Link href={continueUrl}>
              <Button variant="primary" size="lg" className="mt-4 w-full">
                Continue
              </Button>
            </Link>
          </div>
        ) : (
          <Button
            variant="primary"
            size="lg"
            className="mt-6 w-full"
            isLoading={demoStatus === 'processing'}
            disabled={!demoEnabled || !hasFile}
            onClick={() => void submit()}
          >
            {demoStatus === 'processing'
              ? 'Verifying…'
              : 'Submit for verification'}
          </Button>
        )}

        {!demoEnabled && (
          <p className="mt-4 text-center text-xs text-amber-700">
            KYC provider wiring is pending — verification cannot run in this
            environment.
          </p>
        )}
      </CardBody>
    </Card>
  );
}

function CreateVerifyPageInner() {
  const searchParams = useSearchParams();
  const did = searchParams.get('did') ?? '';
  const validDid = isDidIdentifier(did);

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

          {validDid ? (
            <VerifyForm did={did} />
          ) : (
            <Card>
              <CardBody className="p-8 text-center">
                <h1 className="text-xl font-bold text-navy">
                  No identity found
                </h1>
                <p className="mt-3 text-sm text-navy-300">
                  Verification needs the identity created in step 1.
                </p>
                <Link href={ROUTES.create} className="mt-6 inline-block">
                  <Button variant="primary" size="lg">
                    Start from step 1
                  </Button>
                </Link>
              </CardBody>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CreateVerifyPage() {
  return (
    <Suspense fallback={null}>
      <CreateVerifyPageInner />
    </Suspense>
  );
}