import { goto } from "$app/navigation";
import { resolve } from "$app/paths";

import IconHome from "@tabler/icons-svelte/icons/home";

import { Group } from "./Group.svelte";
import { Item } from "./Item.svelte";

/**
 * Store for the command dialog.
 */
export class Store {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	/**
	 * Singleton instance of the Store.
	 */
	private static _instance: Store = new Store();

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	/**
	 * Get the instance of the Store.
	 */
	public static get instance(): Store {
		return Store._instance;
	}

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor() {
		this._open = $state(false);
		this._groups = $state([]);
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * If the command dialog is open or not.
	 */
	private _open: boolean;

	/**
	 * The groups of the command dialog.
	 */
	private _groups: Group[];

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * If the command dialog is open or not.
	 */
	public get open(): boolean {
		return this._open;
	}

	/**
	 * If the command dialog is open or not.
	 */
	public set open(open: boolean) {
		this._open = open;
	}

	/**
	 * The groups of the command dialog.
	 */
	public get groups(): Group[] {
		return this._groups;
	}

	/**
	 * The groups of the command dialog.
	 */
	public set groups(groups: Group[]) {
		this._groups = groups;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Load the commands.
	 */
	public async loadCommands(): Promise<void> {
		const pages = [new Item({ value: "home", title: "Home", icon: IconHome, keywords: ["page", "home"], onselect: () => goto(resolve("/")) })];

		const pagesGroup = new Group({ heading: "Pages", items: pages });

		this.groups = [pagesGroup];
	}
}
