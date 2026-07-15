/**
 * Wallet management page — list, add, remove, and set primary wallet.
 *
 * TODO: Implement with real data:
 * - List of linked wallets with truncated addresses
 * - Primary wallet indicator (badge)
 * - "Link new wallet" flow (triggers Freighter)
 * - "Remove wallet" with confirmation modal
 * - Warning if user tries to remove their last wallet
 */
export default function WalletsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Wallet Management</h1>
      <p className="mt-2 text-sm text-navy-300">
        Manage the wallets linked to your Verity identity.
      </p>

      {/* TODO: Wallet list */}
      <section className="mt-8 rounded-xl border border-surface-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-200">Linked Wallets</h2>
        <p className="mt-3 text-sm text-navy-300">
          TODO — Show each linked wallet with:
          - Truncated address in JetBrains Mono
          - "Primary" badge on the main wallet
          - "Remove" button (with confirmation modal)
          - Warning if this is the last wallet
        </p>
      </section>

      {/* TODO: Link new wallet */}
      <section className="mt-6 rounded-xl border border-surface-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-200">Link New Wallet</h2>
        <p className="mt-3 text-sm text-navy-300">
          TODO — Button that triggers Freighter connection and links the new
          wallet to the DID. Show confirmation after linking.
        </p>
      </section>
    </div>
  );
}
