<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export type ProgressBarProps = WithoutKeys<WithoutChildrenOrChild<Progress.RootProps>, 'class'>
</script>

<script lang="ts">
  import { Progress } from 'bits-ui'

  let { value = 0, ...restProps }: ProgressBarProps = $props()
</script>

<Progress.Root
  {value}
  class={[
    [
      'w-full h-2 rounded-full overflow-hidden shadow-xl transition-all',
      'inset-ring-2',
      'bg-zinc-800/50 inset-ring-zinc-800',
      't-light:bg-zinc-300/50 t-light:inset-ring-zinc-300'
    ]
  ]}
  {...restProps}
>
  <div
    class={['w-full h-full flex-1 rounded-full transition-all', 'bg-green-500', 't-light:bg-green-500']}
    style={`transform: translateX(-${100 - (100 * (value ?? 0)) / 100}%)`}
  ></div>
</Progress.Root>
