import { App } from "$lib/classes/App.svelte";

import { ModDBApiMod } from "$lib/classes/api/ModDBApiMod.svelte";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

/**
 * JSON of the ModDB API Basic Mod.
 */
export type ModDBApiBasicModJSON = {
	modid: number;
	assetid: number;
	downloads: number;
	follows: number;
	trendingpoints: number;
	comments: number;
	name: string;
	summary?: string | undefined;
	modidstrs: string[];
	author: string;
	urlalias?: string | undefined;
	side: string;
	type: string;
	logo: string;
	tags: string[];
	lastreleased: string;
};

/**
 * ModDB API Basic Mod fetched from the ModDB.
 * This is the Basic Mod from /api/mods.
 */
export class ModDBApiBasicMod {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(modDBApiModOnList: {
		modid: number;
		assetid: number;
		downloads: number;
		follows: number;
		trendingpoints: number;
		comments: number;
		name: string;
		summary?: string | undefined;
		modidstrs: string[];
		author: string;
		urlalias?: string | undefined;
		side: string;
		type: string;
		logo: string;
		tags: string[];
		lastreleased: string;
	}) {
		this._modid = modDBApiModOnList.modid;
		this._assetid = modDBApiModOnList.assetid;
		this._downloads = modDBApiModOnList.downloads;
		this._follows = modDBApiModOnList.follows;
		this._trendingpoints = modDBApiModOnList.trendingpoints;
		this._comments = modDBApiModOnList.comments;
		this._name = modDBApiModOnList.name;
		this._summary = modDBApiModOnList.summary;
		this._modidstrs = modDBApiModOnList.modidstrs;
		this._author = modDBApiModOnList.author;
		this._urlalias = modDBApiModOnList.urlalias;
		this._side = modDBApiModOnList.side;
		this._type = modDBApiModOnList.type;
		this._logo = modDBApiModOnList.logo;
		this._tags = modDBApiModOnList.tags;
		this._lastreleased = modDBApiModOnList.lastreleased;
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The id of the mod.
	 */
	private _modid: number;

	/**
	 * The assetid of the mod.
	 */
	private _assetid: number;

	/**
	 * The downloads of the mod.
	 */
	private _downloads: number;

	/**
	 * The follows of the mod.
	 */
	private _follows: number;

	/**
	 * The trendingpoints of the mod.
	 */
	private _trendingpoints: number;

	/**
	 * The comments of the mod.
	 */
	private _comments: number;

	/**
	 * The name of the mod.
	 */
	private _name: string;

	/**
	 * The summary of the mod.
	 */
	private _summary?: string | undefined;

	/**
	 * The modidstrs of the mod.
	 */
	private _modidstrs: string[];

	/**
	 * The author of the mod.
	 */
	private _author: string;

	/**
	 * The urlalias of the mod.
	 */
	private _urlalias?: string | undefined;

	/**
	 * The side of the mod.
	 */
	private _side: string;

	/**
	 * The type of the mod.
	 */
	private _type: string;

	/**
	 * The logo of the mod.
	 */
	private _logo: string;

	/**
	 * The tags of the mod.
	 */
	private _tags: string[];

	/**
	 * The lastreleased of the mod.
	 */
	private _lastreleased: string;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The id of the mod.
	 */
	public get modid(): number {
		return this._modid;
	}

	/**
	 * The assetid of the mod.
	 */
	public get assetid(): number {
		return this._assetid;
	}

	/**
	 * The downloads of the mod.
	 */
	public get downloads(): number {
		return this._downloads;
	}

	/**
	 * The follows of the mod.
	 */
	public get follows(): number {
		return this._follows;
	}

	/**
	 * The trendingpoints of the mod.
	 */
	public get trendingpoints(): number {
		return this._trendingpoints;
	}

	/**
	 * The comments of the mod.
	 */
	public get comments(): number {
		return this._comments;
	}

	/**
	 * The name of the mod.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * The summary of the mod.
	 */
	public get summary(): string | undefined {
		return this._summary;
	}

	/**
	 * The modidstrs of the mod.
	 */
	public get modidstrs(): string[] {
		return this._modidstrs;
	}

	/**
	 * The author of the mod.
	 */
	public get author(): string {
		return this._author;
	}

	/**
	 * The urlalias of the mod.
	 */
	public get urlalias(): string | undefined {
		return this._urlalias;
	}

	/**
	 * The side of the mod.
	 */
	public get side(): string {
		return this._side;
	}

	/**
	 * The type of the mod.
	 */
	public get type(): string {
		return this._type;
	}

	/**
	 * The logo of the mod.
	 */
	public get logo(): string {
		return this._logo;
	}

	/**
	 * The tags of the mod.
	 */
	public get tags(): string[] {
		return this._tags;
	}

	/**
	 * The lastreleased of the mod.
	 */
	public get lastreleased(): string {
		return this._lastreleased;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	/**
	 * Fetches all the ModDB API Mods.
	 * @param modid The id of the mod to query.
	 * @returns The mod from the ModDB API or undefined.
	 */
	public static async fetchAll(options?: { cache?: boolean | undefined } | undefined): Promise<ModDBApiBasicMod[]> {
		try {
			App.logger.debug(`Fetching all the ModDB API Basic Mods...`);

			const res: Response = await App.request.get("https://mods.vintagestory.at/api/mods", options?.cache);

			const json: { mods: ModDBApiBasicModJSON[] } = await res.json();

			const jsonMods: ModDBApiBasicModJSON[] = json.mods;

			const mods = jsonMods.map((m) => new ModDBApiBasicMod({ ...m }));

			return mods;
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error fetching all the ModDB API Basic Mods: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error fetching all the ModDB API Basic Mods!");
		}
	}

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Fetches the ModDB API Mod of this ModDB API Basic Mod.
	 * @returns The ModDB API Mod.
	 */
	public async toModDBApiMod(options?: { cache?: boolean | undefined } | undefined): Promise<ModDBApiMod | undefined> {
		try {
			App.logger.debug(`Fetching the ModDB API Mod of the ${this._name} ModDB API Basic Mod...`);

			const mod = await ModDBApiMod.fetch(this._modid, { cache: options?.cache });

			return mod;
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error fetching the ModDB API Mod of the ${this._name} ModDB API Basic Mod...: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error fetching the ModDB API Mod of the ${this._name} ModDB API Basic Mod...`);
		}
	}
}
