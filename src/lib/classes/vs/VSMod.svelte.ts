import { App } from "$lib/classes/App.svelte";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

import type { Zip } from "$lib/classes/utils/Zip.svelte";

import { VSAPIMod } from "$lib/classes/api/VSAPIMod.svelte";

export type VSModModinfoJSON = {
	name?: string | undefined;
	Name?: string | undefined;
	modid?: string | undefined;
	Modid?: string | undefined;
	ModID?: string | undefined;
	modId?: string | undefined;
	version?: string | undefined;
	Version?: string | undefined;
	description?: string | undefined;
	Description?: string | undefined;
	side?: string | undefined;
	Side?: string | undefined;
	authors?: string[] | undefined;
	Authors?: string[] | undefined;
	author?: string | undefined;
	Author?: string | undefined;
	contributors?: string[] | undefined;
	Contributors?: string[] | undefined;
	type?: string | undefined;
	Type?: string | undefined;
};

/**
 * Installed Vintage Story Mod info.
 */
export class VSMod {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(vsMod: {
		zip: Zip;
		name: string;
		modid: string;
		version: string;
		description?: string | undefined;
		side?: string | undefined;
		authors: string[];
		contributors: string[];
		type?: string | undefined;
		state?: VSModState | undefined;
	}) {
		this._zip = vsMod.zip;
		this._name = vsMod.name;
		this._modid = vsMod.modid;
		this._version = vsMod.version;
		this._description = vsMod.description;
		this._side = vsMod.side;
		this._authors = vsMod.authors;
		this._contributors = vsMod.contributors;
		this._type = vsMod.type;
		this._state = $state(vsMod.state ?? VSModState.INSTALLED);
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The zip of the Vintage Story Mod.
	 */
	private _zip: Zip;

	/**
	 * The name of the Vintage Story Mod.
	 */
	private _name: string;

	/**
	 * The modid of the Vintage Story Mod.
	 */
	private _modid: string;

	/**
	 * The version of the Vintage Story Mod.
	 */
	private _version: string;

	/**
	 * The description of the Vintage Story Mod.
	 */
	private _description?: string | undefined;

	/**
	 * The side of the Vintage Story Mod.
	 */
	private _side?: string | undefined;

	/**
	 * The authors of the Vintage Story Mod.
	 */
	private _authors: string[];

	/**
	 * The contributors of the Vintage Story Mod.
	 */
	private _contributors: string[];

	/**
	 * The type of the Vintage Story Mod.
	 */
	private _type?: string | undefined;

	/**
	 * The state of the Vintage Story Mod.
	 */
	private _state: VSModState;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The zip of the Vintage Story Mod.
	 */
	public get zip(): Zip {
		return this._zip;
	}
	/**
	 * The name of the Vintage Story Mod.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * The modid of the Vintage Story Mod.
	 */
	public get modid(): string {
		return this._modid;
	}

	/**
	 * The version of the Vintage Story Mod.
	 */
	public get version(): string {
		return this._version;
	}

	/**
	 * The description of the Vintage Story Mod.
	 */
	public get description(): string | undefined {
		return this._description;
	}

	/**
	 * The side of the Vintage Story Mod.
	 */
	public get side(): string | undefined {
		return this._side;
	}

	/**
	 * The authors of the Vintage Story Mod.
	 */
	public get authors(): string[] {
		return this._authors;
	}

	/**
	 * The contributors of the Vintage Story Mod.
	 */
	public get contributors(): string[] {
		return this._contributors;
	}

	/**
	 * The type of the Vintage Story Mod.
	 */
	public get type(): string | undefined {
		return this._type;
	}

	/**
	 * The state of the Vintage Story Mod.
	 */
	public get state(): VSModState {
		return this._state;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	/**
	 * Loads a Vintage Story Mod from a zip.
	 */
	public static async loadFromZip(zip: Zip): Promise<VSMod | undefined> {
		try {
			App.logger.debug(`Loading a Vintage Story Mod from the zip ${zip.path}...`);

			const modinfo = await zip.readJSONFromFile<VSModModinfoJSON>("modinfo.json");

			App.logger.trace(JSON.stringify(modinfo));

			const name = modinfo.name ?? modinfo.Name;
			const modid = modinfo.modid ?? modinfo.ModID ?? modinfo.modId ?? modinfo.Modid;
			const version = modinfo.version ?? modinfo.Version;

			if (name === undefined || name === "" || modid === undefined || modid === "" || version === undefined || version === "") {
				App.logger.warn(`Couldn't identify the mod of the zip ${zip.path}!`);
				return;
			}

			const description = modinfo.description ?? modinfo.Description;
			const side = modinfo.side ?? modinfo.Side;
			const authors = modinfo.authors ?? modinfo.Authors ?? [];
			const contributors = modinfo.contributors ?? modinfo.Contributors ?? [];
			const type = modinfo.type ?? modinfo.Type;

			const mod = new VSMod({
				zip,
				name,
				modid,
				version,
				description,
				side,
				authors,
				contributors,
				type
			});

			return mod;
		} catch (err) {
			App.logger.error(`There was an error loading the Vintage Story Mod from the zip ${zip.path}:\n${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error loading the Vintage Story Mod from the zip ${zip.path}`);
		}
	}

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Get's the Mod data from the ModDB API.
	 * @returns The ModDB API Mod or undefined if it was not found.
	 */
	public async getApiMod(): Promise<VSAPIMod | undefined> {
		try {
			const apiMod = await VSAPIMod.getFromModDB(this._modid);

			return apiMod;
		} catch (error) {
			App.logger.error(`There was an error loading the API Mod of the Vintage Story Mod:\n${error}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error loading the API Mod of the Vintage Story Mod!");
		}
	}
}

/**
 * State of the Vintage Story Mod.
 */
export enum VSModState {
	INSTALLED = "installed",
	NOT_INSTALLED = "not_installed",
	INSTALLING = "installing",
	DELETING = "deleting",
	UPDATING = "updating"
}
