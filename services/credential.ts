/**
 * Credential service — API calls for credential management.
 *
 * TODO: Replace all mock returns with real fetch() calls to the backend.
 */

import type { Credential, IssueCredentialRequest } from '@/types';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants';

/**
 * Get all credentials for a DID.
 *
 * TODO: Implement — GET ${API_BASE_URL}${API_ENDPOINTS.credentials.list(didId)}
 */
export async function getCredentials(_didId: string): Promise<Credential[]> {
  // TODO: Replace with real API call
  return [
    {
      id: 'cred-001',
      didId: 'did-001',
      issuerId: 'issuer-001',
      credentialType: 'kyc_basic',
      credentialHash: 'abc123...',
      isRevoked: false,
      issuedAt: new Date().toISOString(),
      revokedAt: null,
    },
  ];
}

/**
 * Issue a new credential (called internally after KYC verification).
 *
 * TODO: Implement — POST ${API_BASE_URL}${API_ENDPOINTS.credentials.issue}
 * Body: { didAddress, issuerAddress, credentialType, credentialHash }
 */
export async function issueCredential(
  _request: IssueCredentialRequest,
): Promise<{ success: boolean }> {
  // TODO: Replace with real API call
  return { success: true };
}
