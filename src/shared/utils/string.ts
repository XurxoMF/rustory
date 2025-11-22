/**
 * Adds padding to the right side of a string until it reaches a specified length.
 * @param str The string to add padding to.
 * @param length The total length of the resulting string.
 * @param padChar The character to use for padding (default is a space). Defaults to `' '`.
 * @returns
 */
export function padRight(str: string, length: number, padChar: string = ' '): string {
  return str + padChar.repeat(Math.max(0, length - str.length))
}

/**
 * Adds padding to the left side of a string until it reaches a specified length.
 * @param str The string to add padding to.
 * @param length The total length of the resulting string.
 * @param padChar The character to use for padding (default is a space). Defaults to `' '`.
 * @returns
 */
export function padLeft(str: string, length: number, padChar: string = ' '): string {
  return padChar.repeat(Math.max(0, length - str.length)) + str
}

/**
 * Adds padding on the middle of a string until it reaches a specified length.
 * @param str The string to add padding to.
 * @param length The total length of the resulting string.
 * @param padChar The character to use for padding (default is a space). Defaults to `' '`.
 * @returns
 */
export function padMid(strLeft: string, strRight: string, length: number, padChar: string = ' '): string {
  return strLeft + padChar.repeat(Math.max(0, length - (strLeft.length + strRight.length))) + strRight
}

/**
 * Cleans a string to use it on paths. Removes special characters, spaces and other things.
 * @param str The string to clean.
 * @returns The clean string.
 */
export function cleanStringPath(str: string): string {
  return str
    .replace(/[<>:"/\\|?*]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
