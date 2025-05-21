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
  private _lang: string = $state("en-EN");

  /**
   * Loads all the configs on this instance of RustoryInfo.
   */
  async init(): Promise<void> {
    let theme = localStorage.getItem("theme");
    theme = RustoryConfig.applyTheme(theme);
    this._theme = theme;

    let lang = localStorage.getItem("lang");
    lang = RustoryConfig.changeLanguage(lang);
    this._lang = lang;
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
  get lang(): string {
    return this._lang;
  }

  /**
   * Changes the language to the one with the provided key.
   *
   * If no key or an invalidad key is provided it'll default to "en-EN".
   *
   * @param lang - The key of the langueage to apply.
   */
  set lang(lang: string) {
    lang = RustoryConfig.changeLanguage(lang);
    this._lang = lang;
  }

  /**
   * Checks if the provided language is valid and changes it. If it's not valid it'll default to "en-EN".
   *
   * @param theme - The key of the language to change to.
   * @returns - The key of the new language.
   */
  private static changeLanguage(lang: string | null | undefined): string {
    // TODO: paraglide
    if (!lang /* || !getLanguages().some((l) => l.code === lang) */) lang = "en-EN";

    localStorage.setItem("lang", lang);
    /* i18next.changeLanguage(lang); */

    return lang;
  }

  /**
   * Checks if the provided theme is valid and applies it. If it's not valid it'll default to "en-EN".
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
