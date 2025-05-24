<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { localesMeta } from "$lib/i18n/localesMeta";

  import { rustory } from "$lib/stores/rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import ThemeSelector from "$lib/ui/settings/Theme.svelte";
  import CollapsibleSection from "$lib/ui/layout/CollapsibleSection.svelte";
  import Select, { type SelectItemType } from "$lib/ui/form/Select.svelte";

  rustory.mainWindow.breadcrumbs.segments = [{ label: m.common__config(), href: "/config" }];

  let items: SelectItemType[] = localesMeta.map((locale) => ({
    value: locale.locale,
    label: locale.name,
  }));

  let lang: string | undefined = rustory.config.lang;
</script>

<PageWrapper scrollable={false}>
  <div class="w-full h-full p-2">
    <CollapsibleSection buttonText="Settings" open>
      <div class="flex flex-col gap-2">
        <div class="w-full flex items-center justify-start flex-wrap gap-2">
          <p>Theme</p>
          <ThemeSelector />
        </div>

        <div class="w-full flex items-center justify-start gap-2">
          <p>Language</p>
          <Select
            placeholder="Hola"
            {items}
            bind:value={lang}
            onValueChange={(e) => {
              if (e !== undefined) rustory.config.lang = e;
            }}
            variant="base"
          />
        </div>
      </div>
    </CollapsibleSection>
  </div>
</PageWrapper>
