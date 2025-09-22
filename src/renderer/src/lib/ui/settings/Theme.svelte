<script lang="ts">
  import { Button } from 'bits-ui'

  import { Config } from '@renderer/lib/classes/Config.svelte'
</script>

{#each Config.THEMES as THEME (THEME.key)}
  <Button.Root
    class={[
      'w-8 h-8 rounded-full cursor-pointer disabled:opacity-50 border transition-[opacity,border] duration-200',
      't-dark:border-zinc-750',
      't-light:border-zinc-250',
      't-rust:border-rust-750',
      't-midnight:border-gray-750',
      THEME.color
    ]}
    onclick={() => Config.instance.setTheme(THEME.key)}
    title={THEME.name}
    aria-label={THEME.name}
    disabled={THEME.key === Config.instance.theme}
  ></Button.Root>
{/each}
