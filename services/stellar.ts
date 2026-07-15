/**
 * Stellar service — API calls for Soroban RPC and Horizon queries.
 *
 * These are thin wrappers — most Stellar interaction happens client-side
 * via Freighter. These services handle server-side queries.
 *
 * TODO: Replace all mock returns with real fetch() calls to the backend.
 */

import type { SorobanRpcResult, AccountBalance } from '@/types';
import { API_BASE_URL } from '@/lib/constants';

/**
 * Query a Soroban smart contract method (read-only simulation).
 *
 * TODO: Implement — POST ${API_BASE_URL}/stellar/query
 * Body: { contractId, method, args }
 */
export async function queryContract(
  _contractId: string,
  _method: string,
  _args?: unknown[],
): Promise<SorobanRpcResult> {
  // TODO: Replace with real API call
  void _args;
  return { result: null, success: false, error: 'Not implemented' };
}

/**
 * Get the XLM balance for a Stellar account.
 *
 * TODO: Implement — GET ${API_BASE_URL}/stellar/balance/${address}
 */
export async function getAccountBalance(_address: string): Promise<AccountBalance> {
  // TODO: Replace with real API call
  return { address: _address, balance: '0.0000000' };
}
