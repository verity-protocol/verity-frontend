/**
 * Dashboard page — main authenticated view.
 *
 * TODO: Implement with real data:
 * - Verification status badge (large, prominent at top)
 * - Linked wallets section
 * - Active credentials list with status badges
 * - Connected apps section
 *
 * Uses: VerificationStatus, LinkedWallets, CredentialsList, ConnectedApps
 * feature components from components/features/dashboard/
 */
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
      <p className="mt-2 text-sm text-navy-300">
        Overview of your Verity identity, credentials, and connected apps.
      </p>

      {/* TODO: Verification status badge — large and prominent at top */}
      <section className="mt-8 rounded-xl border border-surface-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-200">Verification Status</h2>
        <div className="mt-3 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-verified/10 text-verified">
            ✓
          </span>
          <div>
            <p className="font-medium text-navy">Verified</p>
            <p className="text-xs text-navy-300">
              Your identity is verified and ready to use.
            </p>
          </div>
        </div>
      </section>

      {/* TODO: Linked wallets section */}
      <section className="mt-6 rounded-xl border border-surface-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-200">Linked Wallets</h2>
        <p className="mt-3 text-sm text-navy-300">
          TODO — Show list of linked wallets with truncated addresses.
          Include "Add wallet" button and "Remove" option per wallet.
        </p>
      </section>

      {/* TODO: Credentials section */}
      <section className="mt-6 rounded-xl border border-surface-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-200">Credentials</h2>
        <p className="mt-3 text-sm text-navy-300">
          TODO — Show list of active credentials with type, issuer, and
          status badges (active/revoked/pending).
        </p>
      </section>

      {/* TODO: Connected apps section */}
      <section className="mt-6 rounded-xl border border-surface-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-200">Connected Apps</h2>
        <p className="mt-3 text-sm text-navy-300">
          TODO — Show apps that have received verification signals.
          Include "Revoke access" button per app with confirmation.
        </p>
      </section>
    </div>
  );
}
