/**
 * Converts bytes to a specified unit.
 * @param bytes Number of bytes to convert.
 * @param unit The unit to convert to. Defaults to 'MB'.
 * @returns Bytes converted to the selected unit.
 */
export function bytesToX(bytes: number, unit: SizeUitsType = 'MB'): number {
  const units: SizeUitsType[] = ['KB', 'MB', 'GB', 'TB']
  const index = units.indexOf(unit)

  if (index === -1) throw new Error('Invalid unit!')

  return Math.round(bytes / Math.pow(1024, index + 1))
}
