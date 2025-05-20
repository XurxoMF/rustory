<script lang="ts">
  import i18n from "$i18n";

  import { rustory } from "$lib/stores/rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import ThemeSelector from "$lib/ui/settings/Theme.svelte";
  import {
    CollapsibleRoot,
    CollapsibleContent,
    CollapsibleToggler,
  } from "$lib/ui/base/Collapsible";
  import Icon from "$lib/ui/base/Icon.svelte";

  rustory.mainWindow.breadcrumbs.segments = [{ label: $i18n.t("common.Config"), href: "/config" }];
</script>

<PageWrapper scrollable={false}>
  <div class="w-full h-full p-2">
    <CollapsibleRoot
      class={[
        "w-full rounded-sm shadow-sm shadow-black/50 overflow-hidden duration-200",
        "t-dark:text-zinc-100 t-dark:bg-zinc-900",
        "t-light:text-zinc-900 t-light:bg-zinc-100",
        "t-rust:text-rust-100 t-rust:bg-rust-900",
        "t-midnight:text-gray-100 t-midnight:bg-gray-900",
      ]}
    >
      {#snippet collapsible(collapsible)}
        <CollapsibleToggler
          toggle={collapsible.toggle}
          class={["w-full flex items-center justify-between p-2 cursor-pointer"]}
        >
          <h2 class="font-bold">Settings</h2>
          <Icon
            icon="ph:caret-down-bold"
            class={[
              "duration-200",
              "t-dark:text-zinc-100",
              "t-light:text-zinc-900",
              "t-rust:text-rust-100",
              "t-midnight:text-gray-100",
              collapsible.open && "rotate-180",
            ]}
          />
        </CollapsibleToggler>

        <CollapsibleContent
          open={collapsible.open}
          class={[
            "w-full flex items-stretch justify-center gap-4 p-2 border-t-2 duration-200",
            "t-dark:text-zinc-100 t-dark:border-zinc-800",
            "t-light:text-zinc-900 t-light:border-zinc-200",
            "t-rust:text-rust-100 t-rust:border-rust-800",
            "t-midnight:text-gray-100 t-midnight:border-gray-800",
          ]}
        >
          <div class="w-40 h-8 flex items-center justify-end gap-2">
            <h3 class="font-bold">Theme</h3>
          </div>

          <div class="w-full flex items-center justify-start flex-wrap gap-2">
            <ThemeSelector />
          </div>
        </CollapsibleContent>
      {/snippet}
    </CollapsibleRoot>
  </div>
</PageWrapper>
