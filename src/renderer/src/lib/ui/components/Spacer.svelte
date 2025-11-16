<script lang="ts" module>
  export type SpacerSizeTypes = 'xs' | 'sm' | 'base' | 'lg' | 'xl'

  export const SPACER_VERTICAL_SIZE_CLASSES: Record<SpacerSizeTypes, string[]> = {
    xs: ['my-0.5'],
    sm: ['my-1'],
    base: ['my-2'],
    lg: ['my-3'],
    xl: ['my-4']
  } as const

  export const SPACER_HORIZONTAL_SIZE_CLASSES: Record<SpacerSizeTypes, string[]> = {
    xs: ['mx-0.5'],
    sm: ['mx-1'],
    base: ['mx-2'],
    lg: ['mx-3'],
    xl: ['mx-4']
  } as const

  export type SpacerProps = {
    orientation?: 'vertical' | 'horizontal' | undefined
    size?: SpacerSizeTypes | undefined
  }
</script>

<script lang="ts">
  let { orientation = 'vertical', size = 'base' }: SpacerProps = $props()
</script>

<div class={[orientation === 'vertical' ? ['w-full', ...SPACER_VERTICAL_SIZE_CLASSES[size]] : ['h-full', ...SPACER_HORIZONTAL_SIZE_CLASSES[size]]]}></div>
