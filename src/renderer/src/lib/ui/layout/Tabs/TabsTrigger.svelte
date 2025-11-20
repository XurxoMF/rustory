<script lang="ts" module>
  import type { WithoutChildrenOrChild } from 'bits-ui'

  export type TabsTriggerProps = Omit<WithoutChildrenOrChild<Tabs.TriggerProps>, 'class'> & {
    label: string
  }
</script>

<script lang="ts">
  import { Tabs } from 'bits-ui'

  let { label, ...restProps }: TabsTriggerProps = $props()
</script>

<Tabs.Trigger
  class={[
    'shrink-0 min-w-7 min-h-7 leading-tight font-medium rounded-sm outline-none transition-colors',
    'focus-visible:inset-ring-1 focus-visible:ring-2',
    'cursor-pointer data-disabled:cursor-not-allowed',
    'data-disabled:opacity-40',
    'data-[state=inactive]:text-current/50',
    'inset-ring-zinc-800 ring-zinc-800',
    't-light:inset-ring-zinc-300 t-light:ring-zinc-300'
  ]}
  {...restProps}
>
  {label}
</Tabs.Trigger>
