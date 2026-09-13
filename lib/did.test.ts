import { describe, expect, it } from 'vitest';
import {
  DID_PREFIX,
  DidFormatError,
  isDidIdentifier,
  normalizeDidIdentifier,
  toDidIdentifier,
} from '@/lib/did';

const HEX = 'a'.repeat(64);
const CANONICAL = `${DID_PREFIX}${HEX}`;

describe('isDidIdentifier', () => {
  it('accepts a canonical identifier', () => {
    expect(isDidIdentifier(CANONICAL)).toBe(true);
  });

  it('rejects a raw hex digest without the prefix', () => {
    expect(isDidIdentifier(HEX)).toBe(false);
  });

  it('rejects non-hex characters', () => {
    expect(isDidIdentifier(`${DID_PREFIX}${'z'.repeat(64)}`)).toBe(false);
  });

  it('rejects uppercase hex', () => {
    expect(isDidIdentifier(`${DID_PREFIX}${HEX.toUpperCase()}`)).toBe(false);
  });

  it('rejects a wrong prefix', () => {
    expect(isDidIdentifier(`did:stellar:${HEX}`)).toBe(false);
  });

  it('rejects wrong-length digests', () => {
    expect(isDidIdentifier(`${DID_PREFIX}${'a'.repeat(63)}`)).toBe(false);
    expect(isDidIdentifier(`${DID_PREFIX}${'a'.repeat(65)}`)).toBe(false);
  });
});

describe('normalizeDidIdentifier', () => {
  it('extracts the raw hex digest', () => {
    expect(normalizeDidIdentifier(CANONICAL)).toBe(HEX);
  });

  it('throws DidFormatError for invalid identifiers', () => {
    expect(() => normalizeDidIdentifier(HEX)).toThrow(DidFormatError);
    expect(() => normalizeDidIdentifier('nonsense')).toThrow(DidFormatError);
  });
});

describe('toDidIdentifier', () => {
  it('builds a canonical identifier from a hex digest', () => {
    expect(toDidIdentifier(HEX)).toBe(CANONICAL);
  });

  it('throws DidFormatError for invalid hex', () => {
    expect(() => toDidIdentifier('not-hex')).toThrow(DidFormatError);
    expect(() => toDidIdentifier('a'.repeat(64).toUpperCase())).toThrow(
      DidFormatError,
    );
  });
});