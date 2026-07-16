import { describe, it, expect } from 'vitest';
import { truncateAddress } from '@/lib/truncate';

describe('truncateAddress', () => {
  it('should truncate a standard Stellar address', () => {
    const address = 'GCKFBEIYTX2L5OS6XRIHF2OZQ4OA';
    const result = truncateAddress(address);
    expect(result).toBe('GCKFBE...Q4OA');
  });

  it('should return short addresses unchanged', () => {
    const short = 'GABC';
    expect(truncateAddress(short)).toBe(short);
  });

  it('should handle empty string', () => {
    expect(truncateAddress('')).toBe('');
  });

  it('should respect custom start/end lengths', () => {
    const address = 'GCKFBEIYTX2L5OS6XRIHF2OZQ4OA';
    const result = truncateAddress(address, 4, 3);
    expect(result).toBe('GCKF...4OA');
  });
});
