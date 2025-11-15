<script lang="ts">
  import { Slider, type WithoutChildrenOrChild } from 'bits-ui'

  type SliderProps = Omit<WithoutChildrenOrChild<Slider.RootProps>, 'class'> & {
    withTicks?: boolean | undefined
    withTickLabels?: boolean | undefined
    rangeProps?: Omit<WithoutChildrenOrChild<Slider.RangeProps>, 'class'> | undefined
    thumbProps?: Omit<WithoutChildrenOrChild<Slider.ThumbProps>, 'class' | 'index'> | undefined
    tickProps?: Omit<WithoutChildrenOrChild<Slider.TickProps>, 'class' | 'index'> | undefined
    tickLabelProps?: Omit<WithoutChildrenOrChild<Slider.TickLabelProps>, 'class' | 'index'> | undefined
  }

  let {
    value = $bindable(),
    ref = $bindable(null),
    withTicks = false,
    withTickLabels = false,
    rangeProps,
    thumbProps,
    tickProps,
    tickLabelProps,
    ...restProps
  }: SliderProps = $props()
</script>

<!-- TODO: Check and change the mt-5 with a trackPadding or similar if it works -->

<Slider.Root
  bind:value
  bind:ref
  class={[
    'relative w-full h-5 flex items-center justify-center',
    'cursor-pointer data-disabled:cursor-not-allowed',
    'data-disabled:opacity-40',
    withTickLabels && 'mt-5'
  ]}
  {...restProps as any}
>
  {#snippet children({ thumbItems, tickItems })}
    <span
      class={[
        'relative w-full h-1.5 rounded-full shadow/20 transition-[background-color] duration-100',
        't-dark:bg-zinc-800',
        't-light:bg-zinc-200',
        't-rust:bg-rust-800',
        't-midnight:bg-gray-800'
      ]}
    >
      <Slider.Range
        class={[
          'absolute h-full rounded-full transition-[background-color] duration-100',
          'cursor-pointer data-disabled:cursor-not-allowed',
          't-dark:bg-zinc-750',
          't-light:bg-zinc-300',
          't-rust:bg-rust-750',
          't-midnight:bg-gray-750'
        ]}
        {...rangeProps}
      />
    </span>

    {#each thumbItems as { index } (index)}
      <Slider.Thumb
        {index}
        class={[
          'w-4 h-4 z-5 rounded-full shadow/20 transition-[opacity,background-color] duration-100',
          'focus-visible:outline-2',
          'cursor-pointer data-disabled:cursor-not-allowed',
          'disabled:opacity-40',
          't-dark:bg-zinc-750 t-dark:focus-visible:outline-zinc-800',
          't-light:bg-zinc-300 t-light:focus-visible:outline-zinc-300',
          't-rust:bg-rust-750 t-rust:focus-visible:outline-rust-750',
          't-midnight:bg-gray-750 t-midnight:focus-visible:outline-gray-750'
        ]}
        {...thumbProps}
      />
    {/each}

    {#each tickItems as { value, index } (index)}
      {#if withTicks}
        <Slider.Tick
          {index}
          class={[
            'h-1.5 w-px z-1 transition-[background-color] duration-100',
            't-dark:bg-zinc-900 t-dark:border-zinc-800',
            't-light:bg-zinc-400 t-light:border-zinc-300',
            't-rust:bg-rust-900 t-rust:border-rust-800',
            't-midnight:bg-gray-900 t-midnight:border-gray-800'
          ]}
          {...tickProps}
        />
      {/if}

      {#if withTickLabels}
        <Slider.TickLabel {index} class="opacity-40 data-bounded:opacity-100 text-xs transition-opacity duration-100" {...tickLabelProps}>
          {value}
        </Slider.TickLabel>
      {/if}
    {/each}
  {/snippet}
</Slider.Root>
