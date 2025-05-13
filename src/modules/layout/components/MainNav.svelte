<script lang="ts">
  import i18n from "$i18n";

  import Button from "$modules/basics/components/forms/Button.svelte";
  import Icon from "$modules/basics/components/Icon.svelte";

  let open = $state(false);
</script>

<nav
  class={[
    "shrink-0 h-full flex flex-col items-center justify-between gap-2 p-2 overflow-hidden duration-200",
    open ? "w-60" : "w-11",
  ]}
>
  <div class="w-full flex flex-col items-start justify-center gap-2">
    {@render MainNavButton("ph:arrow-fat-line-right-duotone", "right", $i18n.t("common.Close"))}
  </div>

  <div class="w-full flex flex-col items-start justify-center gap-2">
    {@render MainNavButton("ph:arrow-fat-line-right-duotone", "right", $i18n.t("common.Close"))}
  </div>
</nav>

{#snippet MainNavButton(icon: string, iconSide: "left" | "right", text: string)}
  <Button
    class={[
      "w-full relative flex items-center gap-2 overflow-hidden whitespace-nowrap",
      iconSide === "left" ? "justify-start" : "justify-end",
    ]}
    onclick={() => (open = !open)}
  >
    {#if iconSide === "left"}
      <Icon {icon} class={["text-2xl duration-200", open && "rotate-180"]} />
    {/if}

    <p class={["duration-200", open ? "opacity-100" : "opacity-0"]}>
      {text}
    </p>

    {#if iconSide === "right"}
      <Icon {icon} class={["text-2xl duration-200", open && "rotate-180"]} />
    {/if}
  </Button>
{/snippet}
