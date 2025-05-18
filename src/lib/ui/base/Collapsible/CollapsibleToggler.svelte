<script lang="ts">
  import { type Snippet } from "svelte";
  import { type HTMLButtonAttributes } from "svelte/elements";

  type CollapsibleTogglerPropsType = HTMLButtonAttributes & {
    children: Snippet<[]>;
    toggle: () => void;
  };

  let { children, toggle, ...restProps }: CollapsibleTogglerPropsType = $props();
</script>

<button onclick={toggle} {...restProps}>
  {@render children()}
</button>
