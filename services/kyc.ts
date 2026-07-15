/**
 * KYC service — API calls for document verification.
 *
 * IMPORTANT: Documents are NEVER stored by Verity.
 * They pass directly from the browser to the KYC provider API.
 *
 * TODO: Replace all mock returns with real fetch() calls to the backend.
 */

import type { DocumentType, KycStatusResponse } from '@/types';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants';

/**
 * Submit a document to the KYC provider for verification.
 *
 * TODO: Implement — POST ${API_BASE_URL}${API_ENDPOINTS.kyc.submit}
 * Body: { didAddress, documentType, documentData }
 * NOTE: documentData is passed directly to the provider — never stored.
 */
export async function submitDocument(
  _didAddress: string,
  _documentType: DocumentType,
  _documentData: string,
): Promise<{ submissionId: string }> {
  // TODO: Replace with real API call
  return { submissionId: 'sub-' + Date.now() };
}

/**
 * Check the status of a KYC submission.
 *
 * TODO: Implement — GET ${API_BASE_URL}${API_ENDPOINTS.kyc.status(submissionId)}
 */
export async function checkKycStatus(_submissionId: string): Promise<KycStatusResponse> {
  // TODO: Replace with real API call
  return { status: 'processing' };
}
