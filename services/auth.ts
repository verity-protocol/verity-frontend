/**
 * Auth service — API calls for authorization sessions.
 *
 * Third-party apps use these endpoints to request verification from a user.
 * The popup flow creates a session, the user approves/denies, and the app
 * receives only a verification signal — never the wallet address.
 *
 * TODO: Replace all mock returns with real fetch() calls to the backend.
 */

import type { AuthorizationSession, CreateSessionRequest, AuthResponse } from '@/types';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants';

/**
 * Create a new authorization session (third-party app initiates).
 *
 * TODO: Implement — POST ${API_BASE_URL}${API_ENDPOINTS.auth.createSession}
 * Body: { didAddress, appName, appUrl, requestedClaims }
 */
export async function createSession(
  _request: CreateSessionRequest,
): Promise<{ token: string; expiresAt: string }> {
  // TODO: Replace with real API call
  return {
    token: 'session-token-abc123',
    expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
  };
}

/**
 * Get session details by token.
 *
 * TODO: Implement — GET ${API_BASE_URL}${API_ENDPOINTS.auth.getSession(token)}
 */
export async function getSession(_token: string): Promise<AuthorizationSession> {
  // TODO: Replace with real API call
  return {
    id: 'session-001',
    token: _token,
    didId: 'did-001',
    appName: 'Example App',
    appUrl: 'https://example.com',
    status: 'pending',
    requestedClaims: { verified: true },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    resolvedAt: null,
  };
}

/**
 * Approve a session (user clicked approve in popup).
 *
 * TODO: Implement — POST ${API_BASE_URL}${API_ENDPOINTS.auth.approve(token)}
 */
export async function approveSession(_token: string): Promise<AuthResponse> {
  // TODO: Replace with real API call
  return { verified: true };
}

/**
 * Deny a session (user clicked deny in popup).
 *
 * TODO: Implement — POST ${API_BASE_URL}${API_ENDPOINTS.auth.deny(token)}
 */
export async function denySession(_token: string): Promise<AuthResponse> {
  // TODO: Replace with real API call
  return { verified: false };
}

/**
 * Verify a token (third-party app polls for result).
 *
 * TODO: Implement — GET ${API_BASE_URL}${API_ENDPOINTS.auth.verify(token)}
 */
export async function verifyToken(
  _token: string,
): Promise<{ verified: boolean; did?: string }> {
  // TODO: Replace with real API call
  return { verified: false };
}
