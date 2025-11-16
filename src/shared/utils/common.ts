import { SvelteSet } from 'svelte/reactivity'

/**
 * Sleeps the app for the amount of ms passed.
 * Use it with await sleep(x).
 * @param ms - Miliseconds to sleep.
 * @returns A new Promise that resolvers after the ms time.
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Same thing as the *Array.some()* method but for Sets and SvelteSets.
 * @param set - The Set or SvelteSet to check.
 * @param fn - The callback with the condition.
 * @returns True if the callback returns true for any item in the set, false otherwise.
 */
export function someInSet<T>(set: Set<T> | SvelteSet<T>, fn: (item: T) => boolean) {
  for (const item of set) if (fn(item)) return true
  return false
}
