/**
 * Identity page — full DID details view.
 *
 * TODO: Implement with real data:
 * - DID address (truncated, with copy button)
 * - Verification status badge
 * - Owner wallet address (truncated)
 * - Creation date
 * - All linked wallets
 * - All credentials summary
 * - "This is your Verity identity" explanation
 */
export default function IdentityPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Your Identity</h1>
      <p className="mt-2 text-sm text-navy-300">
        Details about your Verity identity on Stellar.
      </p>

      {/* TODO: DID details card */}
      <section className="mt-8 rounded-xl border border-surface-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-200">Verity Identity</h2>
        <p className="mt-3 text-sm text-navy-300">
          TODO — Display:
          - DID address (truncated with JetBrains Mono, copy-to-clipboard button)
          - Verification status badge (verified/pending/not verified)
          - Owner wallet (truncated)
          - Created date
        </p>
      </section>

      {/* TODO: Linked wallets summary */}
      <section className="mt-6 rounded-xl border border-surface-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-200">Linked Wallets</h2>
        <p className="mt-3 text-sm text-navy-300">
          TODO — Show all linked wallets. Link to /dashboard/wallets for management.
        </p>
      </section>

      {/* TODO: Credentials summary */}
      <section className="mt-6 rounded-xl border border-surface-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-200">Credentials</h2>
        <p className="mt-3 text-sm text-navy-300">
          TODO — Show all credentials with type, issuer, and status.
          Link to /credentials for full management.
        </p>
      </section>
    </div>
  );
}
