<script lang="ts">
  import { type Snippet } from 'svelte'

  type FieldsDescriptionType = {
    children: Snippet<[]>
  }

  let { children }: FieldsDescriptionType = $props()
</script>

<p class="pl-1 text-xs opacity-50 flex items-center gap-1 flex-wrap">{@render children()}</p>
