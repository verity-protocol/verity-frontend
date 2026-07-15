/**
 * Auth / Authorization types — mirrors backend AuthorizationSession entity.
 *
 * Third-party apps request verification via an OAuth-like popup flow.
 * The user approves/denies in the popup, and the app receives only
 * a verification signal — never the wallet address.
 */

/** An authorization session created by a third-party app. */
export interface AuthorizationSession {
  id: string;
  token: string;
  didId: string;
  appName: string;
  appUrl: string;
  status: AuthorizationStatus;
  requestedClaims: Record<string, unknown>;
  createdAt: string;
  expiresAt: string;
  resolvedAt: string | null;
}

export type AuthorizationStatus = 'pending' | 'approved' | 'denied' | 'expired';

/** Request to create a new authorization session. */
export interface CreateSessionRequest {
  didAddress: string;
  appName: string;
  appUrl: string;
  requestedClaims: Record<string, unknown>;
}

/** Response from the authorization popup after approval/denial. */
export interface AuthResponse {
  verified: boolean;
  did?: string;
}

/** Connected app record — created after a user approves an auth session. */
export interface ConnectedApp {
  id: string;
  didId: string;
  appName: string;
  appUrl: string;
  accessGrantedAt: string;
}
