<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export type DescriptionTriggerProps = Omit<WithoutChildrenOrChild<Tooltip.TriggerProps>, 'class'>

  export type DescriptionContentProps = Omit<WithoutChildrenOrChild<Tooltip.ContentProps>, 'class' | 'sideOffset'>

  export type DescriptionProps = Omit<Tooltip.RootProps, 'class'> & {
    triggerProps?: DescriptionTriggerProps | undefined
    contentProps?: DescriptionContentProps | undefined
  }
</script>

<script lang="ts">
  import { Tooltip } from 'bits-ui'

  import Icon from '@renderer/lib/ui/components/Icon.svelte'

  let { open = $bindable(false), children, triggerProps, contentProps, ...restProps }: DescriptionProps = $props()
</script>

<Tooltip.Provider disableHoverableContent delayDuration={150}>
  <Tooltip.Root bind:open {...restProps}>
    <Tooltip.Trigger
      class={[
        'shrink-0 flex items-center justify-center rounded-full outline-none leading-tight transition-colors',
        'cursor-help disabled:cursor-not-allowed',
        'disabled:opacity-40',
        'focus-visible:inset-ring-1 focus-visible:ring-2',
        'inset-ring-zinc-800 ring-zinc-800'
      ]}
      {...triggerProps}
    >
      <Icon icon="ph:info" class="opacity-40" />
    </Tooltip.Trigger>

    <Tooltip.Portal to="#portal">
      <Tooltip.Content
        sideOffset={8}
        class={[
          'p-2 z-600 rounded-sm backdrop-blur-xs shadow-xl leading-tight transition-colors',
          'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'inset-ring-2',
          'bg-zinc-900/95 inset-ring-zinc-800'
        ]}
        {...contentProps}
      >
        {@render children?.()}

        <Tooltip.Arrow class={['transition-colors', 'text-zinc-800']} />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
