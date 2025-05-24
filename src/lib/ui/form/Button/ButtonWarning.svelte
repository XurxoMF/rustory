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
    icon?: boolean;
  };

  let {
    children,
    rounded = "regular",
    icon = false,
    ...restProps
  }: ButtonDnagerPropsType = $props();
</script>

<button
  {...restProps}
  class={[
    "w-fit flex items-center justify-center enabled:cursor-pointer disabled:opacity-50 border border-yellow-500 bg-yellow-500/20 enabled:hover:bg-yellow-500 transition-[opacity,border,background-color] duration-200",
    icon ? "p-1" : "px-2 py-1",
    ...ROUNDED_CLASSES[rounded],
  ]}
>
  {@render children()}
</button>
