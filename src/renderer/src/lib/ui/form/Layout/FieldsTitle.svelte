<script lang="ts">
  import { type Snippet } from 'svelte'

  type FieldsTitleType = {
    children: Snippet<[]>
  }

  let { children }: FieldsTitleType = $props()
</script>

<p class="pl-1 flex items-center gap-1 flex-wrap">{@render children()}</p>
