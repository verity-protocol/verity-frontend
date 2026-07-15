/**
 * DID service — API calls for identity management.
 *
 * TODO: Replace all mock returns with real fetch() calls to the backend.
 * Use the API_ENDPOINTS constant for route paths and API_BASE_URL for the base.
 */

import type {
  DidResolution,
  CreateDidRequest,
  LinkWalletRequest,
  SetVerificationRequest,
} from '@/types';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants';

/**
 * Resolve a DID — returns the full identity document.
 *
 * TODO: Implement — GET ${API_BASE_URL}${API_ENDPOINTS.did.resolve(identifier)}
 */
export async function resolveDid(identifier: string): Promise<DidResolution> {
  // TODO: Replace with real API call
  void identifier;
  return {
    did: 'GCKFBEIYTX2L5OS6OSQ4OA',
    owner: 'GCKFBEIYTX2L5OS6OSQ4OA',
    isVerified: true,
    wallets: [
      { address: 'GCKFBEIYTX2L5OS6OSQ4OA', isPrimary: true },
      { address: 'GBZQ7S2Y5MO3U7XK2HQ4PA', isPrimary: false },
    ],
    credentials: [
      {
        type: 'kyc_basic',
        issuer: 'GBCI6...X2QOA',
        issuedAt: new Date().toISOString(),
        isRevoked: false,
      },
    ],
    createdAt: new Date().toISOString(),
  };
}

/**
 * Create a new DID on-chain and in the backend.
 *
 * TODO: Implement — POST ${API_BASE_URL}${API_ENDPOINTS.did.create}
 * Body: { ownerAddress, nullifierHash? }
 */
export async function createDid(_request: CreateDidRequest): Promise<{ did: string }> {
  // TODO: Replace with real API call
  return { did: 'GCKFBEIYTX2L5OS6OSQ4OA' };
}

/**
 * Get all wallets linked to a DID.
 *
 * TODO: Implement — GET ${API_BASE_URL}${API_ENDPOINTS.did.wallets(didId)}
 */
export async function getLinkedWallets(
  _didId: string,
): Promise<Array<{ address: string; isPrimary: boolean }>> {
  // TODO: Replace with real API call
  return [
    { address: 'GCKFBEIYTX2L5OS6OSQ4OA', isPrimary: true },
    { address: 'GBZQ7S2Y5MO3U7XK2HQ4PA', isPrimary: false },
  ];
}

/**
 * Link a new wallet to a DID.
 *
 * TODO: Implement — POST ${API_BASE_URL}${API_ENDPOINTS.did.linkWallet(didId)}
 * Body: { walletAddress }
 */
export async function linkWallet(
  _didId: string,
  _request: LinkWalletRequest,
): Promise<{ success: boolean }> {
  // TODO: Replace with real API call
  return { success: true };
}

/**
 * Unlink a wallet from a DID.
 *
 * TODO: Implement — DELETE ${API_BASE_URL}${API_ENDPOINTS.did.unlinkWallet(didId, address)}
 */
export async function unlinkWallet(
  _didId: string,
  _address: string,
): Promise<{ success: boolean }> {
  // TODO: Replace with real API call
  return { success: true };
}

/**
 * Set the verification status of a DID.
 *
 * TODO: Implement — PATCH ${API_BASE_URL}${API_ENDPOINTS.did.setVerification(didId)}
 * Body: { isVerified }
 */
export async function setVerification(
  _didId: string,
  _request: SetVerificationRequest,
): Promise<{ success: boolean }> {
  // TODO: Replace with real API call
  return { success: true };
}
