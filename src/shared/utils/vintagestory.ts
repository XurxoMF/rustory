/**
 * Test if a string matches the ENV variables format.
 * @param str The string to test.
 * @returns If it matches or not.
 */
export function testENVs(str: string): boolean {
  const RE = /^(?:[A-Za-z_][A-Za-z0-9_]*=(?:"[^"]+"|'[^']+'|[^,\s][^,]*))(?:\s*,\s*(?:[A-Za-z_][A-Za-z0-9_]*=(?:"[^"]+"|'[^']+'|[^,\s][^,]*)))*$/g
  return RE.test(str)
}
