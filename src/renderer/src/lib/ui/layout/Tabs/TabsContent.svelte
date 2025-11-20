<script lang="ts" module>
  import type { WithoutChild } from 'bits-ui'

  export type TabsContentProps = Omit<WithoutChild<Tabs.ContentProps>, 'class'>
</script>

<script lang="ts">
  import { Tabs } from 'bits-ui'

  let { children, ...restProps }: TabsContentProps = $props()
</script>

<Tabs.Content class="w-full h-full outline-none" tabindex={-1} {...restProps}>
  {@render children?.()}
</Tabs.Content>
