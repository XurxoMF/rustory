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

<Tooltip.Provider delayDuration={150}>
  <Tooltip.Root bind:open {...restProps}>
    <Tooltip.Trigger
      class={[
        'shrink-0 flex items-center justify-center rounded-full outline-none leading-tight transition-all',
        'cursor-help disabled:cursor-not-allowed',
        'disabled:opacity-40',
        'focus-visible:inset-ring-1 focus-visible:ring-2',
        't-dark:inset-ring-zinc-800 t-dark:ring-zinc-800'
      ]}
      {...triggerProps}
    >
      {@render trigger()}
    </Tooltip.Trigger>

    <Tooltip.Portal to="#portal">
      <Tooltip.Content
        sideOffset={4}
        class={[
          'p-2 z-1000 rounded-sm backdrop-blur-xs shadow-xl leading-tight transition-all',
          'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'inset-ring-2',
          't-dark:bg-zinc-900/95 t-dark:inset-ring-zinc-800'
        ]}
        {...contentProps}
      >
        {@render children?.()}

        <Tooltip.Arrow class={['transition-all', 't-dark:text-zinc-800']} />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
