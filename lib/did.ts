/**
 * Verity DID identifier helpers.
 *
 * Identifiers are canonical `did:verity:` URIs followed by 64 lowercase
 * hexadecimal characters (a SHA-256 digest). The backend rejects raw hex
 * and any other prefix, so every identifier must pass through these helpers
 * before it is sent to the API.
 */

export const DID_PREFIX = 'did:verity:';
export const DID_HEX_LENGTH = 64;

const HEX_PATTERN = new RegExp(`^[0-9a-f]{${DID_HEX_LENGTH}}$`);

/** Error thrown when an identifier does not match the canonical format. */
export class DidFormatError extends Error {
  constructor(value: string) {
    super(
      `Invalid DID identifier: expected ${DID_PREFIX}<${DID_HEX_LENGTH} lowercase hex>, got "${value}"`,
    );
    this.name = 'DidFormatError';
  }
}

/**
 * Whether a value is a canonical `did:verity:` identifier.
 *
 * @param value - Candidate identifier string
 * @returns True if the value is a canonical DID identifier
 */
export function isDidIdentifier(value: string): boolean {
  if (typeof value !== 'string' || !value.startsWith(DID_PREFIX)) {
    return false;
  }
  return HEX_PATTERN.test(value.slice(DID_PREFIX.length));
}

/**
 * Normalize a canonical identifier to its raw 64-hex form.
 *
 * @param value - Canonical `did:verity:` identifier
 * @returns The 64-character lowercase hex digest
 * @throws {DidFormatError} If the value is not a canonical identifier
 */
export function normalizeDidIdentifier(value: string): string {
  if (!isDidIdentifier(value)) {
    throw new DidFormatError(value);
  }
  return value.slice(DID_PREFIX.length);
}

/**
 * Build a canonical identifier from a raw 64-hex digest.
 *
 * @param hex - 64-character lowercase hex digest
 * @returns The canonical `did:verity:` identifier
 * @throws {DidFormatError} If the hex is not well-formed
 */
export function toDidIdentifier(hex: string): string {
  if (!HEX_PATTERN.test(hex)) {
    throw new DidFormatError(hex);
  }
  return `${DID_PREFIX}${hex}`;
}