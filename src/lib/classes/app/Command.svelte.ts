import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import type { Icon } from "@tabler/icons-svelte";

import IconHome from "@tabler/icons-svelte/icons/home";
import IconDeviceGamepad from "@tabler/icons-svelte/icons/device-gamepad";
import IconPlus from "@tabler/icons-svelte/icons/plus";
import IconSettings from "@tabler/icons-svelte/icons/settings";

export class CommandItem {
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

export class CommandGroup {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(group: { heading: string; items: CommandItem[] }) {
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
	private _items: CommandItem[];

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
	public get items(): CommandItem[] {
		return this._items;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}

/**
 * Store for the command dialog.
 */
export class Command {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor(command: { groups: CommandGroup[] }) {
		this._open = $state(false);
		this._groups = $state(command.groups);
	}

	/**
	 * Loads all the available commands.
	 */
	public static async init(): Promise<Command> {
		const pages = [
			new CommandItem({ value: "home", title: "Home", icon: IconHome, keywords: ["page", "home"], onselect: () => goto(resolve("/")) }),
			new CommandItem({
				value: "vs-instances",
				title: "Vintage Story Instances",
				icon: IconDeviceGamepad,
				keywords: ["page", "instance", "vintage story"],
				onselect: () => goto(resolve("/vs-instances"))
			}),
			new CommandItem({
				value: "vs-instances-create",
				title: "Create a Vintage Story Instance",
				icon: IconPlus,
				keywords: ["page", "instance", "vintage story", "create"],
				onselect: () => goto(resolve("/vs-instances/create"))
			}),
			new CommandItem({
				value: "settings",
				title: "Settings",
				icon: IconSettings,
				keywords: ["page", "settings"],
				onselect: () => goto(resolve("/settings"))
			})
		];

		const pagesGroup = new CommandGroup({ heading: "Pages", items: pages });

		return new Command({
			groups: [pagesGroup]
		});
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
	private _groups: CommandGroup[];

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
	public get groups(): CommandGroup[] {
		return this._groups;
	}

	/**
	 * The groups of the command dialog.
	 */
	public set groups(groups: CommandGroup[]) {
		this._groups = groups;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
