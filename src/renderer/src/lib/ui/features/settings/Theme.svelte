<script lang="ts">
  import { Config } from '@renderer/lib/classes/Config.svelte'
</script>

{#each Config.THEMES as THEME (THEME.key)}
  <button
    class={[
      'w-8 h-8 rounded-full border transition-[opacity,border] duration-200',
      'focus:outline-2',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-50',
      't-dark:border-zinc-750 t-dark:focus:outline-zinc-750',
      't-light:border-zinc-250 t-light:focus:outline-zinc-250',
      't-rust:border-rust-750 t-rust:focus:outline-rust-750',
      't-midnight:border-gray-750 t-midnight:focus:outline-gray-750',
      THEME.color
    ]}
    onclick={() => Config.instance.setTheme(THEME.key)}
    title={THEME.name}
    aria-label={THEME.name}
    disabled={THEME.key === Config.instance.theme}
  ></button>
{/each}
