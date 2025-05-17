type ThemeDataType = {
  key: string;
  localesKey: string;
  color: string;
};

type ThemeStoreType = {
  current: string;
};

// Add the new theme here
const THEMES: string[] = ["dark", "light", "rust", "midnight"];

export const THEMES_DATA: ThemeDataType[] = [
  { key: "dark", localesKey: "themes.Dark", color: "bg-zinc-900" },
  { key: "light", localesKey: "themes.Light", color: "bg-zinc-100" },
  { key: "rust", localesKey: "themes.Rust", color: "bg-rust-900" },
  { key: "midnight", localesKey: "themes.Midnight", color: "bg-gray-900" },
];

export const theme = $state<ThemeStoreType>({ current: "dark" });

/**
 * Sets the new theme and saves it on the localStorage. If no theme is passed as parameter, "dark" will be used.
 *
 * @param newTheme - The key of the new theme.
 * @returns - False if the theme passed as parameter is invalid. True if it's valid or default.
 */
export const setTheme = (newTheme?: string | null): boolean => {
  if (!newTheme) newTheme = "dark";

  if (!THEMES.includes(newTheme)) return false;

  theme.current = newTheme;
  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  return true;
};
