import { isLocale, locales, setLocale, type Locale } from "$lib/paraglide/runtime";

export class RustoryConfig {
  /**
   * List of all the available themes.
   */
  static THEMES = [
    { key: "dark", localesKey: "themes.Dark", color: "bg-zinc-900" },
    { key: "light", localesKey: "themes.Light", color: "bg-zinc-100" },
    { key: "rust", localesKey: "themes.Rust", color: "bg-rust-900" },
    { key: "midnight", localesKey: "themes.Midnight", color: "bg-gray-900" },
  ];

  /**
   * Key of the current used theme.
   */
  private _theme: string = $state("dark");

  /**
   * Key of the selected language.
   */
  private _lang: Locale = $state("en");

  /**
   * Loads all the configs on this instance of RustoryInfo.
   */
  async init(): Promise<void> {
    let theme = localStorage.getItem("theme");
    theme = RustoryConfig.applyTheme(theme);
    this._theme = theme;

    let lang = localStorage.getItem("lang");
    lang = RustoryConfig.changeLanguage(lang);
    this._lang = lang as Locale;
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
  set theme(theme: string) {
    theme = RustoryConfig.applyTheme(theme);
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
  set lang(lang: Locale | string) {
    lang = RustoryConfig.changeLanguage(lang);
    this._lang = lang as Locale;
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

    localStorage.setItem("lang", locale);
    setLocale(locale);

    return locale;
  }

  /**
   * Checks if the provided theme is valid and applies it. If it's not valid it'll default to "en".
   *
   * @param theme - The key of the theme to apply.
   * @returns - The key of the applied theme.
   */
  private static applyTheme(theme: string | null | undefined): string {
    if (!theme || !RustoryConfig.THEMES.some((THEME) => THEME.key === theme)) theme = "dark";

    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);

    return theme;
  }
}
