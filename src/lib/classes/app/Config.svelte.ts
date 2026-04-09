import { path } from "@tauri-apps/api";
import { debug, error } from "@tauri-apps/plugin-log";

import { baseLocale, isLocale, setLocale } from "$lib/paraglide/runtime";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";
import { App } from "$lib/classes/App.svelte";

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

	private constructor(config: { theme: ThemeKeys; locale: LocaleKeys; scale: ScaleKeys; vsInstancesPath: string }) {
		this._theme = $state(config.theme);
		this._locale = $state(config.locale);
		this._scale = $state(config.scale);
		this._vsInstancesPath = $state(config.vsInstancesPath);
	}

	/**
	 * Loads all the config of the app.
	 */
	public static async init(): Promise<Config> {
		try {
			// TODO: Get the locale from the config
			const locale = baseLocale;

			// TODO: Get the theme from the config
			let theme: ThemeKeys = "dark";
			if (!theme) {
				theme = Config.THEMES[0].key;
				Config.saveTheme(theme);
			}
			Config.applyTheme(theme);

			// TODO: Get the scale from the config
			let scale: ScaleKeys = "100";
			if (!scale) {
				scale = Config.SCALES[2].scale;
				Config.saveScale(scale);
			}
			Config.applyScale(scale);

			// TODO: Get the vsInstancesPath from the config
			const vsInstancesPath = await path.join(App.info.dataPath, "VintageStory");

			return new Config({ theme, locale, scale, vsInstancesPath });
		} catch (err) {
			error("There was an error initializating the config!");
			debug(`There was an error initializating the config:\n${JSON.stringify(err)}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error initializating the config!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

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
	 * Path where Instances will be saved.
	 */
	private _vsInstancesPath: string;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

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
	 * Path where VS Instances will be saved.
	 */
	public get vsInstancesPath(): string {
		return this._vsInstancesPath;
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
		} else {
			setLocale(baseLocale, { reload: false });
		}
	}

	/**
	 * Set a new theme.
	 * @param theme - The key of the theme to apply.
	 */
	public async setTheme(theme: ThemeKeys): Promise<void> {
		try {
			await Config.saveTheme(theme);
			Config.applyTheme(theme);
			this._theme = theme;
		} catch (err) {
			error("There was an error setting the new theme!");
			debug(`There was an error setting the new theme:\n${JSON.stringify(err)}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error setting the new theme!");
		}
	}

	/**
	 * Save a theme.
	 * @param theme - The key of the theme to save.
	 */
	private static async saveTheme(theme: ThemeKeys): Promise<void> {
		try {
			// TODO: Save the theme to the config
			console.log(theme);
		} catch (err) {
			error("There was an error saving the new theme!");
			debug(`There was an error saving the new theme:\n${JSON.stringify(err)}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error saving the new theme!");
		}
	}

	/**
	 * Apply a theme.
	 * @param theme The theme to apply.
	 */
	private static applyTheme(theme: ThemeKeys): void {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
			document.documentElement.classList.remove("light");
		} else {
			document.documentElement.classList.add("light");
			document.documentElement.classList.remove("dark");
		}
	}

	/**
	 * Set a new UI scale.
	 * @param scale - The key of the scale to apply.
	 */
	public async setScale(scale: ScaleKeys): Promise<void> {
		try {
			await Config.saveScale(scale);
			Config.applyScale(scale);
			this._scale = scale;
		} catch (err) {
			error("There was an error setting the new scale!");
			debug(`There was an error setting the new scale:\n${JSON.stringify(err)}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error setting the new scale!");
		}
	}

	/**
	 * Save a scale.
	 * @param scale - The key of the scale to save.
	 */
	private static async saveScale(scale: ScaleKeys): Promise<void> {
		try {
			// TODO: Save the scale to the config
			console.log(scale);
		} catch (err) {
			error("There was an error saving the new scale!");
			debug(`There was an error saving the new scale:\n${JSON.stringify(err)}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error saving the new scale!");
		}
	}

	/**
	 * Apply a scale.
	 * @param scale The scale to apply.
	 */
	private static applyScale(scale: ScaleKeys): void {
		document.documentElement.setAttribute("data-uiscale", scale);
	}

	/**
	 * Set a new path for the VS Instances.
	 * @param scale - The path to save.
	 */
	public async setVSInstancesPath(path: string): Promise<void> {
		try {
			await Config.saveVSInstancesPath(path);
			this._vsInstancesPath = path;
		} catch (err) {
			error("There was an error saving the new VS Instances path!");
			debug(`There was an error saving the new VS Instances path:\n${JSON.stringify(err)}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error saving the new VS Instances path!");
		}
	}

	/**
	 * Save a path for the VS Instances.
	 * @param path - The path to save.
	 */
	private static async saveVSInstancesPath(path: string): Promise<void> {
		try {
			// TODO: Save the path to the config
			console.log(path);
		} catch (err) {
			error("There was an error saving the new Instances path!");
			debug(`There was an error saving the new Instances path:\n${JSON.stringify(err)}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error saving the new Instances path!");
		}
	}
}
