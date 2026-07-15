/**
 * Connected apps page — list apps that have received verification signals.
 *
 * TODO: Implement with real data:
 * - Cards per connected app: name, URL, when access was granted, last used
 * - "Revoke access" button per app with confirmation modal
 * - Empty state when no apps are connected
 */
export default function AppsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Connected Apps</h1>
      <p className="mt-2 text-sm text-navy-300">
        Apps that have received a verification signal from your identity.
      </p>

      {/* TODO: App list */}
      <section className="mt-8 rounded-xl border border-surface-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-200">Authorized Apps</h2>
        <p className="mt-3 text-sm text-navy-300">
          TODO — Show cards for each connected app with:
          - App name and URL
          - "Access granted" date
          - "Revoke access" button with confirmation modal
          - Empty state: "No apps connected yet"
        </p>
      </section>
    </div>
  );
}
