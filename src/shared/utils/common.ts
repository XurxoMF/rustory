/**
 * Sleeps the app for the amount of ms passed.
 *
 * Use it with await sleep(x).
 *
 * @param ms - Miliseconds to sleep.
 * @returns A new Promise that resolvers after the ms time.
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
