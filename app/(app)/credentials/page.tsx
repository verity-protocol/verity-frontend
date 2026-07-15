/**
 * Credentials page — full credential list and management.
 *
 * TODO: Implement with real data:
 * - Table/card list of all credentials
 * - Status badges: active (green), revoked (red), pending (amber)
 * - Credential type, issuer name, issued date
 * - "Revoke" button with confirmation (for own credentials)
 * - Empty state: "No credentials yet — verify your identity to get started"
 */
export default function CredentialsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Credentials</h1>
      <p className="mt-2 text-sm text-navy-300">
        Verification credentials linked to your identity.
      </p>

      {/* TODO: Credential list */}
      <section className="mt-8 rounded-xl border border-surface-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-200">Your Credentials</h2>
        <p className="mt-3 text-sm text-navy-300">
          TODO — Show a table or card list with:
          - Credential type (e.g., "KYC Basic", "Accredited Investor")
          - Issuer name and address (truncated)
          - Issued date
          - Status badge (active / revoked / pending)
          - "Revoke" action button (with confirmation modal)
          - Empty state when no credentials exist
        </p>
      </section>
    </div>
  );
}
