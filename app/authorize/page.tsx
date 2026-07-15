'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';

/**
 * Authorization popup page — shown when a third-party app requests verification.
 *
 * CRITICAL: This is a popup window, NOT a full page.
 * Design for approximately 420px wide, 580px tall — fixed small viewport.
 * No navbar, no footer, no sidebar — popup only.
 *
 * Layout from top to bottom:
 * 1. Verity logo small at top center
 * 2. Requesting app name and logo (large and prominent)
 * 3. Divider
 * 4. What is being shared: "Verified status only. Your wallet and documents are never shared."
 * 5. Green checkmarks of what they CAN see vs red X of what they CANNOT see
 * 6. Two full-width buttons: "Approve" (primary) and "Deny" (ghost)
 * 7. Small Verity trust badge at bottom
 *
 * TODO: Implement:
 * - Read session token from URL params
 * - Fetch session details from backend (app name, requested claims)
 * - Handle approve/deny actions via services/auth.ts
 * - Close popup window after action
 * - Show loading state during API calls
 * - Handle expired/invalid sessions
 */
export default function AuthorizePage() {
  const [status, setStatus] = useState<'idle' | 'approving' | 'denying' | 'done'>('idle');

  // TODO: Read token from searchParams, fetch session details
  const appName = 'Example App';

  const handleApprove = async () => {
    setStatus('approving');
    // TODO: Call approveSession(token) from services/auth.ts
    // TODO: window.close() after success
    setStatus('done');
  };

  const handleDeny = async () => {
    setStatus('denying');
    // TODO: Call denySession(token) from services/auth.ts
    // TODO: window.close() after success
    setStatus('done');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="w-full max-w-sm px-4">
        {/* Verity logo */}
        <div className="mb-6 text-center">
          <span className="text-lg font-bold text-navy">{APP_NAME}</span>
        </div>

        {/* Requesting app */}
        <div className="mb-4 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-200 text-lg font-bold text-navy">
            {appName[0]}
          </div>
          <p className="text-lg font-semibold text-navy">{appName}</p>
          <p className="text-xs text-navy-300">is requesting verification</p>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-surface-300" />

        {/* What is shared */}
        <p className="mb-4 text-center text-sm font-medium text-navy">
          Verified status only. Your wallet and documents are never shared.
        </p>

        {/* What they can/cannot see */}
        <div className="mb-6 grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-2">
            <p className="font-semibold text-verified">They can see:</p>
            <ul className="space-y-1 text-navy-300">
              <li>
                <span className="text-verified">✓</span> Verified status
              </li>
              <li>
                <span className="text-verified">✓</span> Credential types
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-revoked">They cannot see:</p>
            <ul className="space-y-1 text-navy-300">
              <li>
                <span className="text-revoked">✗</span> Wallet address
              </li>
              <li>
                <span className="text-revoked">✗</span> Documents
              </li>
              <li>
                <span className="text-revoked">✗</span> Personal data
              </li>
            </ul>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={status === 'approving'}
            onClick={handleApprove}
          >
            Approve
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full"
            isLoading={status === 'denying'}
            onClick={handleDeny}
          >
            Deny
          </Button>
        </div>

        {/* Trust badge */}
        <p className="mt-6 text-center text-[10px] text-navy-200">
          Verified by {APP_NAME} · Your data stays yours
        </p>
      </div>
    </div>
  );
}
