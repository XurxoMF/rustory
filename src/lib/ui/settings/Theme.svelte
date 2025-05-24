<script lang="ts">
  import { RustoryConfig } from "$lib/classes/RustoryConfig.svelte";

  import { rustory } from "$lib/stores/rustory";
</script>

{#each RustoryConfig.THEMES as THEME}
  <button
    class={[
      "w-8 h-8 rounded-full cursor-pointer border border-zinc-500 enabled:shadow-sm enabled:shadow-black/50 disabled:opacity-50 enabled:hover:scale-105 transition-[scale,opacity] duration-200",
      THEME.color,
    ]}
    onclick={() => (rustory.config.theme = THEME.key)}
    title={THEME.localesKey}
    aria-label={THEME.localesKey}
    disabled={THEME.key === rustory.config.theme}
  ></button>
  <!-- TODO: paraglide -->
{/each}
