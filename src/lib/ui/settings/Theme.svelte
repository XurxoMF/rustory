<script lang="ts">
  import { RustoryConfig } from "$lib/classes/RustoryConfig.svelte";

  import { rustory } from "$lib/stores/rustory";
</script>

{#each RustoryConfig.THEMES as THEME}
  <button
    class={[
      "w-8 h-8 rounded-full cursor-pointer disabled:opacity-50 border transition-[opacity,border] duration-200",
      "t-dark:border-zinc-800",
      "t-light:border-zinc-300",
      "t-rust:border-rust-800",
      "t-midnight:border-gray-800",
      THEME.color,
    ]}
    onclick={() => (rustory.config.theme = THEME.key)}
    title={THEME.name}
    aria-label={THEME.name}
    disabled={THEME.key === rustory.config.theme}
  ></button>
{/each}
