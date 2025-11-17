<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export type SeparatorProps = WithoutKeys<WithoutChildrenOrChild<Separator.RootProps>, 'class'>
</script>

<script lang="ts">
  import { Separator } from 'bits-ui'

  let { ...restProps }: SeparatorProps = $props()
</script>

<Separator.Root
  class={[
    'shrink-0 transition-colors',
    'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
    'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
    'bg-zinc-800'
  ]}
  {...restProps}
/>
