'use client';

import { useWallet } from '@/providers/wallet-provider';
import { Button } from '@/components/ui/button';
import { truncateAddress } from '@/lib/truncate';

/**
 * Wallet connect/disconnect button.
 *
 * Shows:
 * - "Connect Wallet" button when not connected
 * - Truncated wallet address (JetBrains Mono) when connected
 * - Loading spinner during connection
 *
 * Uses the useWallet hook from WalletProvider.
 */
export function WalletButton() {
  const { address, isConnected, isLoading, connect, disconnect } = useWallet();

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" isLoading>
        Connecting...
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-surface-200 px-3 py-1.5 font-mono text-xs text-navy">
          {truncateAddress(address)}
        </span>
        <Button variant="ghost" size="sm" onClick={disconnect}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button variant="primary" size="sm" onClick={connect}>
      Connect Wallet
    </Button>
  );
}
