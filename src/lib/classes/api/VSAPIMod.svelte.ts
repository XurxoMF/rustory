import { App } from "$lib/classes/App.svelte";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

import { VSMod } from "../vs/VSMod.svelte";

import { VSAPIModRelease, type VSAPIModReleaseJSON } from "$lib/classes/api/VSAPIModRelease.svelte";
import { VSAPIModScreenshot, type VSAPIModScreenshotJSON } from "$lib/classes/api/VSAPIModScreenshot.svelte";
import type { Directory } from "../utils/Directory.svelte";

/**
 * JSON of the Mod queried from the ModDB.
 */
export type VSAPIModJSON = {
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
	releases: VSAPIModReleaseJSON[];
	screenshots: VSAPIModScreenshotJSON[];
};

/**
 * Mod info queried from the ModDB.
 * This is the complete mod from /api/mods/{modid}.
 */
export class VSAPIMod {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(vsApiMod: {
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
		releases: VSAPIModRelease[];
		screenshots: VSAPIModScreenshot[];
	}) {
		this._modid = vsApiMod.modid;
		this._assetid = vsApiMod.assetid;
		this._name = vsApiMod.name;
		this._text = vsApiMod.text;
		this._author = vsApiMod.author;
		this._urlalias = vsApiMod.urlalias;
		this._logofilename = vsApiMod.logofilename;
		this._logofile = vsApiMod.logofile;
		this._homepageurl = vsApiMod.homepageurl;
		this._sourcecodeurl = vsApiMod.sourcecodeurl;
		this._trailervideourl = vsApiMod.trailervideourl;
		this._issuetrackerurl = vsApiMod.issuetrackerurl;
		this._wikiurl = vsApiMod.wikiurl;
		this._downloads = vsApiMod.downloads;
		this._follows = vsApiMod.follows;
		this._trendingpoints = vsApiMod.trendingpoints;
		this._comments = vsApiMod.comments;
		this._side = vsApiMod.side;
		this._type = vsApiMod.type;
		this._createdat = vsApiMod.createdat;
		this._lastmodified = vsApiMod.lastmodified;
		this._tags = vsApiMod.tags;
		this._releases = vsApiMod.releases;
		this._screenshots = vsApiMod.screenshots;
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
	private _releases: VSAPIModRelease[];

	/**
	 * The screenshots of the mod.
	 */
	private _screenshots: VSAPIModScreenshot[];

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
	public get releases(): VSAPIModRelease[] {
		return this._releases;
	}

	/**
	 * The screenshots of the mod.
	 */
	public get screenshots(): VSAPIModScreenshot[] {
		return this._screenshots;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	/**
	 * Queries a mod from the ModDB API.
	 * @param modid The id of the mod to query.
	 * @returns The mod from the ModDB API or undefined.
	 */
	public static async getFromModDB(modid: string | number): Promise<VSAPIMod | undefined> {
		try {
			App.logger.debug(`Getting the API Mod of the Vintage Story Mod ${modid} from the ModDB...`);

			if (!App.info.isOnline) return undefined;

			const res = await App.request.get(`https://mods.vintagestory.at/api/mod/${modid}`);

			const json: { mod: VSAPIModJSON } = await res.json();

			const jsonMod: VSAPIModJSON = json.mod;

			const apiMod = new VSAPIMod({
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
				releases: jsonMod.releases.map((release) => new VSAPIModRelease(release)),
				screenshots: jsonMod.screenshots.map((screenshot) => new VSAPIModScreenshot(screenshot))
			});

			return apiMod;
		} catch (err) {
			App.logger.error(`There was an error querying the Vintage Story API Mod:\n${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error querying the Vintage Story API Mod!");
		}
	}

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Installs this Vintage Story Mod on the selected directory.
	 * @param dir The directory to download this mod to.
	 * @param release The release to install.
	 * @returns The installed Vintage Story Mod.
	 */
	public async install(dir: Directory, release: VSAPIModRelease): Promise<VSMod> {
		try {
			App.logger.debug(`Installing the Vintage Story Mod ${this._name}...`);

			const zip = await release.download(dir, this._name);

			const mod = await VSMod.loadFromZip(zip);

			if (mod === undefined) {
				await zip.delete();

				App.logger.error(`The installed Vintage Story Mod ${this._name} could not be identified! Removing it!`);
				throw new AppError(AppErrorCodes.GENERIC_ERROR, `The installed Vintage Story Mod ${this._name} could not be identified! Removing it!`);
			}

			return mod;
		} catch (err) {
			App.logger.error(`There was an error installing the Vintage Story Mod ${this._name}:\n${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error installing the Vintage Story Mod ${this._name}!`);
		}
	}
}
