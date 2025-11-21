<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export type FormProps = WithoutKeys<HTMLAttributes<HTMLFormElement>, 'class' | 'novalidate'>
</script>

<script lang="ts">
  let { children, onsubmit, ...restProps }: FormProps = $props()
</script>

<form
  novalidate
  class="w-full h-full"
  onsubmit={(e) => {
    e.preventDefault()
    onsubmit?.(e)
  }}
  {...restProps}
>
  {@render children?.()}
</form>
