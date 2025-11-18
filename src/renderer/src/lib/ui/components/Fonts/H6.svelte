<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export const H6_MODE_CLASSES = {
    primary: ['text-current'],
    secondary: ['text-current/50']
  } as const

  export type H6ModeTypes = keyof typeof H6_MODE_CLASSES

  export const H6_ALIGN_CLASSES = {
    start: ['text-left'],
    center: ['text-center'],
    end: ['text-right']
  } as const

  export type H6AlignTypes = keyof typeof H6_ALIGN_CLASSES

  export const H6_OVERFLOW_CLASSES = {
    base: [],
    nowrap: ['whitespace-nowrap'],
    ellipsis: ['whitespace-nowrap overflow-hidden overflow-ellipsis'],
    hidden: ['overflow-hidden']
  } as const

  export type H6OverflowTypes = keyof typeof H6_OVERFLOW_CLASSES

  export type H6Props = WithoutKeys<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: H6ModeTypes | undefined
    align?: H6AlignTypes | undefined
    overflow?: H6OverflowTypes | undefined
  }
</script>

<script lang="ts">
  let { mode = 'primary', align = 'start', overflow = 'base', children, ...restProps }: H6Props = $props()
</script>

<h6 class={['text-base font-bold', ...H6_OVERFLOW_CLASSES[overflow], ...H6_MODE_CLASSES[mode], ...H6_ALIGN_CLASSES[align]]} {...restProps}>
  {@render children?.()}
</h6>
