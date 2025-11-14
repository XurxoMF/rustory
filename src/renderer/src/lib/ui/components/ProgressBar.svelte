<script lang="ts">
  import { Progress, type WithoutChildrenOrChild } from 'bits-ui'

  export type ProgressBarProps = Omit<WithoutChildrenOrChild<Progress.RootProps>, 'class'>

  let { value = 0, ...restProps }: ProgressBarProps = $props()
</script>

<Progress.Root
  {value}
  class={[
    ['w-full h-2 rounded-full overflow-hidden shadow/20 transition-[background-color] duration-100', 't-dark:bg-zinc-800', 't-light:bg-zinc-200', 't-rust:bg-rust-800', 't-midnight:bg-gray-800']
  ]}
  {...restProps}
>
  <div
    class={['w-full h-full flex-1 rounded-full transition-[background-color,transform] duration-100', 't-dark:bg-zinc-750', 't-light:bg-zinc-300', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']}
    style={`transform: translateX(-${100 - (100 * (value ?? 0)) / 100}%)`}
  ></div>
</Progress.Root>
