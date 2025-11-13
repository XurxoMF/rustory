<script lang="ts">
  import { Tooltip, type WithoutChildrenOrChild } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  type DescriptionProps = Omit<Tooltip.RootProps, 'class'> & {
    triggerProps?: Omit<WithoutChildrenOrChild<Tooltip.TriggerProps>, 'class'> | undefined
    contentProps?: Omit<WithoutChildrenOrChild<Tooltip.ContentProps>, 'class' | 'sideOffset'> | undefined
  }

  let { open = $bindable(false), children, triggerProps, contentProps, ...restProps }: DescriptionProps = $props()
</script>

<Tooltip.Provider delayDuration={200}>
  <Tooltip.Root bind:open {...restProps}>
    <Tooltip.Trigger
      class={[
        'p-1 flex items-center justify-center shrink-0 rounded-md transition-opacity duration-200',
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
      <Icon icon="ph:info" class="opacity-40" />
    </Tooltip.Trigger>

    <Tooltip.Portal to="#portal">
      <Tooltip.Content
        sideOffset={4}
        class={[
          'px-2 py-1 rounded-md overflow-hidden z-1000 shadow/20 transition-[border,background-color] duration-200',
          't-dark:bg-zinc-850 t-dark:border-zinc-750',
          't-light:bg-zinc-100 t-light:border-zinc-300',
          't-rust:bg-rust-850 t-rust:border-rust-750',
          't-midnight:bg-gray-850 t-midnight:border-gray-750'
        ]}
        {...contentProps}
      >
        {@render children?.()}

        <Tooltip.Arrow class={['transition-[color] duration-200', 't-dark:text-zinc-750', 't-light:text-zinc-300', 't-rust:text-rust-750', 't-midnight:text-gray-750']} />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
