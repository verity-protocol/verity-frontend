import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { signTransaction } from '@/lib/stellar';
import * as freighter from '@stellar/freighter-api';

vi.mock('@stellar/freighter-api', () => ({
  isConnected: vi.fn(),
  getAddress: vi.fn(),
  getNetwork: vi.fn(),
  signTransaction: vi.fn(),
}));

const mockedFreighter = vi.mocked(freighter);

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

beforeEach(() => {
  mockedFreighter.getNetwork.mockResolvedValue({ network: 'TESTNET' });
});

describe('signTransaction', () => {
  it('signs with the testnet passphrase when Freighter is on testnet', async () => {
    mockedFreighter.signTransaction.mockResolvedValue({
      signedTxXdr: 'signed-xdr',
      signerAddress: 'GOWNER',
    });

    const result = await signTransaction('unsigned-xdr');

    expect(result).toBe('signed-xdr');
    expect(mockedFreighter.signTransaction).toHaveBeenCalledWith(
      'unsigned-xdr',
      {
        networkPassphrase: 'Test SDF Future Network ; October 2022',
      },
    );
  });

  it('signs with the mainnet passphrase when Freighter is on mainnet', async () => {
    mockedFreighter.getNetwork.mockResolvedValue({
      network: 'PUBLIC',
    });
    mockedFreighter.signTransaction.mockResolvedValue({
      signedTxXdr: 'signed-xdr',
      signerAddress: 'GOWNER',
    });

    await signTransaction('unsigned-xdr');

    expect(mockedFreighter.signTransaction).toHaveBeenCalledWith(
      'unsigned-xdr',
      {
        networkPassphrase: 'Public Global Stellar Network ; September 2015',
      },
    );
  });

  it('propagates the passphrase mismatch / cancellation error', async () => {
    mockedFreighter.signTransaction.mockRejectedValue(
      new Error('Network passphrase mismatch'),
    );

    await expect(signTransaction('unsigned-xdr')).rejects.toThrow(
      'Network passphrase mismatch',
    );
  });
});