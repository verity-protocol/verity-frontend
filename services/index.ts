export { resolveDid, createDid, getLinkedWallets, linkWallet, unlinkWallet, setVerification } from './did';
export { getCredentials, issueCredential } from './credential';
export { createSession, getSession, approveSession, denySession, verifyToken } from './auth';
export { submitDocument, checkKycStatus } from './kyc';
export { queryContract, getAccountBalance } from './stellar';
export { getIssuers, getIssuer, registerIssuer } from './issuer';
