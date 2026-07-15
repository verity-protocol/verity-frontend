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

/** Abbreviated wallet info returned in resolution documents. */
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
  wallets: LinkedWallet[];
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

/** Request body for POST /did — creating a new DID. */
export interface CreateDidRequest {
  ownerAddress: string;
  nullifierHash?: string;
}

/** Request body for POST /did/:id/wallets — linking a wallet. */
export interface LinkWalletRequest {
  walletAddress: string;
}

/** Request body for PATCH /did/:id/verification — setting verification status. */
export interface SetVerificationRequest {
  isVerified: boolean;
}
