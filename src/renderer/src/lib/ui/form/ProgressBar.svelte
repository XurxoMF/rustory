<script lang="ts">
  import { Progress, useId } from 'bits-ui'

  let {
    value = 0
  }: {
    value: number
  } = $props()

  const labelId = useId()
</script>

<Progress.Root
  aria-labelledby={labelId}
  {value}
  class={[
    ['w-full h-2 rounded-full overflow-hidden border transition-[border] duration-200', 't-dark:border-zinc-750', 't-light:border-zinc-250', 't-rust:border-rust-750', 't-midnight:border-gray-750']
  ]}
>
  <div
    class={['w-full h-full flex-1 rounded-full transition-[background-color, transform] duration-200', 't-dark:bg-zinc-750', 't-light:bg-zinc-250', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']}
    style={`transform: translateX(-${100 - (100 * (value ?? 0)) / 100}%)`}
  ></div>
</Progress.Root>
