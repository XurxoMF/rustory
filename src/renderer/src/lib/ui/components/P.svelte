<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export const P_MODE_CLASSES = {
    primary: ['text-current'],
    secondary: ['text-current/50']
  } as const

  export type PModeTypes = keyof typeof P_MODE_CLASSES

  export const P_ALIGN_CLASSES = {
    start: ['text-left'],
    center: ['text-center'],
    end: ['text-right']
  } as const

  export type PAlignTypes = keyof typeof P_ALIGN_CLASSES

  export const P_OVERFLOW_CLASSES = {
    base: [],
    nowrap: ['whitespace-nowrap'],
    ellipsis: ['whitespace-nowrap overflow-hidden overflow-ellipsis'],
    hidden: ['overflow-hidden']
  } as const

  export type POverflowTypes = keyof typeof P_OVERFLOW_CLASSES

  export type PProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: PModeTypes | undefined
    align?: PAlignTypes | undefined
    overflow?: POverflowTypes | undefined
  }
</script>

<script lang="ts">
  let { mode = 'primary', align = 'start', overflow = 'base', children, ...restProps }: PProps = $props()
</script>

<p class={['leading-tight', ...P_OVERFLOW_CLASSES[overflow], ...P_MODE_CLASSES[mode], ...P_ALIGN_CLASSES[align]]} {...restProps}>
  {@render children?.()}
</p>
