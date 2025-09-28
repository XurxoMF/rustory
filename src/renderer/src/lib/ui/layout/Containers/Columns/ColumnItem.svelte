<script lang="ts">
  import { type Snippet } from 'svelte'

  type ColumnItemProps = {
    children: Snippet
  }

  let { children }: ColumnItemProps = $props()
</script>

<div class="w-full break-inside-avoid">
  {@render children()}
</div>
