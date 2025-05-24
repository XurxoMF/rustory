<script lang="ts">
  import { type Snippet } from "svelte";

  type TwoColumnGridType = {
    children: Snippet<[]>;
  };

  let { children }: TwoColumnGridType = $props();
</script>

<div class="w-full grid grid-cols-2 gap-4">
  {@render children()}
</div>
