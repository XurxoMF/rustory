import { Logger } from "$lib/classes/utils/Logger.svelte";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

import type { Zip } from "$lib/classes/utils/Zip.svelte";

import { ModDBApiMod } from "$lib/classes/api/ModDBApiMod.svelte";

export type VSModModinfoJSON = {
	name?: string | undefined;
	Name?: string | undefined;
	modid?: string | undefined;
	Modid?: string | undefined;
	ModID?: string | undefined;
	modId?: string | undefined;
	modID?: string | undefined;
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

export type VSModInfo = {
	name: string;
	modid: string;
	version: string;
	description?: string | undefined;
	side?: string | undefined;
	authors: string[];
	contributors: string[];
	type?: string | undefined;
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

	// ********************
	// *  STATIC METHODS  *
	// ********************

	/**
	 * Normalizes the supported modinfo.json field variants.
	 * @param modinfo The raw modinfo.json data.
	 * @returns The normalized Vintage Story Mod info.
	 */
	public static parseModinfo(modinfo: VSModModinfoJSON): VSModInfo {
		const name = modinfo.name ?? modinfo.Name;
		const modid = modinfo.modid ?? modinfo.ModID ?? modinfo.modId ?? modinfo.Modid ?? modinfo.modID;
		const version = modinfo.version ?? modinfo.Version;

		if (name === undefined || name === "") throw new AppError(AppErrorCodes.MALFORMED_DATA, "The Vintage Story Mod name is missing!");

		if (modid === undefined || modid === "") throw new AppError(AppErrorCodes.MALFORMED_DATA, "The Vintage Story Mod modid is missing!");

		if (version === undefined || version === "") throw new AppError(AppErrorCodes.MALFORMED_DATA, "The Vintage Story Mod version is missing!");

		return {
			name,
			modid,
			version,
			description: modinfo.description ?? modinfo.Description,
			side: modinfo.side ?? modinfo.Side,
			authors:
				modinfo.authors ??
				modinfo.Authors ??
				(modinfo.author !== undefined ? [modinfo.author] : modinfo.Author !== undefined ? [modinfo.Author] : []),
			contributors: modinfo.contributors ?? modinfo.Contributors ?? [],
			type: modinfo.type ?? modinfo.Type
		};
	}

	/**
	 * Loads a Vintage Story Mod from a zip.
	 */
	public static async fromZip(zip: Zip): Promise<VSMod> {
		try {
			Logger.debug(`Trying to load the Vintage Story Mod from the zip ${zip.path}...`);

			Logger.debug(`Reading the Vintage Story Mod data from the zip modinfo.json file of the zip ${zip.path}...`);

			const modinfo = await zip.readJSONFromFile<VSModModinfoJSON>("modinfo.json");

			Logger.trace(JSON.stringify(modinfo));

			const parsedModinfo = VSMod.parseModinfo(modinfo);

			Logger.debug(`Loading the Vintage Story Mod from the zip ${zip.path}...`);

			const mod = new VSMod({
				zip,
				...parsedModinfo
			});

			Logger.debug(`Loaded the Vintage Story Mod from the zip ${zip.path}!`);

			return mod;
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error loading the Vintage Story Mod from the zip ${zip.path}: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error loading the Vintage Story Mod from the zip ${zip.path}`);
		}
	}

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Deletes this Vintage Story Mod.
	 */
	public async delete(): Promise<void> {
		try {
			Logger.debug(`Deleting the Vintage Story Mod ${this._name}...`);

			await this._zip.delete();

			Logger.debug(`Deleted the Vintage Story Mod ${this._name}!`);
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error deleting the Vintage Story Mod ${this._name}: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error deleting the Vintage Story Mod ${this._name}!`);
		}
	}

	/**
	 * Fetches the ModDB API Mod of this Vintage Story Mod.
	 * @returns The ModDB API Mod.
	 */
	public async toModDBApiMod(): Promise<ModDBApiMod | undefined> {
		try {
			Logger.debug(`Fetching the ModDB API Mod of the Vintage Story Mod ${this._name}...`);

			const apiMod = await ModDBApiMod.fetch(this._modid);

			Logger.debug(`Fetched the ModDB API Mod of the Vintage Story Mod ${this._name}!`);

			return apiMod;
		} catch (error) {
			Logger.error(`There was an error fetching the ModDB API Mod of the Vintage Story Mod ${this._name}:\n${error}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error fetching the ModDB API Mod of the Vintage Story Mod ${this._name}!`);
		}
	}
}
