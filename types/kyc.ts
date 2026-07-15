/**
 * KYC types — mirrors backend KYC module.
 *
 * Documents are NEVER stored — they pass directly from the user's browser
 * to the KYC provider API and are immediately discarded.
 */

/** Status of a KYC submission with the external provider. */
export type KycProviderStatus =
  | 'pending'
  | 'processing'
  | 'verified'
  | 'rejected'
  | 'expired';

/** A KYC submission record (no document data — only metadata). */
export interface KycSubmission {
  submissionId: string;
  didAddress: string;
  documentType: string;
  providerStatus: KycProviderStatus;
  submittedAt: string;
  resolvedAt: string | null;
}

/** Supported document types for KYC verification. */
export type DocumentType = 'passport' | 'drivers_license' | 'national_id';

/** Response from checking KYC status. */
export interface KycStatusResponse {
  status: KycProviderStatus;
  message?: string;
}
