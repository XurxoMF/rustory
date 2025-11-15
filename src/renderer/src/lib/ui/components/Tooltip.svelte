<script lang="ts">
  import { Tooltip, type WithoutChildrenOrChild } from 'bits-ui'
  import type { Snippet } from 'svelte'

  type TooltipProps = Omit<Tooltip.RootProps, 'class'> & {
    trigger: Snippet
    triggerProps?: Omit<WithoutChildrenOrChild<Tooltip.TriggerProps>, 'class'> | undefined
    contentProps?: Omit<WithoutChildrenOrChild<Tooltip.ContentProps>, 'class' | 'sideOffset'> | undefined
  }

  let { open = $bindable(false), children, trigger, triggerProps, contentProps, ...restProps }: TooltipProps = $props()
</script>

<Tooltip.Provider delayDuration={500}>
  <Tooltip.Root bind:open {...restProps}>
    <Tooltip.Trigger
      class={[
        'rounded-md transition-opacity',
        'focus-visible:outline-2',
        'cursor-help data-disabled:cursor-not-allowed',
        'disabled:opacity-40',
        't-dark:focus-visible:outline-zinc-800'
      ]}
      {...triggerProps}
    >
      {@render trigger()}
    </Tooltip.Trigger>

    <Tooltip.Portal to="#portal">
      <Tooltip.Content
        sideOffset={4}
        class={['p-2 rounded-md overflow-hidden z-1000 shadow/30 transition-all', 't-dark:bg-zinc-850 t-dark:border-zinc-800']}
        {...contentProps}
      >
        {@render children?.()}

        <Tooltip.Arrow class={['transition-all', 't-dark:text-zinc-750']} />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
