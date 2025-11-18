<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export type SliderModes = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

  export const SLIDER_SPAN_MODE_CLASSES: Record<SliderModes, string[]> = {
    neutral: ['inset-ring-2', 'bg-zinc-800/50 inset-ring-zinc-800', 't-light:bg-zinc-300/50 t-light:inset-ring-zinc-300'],
    info: ['inset-ring-2', 'bg-blue-800/30 inset-ring-blue-800', 't-light:bg-blue-300/30 t-light:inset-ring-blue-300'],
    success: ['inset-ring-2', 'bg-green-800/30 inset-ring-green-800', 't-light:bg-green-300/30 t-light:inset-ring-green-300'],
    warning: ['inset-ring-2', 'bg-yellow-800/30 inset-ring-yellow-800', 't-light:bg-yellow-300/30 t-light:inset-ring-yellow-300'],
    danger: ['inset-ring-2', 'bg-red-800/30 inset-ring-red-800', 't-light:bg-red-300/30 t-light:inset-ring-red-300']
  } as const

  export const SLIDER_RANGE_MODE_CLASSES: Record<SliderModes, string[]> = {
    neutral: ['bg-zinc-800', 't-light:bg-zinc-300'],
    info: ['bg-blue-800', 't-light:bg-blue-300'],
    success: ['bg-green-800', 't-light:bg-green-300'],
    warning: ['bg-yellow-800', 't-light:bg-yellow-300'],
    danger: ['bg-red-800', 't-light:bg-red-300']
  } as const

  export const SLIDER_THUMB_MODE_CLASSES: Record<SliderModes, string[]> = {
    neutral: ['focus-visible:ring-2', 'bg-zinc-800 ring-zinc-800', 't-light:bg-zinc-300 t-light:ring-zinc-300'],
    info: ['focus-visible:ring-2', 'bg-blue-500 ring-blue-500', 't-light:bg-blue-500 t-light:ring-blue-500'],
    success: ['focus-visible:ring-2', 'bg-green-500 ring-green-500', 't-light:bg-green-500 t-light:ring-green-500'],
    warning: ['focus-visible:ring-2', 'bg-yellow-500 ring-yellow-500', 't-light:bg-yellow-500 t-light:ring-yellow-500'],
    danger: ['focus-visible:ring-2', 'bg-red-500 ring-red-500', 't-light:bg-red-500 t-light:ring-red-500']
  } as const

  export const SLIDER_TICK_MODE_CLASSES: Record<SliderModes, string[]> = {
    neutral: ['bg-zinc-200/50', 't-light:bg-zinc-800/50'],
    info: ['bg-blue-500', 't-light:bg-blue-500'],
    success: ['bg-green-500', 't-light:bg-green-500'],
    warning: ['bg-yellow-500', 't-light:bg-yellow-500'],
    danger: ['bg-red-500', 't-light:bg-red-500']
  } as const

  export const SLIDER_TICK_LABEL_MODE_CLASSES: Record<SliderModes, string[]> = {
    neutral: ['text-current/50 data-bounded:text-current'],
    info: ['text-blue-500/50 data-bounded:text-blue-500', 't-light:text-blue-500/50 t-light:data-bounded:text-blue-500'],
    success: ['text-green-500/50 data-bounded:text-green-500', 't-light:text-green-500/50 t-light:data-bounded:text-green-500'],
    warning: ['text-yellow-500/50 data-bounded:text-yellow-500', 't-light:text-yellow-500/50 t-light:data-bounded:text-yellow-500'],
    danger: ['text-red-500/50 data-bounded:text-red-500', 't-light:text-red-500/50 t-light:data-bounded:text-red-500']
  } as const

  export type SliderRangeProps = WithoutKeys<WithoutChildrenOrChild<Slider.RangeProps>, 'class'>

  export type SliderThumbProps = WithoutKeys<WithoutChildrenOrChild<Slider.ThumbProps>, 'class' | 'index'>

  export type SliderTickProps = WithoutKeys<WithoutChildrenOrChild<Slider.TickProps>, 'class' | 'index'>

  export type SliderTickLabelProps = WithoutKeys<WithoutChildrenOrChild<Slider.TickLabelProps>, 'class' | 'index'>

  export type SliderProps = WithoutKeys<WithoutChildrenOrChild<Slider.RootProps>, 'class'> & {
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
    <span class={['relative w-full h-2 rounded-full transition-all', ...SLIDER_SPAN_MODE_CLASSES[mode]]}>
      <Slider.Range class={['absolute h-full rounded-full transition-all', ...SLIDER_RANGE_MODE_CLASSES[mode]]} {...rangeProps} />
    </span>

    {#each thumbItems as { index } (index)}
      <Slider.Thumb {index} class={['w-5 h-5 z-10 rounded-full outline-none transition-all', ...SLIDER_THUMB_MODE_CLASSES[mode]]} {...thumbProps} />
    {/each}

    {#each tickItems as { value, index } (index)}
      {#if withTicks}
        <Slider.Tick {index} class={['h-2 w-px transition-all', ...SLIDER_TICK_MODE_CLASSES[mode]]} {...tickProps} />
      {/if}

      {#if withTickLabels}
        <Slider.TickLabel {index} class={['text-xs font-medium transition-all', ...SLIDER_TICK_LABEL_MODE_CLASSES[mode]]} {...tickLabelProps}>
          {value}
        </Slider.TickLabel>
      {/if}
    {/each}
  {/snippet}
</Slider.Root>
