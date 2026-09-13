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
  /** Embedded issuer info when resolved with its relation. */
  issuer?: { address: string; name: string } | null;
}

/** Request to issue a new credential. Maps to POST /credentials. */
export interface IssueCredentialRequest {
  did: string;
  credentialType: string;
  credentialHash: string;
}

/** Request to revoke a credential. Maps to POST /credentials/:did/:type/revoke. */
export interface RevokeCredentialRequest {
  issuerAddress: string;
}

/** Credential status for display badges. */
export type CredentialStatus = 'active' | 'revoked' | 'pending';