<script lang="ts">
  import { Collapsible, type WithoutChild, type WithoutChildrenOrChild } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  type CollapsibleSectionProps = Omit<WithoutChild<Collapsible.RootProps>, 'class'> & {
    title: string
    triggerProps?: Omit<WithoutChildrenOrChild<Collapsible.TriggerProps>, 'class'> | undefined
    contentProps?: Omit<WithoutChildrenOrChild<Collapsible.ContentProps>, 'class'> | undefined
  }

  let { open = $bindable(false), ref = $bindable(null), title, children, triggerProps, contentProps, ...restProps }: CollapsibleSectionProps = $props()
</script>

<Collapsible.Root
  bind:open
  bind:ref
  class={[
    'rounded-md border shadow/20 transition-[border,background-color] duration-200',
    't-dark:bg-zinc-850 t-dark:border-zinc-750',
    't-light:bg-zinc-100 t-light:border-zinc-300',
    't-rust:bg-rust-850 t-rust:border-rust-750',
    't-midnight:bg-gray-850 t-midnight:border-gray-750'
  ]}
  {...restProps}
>
  <Collapsible.Trigger
    class={[
      'w-full flex items-center justify-between gap-2 p-2 rounded-t-md data-[state=closed]:rounded-b-md transition-[border-radius] duration-200',
      'focus-visible:outline-2',
      'cursor-pointer data-disabled:cursor-default',
      't-dark:focus-visible:outline-zinc-750',
      't-light:focus-visible:outline-zinc-300',
      't-rust:focus-visible:outline-rust-750',
      't-midnight:focus-visible:outline-gray-750'
    ]}
    {...triggerProps}
  >
    <h1>{title}</h1>

    <Icon icon="ph:caret-up-down" class="opacity-40 text-lg" />
  </Collapsible.Trigger>

  <Collapsible.Content
    class={[
      'overflow-hidden border-t transition-[border] duration-200',
      'data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up',
      't-dark:border-t-zinc-750',
      't-light:border-t-zinc-300',
      't-rust:border-t-rust-750',
      't-midnight:border-t-gray-750'
    ]}
    {...contentProps}
  >
    <div class="p-2">{@render children?.()}</div>
  </Collapsible.Content>
</Collapsible.Root>
