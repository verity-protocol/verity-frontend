'use client';

import { useCallback, useMemo, useState } from 'react';
import { ApiError } from '@/lib/api';
import { signTransaction } from '@/lib/stellar';
import { classifyDidConflict, confirmCreate, prepareCreate } from '@/services/did';

export type CreateDidPhase =
  | 'idle'
  | 'preparing'
  | 'signing'
  | 'confirming'
  | 'success'
  | 'error';

/**
 * Collision-retry behavior.
 *
 * The backend maps two DISTINCT on-chain failures to HTTP 409:
 * - DidPrepareExpiredError: prepared auth entries are stale — safe to silently
 *   re-prepare and re-sign (flows through Freighter again).
 * - DidSubmissionContentionError: sequence contention that ALREADY retried
 *   server-side (N submissions). Re-running on top of that is pointless, so
 *   we surface a "try again" state instead.
 */
const RE_PREPARE_LIMIT = 1;

export function useCreateDid(ownerAddress: string) {
  const [phase, setPhase] = useState<CreateDidPhase>('idle');
  const [did, setDid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (): Promise<string | null> => {
    setPhase('preparing');
    setError(null);
    setDid(null);

    for (let attempt = 0; attempt <= RE_PREPARE_LIMIT; attempt += 1) {
      try {
        const prepared = await prepareCreate({ ownerAddress });
        setPhase('signing');
        const signedXdr = await signTransaction(prepared.txXdr);
        setPhase('confirming');
        const resolution = await confirmCreate({ txXdr: signedXdr });
        setDid(resolution.did);
        setPhase('success');
        return resolution.did;
      } catch (err) {
        const shouldRePrepare =
          err instanceof ApiError &&
          err.status === 409 &&
          classifyDidConflict(err.message) === 'expired' &&
          attempt < RE_PREPARE_LIMIT;
        if (shouldRePrepare) {
          continue;
        }
        setPhase('error');
        setError(
          err instanceof Error && err.message
            ? err.message
            : 'Something went wrong while creating your identity.',
        );
        return null;
      }
    }

    setPhase('error');
    setError('Something went wrong while creating your identity.');
    return null;
  }, [ownerAddress]);

  const retry = useCallback(() => {
    void run();
  }, [run]);

  return useMemo(
    () => ({ phase, did, error, run, retry }),
    [phase, did, error, run, retry],
  );
}