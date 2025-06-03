import { m } from "$lib/paraglide/messages";
import { appDataDir, join } from "@tauri-apps/api/path";

import { getLocale, isLocale, setLocale, type Locale } from "$lib/paraglide/runtime";

export class Config {
  /**
   * Singleton instance of the Config.
   */
  private static _instance: Config | null = null;

  /**
   * Get the instance of the Config.
   */
  static get instance(): Config {
    if (Config._instance === null) Config._instance = new Config();
    return Config._instance;
  }

  /**
   * List of all the available themes.
   */
  static THEMES = [
    { key: "dark", name: m.themes__dark(), color: "bg-zinc-900" },
    { key: "light", name: m.themes__light(), color: "bg-zinc-100" },
    { key: "rust", name: m.themes__rust(), color: "bg-rust-900" },
    { key: "midnight", name: m.theme__midnight(), color: "bg-gray-900" },
  ] as const;

  /**
   * List of all the available locales with their data.
   */
  static LANGUAGES = [
    { lang: "en", name: m.lang__english(), credits: ["XurxoMF"] },
    { lang: "es", name: m.lang__spanish(), credits: ["XurxoMF"] },
  ] as const;

  /**
   * List of scales for the UI.
   */
  static SCALES = [
    { scale: "50", name: "50%" },
    { scale: "75", name: "75%" },
    { scale: "100", name: "100%" },
    { scale: "125", name: "125%" },
    { scale: "150", name: "150%" },
  ] as const;

  /**
   * Key of the current used theme.
   */
  private _theme: string = $state("dark");

  /**
   * Key of the selected language.
   */
  private _lang: Locale = $state("en");

  /**
   * Key of the selected scale.
   */
  private _scale: string = $state("100");

  /**
   * Path where Instances will be saved.
   */
  private _instancesPath: string = $state("");

  /**
   * Path where Servers will be saved.
   */
  private _serversPath: string = $state("");

  private constructor() {}

  /**
   * Loads all the configs on this instance.
   */
  async init(): Promise<void> {
    this.theme = localStorage.getItem("theme");
    this.lang = getLocale();
    this.scale = localStorage.getItem("uiscale");

    let appDataDirPath = await appDataDir();

    this.instancesPath =
      localStorage.getItem("instances-path") ?? (await join(appDataDirPath, "Instances"));
    this.serversPath =
      localStorage.getItem("servers-path") ?? (await join(appDataDirPath, "Servers"));
  }

  /**
   * Key of the current used theme.
   */
  get theme(): string {
    return this._theme;
  }

  /**
   * Changes the theme to the one with the provided key.
   *
   * If no key or an invalidad key is provided it'll default to "dark".
   *
   * @param theme - The key of the theme to apply.
   */
  set theme(theme: string | null | undefined) {
    theme = Config.applyTheme(theme);
    this._theme = theme;
  }

  /**
   * Key of the selected language.
   */
  get lang(): Locale {
    return this._lang;
  }

  /**
   * Changes the language to the one with the provided key.
   *
   * If no key or an invalidad key is provided it'll default to "en".
   *
   * @param lang - The key of the langueage to apply.
   */
  set lang(lang: Locale | string | null | undefined) {
    lang = Config.changeLanguage(lang);
    this._lang = lang as Locale;
  }

  /**
   * Key of the selected scale.
   */
  get scale(): string {
    return this._scale;
  }

  /**
   * Changes the scale to the one with the provided key.
   *
   * If no key or an invalidad key is provided it'll default to "100".
   *
   * @param scale - The key of the scale to apply.
   */
  set scale(scale: string | null | undefined) {
    scale = Config.applyScale(scale);
    this._scale = scale;
  }

  /**
   * Path where Instances will be saved.
   */
  get instancesPath(): string {
    return this._instancesPath;
  }

  /**
   * Sets the path where Instances will be saved.
   *
   * @param path - The path to set for Instances.
   */
  set instancesPath(path: string) {
    localStorage.setItem("instances-path", path);
    this._instancesPath = path;
  }

  /**
   * Path where Servers will be saved.
   */
  get serversPath(): string {
    return this._serversPath;
  }

  /**
   * Sets the path where Servers will be saved.
   *
   * @param path - The path to set for Servers.
   */
  set serversPath(path: string) {
    localStorage.setItem("servers-path", path);
    this._serversPath = path;
  }

  /**
   * Checks if the provided language is valid and changes it. If it's not valid it'll default to "en".
   *
   * @param theme - The key of the language to change to.
   * @returns - The key of the new language.
   */
  private static changeLanguage(lang: Locale | string | null | undefined): Locale {
    let locale: Locale = "en";
    if (isLocale(lang)) locale = lang as Locale;
    setLocale(locale, { reload: false });
    return locale;
  }

  /**
   * Checks if the provided theme is valid and applies it. If it's not valid it'll default to "en".
   *
   * @param theme - The key of the theme to apply.
   * @returns - The key of the applied theme.
   */
  private static applyTheme(theme: string | null | undefined): string {
    if (!theme || !Config.THEMES.some((THEME) => THEME.key === theme)) theme = "dark";
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
    return theme;
  }

  /**
   * Checks if the provided scale is valid and applies it. If it's not valid it'll default to "100".
   *
   * @param scale - The key of the scale to apply.
   * @returns - The key of the applied scale.
   */
  private static applyScale(scale: string | null | undefined): string {
    if (!scale || !Config.SCALES.some((SCALE) => SCALE.scale === scale)) scale = "100";
    localStorage.setItem("uiscale", scale);
    document.documentElement.setAttribute("data-uiscale", scale);
    return scale;
  }
}
