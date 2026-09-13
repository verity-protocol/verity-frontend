export { resolveDid, findDidByWallet, getLinkedWallets, prepareCreate, prepareLink, prepareUnlink, confirmCreate, confirmLink, confirmUnlink, setVerification, classifyDidConflict } from './did';
export { getCredentials, getCredential, issueCredential, revokeCredential } from './credential';
export { createSession, getSession, approveSession, denySession, verifyToken } from './auth';
export { submitDocument, checkKycStatus } from './kyc';
export { getIssuers, getIssuer, registerIssuer } from './issuer';
