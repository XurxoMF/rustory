<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export type ProgressBarProps = Omit<WithoutChildrenOrChild<Progress.RootProps>, 'class'>
</script>

<script lang="ts">
  import { Progress } from 'bits-ui'

  let { value = 0, ...restProps }: ProgressBarProps = $props()
</script>

<Progress.Root {value} class={[['w-full h-2 rounded-full overflow-hidden shadow-xl transition-all', 'bg-zinc-800']]} {...restProps}>
  <div class={['w-full h-full flex-1 rounded-full transition-all']} style={`transform: translateX(-${100 - (100 * (value ?? 0)) / 100}%)`}></div>
</Progress.Root>
