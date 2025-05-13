<script lang="ts">
  import type { ClassValue, HTMLButtonAttributes } from "svelte/elements";

  interface ButtonProps extends HTMLButtonAttributes {
    children: () => any;
  }

  let { children, class: customClass = "", ...restProps }: ButtonProps = $props();
</script>

<button {...restProps} class={["p-0.5 cursor-pointer", customClass]}>
  {@render children()}
</button>
