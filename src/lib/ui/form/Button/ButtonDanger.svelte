<script lang="ts">
  import { type Snippet } from "svelte";
  import { type HTMLButtonAttributes } from "svelte/elements";

  const ROUNDED_CLASSES = {
    regular: ["rounded-sm"],
    circle: ["rounded-full"],
  } as const;
  type RoundedTypes = keyof typeof ROUNDED_CLASSES;

  type ButtonDangerPropsType = HTMLButtonAttributes & {
    children: Snippet<[]>;
    rounded?: RoundedTypes;
    icon?: boolean;
  };

  let {
    children,
    rounded = "regular",
    icon = false,
    ...restProps
  }: ButtonDangerPropsType = $props();
</script>

<button
  {...restProps}
  class={[
    "w-fit flex items-center justify-center enabled:cursor-pointer disabled:opacity-50 border border-red-700 bg-red-800/75 enabled:hover:bg-red-800 transition-[opacity,border,background-color] duration-200",
    icon ? "p-1" : "px-2 py-1",
    ...ROUNDED_CLASSES[rounded],
  ]}
>
  {@render children()}
</button>
