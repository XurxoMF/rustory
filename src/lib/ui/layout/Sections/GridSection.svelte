<script lang="ts">
  import { type Snippet } from "svelte";

  type TwoColumnGridType = {
    children: Snippet<[]>;
    columns?: 1 | 2 | 3;
  };

  let { children, columns = 1 }: TwoColumnGridType = $props();
</script>

<div class="w-full @container">
  <div
    class={[
      "w-full grid grid-cols-1 gap-2",
      columns >= 2 && "@3xl:grid-cols-2",
      columns >= 3 && "@7xl:xl:grid-cols-3",
    ]}
  >
    {@render children()}
  </div>
</div>
