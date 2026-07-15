/**
 * Wallet-specific types for the frontend wallet integration.
 */

import type { StellarNetwork } from './stellar';

/** Wallet state exposed by the WalletProvider context. */
export interface WalletState {
  /** Connected wallet address (G...) or null */
  address: string | null;
  /** Whether the wallet is connected */
  isConnected: boolean;
  /** Whether a connection/disconnection is in progress */
  isLoading: boolean;
  /** Current network */
  network: StellarNetwork;
}

/** Actions exposed by the WalletProvider context. */
export interface WalletActions {
  /** Connect to Freighter wallet */
  connect: () => Promise<void>;
  /** Disconnect wallet */
  disconnect: () => void;
  /** Switch network */
  switchNetwork: (network: StellarNetwork) => void;
}

/** Full wallet context value. */
export interface WalletContextValue extends WalletState, WalletActions {}
