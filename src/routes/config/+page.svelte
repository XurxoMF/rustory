<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { rustory } from "$lib/stores/rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import ThemeSelector from "$lib/ui/settings/Theme.svelte";
  import Select, { type SelectItemType } from "$lib/ui/form/Select.svelte";
  import { RustoryConfig } from "$lib/classes/RustoryConfig.svelte";
  import CollapsibleSection from "$lib/ui/layout/CollapsibleSection.svelte";
  import TwoColumnGrid from "$lib/ui/layout/Grids/TwoColumnGrid.svelte";
  import FieldsColumn from "$lib/ui/form/Layout/FieldsColumn.svelte";
  import FieldsTitle from "$lib/ui/form/Layout/FieldsTitle.svelte";
  import FieldsDescription from "$lib/ui/form/Layout/FieldsDescription.svelte";

  rustory.mainWindow.breadcrumbs.segments = [{ label: m.common__config(), href: "/config" }];

  let langs: SelectItemType[] = RustoryConfig.LANGUAGES_DATA.map((lang) => ({
    value: lang.lang,
    label: lang.name,
  }));
  let lang: string | undefined = rustory.config.lang;
</script>

<PageWrapper scrollable={true}>
  <div class="w-full flex flex-col items-center justify-center gap-2">
    <CollapsibleSection title={m.settings__interface()} open>
      <TwoColumnGrid>
        <FieldsColumn>
          <FieldsTitle>{m.settings__language()}</FieldsTitle>
          <Select
            placeholder={m.placeholders__select_one()}
            items={langs}
            bind:value={lang}
            onValueChange={(e) => {
              if (e !== undefined) rustory.config.lang = e;
            }}
          />
          <FieldsDescription>{m.settings__lang_restart_needed()}</FieldsDescription>
        </FieldsColumn>

        <FieldsColumn>
          <FieldsTitle>{m.settings__theme()}</FieldsTitle>
          <div class="w-full flex items-center gap-2">
            <ThemeSelector />
          </div>
        </FieldsColumn>
      </TwoColumnGrid>
    </CollapsibleSection>
  </div>
</PageWrapper>
