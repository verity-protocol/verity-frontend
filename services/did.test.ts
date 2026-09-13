import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '@/lib/api';
import { DidFormatError } from '@/lib/did';
import {
  classifyDidConflict,
  confirmCreate,
  findDidByWallet,
  prepareCreate,
  resolveDid,
} from '@/services/did';
import { API_ENDPOINTS, API_BASE_URL } from '@/lib/constants';

const HEX = 'ab'.repeat(32);
const DID = `did:verity:${HEX}`;

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => JSON.stringify(body),
  };
}

const RESOLUTION = {
  did: DID,
  owner: 'GOWNER',
  isVerified: false,
  wallets: ['GOWNER'],
  credentials: [],
  createdAt: '2026-01-01T00:00:00.000Z',
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('resolveDid', () => {
  it('GETs the resolution document for a canonical identifier', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(RESOLUTION));
    vi.stubGlobal('fetch', fetchMock);

    const result = await resolveDid(DID);

    expect(result).toEqual(RESOLUTION);
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}${API_ENDPOINTS.did.resolve(encodeURIComponent(DID))}`,
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('rejects an invalid identifier without hitting the network', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await expect(resolveDid(HEX)).rejects.toThrow(DidFormatError);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('throws ApiError with the backend message on 404', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(
          { statusCode: 404, message: `No DID found: ${DID}`, error: 'Not Found' },
          404,
        ),
      ),
    );

    await expect(resolveDid(DID)).rejects.toMatchObject({
      name: 'ApiError',
      status: 404,
      message: `No DID found: ${DID}`,
    });
  });
});

describe('findDidByWallet', () => {
  it('returns the resolution when a DID is found', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse(RESOLUTION)),
    );

    await expect(findDidByWallet('GOWNER')).resolves.toEqual(RESOLUTION);
  });

  it('returns null on 404 so callers can detect "not onboarded"', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          jsonResponse({ message: 'No DID found for wallet GOWNER' }, 404),
        ),
    );

    await expect(findDidByWallet('GOWNER')).resolves.toBeNull();
  });

  it('rethrows non-404 errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({ message: 'boom' }, 500)),
    );

    await expect(findDidByWallet('GOWNER')).rejects.toBeInstanceOf(ApiError);
  });
});

describe('prepareCreate / confirmCreate', () => {
  it('POSTs the prepare body and does not add a nullifier', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        jsonResponse({
          method: 'create_did',
          contractId: 'CCONTRACT',
          did: DID,
          txXdr: 'AAAA',
          authExpirationLedgers: [123, 124],
          validUntilLedger: 123,
        }),
      );
    vi.stubGlobal('fetch', fetchMock);

    await prepareCreate({ ownerAddress: 'GOWNER' });

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}${API_ENDPOINTS.did.prepareCreate}`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ ownerAddress: 'GOWNER' }),
      }),
    );
  });

  it('POSTs the signed XDR to confirm', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(RESOLUTION));
    vi.stubGlobal('fetch', fetchMock);

    await confirmCreate({ txXdr: 'signed-xdr' });

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}${API_ENDPOINTS.did.confirmCreate}`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ txXdr: 'signed-xdr' }),
      }),
    );
  });

  it('surfaces 409 expiry as a classified ApiError', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(
          { statusCode: 409, message: 'DID prepare has expired; prepare a new transaction' },
          409,
        ),
      ),
    );

    const error = await prepareCreate({ ownerAddress: 'GOWNER' }).catch(
      (err: unknown) => err,
    );

    expect(error).toBeInstanceOf(ApiError);
    if (error instanceof ApiError) {
      expect(error.status).toBe(409);
      expect(classifyDidConflict(error.message)).toBe('expired');
    }
  });
});

describe('classifyDidConflict', () => {
  it('classifies expired auth entries', () => {
    expect(
      classifyDidConflict('DID prepare has expired; prepare a new transaction'),
    ).toBe('expired');
  });

  it('classifies submission contention', () => {
    expect(
      classifyDidConflict('Transaction submission collided repeatedly; retry shortly'),
    ).toBe('contention');
  });

  it('treats unrecognized messages conservatively as unknown', () => {
    expect(classifyDidConflict('something else')).toBe('unknown');
  });
});