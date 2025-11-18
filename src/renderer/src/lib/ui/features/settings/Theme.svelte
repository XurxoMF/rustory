<script lang="ts">
  import { Config } from '@renderer/lib/classes/Config.svelte'
</script>

{#each Config.THEMES as THEME (THEME.key)}
  <button
    class={[
      'w-24 h-10 rounded-sm outline-none transition-all',
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'cursor-pointer disabled:cursor-not-allowed',
      'inset-ring-zinc-800 ring-zinc-800',
      't-light:inset-ring-zinc-300 t-light:ring-zinc-300',
      THEME.color
    ]}
    onclick={() => Config.instance.setTheme(THEME.key)}
    title={THEME.name}
    aria-label={THEME.name}
    disabled={THEME.key === Config.instance.theme}
  ></button>
{/each}
