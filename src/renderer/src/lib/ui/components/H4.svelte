<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export const H4_MODE_CLASSES = {
    primary: ['text-current'],
    secondary: ['text-current/50']
  } as const

  export type H4ModeTypes = keyof typeof H4_MODE_CLASSES

  export const H4_ALIGN_CLASSES = {
    start: ['text-left'],
    center: ['text-center'],
    end: ['text-right']
  } as const

  export type H4AlignTypes = keyof typeof H4_ALIGN_CLASSES

  export const H4_OVERFLOW_CLASSES = {
    base: [],
    nowrap: ['whitespace-nowrap'],
    ellipsis: ['whitespace-nowrap overflow-hidden overflow-ellipsis'],
    hidden: ['overflow-hidden']
  } as const

  export type H4OverflowTypes = keyof typeof H4_OVERFLOW_CLASSES

  export type H4Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: H4ModeTypes | undefined
    align?: H4AlignTypes | undefined
    overflow?: H4OverflowTypes | undefined
  }
</script>

<script lang="ts">
  let { mode = 'primary', align = 'start', overflow = 'base', children, ...restProps }: H4Props = $props()
</script>

<h4 class={['text-xl font-bold', ...H4_OVERFLOW_CLASSES[overflow], ...H4_MODE_CLASSES[mode], ...H4_ALIGN_CLASSES[align]]} {...restProps}>
  {@render children?.()}
</h4>
