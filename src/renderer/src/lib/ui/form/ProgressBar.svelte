<script lang="ts">
  import { Progress } from 'bits-ui'

  export type ProgressBarProps = Omit<Progress.RootProps, 'class'>

  let { value = 0, ...restProps }: ProgressBarProps = $props()
</script>

<Progress.Root
  {value}
  class={[
    [
      'w-full h-2 rounded-full overflow-hidden border transition-[border,background-color] duration-200',
      't-dark:bg-zinc-800 t-dark:border-zinc-750',
      't-light:bg-zinc-200 t-light:border-zinc-300',
      't-rust:bg-rust-800t-rust:border-rust-750',
      't-midnight:bg-gray-800 t-midnight:border-gray-750'
    ]
  ]}
  {...restProps}
>
  <div
    class={['w-full h-full flex-1 rounded-full transition-[background-color,transform] duration-200', 't-dark:bg-zinc-750', 't-light:bg-zinc-300', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']}
    style={`transform: translateX(-${100 - (100 * (value ?? 0)) / 100}%)`}
  ></div>
</Progress.Root>
