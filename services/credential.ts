/**
 * Credential service — real API calls for credential management.
 */

import { apiFetch } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { normalizeDidIdentifier } from '@/lib/did';
import type {
  Credential,
  IssueCredentialRequest,
  RevokeCredentialRequest,
} from '@/types';

function didPath(did: string): string {
  normalizeDidIdentifier(did);
  return encodeURIComponent(did);
}

/**
 * Get all credentials issued to a DID.
 * GET /credentials/:did
 */
export async function getCredentials(did: string): Promise<Credential[]> {
  return apiFetch<Credential[]>(API_ENDPOINTS.credentials.list(didPath(did)));
}

/**
 * Get a single credential for a DID by type.
 * GET /credentials/:did/:type
 */
export async function getCredential(did: string, type: string): Promise<Credential> {
  return apiFetch<Credential>(
    API_ENDPOINTS.credentials.get(didPath(did), encodeURIComponent(type)),
  );
}

/**
 * Issue a credential on-chain.
 *
 * NOTE: The backend signs issuance with its issuer key (the request carries no
 * issuer address), minting a real, permanent on-chain credential record.
 * Callers must supply a legitimate `did` and a real SHA-256 `credentialHash`.
 * Never call this with fabricated input, and never from onboarding flows.
 * POST /credentials
 */
export async function issueCredential(
  request: IssueCredentialRequest,
): Promise<Credential> {
  return apiFetch<Credential>(API_ENDPOINTS.credentials.issue, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

/**
 * Revoke a credential on-chain.
 * POST /credentials/:did/:type/revoke
 */
export async function revokeCredential(
  did: string,
  type: string,
  request: RevokeCredentialRequest,
): Promise<Credential> {
  return apiFetch<Credential>(
    API_ENDPOINTS.credentials.revoke(didPath(did), encodeURIComponent(type)),
    {
      method: 'POST',
      body: JSON.stringify(request),
    },
  );
}