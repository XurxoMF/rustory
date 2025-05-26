<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { rustory } from "$lib/stores/rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import { CollapsibleSection } from "$lib/ui/layout/Sections";
  import { FieldsTitle, FieldsDescription, FieldsWrapper } from "$lib/ui/form/Layout";
  import { GridItem, GridContainer } from "$lib/ui/layout/Grids";
  import Lang from "$lib/ui/settings/Lang.svelte";
  import Scale from "$lib/ui/settings/Scale.svelte";
  import Theme from "$lib/ui/settings/Theme.svelte";

  rustory.mainWindow.breadcrumbs.segments = [{ label: m.common__config(), href: "/config" }];
</script>

<PageWrapper scrollable={true}>
  <div class="w-full flex flex-col gap-3 p-3">
    <CollapsibleSection title={m.settings__interface()} open>
      <GridContainer columns={3}>
        <GridItem>
          <FieldsWrapper>
            <FieldsTitle>{m.settings__language()}</FieldsTitle>
            <Lang />
            <FieldsDescription>{m.settings__lang_restart_needed()}</FieldsDescription>
          </FieldsWrapper>
        </GridItem>

        <GridItem>
          <FieldsWrapper>
            <FieldsTitle>{m.settings__uiscale()}</FieldsTitle>
            <Scale />
            <FieldsDescription>{m.settings__scale_description()}</FieldsDescription>
          </FieldsWrapper>
        </GridItem>

        <GridItem>
          <FieldsWrapper>
            <FieldsTitle>{m.settings__theme()}</FieldsTitle>
            <div class="w-full flex items-center gap-2">
              <Theme />
            </div>
            <FieldsDescription>{m.settings__theme_description()}</FieldsDescription>
          </FieldsWrapper>
        </GridItem>
      </GridContainer>
    </CollapsibleSection>

    <CollapsibleSection title={m.settings__folders()} open>
      <GridContainer columns={2}>
        <GridItem>
          <FieldsWrapper>
            <FieldsTitle>{m.settings__instances_folder()}</FieldsTitle>
            <input
              type="text"
              class={[
                "w-full flex items-center justify-between gap-2 px-2 py-1 rounded-sm cursor-pointer border transition-[border,background-color] duration-200",
                "t-dark:bg-zinc-800 t-dark:border-zinc-750",
                "t-light:bg-zinc-200 t-light:border-zinc-250",
                "t-rust:bg-rust-800 t-rust:border-rust-750",
                "t-midnight:bg-gray-800 t-midnight:border-gray-750",
              ]}
              name={m.settings__instances_folder()}
              placeholder={m.settings__instances_folder()}
              value={rustory.config.instancesPath}
              onchange={(e) => (rustory.config.instancesPath = e.currentTarget.value)}
            />
            <FieldsDescription>{m.settings__default_folder_instances()}</FieldsDescription>
          </FieldsWrapper>
        </GridItem>

        <GridItem>
          <FieldsWrapper>
            <FieldsTitle>{m.settings__servers_folder()}</FieldsTitle>
            <input
              type="text"
              class={[
                "w-full flex items-center justify-between gap-2 px-2 py-1 rounded-sm cursor-pointer border transition-[border,background-color] duration-200",
                "t-dark:bg-zinc-800 t-dark:border-zinc-750",
                "t-light:bg-zinc-200 t-light:border-zinc-250",
                "t-rust:bg-rust-800 t-rust:border-rust-750",
                "t-midnight:bg-gray-800 t-midnight:border-gray-750",
              ]}
              name={m.settings__servers_folder()}
              placeholder={m.settings__servers_folder()}
              value={rustory.config.serversPath}
              onchange={(e) => (rustory.config.serversPath = e.currentTarget.value)}
            />
            <FieldsDescription>{m.settings__default_folder_servers()}</FieldsDescription>
          </FieldsWrapper>
        </GridItem>
      </GridContainer>
    </CollapsibleSection>
  </div>
</PageWrapper>
