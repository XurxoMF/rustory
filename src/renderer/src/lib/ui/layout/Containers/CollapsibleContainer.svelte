<script lang="ts">
  import { Collapsible, type WithoutChild } from 'bits-ui'
  import { slide } from 'svelte/transition'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  type CollapsibleContainerProps = Omit<WithoutChild<Collapsible.RootProps>, 'class'> & {
    title: string
  }

  let { open = $bindable(false), ref = $bindable(null), title, children, ...restProps }: CollapsibleContainerProps = $props()
</script>

<Collapsible.Root bind:open bind:ref class="w-full h-full flex flex-col" {...restProps}>
  <Collapsible.Trigger class="w-full flex items-center justify-between p-2 cursor-pointer">
    <h1>{title}</h1>
    <Icon icon="ph:caret-up-down" />
  </Collapsible.Trigger>

  <Collapsible.Content forceMount>
    {#snippet child({ props, open })}
      {#if open}
        <div transition:slide={{ duration: 200 }} {...props}>
          <div class={['w-full p-2 border-t transition-[border] duration-200', 't-dark:border-t-zinc-750', 't-light:border-t-zinc-250', 't-rust:border-t-rust-750', 't-midnight:border-t-gray-750']}>
            {@render children?.()}
          </div>
        </div>
      {/if}
    {/snippet}
  </Collapsible.Content>
</Collapsible.Root>
