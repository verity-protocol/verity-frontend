/**
 * How It Works page — detailed protocol walkthrough.
 *
 * TODO: Implement full page with:
 * - Expanded 3-step flow from landing page
 * - Technical architecture explanation
 * - Diagrams: wallet → DID → credential → verification flow
 * - Security model explanation (documents never stored, wallet private)
 * - FAQ section
 */
export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl py-16">
      <h1 className="text-3xl font-bold text-navy">How It Works</h1>
      <p className="mt-4 text-navy-300">
        Verity uses Stellar smart contracts to create a portable, private
        identity that you control. Here&apos;s how it works under the hood.
      </p>

      {/* TODO: Step 1 — Connect */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">Step 1: Connect your wallet</h2>
        <p className="mt-3 text-navy-300">
          TODO — Explain Freighter connection, what happens on-chain (DID
          creation), and why the wallet address stays private.
        </p>
      </section>

      {/* TODO: Step 2 — Verify */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">Step 2: Verify once</h2>
        <p className="mt-3 text-navy-300">
          TODO — Explain the KYC flow, document handling (passed directly to
          provider, never stored), and the credential issuance process.
        </p>
      </section>

      {/* TODO: Step 3 — Prove */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">Step 3: Prove forever</h2>
        <p className="mt-3 text-navy-300">
          TODO — Explain the OAuth-like popup flow, what third-party apps receive
          (only verification status), and how wallet rotation works.
        </p>
      </section>

      {/* TODO: Architecture diagram */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">Architecture</h2>
        <div className="mt-4 rounded-lg border border-surface-300 bg-surface p-8 text-center text-navy-200">
          TODO — Add architecture diagram showing the flow between user wallet,
          Verity backend, Stellar contracts, KYC provider, and third-party apps.
        </div>
      </section>

      {/* TODO: FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy">FAQ</h2>
        <p className="mt-3 text-navy-300">
          TODO — Add frequently asked questions about privacy, security, costs,
          and wallet management.
        </p>
      </section>
    </div>
  );
}
