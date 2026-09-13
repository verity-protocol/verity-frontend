/**
 * Demo-mode KYC simulation — DEVELOPMENT ONLY.
 *
 * WARNING — Read this before touching a single line in this file:
 *
 * `runDemoVerification` performs ZERO network I/O. It is a pure client-side
 * timer that lets the onboarding UI advance past the identity-verification
 * step while the real KYC provider is still being wired up.
 *
 * It MUST NEVER call the backend `/verification` or `/credentials` endpoints
 * (or anything else). Those endpoints trigger the ADMIN-SIGNED on-chain
 * `set_verified` call or issuer-signed on-chain credential issuance — minting
 * REAL, PERMANENT on-chain state from fabricated input. A demo "verification"
 * succeeding in the UI must never reach an admin/issuer key.
 *
 * Gating: `isDemoKycEnabled()` only returns true when BOTH
 *   - NEXT_PUBLIC_ENABLE_DEMO_KYC === '1'  (NOT committed to .env.example)
 *   - NODE_ENV !== 'production'
 * hold. `process.env.NODE_ENV` is statically replaced at build time, so in a
 * production build the `&&` short-circuits to `false` and this whole module
 * (and every branch that calls it) is dead code that rolls out with it.
 */

export const DEMO_DELAY_MS = 1200;

/**
 * Whether demo-mode KYC is enabled.
 *
 * Never true in a production build — the NODE_ENV check is inlined to `false`
 * at build time, making the entire demo path unreachable there.
 */
export function isDemoKycEnabled(): boolean {
  return (
    process.env.NEXT_PUBLIC_ENABLE_DEMO_KYC === '1' &&
    process.env.NODE_ENV !== 'production'
  );
}

/**
 * Simulate a KYC verification round-trip.
 *
 * Resolves after a short delay to mimic provider processing. Does not touch
 * the network, the backend, or any wallet. See the file-level WARNING.
 */
export async function runDemoVerification(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, DEMO_DELAY_MS));
}