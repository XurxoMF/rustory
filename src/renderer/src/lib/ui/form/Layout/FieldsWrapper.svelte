<script lang="ts">
  import { type Snippet } from 'svelte'

  type FieldsWrapperType = {
    children: Snippet<[]>
    direction?: 'x' | 'y' | undefined
  }

  let { children, direction = 'y' }: FieldsWrapperType = $props()
</script>

<div class={['w-full flex gap-1', direction === 'x' ? 'flex-row' : 'flex-col']}>
  {@render children()}
</div>
