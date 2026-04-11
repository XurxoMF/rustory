import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SvelteSet } from "svelte/reactivity";

/**
 * Merges muliple classes overriding the previous ones if there are duplicates.
 * @param inputs Classes to merge
 * @returns The merged classes
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;

export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;

export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

/**
 * Sleeps the app for the amount of ms passed.
 * Use it with await sleep(x).
 * @param ms - Miliseconds to sleep.
 * @returns A new Promise that resolvers after the ms time.
 */
export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Same thing as the *Array.some()* method but for Sets and SvelteSets.
 * @param set - The Set or SvelteSet to check.
 * @param fn - The callback with the condition.
 * @returns True if the callback returns true for any item in the set, false otherwise.
 */
export function someInSet<T>(set: Set<T> | SvelteSet<T>, fn: (item: T) => boolean) {
	for (const item of set) if (fn(item)) return true;
	return false;
}

/**
 * Adds padding to a string where you want until it reaches a specified length.
 * @param str The string to add padding to.
 * @param length The total length of the resulting string.
 * @param padChar The character to use for padding (default is a space). Defaults to `' '`.
 * @param position The position of the padding (default is right).
 * @returns The padded string.
 */
export function padSides(
	str: string,
	length: number,
	options: { padChar: string; position: "left" | "right" } = { padChar: " ", position: "right" }
): string {
	if (options.position === "right") {
		return str + options.padChar.repeat(Math.max(0, length - str.length));
	} else {
		return options.padChar.repeat(Math.max(0, length - str.length)) + str;
	}
}

/**
 * Adds padding on the middle of a string until it reaches a specified length.
 * @param str The string to add padding to.
 * @param length The total length of the resulting string.
 * @param padChar The character to use for padding (default is a space). Defaults to `' '`.
 * @returns The padded string.
 */
export function padCenter(strLeft: string, strRight: string, length: number, options: { padChar: string } = { padChar: " " }): string {
	return strLeft + options.padChar.repeat(Math.max(0, length - (strLeft.length + strRight.length))) + strRight;
}

/**
 * Cleans a string to use it on paths. Removes special characters, spaces and other things.
 * @param str The string to clean.
 * @returns The clean string.
 */
export function cleanPath(str: string): string {
	return str
		.replace(/[<>:"/\\|?*]/g, "-")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}
