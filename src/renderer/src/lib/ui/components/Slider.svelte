<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export type SliderModes = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

  export const SLIDER_SPAN_MODE_CLASSES: Record<SliderModes, string[]> = {
    neutral: ['inset-ring-2', 'bg-zinc-800/50 inset-ring-zinc-800'],
    info: ['inset-ring-2', 'bg-blue-800/30 inset-ring-blue-800'],
    success: ['inset-ring-2', 'bg-green-800/30 inset-ring-green-800'],
    warning: ['inset-ring-2', 'bg-yellow-800/30 inset-ring-yellow-800'],
    danger: ['inset-ring-2', 'bg-red-800/30 inset-ring-red-800']
  } as const

  export const SLIDER_RANGE_MODE_CLASSES: Record<SliderModes, string[]> = {
    neutral: ['bg-zinc-800'],
    info: ['bg-blue-800'],
    success: ['bg-green-800'],
    warning: ['bg-yellow-800'],
    danger: ['bg-red-800']
  } as const

  export const SLIDER_THUMB_MODE_CLASSES: Record<SliderModes, string[]> = {
    neutral: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'],
    info: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'bg-blue-800 inset-ring-blue-800 ring-blue-800'],
    success: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'bg-green-800 inset-ring-green-800 ring-green-800'],
    warning: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'bg-yellow-800 inset-ring-yellow-800 ring-yellow-800'],
    danger: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'bg-red-800 inset-ring-red-800 ring-red-800']
  } as const

  export const SLIDER_TICK_MODE_CLASSES: Record<SliderModes, string[]> = {
    neutral: ['bg-zinc-200/50'],
    info: ['bg-blue-500'],
    success: ['bg-green-500'],
    warning: ['bg-yellow-500'],
    danger: ['bg-red-500']
  } as const

  export const SLIDER_TICK_LABEL_MODE_CLASSES: Record<SliderModes, string[]> = {
    neutral: ['text-current/50 data-bounded:text-zinc-200'],
    info: ['text-blue-200/50 data-bounded:text-blue-200'],
    success: ['text-green-200/50 data-bounded:text-green-200'],
    warning: ['text-yellow-200/50 data-bounded:text-yellow-200'],
    danger: ['text-red-200/50 data-bounded:text-red-200']
  } as const

  export type SliderRangeProps = Omit<WithoutChildrenOrChild<Slider.RangeProps>, 'class'>

  export type SliderThumbProps = Omit<WithoutChildrenOrChild<Slider.ThumbProps>, 'class' | 'index'>

  export type SliderTickProps = Omit<WithoutChildrenOrChild<Slider.TickProps>, 'class' | 'index'>

  export type SliderTickLabelProps = Omit<WithoutChildrenOrChild<Slider.TickLabelProps>, 'class' | 'index'>

  export type SliderProps = Omit<WithoutChildrenOrChild<Slider.RootProps>, 'class'> & {
    withTicks?: boolean | undefined
    withTickLabels?: boolean | undefined
    mode?: SliderModes | undefined
    rangeProps?: SliderRangeProps | undefined
    thumbProps?: SliderThumbProps | undefined
    tickProps?: SliderTickProps | undefined
    tickLabelProps?: SliderTickLabelProps | undefined
  }
</script>

<script lang="ts">
  import { Slider } from 'bits-ui'

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
    <span class={['relative w-full h-2 rounded-full transition-colors', ...SLIDER_SPAN_MODE_CLASSES[mode]]}>
      <Slider.Range class={['absolute h-full rounded-full transition-all', ...SLIDER_RANGE_MODE_CLASSES[mode]]} {...rangeProps} />
    </span>

    {#each thumbItems as { index } (index)}
      <Slider.Thumb {index} class={['w-5 h-5 z-1 rounded-full outline-none transition-all', ...SLIDER_THUMB_MODE_CLASSES[mode]]} {...thumbProps} />
    {/each}

    {#each tickItems as { value, index } (index)}
      {#if withTicks}
        <Slider.Tick {index} class={['h-2 w-px transition-colors', ...SLIDER_TICK_MODE_CLASSES[mode]]} {...tickProps} />
      {/if}

      {#if withTickLabels}
        <Slider.TickLabel {index} class={['text-xs transition-colors', ...SLIDER_TICK_LABEL_MODE_CLASSES[mode]]} {...tickLabelProps}>
          {value}
        </Slider.TickLabel>
      {/if}
    {/each}
  {/snippet}
</Slider.Root>
