<script lang="ts">
  import { Config } from '@renderer/lib/classes/Config.svelte'
</script>

{#each Config.THEMES as THEME (THEME.key)}
  <button
    class={[
      'w-24 h-9 rounded-sm outline-none transition-colors',
      'cursor-pointer disabled:cursor-not-allowed',
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'inset-ring-zinc-800 ring-zinc-800',
      THEME.color
    ]}
    onclick={() => Config.instance.setTheme(THEME.key)}
    title={THEME.name}
    aria-label={THEME.name}
    disabled={THEME.key === Config.instance.theme}
  ></button>
{/each}
