<script lang="ts">
  import { Config } from "$lib/classes/Config.svelte";

  import { rustory } from "$lib/stores/rustory.svelte";
</script>

{#each Config.THEMES as THEME}
  <button
    class={[
      "w-8 h-8 rounded-full cursor-pointer disabled:opacity-50 border transition-[opacity,border] duration-200",
      "t-dark:border-zinc-750",
      "t-light:border-zinc-250",
      "t-rust:border-rust-750",
      "t-midnight:border-gray-750",
      THEME.color,
    ]}
    onclick={() => (rustory.config.theme = THEME.key)}
    title={THEME.name}
    aria-label={THEME.name}
    disabled={THEME.key === rustory.config.theme}
  ></button>
{/each}
