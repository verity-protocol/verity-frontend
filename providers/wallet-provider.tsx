'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { getWalletPublicKey, isFreighterInstalled } from '@/lib/stellar';
import type { WalletContextValue } from '@/types';

const WalletContext = createContext<WalletContextValue | null>(null);

/**
 * WalletProvider — manages Freighter wallet connection state.
 *
 * Provides:
 * - address: connected wallet public key or null
 * - isConnected: boolean
 * - isLoading: boolean during connect/disconnect
 * - connect(): triggers Freighter connection
 * - disconnect(): clears wallet state
 *
 * TODO: Implement full Freighter integration
 * - Handle Freighter permission prompts
 * - Store connection preference in localStorage
 * - Reconnect on page load if previously connected
 * - Handle network switching
 */
export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [network, setNetwork] = useState<'testnet' | 'mainnet'>('testnet');

  const connect = useCallback(async () => {
    setIsLoading(true);
    try {
      const installed = await isFreighterInstalled();
      if (!installed) {
        // TODO: Show "Install Freighter" modal
        console.error('Freighter wallet is not installed');
        return;
      }
      const key = await getWalletPublicKey();
      if (key) {
        setAddress(key);
        // TODO: Save connection state to localStorage
      }
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    // TODO: Clear localStorage connection state
  }, []);

  const switchNetwork = useCallback((net: 'testnet' | 'mainnet') => {
    setNetwork(net);
    // TODO: Prompt Freighter to switch network
  }, []);

  return (
    <WalletContext.Provider
      value={{ address, isConnected: !!address, isLoading, network, connect, disconnect, switchNetwork }}
    >
      {children}
    </WalletContext.Provider>
  );
}

/**
 * Hook to access wallet connection state and actions.
 *
 * Must be used within a WalletProvider.
 */
export function useWallet(): WalletContextValue {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
