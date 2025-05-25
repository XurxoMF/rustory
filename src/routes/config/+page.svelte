<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { rustory } from "$lib/stores/rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import { CollapsibleSection, GridSection } from "$lib/ui/layout/Sections";
  import { FieldsColumn, FieldsTitle, FieldsDescription } from "$lib/ui/form/Layout";
  import Lang from "$lib/ui/settings/Lang.svelte";
  import ThemeSelector from "$lib/ui/settings/Theme.svelte";

  rustory.mainWindow.breadcrumbs.segments = [{ label: m.common__config(), href: "/config" }];
</script>

<PageWrapper scrollable={true}>
  <div class="w-full space-y-2">
    <CollapsibleSection title={m.settings__interface()} open>
      <GridSection columns={2}>
        <FieldsColumn>
          <FieldsTitle>{m.settings__language()}</FieldsTitle>
          <Lang />
          <FieldsDescription>{m.settings__lang_restart_needed()}</FieldsDescription>
        </FieldsColumn>

        <FieldsColumn>
          <FieldsTitle>{m.settings__theme()}</FieldsTitle>
          <div class="w-full flex items-center gap-2">
            <ThemeSelector />
          </div>
        </FieldsColumn>
      </GridSection>
    </CollapsibleSection>
  </div>
</PageWrapper>
