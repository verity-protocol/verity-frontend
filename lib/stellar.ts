/**
 * Stellar SDK helpers — Freighter integration and network utilities.
 *
 * This file provides thin wrappers around @stellar/freighter-api
 * and @stellar/stellar-sdk for common frontend operations.
 *
 * TODO: Implement full Freighter integration
 * - Connect/disconnect wallet
 * - Sign transactions
 * - Handle network switching
 */

import { isConnected, getAddress, getNetwork } from '@stellar/freighter-api';
import { STELLAR_NETWORK } from './constants';

/**
 * Check if the Freighter wallet extension is installed.
 *
 * TODO: Implement — check for window.freighter or use Freighter API detection
 */
export async function isFreighterInstalled(): Promise<boolean> {
  try {
    const result = await isConnected();
    return result.isConnected;
  } catch {
    return false;
  }
}

/**
 * Get the connected wallet's public key.
 *
 * TODO: Implement — handle permission errors and user cancellation
 */
export async function getWalletPublicKey(): Promise<string | null> {
  try {
    const result = await isConnected();
    if (!result.isConnected) return null;
    const { address } = await getAddress();
    return address;
  } catch {
    return null;
  }
}

/**
 * Get the current Stellar network from Freighter.
 *
 * TODO: Implement — map Freighter network name to our network type
 */
export async function getFreighterNetwork(): Promise<'testnet' | 'mainnet'> {
  try {
    const { network } = await getNetwork();
    return network.includes('mainnet') ? 'mainnet' : 'testnet';
  } catch {
    return STELLAR_NETWORK;
  }
}
