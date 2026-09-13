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

import {
  isConnected,
  getAddress,
  getNetwork,
  signTransaction as freighterSignTransaction,
} from '@stellar/freighter-api';
import { STELLAR_NETWORK } from './constants';

/**
 * Network passphrases used when signing transactions.
 * These must match the network the backend simulated the transaction on.
 */
const NETWORK_PASSPHRASES: Record<'testnet' | 'mainnet', string> = {
  testnet: 'Test SDF Future Network ; October 2022',
  mainnet: 'Public Global Stellar Network ; September 2015',
};

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
    const normalized = network.toLowerCase();
    return normalized.includes('mainnet') || normalized.includes('public')
      ? 'mainnet'
      : 'testnet';
  } catch {
    return STELLAR_NETWORK;
  }
}

/**
 * Sign a base64-encoded transaction envelope XDR with the Freighter wallet.
 *
 * The active Freighter network is used to derive the network passphrase.
 * If Freighter is on a different network than the one the transaction was
 * prepared on, the passphrase will mismatch and Freighter will reject the
 * signature — surfacing the network conflict to the user.
 *
 * @param txXdr - Base64-encoded transaction envelope XDR (from a *prepare* response)
 * @returns The signed base64-encoded transaction envelope XDR (for a *confirm* request)
 *
 * @throws If Freighter is not installed, the user cancels, or there is a
 *         network passphrase mismatch.
 */
export async function signTransaction(txXdr: string): Promise<string> {
  const network = await getFreighterNetwork();
  const result = await freighterSignTransaction(txXdr, {
    networkPassphrase: NETWORK_PASSPHRASES[network],
  });
  return result.signedTxXdr;
}
