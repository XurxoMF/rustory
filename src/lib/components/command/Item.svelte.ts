import type { Icon } from "@tabler/icons-svelte";

export class Item {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(item: { value: string; title: string; icon: Icon | undefined; keywords: string[]; onselect: () => void | Promise<void> }) {
		this._value = $state(item.value);
		this._title = $state(item.title);
		this._icon = $state(item.icon);
		this._keywords = $state(item.keywords);
		this._onSelect = $state(item.onselect);
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The value of the item.
	 */
	private _value: string;

	/**
	 * The title of the item.
	 */
	private _title: string;

	/**
	 * The icon of the item.
	 */
	private _icon: Icon | undefined;

	/**
	 * The keywords of the item.
	 */
	private _keywords: string[];

	/**
	 * The callback to execute when the item is selected.
	 */
	private _onSelect: () => void | Promise<void>;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The value of the item.
	 */
	public get value(): string {
		return this._value;
	}

	/**
	 * The title of the item.
	 */
	public get title(): string {
		return this._title;
	}

	/**
	 * The icon of the item.
	 */
	public get icon(): Icon | undefined {
		return this._icon;
	}

	/**
	 * The keywords of the item.
	 */
	public get keywords(): string[] {
		return this._keywords;
	}

	/**
	 * The callback to execute when the item is selected.
	 */
	public get onSelect(): () => void | Promise<void> {
		return this._onSelect;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
