/**
 * Masks a wallet address by showing only the first and last N characters.
 *
 * @param address   - The full wallet address to mask.
 * @param digit     - Number of characters to show at the start (and at the end
 *                    if `lastDigit` is omitted). Defaults to `4`.
 * @param lastDigit - Number of characters to show at the end. When omitted,
 *                    `digit` is used for both sides.
 *
 * @example
 * maskAddress('0x17f70644Cd731eF26CA0607ab3A71dD4A8d468Ab')
 * // → '0x17...68Ab'
 *
 * maskAddress('0x17f70644Cd731eF26CA0607ab3A71dD4A8d468Ab', 6)
 * // → '0x17f7...68Ab'
 *
 * maskAddress('0x17f70644Cd731eF26CA0607ab3A71dD4A8d468Ab', 6, 8)
 * // → '0x17f7...56ZUDOEK'
 */
export function maskAddress(
  address: string | `0x${string}`,
  digit: number = 4,
  lastDigit?: number
): string {
  const tail = lastDigit ?? digit

  if (address.length <= digit + tail) {
    return address
  }

  return `${address.slice(0, digit)}...${address.slice(-tail)}`
}