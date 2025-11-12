<script lang="ts">
  import { Tooltip } from 'bits-ui'
  import { type Snippet } from 'svelte'

  type TooltipProps = Omit<Tooltip.RootProps, 'class'> & {
    trigger: Snippet
    triggerProps?: Omit<Tooltip.TriggerProps, 'class'>
    mode?: 'text' | 'icon' | 'wrapper' | undefined
  }

  let { open = $bindable(false), children, trigger, triggerProps = {}, mode = 'text', ...restProps }: TooltipProps = $props()
</script>

<Tooltip.Provider delayDuration={200}>
  <Tooltip.Root bind:open {...restProps}>
    <Tooltip.Trigger
      class={[
        'flex items-center justify-center shrink-0 rounded-md transition-opacity duration-200',
        'focus-visible:outline-2',
        'cursor-help disabled:cursor-not-allowed',
        'disabled:opacity-40',
        't-dark:focus-visible:outline-zinc-750',
        't-light:focus-visible:outline-zinc-300',
        't-rust:focus-visible:outline-rust-750',
        't-midnight:focus-visible:outline-gray-750'
      ]}
      {...triggerProps}
    >
      {@render trigger()}
    </Tooltip.Trigger>

    <Tooltip.Portal to="#portal">
      <Tooltip.Content
        sideOffset={4}
        class={[
          'rounded-md overflow-hidden z-500 shadow/20 transition-[border,background-color] duration-200',
          't-dark:bg-zinc-850 t-dark:border-zinc-750',
          't-light:bg-zinc-100 t-light:border-zinc-300',
          't-rust:bg-rust-850 t-rust:border-rust-750',
          't-midnight:bg-gray-850 t-midnight:border-gray-750',
          mode === 'text' && 'px-2 py-1',
          mode === 'icon' && 'p-1',
          mode === 'wrapper' && 'p-0'
        ]}
      >
        {@render children?.()}

        <Tooltip.Arrow class={['transition-[color] duration-200', 't-dark:text-zinc-750', 't-light:text-zinc-300', 't-rust:text-rust-750', 't-midnight:text-gray-750']} />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
