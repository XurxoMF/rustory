import { App } from "$lib/classes/App.svelte";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

import { ModDBApiModRelease, type ModDBApiModReleaseJSON } from "$lib/classes/api/ModDBApiModRelease.svelte";
import { ModDBApiModScreenshot, type ModDBApiModScreenshotJSON } from "$lib/classes/api/ModDBApiModScreenshot.svelte";

/**
 * JSON of the ModDB API Mod.
 */
export type ModDBApiModJSON = {
	modid: number;
	assetid: number;
	name: string;
	text: string;
	author: string;
	urlalias?: string | undefined;
	logofilename?: string | undefined;
	logofile?: string | undefined;
	homepageurl?: string | undefined;
	sourcecodeurl?: string | undefined;
	trailervideourl?: string | undefined;
	issuetrackerurl?: string | undefined;
	wikiurl?: string | undefined;
	downloads: number;
	follows: number;
	trendingpoints: number;
	comments: number;
	side: string;
	type: string;
	createdat: string;
	lastmodified: string;
	tags: string[];
	releases: ModDBApiModReleaseJSON[];
	screenshots: ModDBApiModScreenshotJSON[];
};

/**
 * ModDB API Mod fetched from the ModDB.
 * This is the complete Mod from /api/mod/{modid}.
 */
export class ModDBApiMod {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(modDBApiMod: {
		modid: number;
		assetid: number;
		name: string;
		text: string;
		author: string;
		urlalias?: string | undefined;
		logofilename?: string | undefined;
		logofile?: string | undefined;
		homepageurl?: string | undefined;
		sourcecodeurl?: string | undefined;
		trailervideourl?: string | undefined;
		issuetrackerurl?: string | undefined;
		wikiurl?: string | undefined;
		downloads: number;
		follows: number;
		trendingpoints: number;
		comments: number;
		side: string;
		type: string;
		createdat: string;
		lastmodified: string;
		tags: string[];
		releases: ModDBApiModRelease[];
		screenshots: ModDBApiModScreenshot[];
	}) {
		this._modid = modDBApiMod.modid;
		this._assetid = modDBApiMod.assetid;
		this._name = modDBApiMod.name;
		this._text = modDBApiMod.text;
		this._author = modDBApiMod.author;
		this._urlalias = modDBApiMod.urlalias;
		this._logofilename = modDBApiMod.logofilename;
		this._logofile = modDBApiMod.logofile;
		this._homepageurl = modDBApiMod.homepageurl;
		this._sourcecodeurl = modDBApiMod.sourcecodeurl;
		this._trailervideourl = modDBApiMod.trailervideourl;
		this._issuetrackerurl = modDBApiMod.issuetrackerurl;
		this._wikiurl = modDBApiMod.wikiurl;
		this._downloads = modDBApiMod.downloads;
		this._follows = modDBApiMod.follows;
		this._trendingpoints = modDBApiMod.trendingpoints;
		this._comments = modDBApiMod.comments;
		this._side = modDBApiMod.side;
		this._type = modDBApiMod.type;
		this._createdat = modDBApiMod.createdat;
		this._lastmodified = modDBApiMod.lastmodified;
		this._tags = modDBApiMod.tags;
		this._releases = modDBApiMod.releases;
		this._screenshots = modDBApiMod.screenshots;
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The id of the mod.
	 */
	private _modid: number;

	/**
	 * The id of the asset.
	 */
	private _assetid: number;

	/**
	 * The name of the mod.
	 */
	private _name: string;

	/**
	 * The description of the mod.
	 */
	private _text: string;

	/**
	 * The author of the mod.
	 */
	private _author: string;

	/**
	 * The url alias of the mod.
	 */
	private _urlalias?: string | undefined;

	/**
	 * The logo filename of the mod.
	 */
	private _logofilename?: string | undefined;

	/**
	 * The logo file of the mod.
	 */
	private _logofile?: string | undefined;

	/**
	 * The homepage url of the mod.
	 */
	private _homepageurl?: string | undefined;

	/**
	 * The source code url of the mod.
	 */
	private _sourcecodeurl?: string | undefined;

	/**
	 * The trailer video url of the mod.
	 */
	private _trailervideourl?: string | undefined;

	/**
	 * The issue tracker url of the mod.
	 */
	private _issuetrackerurl?: string | undefined;

	/**
	 * The wiki url of the mod.
	 */
	private _wikiurl?: string | undefined;

	/**
	 * The downloads of the mod.
	 */
	private _downloads: number;

	/**
	 * The follows of the mod.
	 */
	private _follows: number;

	/**
	 * The trending points of the mod.
	 */
	private _trendingpoints: number;

	/**
	 * The comments of the mod.
	 */
	private _comments: number;

	/**
	 * The side of the mod.
	 */
	private _side: string;

	/**
	 * The type of the mod.
	 */
	private _type: string;

	/**
	 * The created at of the mod.
	 */
	private _createdat: string;

	/**
	 * The last modified of the mod.
	 */
	private _lastmodified: string;

	/**
	 * The tags of the mod.
	 */
	private _tags: string[];

	/**
	 * The releases of the mod.
	 */
	private _releases: ModDBApiModRelease[];

	/**
	 * The screenshots of the mod.
	 */
	private _screenshots: ModDBApiModScreenshot[];

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The modid of the mod.
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
	 * The name of the mod.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * The text of the mod.
	 */
	public get text(): string {
		return this._text;
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
	 * The logofilename of the mod.
	 */
	public get logofilename(): string | undefined {
		return this._logofilename;
	}

	/**
	 * The logofile of the mod.
	 */
	public get logofile(): string | undefined {
		return this._logofile;
	}

	/**
	 * The homepageurl of the mod.
	 */
	public get homepageurl(): string | undefined {
		return this._homepageurl;
	}

	/**
	 * The sourcecodeurl of the mod.
	 */
	public get sourcecodeurl(): string | undefined {
		return this._sourcecodeurl;
	}

	/**
	 * The trailervideourl of the mod.
	 */
	public get trailervideourl(): string | undefined {
		return this._trailervideourl;
	}

	/**
	 * The issuetrackerurl of the mod.
	 */
	public get issuetrackerurl(): string | undefined {
		return this._issuetrackerurl;
	}

	/**
	 * The wikiurl of the mod.
	 */
	public get wikiurl(): string | undefined {
		return this._wikiurl;
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
	 * The createdat of the mod.
	 */
	public get createdat(): string {
		return this._createdat;
	}

	/**
	 * The lastmodified of the mod.
	 */
	public get lastmodified(): string {
		return this._lastmodified;
	}

	/**
	 * The tags of the mod.
	 */
	public get tags(): string[] {
		return this._tags;
	}

	/**
	 * The releases of the mod.
	 */
	public get releases(): ModDBApiModRelease[] {
		return this._releases;
	}

	/**
	 * The screenshots of the mod.
	 */
	public get screenshots(): ModDBApiModScreenshot[] {
		return this._screenshots;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	/**
	 * Fetches a ModDB API Mod.
	 * @param modid The id of the Mod.
	 * @returns The ModDB API Mod.
	 */
	public static async fetch(modid: string | number): Promise<ModDBApiMod> {
		try {
			App.logger.debug(`Fetching the ModDB API Mod with ID ${modid}...`);

			if (!App.info.isOnline) throw new AppError(AppErrorCodes.OFFLINE, "Can't fetch the ModDB API Mod while offline!");

			const res = await App.request.get(`https://mods.vintagestory.at/api/mod/${modid}`);

			const json: { mod: ModDBApiModJSON } = await res.json();

			const jsonMod: ModDBApiModJSON = json.mod;

			const apiMod = new ModDBApiMod({
				modid: jsonMod.modid,
				assetid: jsonMod.assetid,
				name: jsonMod.name,
				text: jsonMod.text,
				author: jsonMod.author,
				urlalias: jsonMod.urlalias,
				logofilename: jsonMod.logofilename,
				logofile: jsonMod.logofile,
				homepageurl: jsonMod.homepageurl,
				sourcecodeurl: jsonMod.sourcecodeurl,
				trailervideourl: jsonMod.trailervideourl,
				issuetrackerurl: jsonMod.issuetrackerurl,
				wikiurl: jsonMod.wikiurl,
				downloads: jsonMod.downloads,
				follows: jsonMod.follows,
				trendingpoints: jsonMod.trendingpoints,
				comments: jsonMod.comments,
				side: jsonMod.side,
				type: jsonMod.type,
				createdat: jsonMod.createdat,
				lastmodified: jsonMod.lastmodified,
				tags: jsonMod.tags,
				releases: jsonMod.releases.map((release) => new ModDBApiModRelease(release)),
				screenshots: jsonMod.screenshots.map((screenshot) => new ModDBApiModScreenshot(screenshot))
			});

			return apiMod;
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error fetching the ModDB API Mod with ID ${modid}: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error fetching the ModDB API Mod with ID ${modid}!`);
		}
	}

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
