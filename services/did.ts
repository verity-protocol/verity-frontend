/**
 * DID service — real API calls for identity management.
 *
 * All identifiers are canonical `did:verity:<64 lowercase hex>` URIs.
 * The backend rejects raw hex identifiers, so every identifier is normalized
 * (and validated) before it is used in a path or payload.
 */

import { ApiError, apiFetch } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { normalizeDidIdentifier } from '@/lib/did';
import type {
  ConfirmationResult,
  DidResolution,
  LinkedWallet,
  PrepareCreateRequest,
  PrepareDidResult,
  PrepareLinkRequest,
  PrepareUnlinkRequest,
  ConfirmCreateRequest,
  ConfirmLinkRequest,
  ConfirmUnlinkRequest,
  SetVerificationRequest,
} from '@/types';

/**
 * Validate an identifier and URL-encode it for use in a path.
 *
 * @throws {DidFormatError} If the identifier is not canonical
 */
function didPath(identifier: string): string {
  normalizeDidIdentifier(identifier);
  return encodeURIComponent(identifier);
}

/**
 * Resolve a DID to its full resolution document.
 * GET /did/:identifier
 */
export async function resolveDid(identifier: string): Promise<DidResolution> {
  return apiFetch<DidResolution>(API_ENDPOINTS.did.resolve(didPath(identifier)));
}

/**
 * Resolve a DID by one of its linked wallet addresses.
 *
 * Returns `null` when no DID is linked to the wallet (404), so callers can
 * distinguish "not onboarded" from a genuine failure.
 * GET /did/wallet/:address
 */
export async function findDidByWallet(address: string): Promise<DidResolution | null> {
  try {
    return await apiFetch<DidResolution>(API_ENDPOINTS.did.findByWallet(address));
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * List the wallets linked to a DID.
 * GET /did/:identifier/wallets
 */
export async function getLinkedWallets(identifier: string): Promise<LinkedWallet[]> {
  return apiFetch<LinkedWallet[]>(API_ENDPOINTS.did.listWallets(didPath(identifier)));
}

/**
 * Start DID creation — returns an unsigned transaction for Freighter signing.
 * POST /did/prepare
 */
export async function prepareCreate(
  request: PrepareCreateRequest,
): Promise<PrepareDidResult> {
  return apiFetch<PrepareDidResult>(API_ENDPOINTS.did.prepareCreate, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

/**
 * Start linking a wallet — returns an unsigned transaction.
 * POST /did/prepare/link
 */
export async function prepareLink(request: PrepareLinkRequest): Promise<PrepareDidResult> {
  return apiFetch<PrepareDidResult>(API_ENDPOINTS.did.prepareLink, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

/**
 * Start unlinking a wallet — returns an unsigned transaction.
 * POST /did/prepare/unlink
 */
export async function prepareUnlink(
  request: PrepareUnlinkRequest,
): Promise<PrepareDidResult> {
  return apiFetch<PrepareDidResult>(API_ENDPOINTS.did.prepareUnlink, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

/**
 * Finish DID creation with the Freighter-signed transaction.
 * POST /did/confirm
 */
export async function confirmCreate(
  request: ConfirmCreateRequest,
): Promise<ConfirmationResult> {
  return apiFetch<ConfirmationResult>(API_ENDPOINTS.did.confirmCreate, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

/**
 * Finish linking a wallet with the Freighter-signed transaction.
 * POST /did/confirm/link
 */
export async function confirmLink(request: ConfirmLinkRequest): Promise<ConfirmationResult> {
  return apiFetch<ConfirmationResult>(API_ENDPOINTS.did.confirmLink, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

/**
 * Finish unlinking a wallet with the Freighter-signed transaction.
 * POST /did/confirm/unlink
 */
export async function confirmUnlink(
  request: ConfirmUnlinkRequest,
): Promise<ConfirmationResult> {
  return apiFetch<ConfirmationResult>(API_ENDPOINTS.did.confirmUnlink, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

/**
 * Set the on-chain verification status.
 *
 * NOTE: This endpoint is admin-gated — the backend signs the transaction with
 * the admin key. Do NOT call this from onboarding flows, and never with
 * unverified/fabricated input: `set_verified` writes permanent on-chain state.
 * PATCH /did/:identifier/verification
 */
export async function setVerification(
  identifier: string,
  request: SetVerificationRequest,
): Promise<DidResolution> {
  return apiFetch<DidResolution>(API_ENDPOINTS.did.setVerification(didPath(identifier)), {
    method: 'PATCH',
    body: JSON.stringify(request),
  });
}

/**
 * Classify a 409-conflict message from the backend.
 *
 * The backend maps two distinct on-chain failures to HTTP 409:
 * - `DidPrepareExpiredError`     — the prepared auth entries are stale; the
 *                                  frontend SHOULD silently re-prepare.
 * - `DidSubmissionContentionError` — sequence contention that already retried
 *                                  server-side (N submissions); the frontend
 *                                  should NOT auto-retry on top of that and
 *                                  instead surface a "try again" state.
 *
 * Anything unrecognized is treated as `unknown` — callers should fall back to
 * the conservative "surface the error" behavior.
 */
export function classifyDidConflict(message: string): 'expired' | 'contention' | 'unknown' {
  if (/expired/.test(message)) {
    return 'expired';
  }
  if (/contention|collided/i.test(message)) {
    return 'contention';
  }
  return 'unknown';
}