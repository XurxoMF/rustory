<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export type DescriptionTriggerProps = WithoutKeys<WithoutChildrenOrChild<Tooltip.TriggerProps>, 'class'>

  export type DescriptionContentProps = WithoutKeys<WithoutChildrenOrChild<Tooltip.ContentProps>, 'class' | 'sideOffset'>

  export type DescriptionProps = WithoutKeys<Tooltip.RootProps, 'class'> & {
    triggerProps?: DescriptionTriggerProps | undefined
    contentProps?: DescriptionContentProps | undefined
  }
</script>

<script lang="ts">
  import { Tooltip } from 'bits-ui'

  import { PHInfoBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

  let { open = $bindable(false), children, triggerProps, contentProps, ...restProps }: DescriptionProps = $props()
</script>

<Tooltip.Provider disableHoverableContent delayDuration={150}>
  <Tooltip.Root bind:open {...restProps}>
    <Tooltip.Trigger
      class={[
        'shrink-0 flex items-center justify-center rounded-full outline-none',
        'focus-visible:inset-ring-1 focus-visible:ring-2',
        'cursor-help data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        'inset-ring-zinc-800 ring-zinc-800',
        't-light:inset-ring-zinc-300 t-light:ring-zinc-300'
      ]}
      {...triggerProps}
    >
      <PHInfoBoldIcon class="opacity-40" />
    </Tooltip.Trigger>

    <Tooltip.Portal to="#portal">
      <Tooltip.Content
        sideOffset={8}
        class={[
          'p-2 z-600 rounded-sm backdrop-blur-xs shadow-xl',
          'inset-ring-2',
          'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'bg-zinc-900/95 inset-ring-zinc-800',
          't-light:bg-zinc-100/90 t-light:inset-ring-zinc-300'
        ]}
        {...contentProps}
      >
        {@render children?.()}

        <Tooltip.Arrow class={['transition-all', 'text-zinc-800', 't-light:text-zinc-300']} />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
