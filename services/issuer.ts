/**
 * Issuer service — API calls for issuer (KYC provider) management.
 *
 * TODO: Replace all mock returns with real fetch() calls to the backend.
 */

import type { Issuer, RegisterIssuerRequest } from '@/types';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants';

/**
 * Get all registered issuers.
 *
 * TODO: Implement — GET ${API_BASE_URL}${API_ENDPOINTS.issuers.list}
 */
export async function getIssuers(): Promise<Issuer[]> {
  // TODO: Replace with real API call
  return [
    {
      id: 'issuer-001',
      address: 'GBCI6...X2QOA',
      name: 'Verity KYC',
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ];
}

/**
 * Get a specific issuer by address.
 *
 * TODO: Implement — GET ${API_BASE_URL}${API_ENDPOINTS.issuers.get(address)}
 */
export async function getIssuer(_address: string): Promise<Issuer | null> {
  // TODO: Replace with real API call
  return {
    id: 'issuer-001',
    address: _address,
    name: 'Verity KYC',
    isActive: true,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Register a new issuer (admin-only endpoint).
 *
 * TODO: Implement — POST ${API_BASE_URL}${API_ENDPOINTS.issuers.register}
 * Body: { address, name }
 */
export async function registerIssuer(
  _request: RegisterIssuerRequest,
): Promise<{ success: boolean }> {
  // TODO: Replace with real API call
  return { success: true };
}
