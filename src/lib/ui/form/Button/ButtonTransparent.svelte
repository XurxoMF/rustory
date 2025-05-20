<script lang="ts">
  import { type Snippet } from "svelte";
  import { type HTMLButtonAttributes } from "svelte/elements";

  const ROUNDED_CLASSES = {
    regular: ["rounded-sm"],
    circle: ["rounded-full"],
  } as const;
  type RoundedTypes = keyof typeof ROUNDED_CLASSES;

  type ButtonDnagerPropsType = HTMLButtonAttributes & {
    children: Snippet<[]>;
    rounded?: RoundedTypes;
  };

  let { children, rounded = "regular", ...restProps }: ButtonDnagerPropsType = $props();
</script>

<button
  {...restProps}
  class={[
    "w-fit flex items-center justify-center cursor-pointer p-1 disabled:opacity-50 enabled:hover:scale-105 duration-200",
    "t-dark:text-zinc-100 t-dark:hover:bg-zinc-800",
    "t-light:text-zinc-900 t-light:hover:bg-zinc-300",
    "t-rust:text-rust-100 t-rust:hover:bg-rust-800",
    "t-midnight:text-gray-100 t-midnight:hover:bg-gray-800",
    ...ROUNDED_CLASSES[rounded],
  ]}
>
  {@render children()}
</button>
