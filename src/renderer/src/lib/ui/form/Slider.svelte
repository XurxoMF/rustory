<script lang="ts">
  import type { ComponentProps } from 'svelte'
  import { Slider, type WithoutChildren } from 'bits-ui'

  type SliderProps = Omit<WithoutChildren<ComponentProps<typeof Slider.Root>>, 'class'> & {
    withTicks?: boolean | undefined
    withThumbs?: boolean | undefined
  }

  let { value = $bindable(), ref = $bindable(null), withTicks = false, withThumbs = false, ...restProps }: SliderProps = $props()
</script>

<Slider.Root
  class={['relative w-full h-5 flex items-center justify-center', 'cursor-pointer data-disabled:cursor-not-allowed', 'data-disabled:opacity-40', withThumbs && 'mt-5']}
  bind:value
  bind:ref
  {...restProps as any}
>
  {#snippet children({ thumbItems, tickItems })}
    <span
      class={['relative w-full h-1.5 rounded-full shadow/20 transition-[background-color] duration-200', 't-dark:bg-zinc-800', 't-light:bg-zinc-200', 't-rust:bg-rust-800', 't-midnight:bg-gray-800']}
    >
      <Slider.Range
        class={[
          'absolute h-full rounded-full transition-[background-color] duration-200',
          'cursor-pointer data-disabled:cursor-not-allowed',
          't-dark:bg-zinc-750',
          't-light:bg-zinc-300',
          't-rust:bg-rust-750',
          't-midnight:bg-gray-750'
        ]}
      />
    </span>

    {#each thumbItems as { index } (index)}
      <Slider.Thumb
        {index}
        class={[
          'w-4 h-4 z-5 rounded-full shadow/20 transition-[opacity,background-color] duration-200',
          'focus-visible:outline-2',
          'cursor-pointer data-disabled:cursor-not-allowed',
          'disabled:opacity-40',
          't-dark:bg-zinc-750 t-dark:focus-visible:outline-zinc-750',
          't-light:bg-zinc-300 t-light:focus-visible:outline-zinc-300',
          't-rust:bg-rust-750 t-rust:focus-visible:outline-rust-750',
          't-midnight:bg-gray-750 t-midnight:focus-visible:outline-gray-750'
        ]}
      />
    {/each}

    {#each tickItems as { value, index } (index)}
      {#if withTicks}
        <Slider.Tick
          {index}
          class={[
            'h-1.5 w-px z-1 transition-[background-color] duration-200',
            't-dark:bg-zinc-900 t-dark:border-zinc-750',
            't-light:bg-zinc-400 t-light:border-zinc-300',
            't-rust:bg-rust-900 t-rust:border-rust-750',
            't-midnight:bg-gray-900 t-midnight:border-gray-750'
          ]}
        />
      {/if}

      {#if withThumbs}
        <Slider.TickLabel class="opacity-40 data-bounded:opacity-100 text-xs transition-opacity duration-200" {index}>
          {value}
        </Slider.TickLabel>
      {/if}
    {/each}
  {/snippet}
</Slider.Root>
