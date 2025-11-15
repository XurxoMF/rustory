<script lang="ts">
  import { Slider, type WithoutChildrenOrChild } from 'bits-ui'

  type Modes = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

  const SPAN_MODE_CLASSES: Record<Modes, string[]> = {
    neutral: ['inset-ring-2', 't-dark:bg-zinc-800/50 t-dark:inset-ring-zinc-800'],
    info: ['inset-ring-2', 'bg-blue-800/30 inset-ring-blue-800'],
    success: ['inset-ring-2', 'bg-green-800/30 inset-ring-green-800'],
    warning: ['inset-ring-2', 'bg-yellow-800/30 inset-ring-yellow-800'],
    danger: ['inset-ring-2', 'bg-red-800/30 inset-ring-red-800']
  } as const

  const RANGE_MODE_CLASSES: Record<Modes, string[]> = {
    neutral: ['t-dark:bg-zinc-800'],
    info: ['bg-blue-800'],
    success: ['bg-green-800'],
    warning: ['bg-yellow-800'],
    danger: ['bg-red-800']
  } as const

  const THUMB_MODE_CLASSES: Record<Modes, string[]> = {
    neutral: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 't-dark:bg-zinc-800 t-dark:inset-ring-zinc-800 t-dark:ring-zinc-800'],
    info: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'bg-blue-800 inset-ring-blue-800 ring-blue-800'],
    success: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'bg-green-800 inset-ring-green-800 ring-green-800'],
    warning: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'bg-yellow-800 inset-ring-yellow-800 ring-yellow-800'],
    danger: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'bg-red-800 inset-ring-red-800 ring-red-800']
  } as const

  const TICK_MODE_CLASSES: Record<Modes, string[]> = {
    neutral: ['t-dark:bg-zinc-200/50'],
    info: ['bg-blue-500'],
    success: ['bg-green-500'],
    warning: ['bg-yellow-500'],
    danger: ['bg-red-500']
  } as const

  const TICK_LABEL_MODE_CLASSES: Record<Modes, string[]> = {
    neutral: ['t-dark:text-zinc-200/50 data-bounded:text-zinc-200'],
    info: ['text-blue-200/50 data-bounded:text-blue-200'],
    success: ['text-green-200/50 data-bounded:text-green-200'],
    warning: ['text-yellow-200/50 data-bounded:text-yesllow-200'],
    danger: ['text-red-200/50 data-bounded:text-red-200']
  } as const

  type SliderProps = Omit<WithoutChildrenOrChild<Slider.RootProps>, 'class'> & {
    withTicks?: boolean | undefined
    withTickLabels?: boolean | undefined
    mode?: Modes | undefined
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
    mode = 'neutral',
    rangeProps,
    thumbProps,
    tickProps,
    tickLabelProps,
    ...restProps
  }: SliderProps = $props()
</script>

<Slider.Root
  bind:value
  bind:ref
  class={[
    'relative w-full h-6 flex items-center justify-center',
    'cursor-pointer data-disabled:cursor-not-allowed',
    'data-disabled:opacity-40',
    withTickLabels && 'mt-4'
  ]}
  {...restProps as any}
>
  {#snippet children({ thumbItems, tickItems })}
    <span class={['relative w-full h-2 rounded-full transition-all', ...SPAN_MODE_CLASSES[mode]]}>
      <Slider.Range class={['absolute h-full rounded-full transition-all', ...RANGE_MODE_CLASSES[mode]]} {...rangeProps} />
    </span>

    {#each thumbItems as { index } (index)}
      <Slider.Thumb {index} class={['w-5 h-5 z-1 rounded-full outline-none transition-all', ...THUMB_MODE_CLASSES[mode]]} {...thumbProps} />
    {/each}

    {#each tickItems as { value, index } (index)}
      {#if withTicks}
        <Slider.Tick {index} class={['h-2 w-px transition-all', ...TICK_MODE_CLASSES[mode]]} {...tickProps} />
      {/if}

      {#if withTickLabels}
        <Slider.TickLabel {index} class={['text-xs transition-all', ...TICK_LABEL_MODE_CLASSES[mode]]} {...tickLabelProps}>
          {value}
        </Slider.TickLabel>
      {/if}
    {/each}
  {/snippet}
</Slider.Root>
