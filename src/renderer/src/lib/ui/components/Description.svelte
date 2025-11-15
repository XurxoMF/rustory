<script lang="ts">
  import { Tooltip, type WithoutChildrenOrChild } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  type DescriptionProps = Omit<Tooltip.RootProps, 'class'> & {
    triggerProps?: Omit<WithoutChildrenOrChild<Tooltip.TriggerProps>, 'class'> | undefined
    contentProps?: Omit<WithoutChildrenOrChild<Tooltip.ContentProps>, 'class' | 'sideOffset'> | undefined
  }

  let { open = $bindable(false), children, triggerProps, contentProps, ...restProps }: DescriptionProps = $props()
</script>

<Tooltip.Provider disableHoverableContent delayDuration={500}>
  <Tooltip.Root bind:open {...restProps}>
    <Tooltip.Trigger
      class={[
        'shrink-0 flex items-center justify-center p-0.5 rounded-md transition-opacity duration-100',
        'focus-visible:outline-2',
        'cursor-help data-disabled:cursor-not-allowed',
        'disabled:opacity-40',
        't-dark:focus-visible:outline-zinc-800'
      ]}
      {...triggerProps}
    >
      <Icon icon="ph:info" class="opacity-40" />
    </Tooltip.Trigger>

    <Tooltip.Portal to="#portal">
      <Tooltip.Content
        sideOffset={4}
        class={[
          'px-2 py-1 rounded-md overflow-hidden z-1000 shadow/20 transition-[border,background-color] duration-100',
          't-dark:bg-zinc-850 t-dark:border-zinc-800'
        ]}
        {...contentProps}
      >
        {@render children?.()}

        <Tooltip.Arrow class={['transition-[color] duration-100', 't-dark:text-zinc-750']} />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
