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
   * Loads all the configs on this instance of RustoryInfo.
   */
  async init(): Promise<void> {
    let theme = localStorage.getItem("theme");
    theme = RustoryConfig.applyTheme(theme);
    this._theme = theme;
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
    RustoryConfig.applyTheme(theme);
    this._theme = theme;
  }

  /**
   * Checks if the provided theme is valid and pplies it. If it's not validit'll default to "dark".
   *
   * @param theme - The key of the theme to apply.
   * @returns - The key if the applied theme.
   */
  private static applyTheme(theme: string | null | undefined): string {
    if (!theme || !RustoryConfig.THEMES.some((THEME) => THEME.key === theme)) theme = "dark";

    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);

    return theme;
  }
}
