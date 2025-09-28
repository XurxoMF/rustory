<script lang="ts">
  import { Tooltip } from 'bits-ui'
  import { type Snippet } from 'svelte'

  type TooltipProps = Tooltip.RootProps & {
    trigger: Snippet
    triggerProps?: Tooltip.TriggerProps
    mode?: 'text' | 'icon' | 'wrapper' | undefined
  }

  let { open = $bindable(false), children, trigger, triggerProps = {}, mode = 'text', ...restProps }: TooltipProps = $props()
</script>

<Tooltip.Provider delayDuration={200}>
  <Tooltip.Root bind:open {...restProps}>
    <Tooltip.Trigger {...triggerProps}>
      {@render trigger()}
    </Tooltip.Trigger>

    <Tooltip.Portal to="#portal">
      <Tooltip.Content
        class={[
          'rounded-md overflow-hidden border transition-[border,background-color] duration-200',
          't-dark:bg-zinc-850 t-dark:border-zinc-750',
          't-light:bg-zinc-150 t-light:border-zinc-250',
          't-rust:bg-rust-850 t-rust:border-rust-750',
          't-midnight:bg-gray-850 t-midnight:border-gray-750',
          mode === 'text' && 'px-2 py-1',
          mode === 'icon' && 'p-1',
          mode === 'wrapper' && 'p-0'
        ]}
      >
        {@render children?.()}
        <Tooltip.Arrow class={['t-dark:text-zinc-750', 't-light:text-zinc-250', 't-rust:text-rust-750', 't-midnight:text-gray-750']} />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
