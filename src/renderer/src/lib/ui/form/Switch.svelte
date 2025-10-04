<script lang="ts">
  import { Switch, type WithoutChildrenOrChild } from 'bits-ui'

  type SwitchProps = Omit<WithoutChildrenOrChild<Switch.RootProps>, 'class'>

  let { checked = $bindable(false), ...restProps }: SwitchProps = $props()
</script>

<Switch.Root
  class={[
    'h-6 w-12 shrink-0 flex items-center rounded-full p-[0.2rem] border transition-[opacity,border,background-color] duration-200',
    'focus-visible:outline-1',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-40',
    't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus-visible:outline-zinc-750',
    't-light:bg-zinc-200 t-light:border-zinc-300 t-light:focus-visible:outline-zinc-300',
    't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus-visible:outline-rust-750',
    't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus-visible:outline-gray-750'
  ]}
  bind:checked
  {...restProps}
>
  <Switch.Thumb
    class={[
      'w-4 h-4 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 shrink-0 rounded-full border transition-[translate,border,background-color] duration-200',
      't-dark:bg-zinc-850 t-dark:border-zinc-750',
      't-light:bg-zinc-100 t-light:border-zinc-300',
      't-rust:bg-rust-850 t-rust:border-rust-750',
      't-midnight:bg-gray-850 t-midnight:border-gray-750'
    ]}
  />
</Switch.Root>
