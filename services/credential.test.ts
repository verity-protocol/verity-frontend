import { afterEach, describe, expect, it, vi } from 'vitest';
import { DidFormatError } from '@/lib/did';
import { getCredential, getCredentials, issueCredential, revokeCredential } from '@/services/credential';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants';

const HEX = 'cd'.repeat(32);
const DID = `did:verity:${HEX}`;

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => JSON.stringify(body),
  };
}

const CREDENTIAL = {
  id: 'cred-1',
  didId: '1',
  issuerId: '4',
  credentialType: 'kyc_basic',
  credentialHash: '12'.repeat(32),
  isRevoked: false,
  issuedAt: '2026-01-01T00:00:00.000Z',
  revokedAt: null,
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('getCredentials', () => {
  it('GETs the credentials list for a canonical DID', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([CREDENTIAL]));
    vi.stubGlobal('fetch', fetchMock);

    const result = await getCredentials(DID);

    expect(result).toEqual([CREDENTIAL]);
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}${API_ENDPOINTS.credentials.list(encodeURIComponent(DID))}`,
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('rejects an invalid identifier without hitting the network', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await expect(getCredentials(HEX)).rejects.toThrow(DidFormatError);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('getCredential', () => {
  it('GETs a credential by type with both segments encoded', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(CREDENTIAL));
    vi.stubGlobal('fetch', fetchMock);

    await getCredential(DID, 'kyc_basic');

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}${API_ENDPOINTS.credentials.get(encodeURIComponent(DID), 'kyc_basic')}`,
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });
});

describe('issueCredential', () => {
  it('POSTs the exact backend DTO body (did, credentialType, credentialHash)', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(CREDENTIAL, 201));
    vi.stubGlobal('fetch', fetchMock);

    const request = {
      did: DID,
      credentialType: 'kyc_basic',
      credentialHash: '12'.repeat(32),
    };

    await issueCredential(request);

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}${API_ENDPOINTS.credentials.issue}`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(request),
      }),
    );
  });
});

describe('revokeCredential', () => {
  it('POSTs to the revoke route with the issuer address body', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(CREDENTIAL, 201));
    vi.stubGlobal('fetch', fetchMock);

    await revokeCredential(DID, 'kyc_basic', { issuerAddress: 'GISSUER' });

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}${API_ENDPOINTS.credentials.revoke(encodeURIComponent(DID), 'kyc_basic')}`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ issuerAddress: 'GISSUER' }),
      }),
    );
  });
});