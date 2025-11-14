<script lang="ts">
  import { Separator, type WithoutChildrenOrChild } from 'bits-ui'

  type SeparatorProps = Omit<WithoutChildrenOrChild<Separator.RootProps>, 'class'>

  let { ...restProps }: SeparatorProps = $props()
</script>

<Separator.Root
  class={[
    'shrink-0 transition-all duration-100',
    'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
    'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
    't-dark:bg-zinc-800'
  ]}
  {...restProps}
/>
