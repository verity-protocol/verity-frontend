/**
 * Identity (DID) types — mirrors backend Did entity and on-chain DidRecord.
 *
 * The DID is the central hub of the Verity identity system.
 * A DID links to multiple wallets and holds credentials.
 */

/** Core DID record as stored on-chain and in the backend database. */
export interface Did {
  id: string;
  /** The DID address — starts with C... on Stellar */
  address: string;
  /** The wallet address that originally created this DID */
  owner: string;
  /** Whether the DID has been KYC-verified */
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/** A wallet linked to a DID. Users can rotate wallets without losing identity. */
export interface Wallet {
  id: string;
  address: string;
  didId: string;
  isPrimary: boolean;
  linkedAt: string;
}

/** Abbreviated wallet info returned by the link/unlink wallet queries. */
export interface LinkedWallet {
  address: string;
  isPrimary: boolean;
}

/**
 * Full DID resolution document.
 * Returned by GET /did/:identifier
 *
 * This is the primary read model for identity data.
 */
export interface DidResolution {
  did: string;
  owner: string;
  isVerified: boolean;
  wallets: string[];
  credentials: CredentialSummary[];
  createdAt: string;
}

/** Compact credential info embedded in DID resolution. */
export interface CredentialSummary {
  type: string;
  issuer: string;
  issuedAt: string;
  isRevoked: boolean;
}

/**
 * Result of a prepare* call — an unsigned transaction awaiting Freighter
 * signing before being handed back via confirm*.
 */
export interface PrepareDidResult {
  method: 'did:create' | 'did:link' | 'did:unlink';
  contractId: string;
  did?: string;
  txXdr: string;
  authExpirationLedgers: number[];
  validUntilLedger?: number;
}

/** Request body for POST /did/prepare — starting DID creation. */
export interface PrepareCreateRequest {
  ownerAddress: string;
  nullifierHash?: string;
}

/** Request body for POST /did/prepare/link — authorizing a wallet link. */
export interface PrepareLinkRequest {
  didIdentifier: string;
  walletAddress: string;
}

/** Request body for POST /did/prepare/unlink — authorizing a wallet unlink. */
export interface PrepareUnlinkRequest {
  didIdentifier: string;
  walletAddress: string;
  callerAddress: string;
}

/** Request body for POST /did/confirm — finishing DID creation. */
export interface ConfirmCreateRequest {
  txXdr: string;
  nullifierHash?: string;
}

/** Request body for POST /did/confirm/link — finishing a wallet link. */
export interface ConfirmLinkRequest {
  txXdr: string;
}

/** Request body for POST /did/confirm/unlink — finishing a wallet unlink. */
export interface ConfirmUnlinkRequest {
  txXdr: string;
}

/** Request body for PATCH /did/:identifier/verification — admin-gated. */
export interface SetVerificationRequest {
  isVerified: boolean;
}

/** Result of a confirm* call — the confirmed DID resolution. */
export type ConfirmationResult = DidResolution;