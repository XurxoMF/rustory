<script lang="ts">
  const MODE_CLASSES = {
    transparent: [
      "t-dark:hover:bg-zinc-800",
      "t-light:hover:bg-zinc-300",
      "t-rust:hover:bg-rust-800",
      "t-midnight:hover:bg-gray-800",
    ],
    danger: ["bg-red-700"],
    warning: ["bg-yellow-500"],
    neutral: ["bg-blue-700"],
    success: ["bg-green-700"],
  } as const;
  type ModeTypes = keyof typeof MODE_CLASSES;

  const ROUNDED_CLASSES = {
    regular: ["rounded-sm"],
    circle: ["rounded-full"],
  } as const;
  type RoundedTypes = keyof typeof ROUNDED_CLASSES;

  type PropsType = {
    children: () => any;
    action: () => void;
    title?: string;
    disabled?: boolean;
    mode?: ModeTypes;
    rounded?: RoundedTypes;
    shadow?: boolean;
  };

  let {
    children,
    action,
    title,
    disabled = false,
    mode = "transparent",
    rounded = "regular",
    shadow = false,
  }: PropsType = $props();
</script>

<button
  onclick={action}
  {title}
  {disabled}
  aria-label={title}
  class={[
    "w-fit flex items-center justify-center cursor-pointer p-1 disabled:opacity-50 enabled:hover:scale-105 duration-200",
    ...MODE_CLASSES[mode],
    ...ROUNDED_CLASSES[rounded],
    shadow && "enabled:shadow-sm enabled:shadow-black/50",
  ]}
>
  {@render children()}
</button>
