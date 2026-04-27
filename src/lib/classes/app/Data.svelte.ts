import { error } from "@tauri-apps/plugin-log";
import { invoke } from "@tauri-apps/api/core";

import { App } from "$lib/classes/App.svelte";
import { VSInstance, type VSInstanceJSON } from "$lib/classes/vs/VSInstance.svelte";
import { VSVersion } from "$lib/classes/vs/VSVersion.svelte";
import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";
import { Directory } from "$lib/classes/utils/Directory.svelte";
import { File } from "$lib/classes/utils/File.svelte";

/**
 * JSON of the data.
 */
export type DataJSON = {
	vsVersionsPaths?: string[] | undefined;
	vsInstancesPaths?: string[] | undefined;
};

/**
 * Data of the app.
 */
export class Data {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor(data: { file: File; vsVersions: VSVersion[]; vsInstances: VSInstance[] }) {
		this._file = data.file;
		this._vsVersions = $state(data.vsVersions);
		this._vsInstances = $state(data.vsInstances);
	}

	/**
	 * Loads all the app data.
	 * @returns An instance of the data of the app.
	 */
	public static async init(): Promise<Data> {
		try {
			const path = await App.info.dataDir.join("data.json");
			const file = await File.create(path);
			const dataJSON = await file.readJSON<DataJSON>();

			let vsVersions: VSVersion[] = [];

			if (dataJSON.vsVersionsPaths !== undefined && dataJSON.vsVersionsPaths.length > 0) {
				const loadedVsVersions = await Promise.all(
					dataJSON.vsVersionsPaths.map(async (vsVersionPath) => {
						const dir = await Directory.create(vsVersionPath);

						const executable = await VSVersion.getExecutable(dir);

						await executable.setPermissions(0o755);

						const version: string = await invoke("get_vs_version", { executablePath: executable.path });

						return await VSVersion.create({
							version,
							dir
						});
					})
				);

				vsVersions = loadedVsVersions;
			}

			let vsInstances: VSInstance[] = [];

			if (dataJSON.vsInstancesPaths !== undefined && dataJSON.vsInstancesPaths.length > 0) {
				const loadedVsInstances = await Promise.all(
					dataJSON.vsInstancesPaths.map(async (vsInstancePath) => {
						const dir = await Directory.create(vsInstancePath);

						const dataPath = await dir.join("Data");
						const dataDir = await Directory.create(dataPath);

						const backupsPath = await dir.join("Backups");
						const backupsDir = await Directory.create(backupsPath);

						const filePath = await dir.join("instance.json");
						const file = await File.create(filePath);

						const vsInstanceJSON = await file.readJSON<VSInstanceJSON>();

						let version = vsVersions.find((v) => v.version === vsInstanceJSON.version);

						if (version === undefined) {
							const newVersionPath = await App.config.vsVersionsDir.join(vsInstanceJSON.version);
							const newVersionDir = await Directory.create(newVersionPath);
							const newVersion = await VSVersion.create({ version: vsInstanceJSON.version, dir: newVersionDir });

							await App.data.setVsVersions([...App.data.vsVersions, newVersion]);

							version = newVersion;
						}

						return await VSInstance.create({
							file,
							id: vsInstanceJSON.id,
							name: vsInstanceJSON.name,
							dir,
							dataDir,
							backupsDir,
							version,
							startParams: vsInstanceJSON.startParams,
							backupsLimit: vsInstanceJSON.backupsLimit,
							backupsAuto: vsInstanceJSON.backupsAuto,
							backupsCompressionLevel: vsInstanceJSON.backupsCompressionLevel,
							lastTimePlayed: vsInstanceJSON.lastTimePlayed,
							totalTimePlayed: vsInstanceJSON.totalTimePlayed,
							mesaGlThread: vsInstanceJSON.mesaGlThread,
							envVars: vsInstanceJSON.envVars
						});
					})
				);

				vsInstances = loadedVsInstances;
			}

			return new Data({
				file,
				vsVersions,
				vsInstances
			});
		} catch (err) {
			error(`There was an error initializating the data:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error initializating the data!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The data file.
	 */
	private _file: File;

	/**
	 * Vintage Story Versions.
	 */
	private _vsVersions: VSVersion[];

	/**
	 * Vintage Story Instances.
	 */
	private _vsInstances: VSInstance[];

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The data file.
	 */
	public get file(): File {
		return this._file;
	}

	/**
	 * Vintage Story Versions.
	 */
	public get vsVersions(): VSVersion[] {
		return this._vsVersions;
	}

	/**
	 * Vintage Story Instances.
	 */
	public get vsInstances(): VSInstance[] {
		return this._vsInstances;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Sets the new Vintage Story Versions.
	 * @param vsVersions The new Vintage Story Versions
	 */
	public async setVsVersions(vsVersions: VSVersion[]): Promise<void> {
		try {
			this._vsVersions = vsVersions;
			await this.save();
		} catch (err) {
			error(`There was an error saving the new Vintage Story Versions:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error saving the new Vintage Story Versions!");
		}
	}

	/**
	 * Sets the new Vintage Story Instances.
	 * @param vsInstances The new Vintage Story Instances
	 */
	public async setVsInstances(vsInstances: VSInstance[]): Promise<void> {
		try {
			this._vsInstances = vsInstances;
			await this.save();
		} catch (err) {
			error(`There was an error saving the new Vintage Story Instances:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error saving the new Vintage Story Instances!");
		}
	}

	/**
	 * Saves the data to the data file.
	 */
	public async save(): Promise<void> {
		try {
			const JSON = await this.exportToJSON();

			this._file.writeJSON(JSON);
		} catch (err) {
			error(`There was an error saving the data:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error saving the data!");
		}
	}

	/**
	 * Exports the data to a JSON.
	 * @returns A JSON with the data.
	 */
	private async exportToJSON(): Promise<DataJSON> {
		return {
			vsVersionsPaths: this._vsVersions.map((vsVersion) => vsVersion.dir.path),
			vsInstancesPaths: this._vsInstances.map((vsInstance) => vsInstance.dir.path)
		};
	}
}
