<script lang="ts">
  import { goto } from "$app/navigation";

  /**
   * Mode style of the button.
   * - `transparent` (default): Transparent button.
   * - `neutral`: Neutral button.
   * - `warning`: Yellow button.
   * - `danger`: Red button.
   * - `success`: Green button.
   */
  type ModeTypes = "transparent" | "warning" | "danger" | "success";
  const MODE_CLASSES: { [key in ModeTypes]: string[] } = {
    transparent: [""],
    danger: ["bg-red-700"],
    warning: ["bg-yellow-500"],
    success: ["bg-green-700"],
  };

  /**
   * Rounded style of the button.
   * - `regular` (default): Regular button corners.
   * - `circle`: Circular button corners.
   */
  type RoundedTypes = "regular" | "circle";
  const ROUNDED_CLASSES: { [key in RoundedTypes]: string[] } = {
    regular: ["rounded-sm"],
    circle: ["rounded-full"],
  };

  type LinkType = {
    type: "link";
    href: string;
  };
  type ActionType = {
    type: "action";
    action: () => any;
  };
  type ActionTypes = LinkType | ActionType;

  type PropsType = {
    children: () => any;
    action: ActionTypes;
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
  onclick={action.type === "action" ? action.action : () => goto(action.href)}
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
