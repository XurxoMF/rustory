<script lang="ts">
  import { Collapsible, type WithoutChild } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { slide } from 'svelte/transition'

  type CollapsibleSectionProps = Pick<WithoutChild<Collapsible.RootProps>, 'open' | 'ref' | 'children'> & {
    title: string
    isContainer?: boolean | undefined
  }

  let { open = $bindable(false), ref = $bindable(null), title, isContainer = false, children }: CollapsibleSectionProps = $props()
</script>

<Collapsible.Root
  bind:open
  bind:ref
  class={[
    'w-full rounded-md overflow-hidden border transition-[border,background-color] duration-200',
    't-dark:bg-zinc-850 t-dark:border-zinc-750',
    't-light:bg-zinc-150 t-light:border-zinc-250',
    't-rust:bg-rust-850 t-rust:border-rust-750',
    't-midnight:bg-gray-850 t-midnight:border-gray-750'
  ]}
>
  <Collapsible.Trigger class="w-full flex items-center justify-between p-2 cursor-pointer">
    {title}
    <Icon icon="ph:caret-down-bold" class={['transition-transform duration-200', open && 'rotate-180']} />
  </Collapsible.Trigger>

  <Collapsible.Content forceMount>
    {#snippet child({ props, open })}
      {#if open}
        <div transition:slide={{ duration: 200 }} {...props}>
          <div
            class={[
              'w-full p-2 border-t transition-[border] duration-200',
              't-dark:border-t-zinc-750',
              't-light:border-t-zinc-250',
              't-rust:border-t-rust-750',
              't-midnight:border-t-gray-750',
              isContainer && '@container'
            ]}
          >
            {@render children?.()}
          </div>
        </div>
      {/if}
    {/snippet}
  </Collapsible.Content>
</Collapsible.Root>
