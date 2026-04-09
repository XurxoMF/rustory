import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SvelteSet } from "svelte/reactivity";
import { trace, info, warn, error, debug } from "@tauri-apps/plugin-log";

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
 * Extends the console log methods to log to both the log files and the web console.
 * @returns A function to restore the original console log methods.
 */
export async function extendConsoleLog(): Promise<() => void> {
	// Save the original console log methods
	const original = {
		log: console.log,
		warn: console.warn,
		error: console.error,
		trace: console.trace,
		debug: console.debug
	};

	// Override the console log methods to log to both the log files and the web console
	console.log = (...args) => {
		original.log(...args);
		info(`[WEB CONSOLE] ${args.join(" | ")}`);
	};
	console.warn = (...args) => {
		original.warn(...args);
		warn(`[WEB CONSOLE] ${args.join(" | ")}`);
	};
	console.error = (...args) => {
		original.error(...args);
		error(`[WEB CONSOLE] ${args.join(" | ")}`);
	};
	console.trace = (...args) => {
		original.trace(...args);
		trace(`[WEB CONSOLE] ${args.join(" | ")}`);
	};
	console.debug = (...args) => {
		original.debug(...args);
		debug(`[WEB CONSOLE] ${args.join(" | ")}`);
	};

	return () => {
		// Restore the original console log methods
		console.log = original.log;
		console.warn = original.warn;
		console.error = original.error;
		console.trace = original.trace;
		console.debug = original.debug;
	};
}
