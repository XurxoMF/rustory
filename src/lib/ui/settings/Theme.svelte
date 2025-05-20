<script lang="ts">
  import i18n from "$i18n";

  import { RustoryConfig } from "$lib/classes/RustoryConfig.svelte";

  import { rustory } from "$lib/stores/rustory";
</script>

{#each RustoryConfig.THEMES as THEME}
  <button
    class={[
      "w-8 h-8 rounded-full cursor-pointer border border-zinc-500 enabled:shadow-sm enabled:shadow-black/50 disabled:opacity-50 enabled:hover:scale-105 duration-200",
      "t-dark:text-zinc-100",
      "t-light:text-zinc-900",
      "t-rust:text-rust-100",
      "t-midnight:text-gray-100",
      ,
      THEME.color,
    ]}
    onclick={() => (rustory.config.theme = THEME.key)}
    title={$i18n.t(THEME.localesKey)}
    aria-label={$i18n.t(THEME.localesKey)}
    disabled={THEME.key === rustory.config.theme}
  ></button>
{/each}
