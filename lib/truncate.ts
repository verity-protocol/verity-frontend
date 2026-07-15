/**
 * Address truncation utility.
 *
 * RULE: Never display full wallet addresses in the UI.
 * Always truncate to first 6 and last 4 characters.
 * Display in JetBrains Mono font via the `font-mono` Tailwind class.
 *
 * Example: "GCKFBEIYTX2L5...ZQ4OA" for a 56-char Stellar address.
 */

/** Number of characters to show from the start of the address. */
const START_CHARS = 6;

/** Number of characters to show from the end of the address. */
const END_CHARS = 4;

/** Minimum length before truncation is applied. */
const MIN_LENGTH = START_CHARS + END_CHARS + 4;

/**
 * Truncate a Stellar address for display.
 *
 * @param address - Full Stellar address (starts with G for public keys, C for contract addresses)
 * @param startChars - Characters to keep from start (default: 6)
 * @param endChars - Characters to keep from end (default: 4)
 * @returns Truncated address with ellipsis, or original if too short
 *
 * @example
 * truncateAddress("GCKFBEIYTX2L5OS6XRIHF2OZQ4OA")
 * // => "GCKFBE...ZQ4OA"
 */
export function truncateAddress(
  address: string,
  startChars: number = START_CHARS,
  endChars: number = END_CHARS,
): string {
  if (!address || address.length < MIN_LENGTH) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}
