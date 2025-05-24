<script lang="ts">
  import { type Snippet } from "svelte";

  type OneColumnGridType = {
    children: Snippet<[]>;
  };

  let { children }: OneColumnGridType = $props();
</script>

<div class="w-full grid grid-cols-1 gap-4">
  {@render children()}
</div>
