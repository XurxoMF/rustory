<script lang="ts" module>
  type ThemeType = {
    current: string;
  };

  export const THEMES_DATA = [
    { key: "dark", localesKey: "themes.Dark", color: "bg-zinc-900" },
    { key: "light", localesKey: "themes.Light", color: "bg-zinc-100" },
    { key: "rust", localesKey: "themes.Rust", color: "bg-rust-900" },
    { key: "midnight", localesKey: "themes.Midnight", color: "bg-gray-900" },
  ];

  export const theme: ThemeType = $state({ current: "dark" });

  /**
   * Sets the new theme and saves it on the localStorage. If no theme is passed as parameter, "dark" will be used.
   *
   * @param newTheme - The key of the new theme.
   */
  export const setTheme = (newTheme?: string | null) => {
    if (!newTheme || !THEMES_DATA.some((THEME_DATA) => THEME_DATA.key === newTheme))
      newTheme = "dark";

    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
    theme.current = newTheme;
  };
</script>

<script lang="ts">
  import i18n from "$i18n";
</script>

<div class="flex items-center gap-2">
  {#each THEMES_DATA as THEME}
    <button
      class={[
        "w-8 h-8 rounded-full cursor-pointer border border-zinc-500 enabled:shadow-sm enabled:shadow-black/50 disabled:opacity-50 enabled:hover:scale-105 duration-200",
        THEME.color,
      ]}
      onclick={() => setTheme(THEME.key)}
      title={$i18n.t(THEME.localesKey)}
      aria-label={$i18n.t(THEME.localesKey)}
      disabled={THEME.key === theme.current}
    ></button>
  {/each}
</div>
