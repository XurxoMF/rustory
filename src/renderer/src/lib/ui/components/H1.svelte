<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export const H1_MODE_CLASSES = {
    primary: ['text-current'],
    secondary: ['text-current/50']
  } as const

  export type H1ModeTypes = keyof typeof H1_MODE_CLASSES

  export const H1_ALIGN_CLASSES = {
    start: ['text-left'],
    center: ['text-center'],
    end: ['text-right']
  } as const

  export type H1AlignTypes = keyof typeof H1_ALIGN_CLASSES

  export const H1_OVERFLOW_CLASSES = {
    base: [],
    nowrap: ['whitespace-nowrap'],
    ellipsis: ['whitespace-nowrap overflow-hidden overflow-ellipsis'],
    hidden: ['overflow-hidden']
  } as const

  export type H1OverflowTypes = keyof typeof H1_OVERFLOW_CLASSES

  export type H1Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: H1ModeTypes | undefined
    align?: H1AlignTypes | undefined
    overflow?: H1OverflowTypes | undefined
  }
</script>

<script lang="ts">
  let { mode = 'primary', align = 'start', overflow = 'base', children, ...restProps }: H1Props = $props()
</script>

<h1 class={['text-4xl font-bold leading-tight', ...H1_OVERFLOW_CLASSES[overflow], ...H1_MODE_CLASSES[mode], ...H1_ALIGN_CLASSES[align]]} {...restProps}>
  {@render children?.()}
</h1>
