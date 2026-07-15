'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthState {
  /** Current session token, null if not authenticated */
  token: string | null;
  /** Whether the user has an active session */
  isAuthenticated: boolean;
  /** DID address if authenticated */
  didAddress: string | null;
}

interface AuthContextValue extends AuthState {
  /** Set session after login/auth flow */
  setSession: (token: string, didAddress: string) => void;
  /** Clear session */
  clearSession: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * AuthProvider — manages authentication session state.
 *
 * TODO: Implement full auth flow
 * - Load session from localStorage on mount
 * - Validate session with backend
 * - Handle session expiry
 * - Integrate with wallet connection
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [didAddress, setDidAddress] = useState<string | null>(null);

  const setSession = (newToken: string, newDidAddress: string) => {
    setToken(newToken);
    setDidAddress(newDidAddress);
    // TODO: Persist to localStorage
  };

  const clearSession = () => {
    setToken(null);
    setDidAddress(null);
    // TODO: Clear localStorage
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        didAddress,
        setSession,
        clearSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access authentication state.
 *
 * Must be used within an AuthProvider.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
