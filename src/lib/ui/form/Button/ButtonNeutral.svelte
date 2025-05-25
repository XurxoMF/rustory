<script lang="ts">
  import { type Snippet } from "svelte";
  import { type HTMLButtonAttributes } from "svelte/elements";

  const ROUNDED_CLASSES = {
    regular: ["rounded-sm"],
    circle: ["rounded-full"],
  } as const;
  type RoundedTypes = keyof typeof ROUNDED_CLASSES;

  type ButtonNeutralPropsType = HTMLButtonAttributes & {
    children: Snippet<[]>;
    rounded?: RoundedTypes;
    icon?: boolean;
  };

  let {
    children,
    rounded = "regular",
    icon = false,
    ...restProps
  }: ButtonNeutralPropsType = $props();
</script>

<button
  {...restProps}
  class={[
    "w-fit flex items-center justify-center enabled:cursor-pointer disabled:opacity-50 border transition-[opacity,border,background-color] duration-200",
    "t-dark:bg-zinc-800/75 t-dark:enabled:hover:bg-zinc-800 t-dark:border-zinc-750",
    "t-light:bg-zinc-200/75 t-light:enabled:hover:bg-zinc-200 t-light:border-zinc-250",
    "t-rust:bg-rust-800/75 t-rust:enabled:hover:bg-rust-800 t-rust:border-rust-750",
    "t-midnight:bg-gray-800/75 t-midnight:enabled:hover:bg-gray-800 t-midnight:border-gray-750",
    icon ? "p-1" : "px-2 py-1",
    ...ROUNDED_CLASSES[rounded],
  ]}
>
  {@render children()}
</button>
