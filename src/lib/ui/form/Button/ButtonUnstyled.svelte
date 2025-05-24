<script lang="ts">
  import { type Snippet } from "svelte";
  import { type HTMLButtonAttributes } from "svelte/elements";

  type ButtonUnstyledPropsType = HTMLButtonAttributes & {
    children: Snippet<[]>;
    icon?: boolean;
  };

  let { children, icon = false, ...restProps }: ButtonUnstyledPropsType = $props();
</script>

<button
  {...restProps}
  class={[
    "w-fit flex items-center justify-center enabled:cursor-pointer p-1 disabled:opacity-50 transition-[opacity] duration-200",
    icon ? "p-1" : "px-2 py-1",
  ]}
>
  {@render children()}
</button>
