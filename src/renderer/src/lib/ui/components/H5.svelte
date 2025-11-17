<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export const H5_MODE_CLASSES = {
    primary: ['text-current'],
    secondary: ['text-current/50']
  } as const

  export type H5ModeTypes = keyof typeof H5_MODE_CLASSES

  export const H5_ALIGN_CLASSES = {
    start: ['text-left'],
    center: ['text-center'],
    end: ['text-right']
  } as const

  export type H5AlignTypes = keyof typeof H5_ALIGN_CLASSES

  export const H5_OVERFLOW_CLASSES = {
    base: [],
    nowrap: ['whitespace-nowrap'],
    ellipsis: ['whitespace-nowrap overflow-hidden overflow-ellipsis'],
    hidden: ['overflow-hidden']
  } as const

  export type H5OverflowTypes = keyof typeof H5_OVERFLOW_CLASSES

  export type H5Props = WithoutKeys<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: H5ModeTypes | undefined
    align?: H5AlignTypes | undefined
    overflow?: H5OverflowTypes | undefined
  }
</script>

<script lang="ts">
  let { mode = 'primary', align = 'start', overflow = 'base', children, ...restProps }: H5Props = $props()
</script>

<h5 class={['text-lg font-bold leading-tight', ...H5_OVERFLOW_CLASSES[overflow], ...H5_MODE_CLASSES[mode], ...H5_ALIGN_CLASSES[align]]} {...restProps}>
  {@render children?.()}
</h5>
