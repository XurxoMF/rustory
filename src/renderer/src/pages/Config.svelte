<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Config } from '@renderer/lib/classes/Config.svelte'
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import { CollapsibleSection } from '@renderer/lib/ui/layout/Sections'
  import { FieldsTitle, FieldsDescription, FieldsWrapper } from '@renderer/lib/ui/form/Layout'
  import { GridItem, GridContainer } from '@renderer/lib/ui/layout/Grids'
  import Lang from '@renderer/lib/ui/settings/Lang.svelte'
  import Scale from '@renderer/lib/ui/settings/Scale.svelte'
  import Theme from '@renderer/lib/ui/settings/Theme.svelte'
  import { TextInput } from '@renderer/lib/ui/form/Inputs'
  import { ButtonNeutral } from '@renderer/lib/ui/form/Buttons'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  Breadcrumbs.instance.segments = [{ label: m.common__config(), href: '/config' }]
</script>

<PageWrapper scrollable={true}>
  <div class="w-full flex flex-col gap-3 p-3">
    <CollapsibleSection title={m.settings__interface()} open>
      <GridContainer columns={3}>
        <GridItem>
          <FieldsWrapper>
            <FieldsTitle>{m.settings__language()}</FieldsTitle>
            <Lang />
            <FieldsDescription>{m.settings__language_description()}</FieldsDescription>
          </FieldsWrapper>
        </GridItem>

        <GridItem>
          <FieldsWrapper>
            <FieldsTitle>{m.settings__uiscale()}</FieldsTitle>
            <Scale />
            <FieldsDescription>{m.settings__uiscale_description()}</FieldsDescription>
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
      <GridContainer columns={3}>
        <GridItem>
          <FieldsWrapper>
            <FieldsTitle>{m.settings__vs_instances_folder()}</FieldsTitle>
            <FieldsWrapper direction="x">
              <ButtonNeutral
                title={m.common__select_folder()}
                onclick={async () => {
                  const folder = await window.api.fs.showDialog(m.settings__vs_instances_folder(), 'openDirectory', false, [])
                  if (!folder || folder.length < 1) return
                  Config.instance.setVSInstancesPath(folder[0])
                }}
              >
                <Icon icon="ph:magnifying-glass" />
              </ButtonNeutral>
              <TextInput name={m.settings__vs_instances_folder()} placeholder={m.settings__vs_instances_folder()} value={Config.instance.vsInstancesPath} readonly />
            </FieldsWrapper>
            <FieldsDescription>{m.settings__vs_instances_folder_description()}</FieldsDescription>
          </FieldsWrapper>
        </GridItem>

        <GridItem>
          <FieldsWrapper>
            <FieldsTitle>{m.settings__vs_versions_folder()}</FieldsTitle>
            <FieldsWrapper direction="x">
              <ButtonNeutral
                title={m.common__select_folder()}
                onclick={async () => {
                  const folder = await window.api.fs.showDialog(m.settings__vs_versions_folder(), 'openDirectory', false, [])
                  if (!folder || folder.length < 1) return
                  Config.instance.setVSVersionsPath(folder[0])
                }}
              >
                <Icon icon="ph:magnifying-glass" />
              </ButtonNeutral>
              <TextInput name={m.settings__vs_versions_folder()} placeholder={m.settings__vs_versions_folder()} value={Config.instance.vsVersionsPath} readonly />
            </FieldsWrapper>
            <FieldsDescription>{m.settings__vs_versions_folder_description()}</FieldsDescription>
          </FieldsWrapper>
        </GridItem>

        <GridItem>
          <FieldsWrapper>
            <FieldsTitle>{m.settings__vs_instance_backups_folder()}</FieldsTitle>
            <FieldsWrapper direction="x">
              <ButtonNeutral
                title={m.common__select_folder()}
                onclick={async () => {
                  const folder = await window.api.fs.showDialog(m.settings__vs_instance_backups_folder(), 'openDirectory', false, [])
                  if (!folder || folder.length < 1) return
                  Config.instance.setVSInstanceBackupsPath(folder[0])
                }}
              >
                <Icon icon="ph:magnifying-glass" />
              </ButtonNeutral>
              <TextInput name={m.settings__vs_instance_backups_folder()} placeholder={m.settings__vs_instance_backups_folder()} value={Config.instance.vsInstanceBackupsPath} readonly />
            </FieldsWrapper>
            <FieldsDescription>{m.settings__vs_instance_backups_folder_description()}</FieldsDescription>
          </FieldsWrapper>
        </GridItem>
      </GridContainer>
    </CollapsibleSection>
  </div>
</PageWrapper>
