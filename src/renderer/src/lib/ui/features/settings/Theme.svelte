<script lang="ts">
  import { Config } from '@renderer/lib/classes/Config.svelte'
</script>

{#each Config.THEMES as THEME (THEME.key)}
  <button
    class={[
      'w-9 h-9 rounded-full border transition-[opacity,border,background-color] duration-200',
      'focus-visible:outline-1',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-40',
      't-dark:border-zinc-750 t-dark:focus-visible:outline-zinc-750',
      't-light:border-zinc-350 t-light:focus-visible:outline-zinc-350',
      't-rust:border-rust-750 t-rust:focus-visible:outline-rust-750',
      't-midnight:border-gray-750 t-midnight:focus-visible:outline-gray-750',
      THEME.color
    ]}
    onclick={() => Config.instance.setTheme(THEME.key)}
    title={THEME.name}
    aria-label={THEME.name}
    disabled={THEME.key === Config.instance.theme}
  ></button>
{/each}
