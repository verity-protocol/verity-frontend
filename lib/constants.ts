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
    /** GET /did/:identifier — resolve a DID to its resolution document. */
    resolve: (identifier: string) => `/did/${identifier}`,
    /** GET /did/wallet/:address — resolve DIDs linked to a wallet. */
    findByWallet: (address: string) => `/did/wallet/${address}`,
    /** GET /did/:identifier/wallets — list wallets linked to a DID. */
    listWallets: (identifier: string) => `/did/${identifier}/wallets`,
    /** POST /did/prepare — start DID creation (returns unsigned tx). */
    prepareCreate: '/did/prepare',
    /** POST /did/prepare/link — authorize linking a wallet. */
    prepareLink: '/did/prepare/link',
    /** POST /did/prepare/unlink — authorize unlinking a wallet. */
    prepareUnlink: '/did/prepare/unlink',
    /** POST /did/confirm — finish DID creation with a signed tx. */
    confirmCreate: '/did/confirm',
    /** POST /did/confirm/link — finish linking with a signed tx. */
    confirmLink: '/did/confirm/link',
    /** POST /did/confirm/unlink — finish unlinking with a signed tx. */
    confirmUnlink: '/did/confirm/unlink',
    /** PATCH /did/:identifier/verification — admin-gated on-chain set_verified. */
    setVerification: (identifier: string) => `/did/${identifier}/verification`,
  },
  credentials: {
    /** GET /credentials/:did — list credentials for a DID. */
    list: (did: string) => `/credentials/${did}`,
    /** GET /credentials/:did/:type — fetch one credential. */
    get: (did: string, type: string) => `/credentials/${did}/${type}`,
    /** POST /credentials — issue a credential on-chain. */
    issue: '/credentials',
    /** POST /credentials/:did/:type/revoke — revoke a credential on-chain. */
    revoke: (did: string, type: string) => `/credentials/${did}/${type}/revoke`,
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
