/**
 * Issuer types — mirrors backend Issuer entity.
 *
 * Issuers are KYC providers registered on-chain.
 * Only registered issuers can issue credentials to DIDs.
 */

/** A registered issuer (KYC provider). */
export interface Issuer {
  id: string;
  /** Stellar address of the issuer (G...) */
  address: string;
  /** Human-readable name, e.g. "Verity KYC" */
  name: string;
  isActive: boolean;
  createdAt: string;
}

/** Request to register a new issuer (admin-only). */
export interface RegisterIssuerRequest {
  address: string;
  name: string;
}
