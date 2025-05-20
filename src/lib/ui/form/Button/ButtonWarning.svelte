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
    shadow?: boolean;
  };

  let {
    children,
    rounded = "regular",
    shadow = false,
    ...restProps
  }: ButtonDnagerPropsType = $props();
</script>

<button
  {...restProps}
  class={[
    "w-fit flex items-center justify-center cursor-pointer p-1 disabled:opacity-50 enabled:hover:scale-105 duration-200 bg-yellow-500",
    "t-dark:text-zinc-100",
    "t-light:text-zinc-900",
    "t-rust:text-rust-100",
    "t-midnight:text-gray-100",
    ...ROUNDED_CLASSES[rounded],
    shadow && "enabled:shadow-sm enabled:shadow-black/50",
  ]}
>
  {@render children()}
</button>
