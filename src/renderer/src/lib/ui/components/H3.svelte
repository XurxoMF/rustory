<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export const H3_MODE_CLASSES = {
    primary: ['text-current'],
    secondary: ['text-current/50']
  } as const

  export type H3ModeTypes = keyof typeof H3_MODE_CLASSES

  export const H3_ALIGN_CLASSES = {
    start: ['text-left'],
    center: ['text-center'],
    end: ['text-right']
  } as const

  export type H3AlignTypes = keyof typeof H3_ALIGN_CLASSES

  export const H3_OVERFLOW_CLASSES = {
    base: [],
    nowrap: ['whitespace-nowrap'],
    ellipsis: ['whitespace-nowrap overflow-hidden overflow-ellipsis'],
    hidden: ['overflow-hidden']
  } as const

  export type H3OverflowTypes = keyof typeof H3_OVERFLOW_CLASSES

  export type H3Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: H3ModeTypes | undefined
    align?: H3AlignTypes | undefined
    overflow?: H3OverflowTypes | undefined
  }
</script>

<script lang="ts">
  let { mode = 'primary', align = 'start', overflow = 'base', children, ...restProps }: H3Props = $props()
</script>

<h3 class={['text-2xl font-bold leading-tight', ...H3_OVERFLOW_CLASSES[overflow], ...H3_MODE_CLASSES[mode], ...H3_ALIGN_CLASSES[align]]} {...restProps}>
  {@render children?.()}
</h3>
