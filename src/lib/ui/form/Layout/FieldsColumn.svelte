<script lang="ts">
  import { type Snippet } from "svelte";

  type FieldsColumnType = {
    children: Snippet<[]>;
  };

  let { children }: FieldsColumnType = $props();
</script>

<div class="w-full flex flex-col flex-wrap gap-1">
  {@render children()}
</div>
