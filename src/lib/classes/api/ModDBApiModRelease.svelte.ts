import { download } from "@tauri-apps/plugin-upload";

import { App } from "$lib/classes/App.svelte";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

import { Directory } from "$lib/classes/utils/Directory.svelte";
import { Zip } from "$lib/classes/utils/Zip.svelte";

/**
 * JSON of the ModDB API Mod Release.
 */
export type ModDBApiModReleaseJSON = {
	releaseid: number;
	mainfile: string;
	filename: string;
	fileid: number;
	downloads: number;
	tags: string[];
	modidstr: string;
	modversion: string;
	created: string;
	changelog: string;
};

/**
 * ModDB API Mod Release fetched from the ModDB.
 */
export class ModDBApiModRelease {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(modDBApiModRelease: {
		releaseid: number;
		mainfile: string;
		filename: string;
		fileid: number;
		downloads: number;
		tags: string[];
		modidstr: string;
		modversion: string;
		created: string;
		changelog: string;
	}) {
		this._releaseid = modDBApiModRelease.releaseid;
		this._mainfile = modDBApiModRelease.mainfile;
		this._filename = modDBApiModRelease.filename;
		this._fileid = modDBApiModRelease.fileid;
		this._downloads = modDBApiModRelease.downloads;
		this._tags = modDBApiModRelease.tags;
		this._modidstr = modDBApiModRelease.modidstr;
		this._modversion = modDBApiModRelease.modversion;
		this._created = modDBApiModRelease.created;
		this._changelog = modDBApiModRelease.changelog;
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The id of the release.
	 */
	private _releaseid: number;

	/**
	 * The main file of the release.
	 */
	private _mainfile: string;

	/**
	 * The filename of the release.
	 */
	private _filename: string;

	/**
	 * The id of the file.
	 */
	private _fileid: number;

	/**
	 * The downloads of the release.
	 */
	private _downloads: number;

	/**
	 * The tags of the release.
	 */
	private _tags: string[];

	/**
	 * The modidstr of the release.
	 */
	private _modidstr: string;

	/**
	 * The modversion of the release.
	 */
	private _modversion: string;

	/**
	 * The created of the release.
	 */
	private _created: string;

	/**
	 * The changelog of the release.
	 */
	private _changelog: string;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The id of the release.
	 */
	public get releaseid(): number {
		return this._releaseid;
	}

	/**
	 * The main file of the release.
	 */
	public get mainfile(): string {
		return this._mainfile;
	}

	/**
	 * The filename of the release.
	 */
	public get filename(): string {
		return this._filename;
	}

	/**
	 * The id of the file.
	 */
	public get fileid(): number {
		return this._fileid;
	}

	/**
	 * The downloads of the release.
	 */
	public get downloads(): number {
		return this._downloads;
	}

	/**
	 * The tags of the release.
	 */
	public get tags(): string[] {
		return this._tags;
	}

	/**
	 * The modidstr of the release.
	 */
	public get modidstr(): string {
		return this._modidstr;
	}

	/**
	 * The modversion of the release.
	 */
	public get modversion(): string {
		return this._modversion;
	}

	/**
	 * The created of the release.
	 */
	public get created(): string {
		return this._created;
	}

	/**
	 * The changelog of the release.
	 */
	public get changelog(): string {
		return this._changelog;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Downloads the Vintage Story Mod of this ModDB API Mod Release to the specified directory.
	 * @param dir The directory to download the ModDB API Mod Release to.
	 * @param modName The name of the ModAB API Mod.
	 * @returns The zip of the Vintage Story Mod.
	 */
	public async download(dir: Directory, modName: string): Promise<Zip> {
		try {
			App.logger.debug(`Downloading the Vintage Story Mod ${modName} from the ModDB API Mod Release with ID ${this._releaseid}...`);

			if (!App.info.isOnline) throw new AppError(AppErrorCodes.OFFLINE, "Can't download the Vintage Story Mod if the app is offline!");

			await dir.ensureExists();

			const downloadPath = await dir.join(`${modName}-${this._modversion}.zip`);

			App.logger.debug(`Downloading the Vintage Story Mod ${modName} on ${downloadPath} from ${this._mainfile}...`);

			await download(this._mainfile, downloadPath);

			App.logger.debug(
				`Finished downloading the Vintage Story Mod ${modName} from the ModDB API Mod Release with ID ${this._releaseid} on ${downloadPath}!`
			);

			const zip = await Zip.create(downloadPath);

			return zip;
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(
				`There was an error downloading the Vintage Story Mod ${modName} from the ModDB API Mod Release with ID ${this._releaseid}: ${err}`
			);
			throw new AppError(
				AppErrorCodes.GENERIC_ERROR,
				`There was an error downloading the Vintage Story Mod ${modName} from the ModDB API Mod Release with ID ${this._releaseid}!`
			);
		}
	}
}
