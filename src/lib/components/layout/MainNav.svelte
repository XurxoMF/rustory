<script lang="ts">
  import i18n from "$i18n";

  import Icon from "$lib/components/ui/Icon.svelte";

  let open = $state(false);
</script>

<nav
  class={[
    "relative shrink-0 h-full flex flex-col px-2 pb-2 pt-1 items-center justify-between gap-2 overflow-hidden transition-[width] duration-200",
    open ? "w-60" : "w-14",
  ]}
  onmouseenter={() => (open = true)}
  onmouseleave={() => (open = false)}
>
  <div class="w-full flex flex-col items-start justify-center gap-1">
    {@render MainNavButton("ph:house-duotone", $i18n.t("common.Home"), "/")}
    {@render MainNavButton("ph:gear-duotone", $i18n.t("common.Config"), "/config")}
  </div>
</nav>

{#snippet MainNavButton(icon: string, text: string, link: string = "/")}
  <a
    href={link}
    class={[
      "relative w-full p-2 flex items-center gap-2 whitespace-nowrap cursor-pointer rounded-sm duration-200",
      "t-dark:text-zinc-100 t-dark:hover:bg-zinc-800",
      "t-light:text-zinc-900 t-light:hover:bg-zinc-300",
      "t-rust:text-rust-100 t-rust:hover:bg-rust-800",
      "t-midnight:text-gray-100 t-midnight:hover:bg-gray-800",
    ]}
  >
    <Icon {icon} class="shrink-0 text-2xl" />

    <p class={["text-start transition-opacity duration-200", open ? "opacity-100" : "opacity-0"]}>
      {text}
    </p>
  </a>
{/snippet}
