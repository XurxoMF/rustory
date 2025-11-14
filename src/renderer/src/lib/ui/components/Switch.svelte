<script lang="ts">
  import { Switch, type WithoutChildrenOrChild } from 'bits-ui'

  type SwitchProps = Omit<WithoutChildrenOrChild<Switch.RootProps>, 'class'> & {
    thumbProps?: Omit<WithoutChildrenOrChild<Switch.ThumbProps>, 'class'> | undefined
  }

  let { checked = $bindable(false), thumbProps, ...restProps }: SwitchProps = $props()
</script>

<Switch.Root
  bind:checked
  class={[
    'h-6 w-12 shrink-0 flex items-center rounded-full p-1 shadow/20 transition-[opacity,background-color] duration-100',
    'focus-visible:outline-2',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-40',
    't-dark:bg-zinc-800 t-dark:data-[state=checked]:bg-zinc-750 t-dark:focus-visible:outline-zinc-800',
    't-light:bg-zinc-200 t-light:data-[state=checked]:bg-zinc-300 t-light:focus-visible:outline-zinc-300',
    't-rust:bg-rust-800 t-rust:data-[state=checked]:bg-rust-750 t-rust:focus-visible:outline-rust-750',
    't-midnight:bg-gray-800 t-midnight:data-[state=checked]:bg-gray-750 t-midnight:focus-visible:outline-gray-750'
  ]}
  {...restProps}
>
  <Switch.Thumb
    class={[
      'w-4 h-4 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 shrink-0 rounded-full 750 transition-[translate,background-color] duration-100',
      't-dark:bg-zinc-850',
      't-light:bg-zinc-100',
      't-rust:bg-rust-850',
      't-midnight:bg-gray-850'
    ]}
    {...thumbProps}
  />
</Switch.Root>
