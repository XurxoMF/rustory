<script lang="ts">
  import { type Snippet } from "svelte";

  type TwoColumnGridType = {
    children: Snippet<[]>;
    columns?: 1 | 2 | 3;
  };

  let { children, columns = 1 }: TwoColumnGridType = $props();
</script>

<div
  class={[
    "w-full grid grid-cols-1 gap-2",
    columns === 2 && "lg:grid-cols-2",
    columns === 2 && "2xl:grid-cols-3",
  ]}
>
  {@render children()}
</div>
