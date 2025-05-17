<script lang="ts">
  import i18n from "$i18n";

  import { THEMES_DATA, setTheme, theme } from "$modules/basics/stores/ThemeStore.svelte";
</script>

<div class="flex items-center gap-2">
  {#each THEMES_DATA as THEME}
    <button
      class={[
        "w-8 h-8 rounded-full cursor-pointer enabled:shadow-sm enabled:shadow-black/50 disabled:opacity-50 enabled:hover:scale-105 duration-200",
        THEME.color,
      ]}
      onclick={() => setTheme(THEME.key)}
      title={$i18n.t(THEME.localesKey)}
      aria-label={$i18n.t(THEME.localesKey)}
      disabled={THEME.key === theme.current}
    ></button>
  {/each}
</div>
