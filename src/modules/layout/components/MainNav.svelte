<script lang="ts">
  import Icon from "$modules/basics/components/Icon.svelte";

  let open = $state(false);
</script>

<nav
  class={[
    "relative shrink-0 h-full flex flex-col px-2 pb-2 pt-1 items-center justify-between gap-2 duration-200",
    open ? "w-60" : "w-14",
  ]}
  onmouseenter={() => (open = true)}
  onmouseleave={() => (open = false)}
>
  <div class="w-full flex flex-col items-start justify-center gap-1">
    {@render MainNavButton("ph:house-duotone", "Example link")}
  </div>
</nav>

{#snippet MainNavButton(icon: string, text: string)}
  <button
    class="relative w-full p-2 flex items-center gap-2 whitespace-nowrap cursor-pointer rounded-sm duration-200 opacity-50 hover:opacity-100 hover:bg-zinc-850 hover:shadow-md"
  >
    <Icon {icon} class="shrink-0 text-2xl duration-200" />

    <p class={["text-start duration-200", open ? "opacity-100" : "opacity-0"]}>
      {text}
    </p>
  </button>
{/snippet}
