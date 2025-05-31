<script lang="ts">
  import { RConfig } from "$lib/classes/RConfig.svelte";

  import { rConfig } from "$lib/stores/rustory.svelte";
</script>

{#each RConfig.THEMES as THEME}
  <button
    class={[
      "w-8 h-8 rounded-full cursor-pointer disabled:opacity-50 border transition-[opacity,border] duration-200",
      "t-dark:border-zinc-750",
      "t-light:border-zinc-250",
      "t-rust:border-rust-750",
      "t-midnight:border-gray-750",
      THEME.color,
    ]}
    onclick={() => (rConfig.theme = THEME.key)}
    title={THEME.name}
    aria-label={THEME.name}
    disabled={THEME.key === rConfig.theme}
  ></button>
{/each}
