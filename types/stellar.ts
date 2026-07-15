/**
 * Stellar network types — for Freighter wallet and RPC interactions.
 */

/** Supported Stellar networks. */
export type StellarNetwork = 'testnet' | 'mainnet';

/** Wallet connection state. */
export interface WalletConnection {
  /** Connected wallet public key (G...) or null if not connected */
  address: string | null;
  /** Whether the wallet is currently connected */
  isConnected: boolean;
  /** Whether a connection attempt is in progress */
  isLoading: boolean;
}

/** Result of a Soroban RPC query. */
export interface SorobanRpcResult {
  /** Parsed return value from the contract method */
  result: unknown;
  /** Whether the simulation was successful */
  success: boolean;
  /** Error message if simulation failed */
  error?: string;
}

/** Stellar account balance info. */
export interface AccountBalance {
  address: string;
  /** Balance in XLM (not stroops) */
  balance: string;
}
