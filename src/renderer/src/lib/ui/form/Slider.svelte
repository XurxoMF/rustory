<script lang="ts">
  import type { ComponentProps } from 'svelte'
  import { Slider, type WithoutChildren } from 'bits-ui'

  type SliderProps = Omit<WithoutChildren<ComponentProps<typeof Slider.Root>>, 'class'>

  let { value = $bindable(), ref = $bindable(null), ...restProps }: SliderProps = $props()
</script>

<Slider.Root class={['relative w-full h-5 flex items-center justify-center', 'cursor-pointer data-disabled:cursor-not-allowed', 'data-disabled:opacity-50']} bind:value bind:ref {...restProps as any}>
  {#snippet children({ thumbItems, tickItems })}
    <span
      class={[
        'relative w-full h-1.5 rounded-full border transition-[border,background-color] duration-200',
        't-dark:bg-zinc-800 t-dark:border-zinc-750',
        't-light:bg-zinc-300 t-light:border-zinc-350',
        't-rust:bg-rust-800 t-rust:border-rust-750',
        't-midnight:bg-gray-800 t-midnight:border-gray-750'
      ]}
    >
      <Slider.Range
        class={[
          'absolute h-full rounded-full transition-[background-color] duration-200',
          'cursor-pointer data-disabled:cursor-not-allowed',
          't-dark:bg-zinc-750',
          't-light:bg-zinc-400',
          't-rust:bg-rust-750',
          't-midnight:bg-gray-750'
        ]}
      />
    </span>

    {#each thumbItems as { index } (index)}
      <Slider.Thumb
        {index}
        class={[
          'w-4 h-4 z-[5] rounded-full border transition-[opacity,border,background-color] duration-200',
          'focus:outline-1',
          'cursor-pointer data-disabled:cursor-not-allowed',
          'disabled:opacity-50',
          't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus:outline-zinc-750',
          't-light:bg-zinc-300 t-light:border-zinc-350 t-light:focus:outline-zinc-350',
          't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus:outline-rust-750',
          't-midnight:bg-gray-300 t-midnight:border-gray-750 t-midnight:focus:outline-gray-750'
        ]}
      />
    {/each}

    {#each tickItems as { index } (index)}
      <Slider.Tick
        {index}
        class={[
          'h-1.5 w-[1px] z-[1] border-y transition-[border,background-color] duration-200',
          't-dark:bg-zinc-900 t-dark:border-zinc-750',
          't-light:bg-zinc-450 t-light:border-zinc-350',
          't-rust:bg-rust-700 t-rust:border-rust-750',
          't-midnight:bg-gray-700 t-midnight:border-gray-750'
        ]}
      />
    {/each}
  {/snippet}
</Slider.Root>
