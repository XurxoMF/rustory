<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  const DIRECTION_CLASSES = {
    col: ['flex-col'],
    row: ['flex-row']
  } as const

  type DirectionClasses = keyof typeof DIRECTION_CLASSES

  type Alignments = 'start' | 'center' | 'end' | 'between' | 'arround'

  const JUSTIFY_CLASSES: Record<Alignments, string[]> = {
    start: ['justify-start'],
    center: ['justify-center'],
    end: ['justify-end'],
    between: ['justify-between'],
    arround: ['justify-around']
  } as const

  const ALIGN_CLASSES: Record<Alignments, string[]> = {
    start: ['items-start'],
    center: ['items-center'],
    end: ['items-end'],
    between: [],
    arround: []
  } as const

  const HEIGHT_CLASSES = {
    fit: ['w-fit'],
    full: ['w-full']
  } as const

  type HeightClasses = keyof typeof HEIGHT_CLASSES

  type FlexContainerProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
    direction?: DirectionClasses | undefined
    /**
     * Take in account that *between* and *arround* are only valid for *row* direction.
     */
    alignX?: Alignments | undefined
    /**
     * Take in account that *between* and *arround* are only valid for *column* direction.
     */
    alignY?: Alignments | undefined
    isLayout?: boolean | undefined
    height?: HeightClasses | undefined
  }

  let { direction = 'row', alignX = 'start', alignY = 'center', isLayout = false, height = 'fit', children, ...restProps }: FlexContainerProps = $props()
</script>

<div
  class={[
    'w-full flex',
    isLayout ? 'gap-4' : 'gap-2',
    ...HEIGHT_CLASSES[height],
    ...DIRECTION_CLASSES[direction],
    ...ALIGN_CLASSES[direction === 'row' ? alignY : alignX],
    ...JUSTIFY_CLASSES[direction === 'row' ? alignX : alignY]
  ]}
  {...restProps}
>
  {@render children?.()}
</div>
