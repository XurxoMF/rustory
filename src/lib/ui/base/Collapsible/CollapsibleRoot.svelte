<script lang="ts">
  import { type Snippet } from "svelte";
  import { type HTMLAttributes } from "svelte/elements";

  type CollapsibleSnippetType = {
    open: boolean;
    toggle: () => void;
  };

  type CollapsibleProps = HTMLAttributes<HTMLDivElement> & {
    collapsible: Snippet<[CollapsibleSnippetType]>;
    defaultOpen?: boolean;
  };

  let { collapsible, defaultOpen = true, ...restProps }: CollapsibleProps = $props();

  let open = $state(defaultOpen);

  const toggle = () => (open = !open);
</script>

<div {...restProps}>
  {@render collapsible({ open, toggle })}
</div>
