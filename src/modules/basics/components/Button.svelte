<script lang="ts">
  /**
   * Mode style of the button.
   * - `transparent` (default): Transparent button.
   * - `neutral`: Neutral button.
   * - `warning`: Yellow button.
   * - `danger`: Red button.
   * - `success`: Green button.
   */
  type ModeTypes = "transparent" | "warning" | "danger" | "success";
  const MODE_CLASSES: { [key in ModeTypes]: string } = {
    transparent: "hover:bg-zinc-850",
    danger: "bg-red-700/50 hover:bg-red-700",
    warning: "bg-yellow-500/50 hover:bg-yellow-500",
    success: "bg-green-700/50 hover:bg-green-700",
  };

  /**
   * Rounded style of the button.
   * - `regular` (default): Regular button corners.
   * - `circle`: Circular button corners.
   */
  type RoundedTypes = "regular" | "circle";
  const ROUNDED_CLASSES: { [key in RoundedTypes]: string } = {
    regular: "rounded-sm",
    circle: "rounded-full",
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
    mode?: ModeTypes;
    rounded?: RoundedTypes;
  };

  let { children, action, title, mode = "transparent", rounded = "regular" }: PropsType = $props();
</script>

{#if action.type === "link"}
  <a
    href={action.href}
    {title}
    class={[
      "w-fit flex items-center justify-center cursor-pointer p-1 duration-200",
      MODE_CLASSES[mode],
      ROUNDED_CLASSES[rounded],
    ]}
  >
    {@render children()}
  </a>
{:else}
  <button
    onclick={action.action}
    {title}
    class={[
      "w-fit flex items-center justify-center cursor-pointer p-1 duration-200",
      MODE_CLASSES[mode],
      ROUNDED_CLASSES[rounded],
    ]}
  >
    {@render children()}
  </button>
{/if}
