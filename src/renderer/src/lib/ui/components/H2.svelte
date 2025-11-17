<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export const H2_MODE_CLASSES = {
    primary: ['text-current'],
    secondary: ['text-current/50']
  } as const

  export type H2ModeTypes = keyof typeof H2_MODE_CLASSES

  export const H2_ALIGN_CLASSES = {
    start: ['text-left'],
    center: ['text-center'],
    end: ['text-right']
  } as const

  export type H2AlignTypes = keyof typeof H2_ALIGN_CLASSES

  export const H2_OVERFLOW_CLASSES = {
    base: [],
    nowrap: ['whitespace-nowrap'],
    ellipsis: ['whitespace-nowrap overflow-hidden overflow-ellipsis'],
    hidden: ['overflow-hidden']
  } as const

  export type H2OverflowTypes = keyof typeof H2_OVERFLOW_CLASSES

  export type H2Props = WithoutKeys<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: H2ModeTypes | undefined
    align?: H2AlignTypes | undefined
    overflow?: H2OverflowTypes | undefined
  }
</script>

<script lang="ts">
  let { mode = 'primary', align = 'start', overflow = 'base', children, ...restProps }: H2Props = $props()
</script>

<h2 class={['text-3xl font-bold leading-tight', ...H2_OVERFLOW_CLASSES[overflow], ...H2_MODE_CLASSES[mode], ...H2_ALIGN_CLASSES[align]]} {...restProps}>
  {@render children?.()}
</h2>
