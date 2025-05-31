<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { rConfig, rMainWindow } from "$lib/stores/rustory.svelte";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import { CollapsibleSection } from "$lib/ui/layout/Sections";
  import { FieldsTitle, FieldsDescription, FieldsWrapper } from "$lib/ui/form/Layout";
  import { GridItem, GridContainer } from "$lib/ui/layout/Grids";
  import Lang from "$lib/ui/settings/Lang.svelte";
  import Scale from "$lib/ui/settings/Scale.svelte";
  import Theme from "$lib/ui/settings/Theme.svelte";
  import { TextInput } from "$lib/ui/form/Inputs";
  import { ButtonNeutral } from "$lib/ui/form/Buttons";
  import Icon from "$lib/ui/base/Icon.svelte";
  import { open } from "@tauri-apps/plugin-dialog";

  rMainWindow.breadcrumbs.segments = [{ label: m.common__config(), href: "/config" }];
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
            <div class="w-full flex items-center gap-1">
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
            <FieldsWrapper direction="x">
              <ButtonNeutral
                title={m.common__select_folder()}
                onclick={async () => {
                  const folder = await open({
                    directory: true,
                    title: m.settings__instances_folder(),
                  });
                  if (!folder) return;
                  rConfig.instancesPath = folder;
                }}
              >
                <Icon icon="ph:magnifying-glass" />
              </ButtonNeutral>
              <TextInput
                name={m.settings__instances_folder()}
                placeholder={m.settings__instances_folder()}
                value={rConfig.instancesPath}
                onchange={(e) => (rConfig.instancesPath = e.currentTarget.value)}
              />
            </FieldsWrapper>
            <FieldsDescription>{m.settings__default_folder_instances()}</FieldsDescription>
          </FieldsWrapper>
        </GridItem>

        <GridItem>
          <FieldsWrapper>
            <FieldsTitle>{m.settings__servers_folder()}</FieldsTitle>
            <FieldsWrapper direction="x">
              <ButtonNeutral
                title={m.common__select_folder()}
                onclick={async () => {
                  const folder = await open({
                    directory: true,
                    title: m.settings__servers_folder(),
                  });
                  if (!folder) return;
                  rConfig.serversPath = folder;
                }}
              >
                <Icon icon="ph:magnifying-glass" />
              </ButtonNeutral>
              <TextInput
                name={m.settings__servers_folder()}
                placeholder={m.settings__servers_folder()}
                value={rConfig.serversPath}
                onchange={(e) => (rConfig.serversPath = e.currentTarget.value)}
              />
            </FieldsWrapper>

            <FieldsDescription>{m.settings__default_folder_servers()}</FieldsDescription>
          </FieldsWrapper>
        </GridItem>
      </GridContainer>
    </CollapsibleSection>
  </div>
</PageWrapper>
