import { baseLocale, isLocale, setLocale } from "$lib/paraglide/runtime";

import { App } from "$lib/classes/App.svelte";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

import { Directory } from "$lib/classes/utils/Directory.svelte";
import { File } from "$lib/classes/utils/File.svelte";

/**
 * JSON of the config.
 */
export type ConfigJSON = {
	schemaVersion: typeof Config.SCHEMA_VERSION;
	theme: (typeof Config.THEMES)[number]["key"];
	locale: (typeof Config.LOCALES)[number]["key"];
	scale: number;
	logLevel: (typeof Config.LOG_LEVELS)[number]["key"];
	vsVersionsPath: string;
	vsInstancesPath: string;
};

/**
 * Config of the app.
 */
export class Config {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	/**
	 * Current config.json schema version.
	 */
	private static _SCHEMA_VERSION = 1 as const;

	/**
	 * Available themes.
	 */
	private static _THEMES = [
		{ key: "dark", name: "Dark" },
		{ key: "light", name: "Light" }
	] as const;

	/**
	 * Available locales.
	 */
	private static _LOCALES = [
		{ key: "en-EN", name: "English" },
		{ key: "es-ES", name: "Spanish" }
	] as const;

	/**
	 * Available log levels.
	 */
	private static _LOG_LEVELS = [
		{ key: "trace", name: "Trace" },
		{ key: "debug", name: "Debug" },
		{ key: "info", name: "Info" },
		{ key: "warn", name: "Warn" },
		{ key: "error", name: "Error" }
	] as const;

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	/**
	 * Available themes.
	 */
	public static get THEMES(): typeof Config._THEMES {
		return Config._THEMES;
	}

	/**
	 * Available locales.
	 */
	public static get LOCALES(): typeof Config._LOCALES {
		return Config._LOCALES;
	}

	/**
	 * Available log levels.
	 */
	public static get LOG_LEVELS(): typeof Config._LOG_LEVELS {
		return Config._LOG_LEVELS;
	}

	/**
	 * Current config.json schema version.
	 */
	public static get SCHEMA_VERSION(): typeof Config._SCHEMA_VERSION {
		return Config._SCHEMA_VERSION;
	}

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor(config: {
		file: File;
		theme: (typeof Config.THEMES)[number]["key"];
		locale: (typeof Config.LOCALES)[number]["key"];
		scale: number;
		logLevel: (typeof Config.LOG_LEVELS)[number]["key"];
		vsVersionsDir: Directory;
		vsInstancesDir: Directory;
	}) {
		this._file = config.file;
		this._theme = $state(config.theme);
		this._locale = $state(config.locale);
		this._scale = $state(config.scale);
		this._logLevel = $state(config.logLevel);
		this._vsVersionsDir = $state(config.vsVersionsDir);
		this._vsInstancesDir = $state(config.vsInstancesDir);
	}

	/**
	 * Loads all the config of the app.
	 */
	public static async init(): Promise<Config> {
		try {
			App.logger.debug("Initializing config...");

			const path = await App.info.configDir.join("config.json");
			const file = await File.create(path);
			const rawConfigJSON = await file.readJSON<unknown>();
			const defaultVSVersionsPath = await App.info.dataDir.join("VSVersions");
			const defaultVSInstancesPath = await App.info.dataDir.join("VSInstances");
			const configJSON = Config.parseJSON(rawConfigJSON, {
				locale: baseLocale,
				vsVersionsPath: defaultVSVersionsPath,
				vsInstancesPath: defaultVSInstancesPath
			});

			// Load the locale
			const locale = configJSON.locale;
			Config.applyLocale(locale);

			// Load the theme
			const theme = configJSON.theme;
			Config.applyTheme(theme);

			// Load the scale
			const scale = configJSON.scale;
			Config.applyScale(scale);

			// Load the log level
			const logLevel = configJSON.logLevel;

			// Load the Vintage Story Versions dir.
			const vsVersionsDir = await Directory.create(configJSON.vsVersionsPath);

			// Load the Vintage Story Instances dir.
			const vsInstancesDir = await Directory.create(configJSON.vsInstancesPath);

			const config = new Config({ file, theme, locale, scale, logLevel, vsVersionsDir, vsInstancesDir });

			await config.save();

			return config;
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error initializating the config: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error initializating the config!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The config file.
	 */
	private _file: File;

	/**
	 * Key of the current used theme.
	 */
	private _theme: (typeof Config.THEMES)[number]["key"];

	/**
	 * Key of the selected locale.
	 */
	private _locale: (typeof Config.LOCALES)[number]["key"];

	/**
	 * Key of the selected scale.
	 */
	private _scale: number;

	/**
	 * Log level of the app.
	 */
	private _logLevel: (typeof Config.LOG_LEVELS)[number]["key"];

	/**
	 * Directory where Vintage Story Versions will be saved.
	 */
	private _vsVersionsDir: Directory;

	/**
	 * Directory where Instances will be saved.
	 */
	private _vsInstancesDir: Directory;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The config file.
	 */
	public get file(): File {
		return this._file;
	}

	/**
	 * Key of the selected locale.
	 */
	public get locale(): (typeof Config.LOCALES)[number]["key"] {
		return this._locale;
	}

	/**
	 * Key of the selected theme.
	 */
	public get theme(): (typeof Config.THEMES)[number]["key"] {
		return this._theme;
	}

	/**
	 * Key of the selected scale.
	 */
	public get scale(): number {
		return this._scale;
	}

	/**
	 * Log level of the app.
	 */
	public get logLevel(): (typeof Config.LOG_LEVELS)[number]["key"] {
		return this._logLevel;
	}

	/**
	 * Directory where Vintage Story Versions will be saved.
	 */
	public get vsVersionsDir(): Directory {
		return this._vsVersionsDir;
	}

	/**
	 * Directory where Vintage Story Instances will be saved.
	 */
	public get vsInstancesDir(): Directory {
		return this._vsInstancesDir;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	/**
	 * Validates and migrates config.json data to the current schema.
	 * @param configJSON The raw config.json data.
	 * @param defaults Defaults that depend on the current application directories and locale.
	 * @returns Valid config data using the current schema.
	 */
	public static parseJSON(
		configJSON: unknown,
		defaults: {
			locale: (typeof Config.LOCALES)[number]["key"];
			vsVersionsPath: string;
			vsInstancesPath: string;
		}
	): ConfigJSON {
		if (!Config.isRecord(configJSON)) throw new AppError(AppErrorCodes.MALFORMED_DATA, "The config data must be a JSON object!");

		Config.validateSchemaVersion(configJSON.schemaVersion);

		const theme = configJSON.theme ?? "dark";
		const locale = configJSON.locale ?? defaults.locale;
		const scale = configJSON.scale ?? 1;
		const logLevel = configJSON.logLevel ?? "info";
		const vsVersionsPath = configJSON.vsVersionsPath ?? defaults.vsVersionsPath;
		const vsInstancesPath = configJSON.vsInstancesPath ?? defaults.vsInstancesPath;

		if (!Config.isTheme(theme)) throw new AppError(AppErrorCodes.MALFORMED_DATA, "The config theme is invalid!");

		if (!Config.isLocale(locale)) throw new AppError(AppErrorCodes.MALFORMED_DATA, "The config locale is invalid!");

		if (typeof scale !== "number" || !Number.isFinite(scale) || scale < 0.5 || scale > 1.5)
			throw new AppError(AppErrorCodes.MALFORMED_DATA, "The config scale must be a number between 0.5 and 1.5!");

		if (!Config.isLogLevel(logLevel)) throw new AppError(AppErrorCodes.MALFORMED_DATA, "The config log level is invalid!");

		if (typeof vsVersionsPath !== "string" || vsVersionsPath === "")
			throw new AppError(AppErrorCodes.MALFORMED_DATA, "The config Vintage Story Versions path is invalid!");

		if (typeof vsInstancesPath !== "string" || vsInstancesPath === "")
			throw new AppError(AppErrorCodes.MALFORMED_DATA, "The config Vintage Story Instances path is invalid!");

		return {
			schemaVersion: Config.SCHEMA_VERSION,
			theme,
			locale,
			scale,
			logLevel,
			vsVersionsPath,
			vsInstancesPath
		};
	}

	private static validateSchemaVersion(schemaVersion: unknown): void {
		if (schemaVersion === undefined) return;
		if (schemaVersion === Config.SCHEMA_VERSION) return;

		throw new AppError(AppErrorCodes.MALFORMED_DATA, `The config schema version ${String(schemaVersion)} is not supported!`);
	}

	private static isRecord(value: unknown): value is Record<string, unknown> {
		return typeof value === "object" && value !== null && !Array.isArray(value);
	}

	private static isTheme(value: unknown): value is ConfigJSON["theme"] {
		return Config.THEMES.some(({ key }) => key === value);
	}

	private static isLocale(value: unknown): value is ConfigJSON["locale"] {
		return Config.LOCALES.some(({ key }) => key === value);
	}

	private static isLogLevel(value: unknown): value is ConfigJSON["logLevel"] {
		return Config.LOG_LEVELS.some(({ key }) => key === value);
	}

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Set a new locale. Set's english if there provided locale is invalid.
	 * @param locale - The key of the locale to change to.
	 */
	public async setLocale(locale: (typeof Config.LOCALES)[number]["key"]): Promise<void> {
		try {
			App.logger.debug(`Setting locale to ${locale}...`);

			if (!isLocale(locale)) {
				App.logger.warn(`Locale ${locale} is not a valid locale! Setting to ${baseLocale}...`);

				locale = baseLocale;
			}

			Config.applyLocale(locale);

			this._locale = locale;

			await this.save();

			App.logger.debug(`Locale set to ${locale}!`);
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error setting the new locale: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error setting the new locale!");
		}
	}

	/**
	 * Apply a locale.
	 * @param locale The locale to apply.
	 */
	private static applyLocale(locale: (typeof Config.LOCALES)[number]["key"]): void {
		App.logger.debug(`Applying locale ${locale}...`);

		setLocale(locale, { reload: false });
	}

	/**
	 * Set a new theme.
	 * @param theme - The key of the theme to apply.
	 */
	public async setTheme(theme: (typeof Config.THEMES)[number]["key"]): Promise<void> {
		try {
			App.logger.debug(`Setting theme to ${theme}...`);

			Config.applyTheme(theme);

			this._theme = theme;

			await this.save();
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error setting the new theme: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error setting the new theme!");
		}
	}

	/**
	 * Apply a theme.
	 * @param theme The theme to apply.
	 */
	private static applyTheme(theme: (typeof Config.THEMES)[number]["key"]): void {
		App.logger.debug(`Applying theme ${theme}...`);

		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}

	/**
	 * Set a new UI scale.
	 * @param scale - The key of the scale to apply.
	 */
	public async setScale(scale: number): Promise<void> {
		try {
			App.logger.debug(`Setting scale to ${scale}...`);

			Config.applyScale(scale);

			this._scale = scale;

			await this.save();
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error setting the new scale: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error setting the new scale!");
		}
	}

	/**
	 * Apply a scale.
	 * @param scale The scale.
	 */
	private static applyScale(scale: number): void {
		App.logger.debug(`Applying scale ${scale}...`);

		document.documentElement.style.fontSize = `${scale}rem`;
	}

	/**
	 * Set a new log level.
	 * @param logLevel - The key of the log level to apply.
	 */
	public async setLogLevel(logLevel: (typeof Config.LOG_LEVELS)[number]["key"]): Promise<void> {
		try {
			App.logger.debug(`Setting log level to ${logLevel}...`);

			this._logLevel = logLevel;

			await this.save();
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error setting the new log level: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error setting the new log level!");
		}
	}

	/**
	 * Set a new directory for the Vintage Story Versions.
	 * @param dir - The directory.
	 */
	public async setVSVersionsDir(dir: Directory): Promise<void> {
		try {
			App.logger.debug(`Setting Vintage Story Versions directory to ${dir.path}...`);

			this._vsVersionsDir = dir;

			await this.save();
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error saving the new Vintage Story Versions path: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error saving the new Vintage Story Versions path!");
		}
	}

	/**
	 * Set a new directory for the Vintage Story Instances.
	 * @param dir - The directory.
	 */
	public async setVSInstancesDir(dir: Directory): Promise<void> {
		try {
			App.logger.debug(`Setting Vintage Story Instances directory to ${dir.path}...`);

			this._vsInstancesDir = dir;

			await this.save();
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error saving the new Vintage Story Instances path: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error saving the new Vintage Story Instances path!");
		}
	}

	/**
	 * Saves the config to the config file.
	 */
	private async save(): Promise<void> {
		try {
			App.logger.debug("Saving config...");

			const JSON = await this.exportToJSON();

			await this._file.writeJSON(JSON);
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error saving the config: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error saving the config!");
		}
	}

	/**
	 * Exports the config to a JSON.
	 * @returns A JSON with the config.
	 */
	private async exportToJSON(): Promise<ConfigJSON> {
		return {
			schemaVersion: Config.SCHEMA_VERSION,
			theme: this._theme,
			locale: this._locale,
			scale: this._scale,
			logLevel: this._logLevel,
			vsVersionsPath: this._vsVersionsDir.path,
			vsInstancesPath: this._vsInstancesDir.path
		};
	}
}
