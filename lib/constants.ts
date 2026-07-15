/** App-wide constants — copy strings, API paths, configuration. */

/** Application name — used in titles, meta tags, and UI copy. */
export const APP_NAME = 'Verity';

/** Full tagline — used on the landing page hero. */
export const TAGLINE = 'Prove who you are, reveal nothing.';

/** Backend API base URL from environment. */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

/** Supported Stellar networks. */
export const STELLAR_NETWORK = (process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'testnet') as
  | 'testnet'
  | 'mainnet';

/** Horizon API URL for direct Stellar queries. */
export const HORIZON_URL =
  process.env.NEXT_PUBLIC_STELLAR_HORIZON_URL || 'https://horizon-testnet.stellar.org';

/** Soroban RPC URL for smart contract queries. */
export const RPC_URL =
  process.env.NEXT_PUBLIC_STELLAR_RPC_URL || 'https://soroban-testnet.stellar.org';

/** User-facing copy — never use "DID" in any of these. */
export const COPY = {
  identity: 'your Verity identity',
  identityShort: 'Verity identity',
  createIdentity: 'Create your identity — it\'s free',
  connectWallet: 'Connect your wallet',
  verifyOnce: 'Verify once',
  proveForever: 'Prove forever',
  documentsDeleted: 'Documents deleted immediately',
  walletPrivate: 'Your wallet stays private',
  identitySurvives: 'Identity survives wallet changes',
} as const;

/** API route paths — mirrors backend controller routes. */
export const ROUTES = {
  /** Marketing / public pages */
  home: '/',
  about: '/about',
  howItWorks: '/how-it-works',
  developers: '/developers',
  /** Authenticated app pages */
  dashboard: '/dashboard',
  dashboardWallets: '/dashboard/wallets',
  dashboardApps: '/dashboard/apps',
  identity: '/identity',
  credentials: '/credentials',
  settings: '/settings',
  /** Onboarding flow */
  create: '/create',
  createVerify: '/create/verify',
  createConfirmation: '/create/confirmation',
  /** Authorization popup */
  authorize: '/authorize',
} as const;

/** API endpoint paths — mirrors backend route definitions. */
export const API_ENDPOINTS = {
  did: {
    resolve: (id: string) => `/did/${id}`,
    create: '/did',
    wallets: (id: string) => `/did/${id}/wallets`,
    linkWallet: (id: string) => `/did/${id}/wallets`,
    unlinkWallet: (id: string, addr: string) => `/did/${id}/wallets/${addr}`,
    setVerification: (id: string) => `/did/${id}/verification`,
  },
  credentials: {
    list: (didId: string) => `/credentials/${didId}`,
    issue: '/credentials',
  },
  auth: {
    createSession: '/auth/session',
    getSession: (token: string) => `/auth/session/${token}`,
    approve: (token: string) => `/auth/session/${token}/approve`,
    deny: (token: string) => `/auth/session/${token}/deny`,
    verify: (token: string) => `/auth/verify/${token}`,
  },
  kyc: {
    submit: '/kyc/submit',
    status: (id: string) => `/kyc/status/${id}`,
  },
  issuers: {
    list: '/issuers',
    get: (addr: string) => `/issuers/${addr}`,
    register: '/issuers',
  },
} as const;
