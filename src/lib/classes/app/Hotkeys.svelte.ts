import { error } from "@tauri-apps/plugin-log";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";

import { CommandStore } from "$lib/components/command";

/**
 * Hotkeys of the app.
 */
export class Hotkeys {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor(hotkeys: { hotkeys: Hotkey[] }) {
		this._hotkeys = $state(hotkeys.hotkeys);

		// Add the event listener to detect pressed keys
		window.addEventListener("keydown", this.handleKeyDown);
	}

	/**
	 * Loads all the hotkeys on this instance.
	 */
	public static async init(): Promise<Hotkeys> {
		try {
			const hks: Hotkey[] = [];

			const hkOpenCommand = new Hotkey({
				id: "hkOpenCommand",
				keys: ["ctrl", "k"],
				action: () => {
					CommandStore.instance.open = true;
				}
			});

			hks.push(hkOpenCommand);

			return new Hotkeys({
				hotkeys: hks
			});
		} catch (err) {
			error(`There was an error initializating the hotkeys:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error initializating the hotkeys!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * Hotkeys of the app.
	 */
	private _hotkeys: Hotkey[];

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * Hotkeys of the app.
	 */
	public get hotkeys(): Hotkey[] {
		return this._hotkeys;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Normalizes a key.
	 * @param key The key to normalize.
	 * @returns The key normalized.
	 */
	private static normalizeKey(key: string): string {
		return key.toLowerCase();
	}

	/**
	 * Handles the keydown event.
	 * @param e The keydown event.
	 */
	private handleKeyDown = (e: KeyboardEvent) => {
		const pressed: string[] = [];

		if (e.ctrlKey) pressed.push("ctrl");
		if (e.shiftKey) pressed.push("shift");
		if (e.altKey) pressed.push("alt");
		if (e.metaKey) pressed.push("meta");

		const mainKey = Hotkeys.normalizeKey(e.key);
		if (!["control", "shift", "alt", "meta"].includes(mainKey)) {
			pressed.push(mainKey);
		}

		for (const hk of this._hotkeys) {
			if (Hotkeys.isMatch(hk.keys, pressed)) {
				e.preventDefault();
				hk.action();
				break;
			}
		}
	};

	/**
	 * Checks if the keys are the same.
	 * @param defined The keys defined.
	 * @param pressed The keys pressed.
	 * @returns True if the keys are the same.
	 */
	private static isMatch(defined: string[], pressed: string[]): boolean {
		const a = [...defined].sort().join("+");
		const b = [...pressed].sort().join("+");
		return a === b;
	}
}

/**
 * A Hotkey.
 */
export class Hotkey {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(hotkey: { id: string; keys: string[]; action: () => void | Promise<void> }) {
		this._id = hotkey.id;
		this._keys = hotkey.keys;
		this._action = hotkey.action;
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The ID of the hotkey.
	 */
	private _id: string;

	/**
	 * The keys of the hotkey.
	 */
	private _keys: string[];

	/**
	 * The action of the hotkey.
	 */
	private _action: () => void | Promise<void>;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The ID of the hotkey.
	 */
	public get id(): string {
		return this._id;
	}

	/**
	 * The keys of the hotkey.
	 */
	public get keys(): string[] {
		return this._keys;
	}

	/**
	 * The action of the hotkey.
	 */
	public get action(): () => void | Promise<void> {
		return this._action;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
