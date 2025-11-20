<script lang="ts" module>
  import type { Snippet } from 'svelte'
  import { type WithoutChild } from 'bits-ui'

  export type TabsContainerListProps = WithoutKeys<WithoutChild<Tabs.ListProps>, 'class' | 'orientation'>

  export type TabsContainerProps = WithoutKeys<WithoutChild<Tabs.RootProps>, 'class'> & {
    triggers?: Snippet | undefined
    listProps?: TabsContainerListProps | undefined
  }
</script>

<script lang="ts">
  import { Tabs } from 'bits-ui'

  let { value = $bindable(''), triggers, children, listProps, ...restProps }: TabsContainerProps = $props()
</script>

<Tabs.Root orientation="horizontal" {value} class="w-full h-full" {...restProps}>
  <Tabs.List class={['w-full flex items-center gap-6 pb-4 border-b-2', 'border-b-zinc-800', 't-light:border-b-zinc-300']} {...listProps}>
    {@render triggers?.()}
  </Tabs.List>

  <div class="w-full pt-4">
    {@render children?.()}
  </div>
</Tabs.Root>
