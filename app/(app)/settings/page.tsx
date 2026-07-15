/**
 * Settings page — account and wallet preferences.
 *
 * TODO: Implement with real data:
 * - Display name / profile settings
 * - Network preference (testnet / mainnet)
 * - Notification preferences
 * - "Danger zone": delete identity (requires confirmation)
 */
export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Settings</h1>
      <p className="mt-2 text-sm text-navy-300">
        Manage your account and preferences.
      </p>

      {/* TODO: Profile settings */}
      <section className="mt-8 rounded-xl border border-surface-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-200">Profile</h2>
        <p className="mt-3 text-sm text-navy-300">
          TODO — Display name, avatar, and basic profile settings.
        </p>
      </section>

      {/* TODO: Network settings */}
      <section className="mt-6 rounded-xl border border-surface-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-navy-200">Network</h2>
        <p className="mt-3 text-sm text-navy-300">
          TODO — Toggle between testnet and mainnet. Show current network status.
        </p>
      </section>

      {/* TODO: Danger zone */}
      <section className="mt-6 rounded-xl border border-revoked/20 bg-white p-6">
        <h2 className="text-sm font-semibold text-revoked">Danger Zone</h2>
        <p className="mt-3 text-sm text-navy-300">
          TODO — "Delete identity" button with multi-step confirmation.
          This is irreversible — warn the user prominently.
        </p>
      </section>
    </div>
  );
}
