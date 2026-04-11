import { error } from "@tauri-apps/plugin-log";

import { baseLocale, isLocale, setLocale } from "$lib/paraglide/runtime";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";
import { App } from "$lib/classes/App.svelte";
import { Directory } from "$lib/classes/utils/Directory.svelte";
import { File } from "$lib/classes/utils/File.svelte";

/**
 * Keys of the available themes.
 */
export type ThemeKeys = (typeof Config.THEMES)[number]["key"];

/**
 * Keys of the available locales.
 */
export type LocaleKeys = (typeof Config.LOCALES)[number]["lang"];

/**
 * Keys of the available scales.
 */
export type ScaleKeys = (typeof Config.SCALES)[number]["scale"];

/**
 * JSON of the config.
 */
export type ConfigJSON = {
	theme: ThemeKeys;
	locale: LocaleKeys;
	scale: ScaleKeys;
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
	 * List of all the available themes.
	 */
	private static _THEMES = [
		{ key: "dark", name: "Dark", color: "bg-stone-900" },
		{ key: "light", name: "Light", color: "bg-stone-100" }
	] as const;

	/**
	 * List of all the available locales with their data.
	 */
	private static _LOCALES = [
		{ lang: "en-EN", name: "English", credits: ["XurxoMF"] },
		{ lang: "es-ES", name: "Español", credits: ["XurxoMF"] }
	] as const;

	/**
	 * List of scales for the UI.
	 */
	private static _SCALES = [
		{ scale: "50", name: "50%" },
		{ scale: "75", name: "75%" },
		{ scale: "100", name: "100%" },
		{ scale: "125", name: "125%" },
		{ scale: "150", name: "150%" }
	] as const;

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	/**
	 * List of all the available themes.
	 */
	public static get THEMES(): typeof Config._THEMES {
		return Config._THEMES;
	}

	/**
	 * List of all the available locales.
	 */
	public static get LOCALES(): typeof Config._LOCALES {
		return Config._LOCALES;
	}

	/**
	 * List of scales for the UI.
	 */
	public static get SCALES(): typeof Config._SCALES {
		return Config._SCALES;
	}

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor(config: { file: File; theme: ThemeKeys; locale: LocaleKeys; scale: ScaleKeys; vsInstancesDir: Directory }) {
		this._file = config.file;
		this._theme = $state(config.theme);
		this._locale = $state(config.locale);
		this._scale = $state(config.scale);
		this._vsInstancesDir = config.vsInstancesDir;
	}

	/**
	 * Loads all the config of the app.
	 */
	public static async init(): Promise<Config> {
		try {
			const path = await App.info.configDir.join("config.json");
			const file = await File.create(path);
			const configJSON = await file.readJSON<ConfigJSON>();

			// Load the locale
			const locale = configJSON.locale || baseLocale;
			Config.applyLocale(locale);

			// Load the theme
			const theme: ThemeKeys = configJSON.theme || "dark";
			Config.applyTheme(theme);

			// Load the scale
			const scale: ScaleKeys = configJSON.scale || "100";
			Config.applyScale(scale);

			// Load the Vintage Story Instances path.
			const defaultVSInstancesPath = await App.info.dataDir.join("VintageStory");
			const vsInstancesDir = await Directory.create(configJSON.vsInstancesPath || defaultVSInstancesPath);

			const config = new Config({ file, theme, locale, scale, vsInstancesDir });

			await config.save();

			return config;
		} catch (err) {
			error(`There was an error initializating the config:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error initializating the config!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	private _file: File;

	/**
	 * Key of the current used theme.
	 */
	private _theme: ThemeKeys;

	/**
	 * Key of the selected language.
	 */
	private _locale: LocaleKeys;

	/**
	 * Key of the selected scale.
	 */
	private _scale: ScaleKeys;

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
	 * Key of the selected language.
	 */
	public get locale(): LocaleKeys {
		return this._locale;
	}

	/**
	 * Key of the selected theme.
	 */
	public get theme(): ThemeKeys {
		return this._theme;
	}

	/**
	 * Key of the selected scale.
	 */
	public get scale(): ScaleKeys {
		return this._scale;
	}

	/**
	 * Directory where VS Instances will be saved.
	 */
	public get vsInstancesDir(): Directory {
		return this._vsInstancesDir;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Set a new locale. Set's english if there provided locale is invalid.
	 * @param locale - The key of the language to change to.
	 */
	public async setLocale(locale: LocaleKeys): Promise<void> {
		if (!locale) locale = baseLocale;

		if (isLocale(locale)) {
			setLocale(locale, { reload: false });
			this._locale = locale;
			await this.save();
		} else {
			setLocale(baseLocale, { reload: false });
		}
	}

	/**
	 * Apply a locale.
	 * @param locale The locale to apply.
	 */
	private static applyLocale(locale: LocaleKeys): void {
		setLocale(locale, { reload: false });
	}

	/**
	 * Set a new theme.
	 * @param theme - The key of the theme to apply.
	 */
	public async setTheme(theme: ThemeKeys): Promise<void> {
		try {
			Config.applyTheme(theme);
			this._theme = theme;
			await this.save();
		} catch (err) {
			error(`There was an error setting the new theme:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error setting the new theme!");
		}
	}

	/**
	 * Apply a theme.
	 * @param theme The theme to apply.
	 */
	private static applyTheme(theme: ThemeKeys): void {
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
	public async setScale(scale: ScaleKeys): Promise<void> {
		try {
			Config.applyScale(scale);
			this._scale = scale;
			await this.save();
		} catch (err) {
			error(`There was an error setting the new scale:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error setting the new scale!");
		}
	}

	/**
	 * Apply a scale.
	 * @param scale The scale.
	 */
	private static applyScale(scale: ScaleKeys): void {
		document.documentElement.setAttribute("data-uiscale", scale);
	}

	/**
	 * Set a new path for the VS Instances.
	 * @param scale - The path.
	 */
	public async setVSInstancesPath(path: string): Promise<void> {
		try {
			this._vsInstancesDir = await Directory.create(path);
			await this.save();
		} catch (err) {
			error(`There was an error saving the new VS Instances path:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error saving the new VS Instances path!");
		}
	}

	/**
	 * Saves the config to the config file.
	 */
	private async save(): Promise<void> {
		try {
			const JSON = await this.exportToJSON();

			this._file.writeJSON(JSON);
		} catch (err) {
			error(`There was an error saving the config:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error saving the config!");
		}
	}

	/**
	 * Imports the config from a JSON file.
	 * @param config The
	 */
	private async importFromJSON(config: ConfigJSON): Promise<void> {
		this._theme = config.theme;
		this._locale = config.locale;
		this._scale = config.scale;
		this._vsInstancesDir = await Directory.create(config.vsInstancesPath);
	}

	/**
	 * Exports the config to a JSON.
	 * @returns A JSON with the config.
	 */
	private async exportToJSON(): Promise<ConfigJSON> {
		return {
			theme: this._theme,
			locale: this._locale,
			scale: this._scale,
			vsInstancesPath: this._vsInstancesDir.path
		};
	}
}
