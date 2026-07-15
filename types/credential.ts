/**
 * Credential types — mirrors backend Credential entity and on-chain CredentialRecord.
 *
 * Credentials are issued by registered issuers and linked to a DID.
 * Each credential has a hash (never the raw document data).
 */

/** Core credential record. */
export interface Credential {
  id: string;
  didId: string;
  issuerId: string;
  /** Credential type string, e.g. "kyc_basic", "accredited_investor" */
  credentialType: string;
  /** SHA-256 hash of the verified credential data */
  credentialHash: string;
  isRevoked: boolean;
  issuedAt: string;
  revokedAt: string | null;
}

/** Credential with embedded issuer info for display. */
export interface CredentialWithIssuer extends Credential {
  issuerName: string;
  issuerAddress: string;
}

/** Request to issue a new credential (internal — called after KYC verification). */
export interface IssueCredentialRequest {
  didAddress: string;
  issuerAddress: string;
  credentialType: string;
  credentialHash: string;
}

/** Credential status for display badges. */
export type CredentialStatus = 'active' | 'revoked' | 'pending';
