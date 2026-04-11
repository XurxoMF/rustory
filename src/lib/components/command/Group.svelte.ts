import { Item } from "./Item.svelte";

export class Group {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(group: { heading: string; items: Item[] }) {
		this._heading = $state(group.heading);
		this._items = $state(group.items);
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The heading of the group.
	 */
	private _heading: string;

	/**
	 * The items in the group.
	 */
	private _items: Item[];

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The heading of the group.
	 */
	public get heading(): string {
		return this._heading;
	}

	/**
	 * The items in the group.
	 */
	public get items(): Item[] {
		return this._items;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
