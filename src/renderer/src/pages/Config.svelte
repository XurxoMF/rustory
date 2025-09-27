<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Config } from '@renderer/lib/classes/Config.svelte'
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Label from '@renderer/lib/ui/form/Label.svelte'
  import Description from '@renderer/lib/ui/form/Description.svelte'
  import Input from '@renderer/lib/ui/form/Input.svelte'
  import { ButtonNeutral } from '@renderer/lib/ui/form/Buttons'
  import StyledWrapper from '@renderer/lib/ui/layout/StyledWrapper.svelte'
  import { GridItem, GridContainer } from '@renderer/lib/ui/layout/Containers/Grid'
  import { CollapsibleContainer } from '@renderer/lib/ui/layout/Containers'

  import Lang from '@renderer/lib/ui/features/settings/Lang.svelte'
  import Scale from '@renderer/lib/ui/features/settings/Scale.svelte'
  import Theme from '@renderer/lib/ui/features/settings/Theme.svelte'

  Breadcrumbs.instance.segments = [{ label: m.common__config(), href: '/config' }]
</script>

<PageWrapper scrollable={true}>
  <GridContainer columns={1}>
    <GridItem>
      <StyledWrapper>
        <CollapsibleContainer title={m.settings__interface()} open>
          <GridContainer columns={3}>
            <GridItem>
              <div class="flex gap-1 items-center">
                <Label>{m.settings__language()}</Label>
                <Description>{m.settings__language_description()}</Description>
              </div>

              <Lang />
            </GridItem>

            <GridItem>
              <div class="flex gap-1 items-center">
                <Label>{m.settings__uiscale()}</Label>
                <Description>{m.settings__uiscale_description()}</Description>
              </div>

              <Scale />
            </GridItem>

            <GridItem>
              <div class="flex gap-1 items-center">
                <Label>{m.settings__theme()}</Label>
                <Description>{m.settings__theme_description()}</Description>
              </div>

              <div class="w-full flex items-center gap-1">
                <Theme />
              </div>
            </GridItem>
          </GridContainer>
        </CollapsibleContainer>
      </StyledWrapper>
    </GridItem>

    <GridItem>
      <StyledWrapper>
        <CollapsibleContainer title={m.settings__folders()} open>
          <GridContainer columns={3}>
            <GridItem>
              <div class="flex gap-1 items-center">
                <Label>{m.settings__vs_instances_folder()}</Label>
                <Description>{m.settings__vs_instances_folder_description()}</Description>
              </div>

              <div class="w-full flex items-stretch justify-center gap-1">
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

                <Input type="text" name={m.settings__vs_instances_folder()} placeholder={m.settings__vs_instances_folder()} value={Config.instance.vsInstancesPath} readonly />
              </div>
            </GridItem>

            <GridItem>
              <div class="flex gap-1 items-center">
                <Label>{m.settings__vs_versions_folder()}</Label>
                <Description>{m.settings__vs_versions_folder_description()}</Description>
              </div>

              <div class="w-full flex items-stretch justify-center gap-1">
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

                <Input type="text" name={m.settings__vs_versions_folder()} placeholder={m.settings__vs_versions_folder()} value={Config.instance.vsVersionsPath} readonly />
              </div>
            </GridItem>

            <GridItem>
              <div class="flex gap-1 items-center">
                <Label>{m.settings__vs_instance_backups_folder()}</Label>
                <Description>{m.settings__vs_instance_backups_folder_description()}</Description>
              </div>

              <div class="w-full flex items-stretch justify-center gap-1">
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

                <Input type="text" name={m.settings__vs_instance_backups_folder()} placeholder={m.settings__vs_instance_backups_folder()} value={Config.instance.vsInstanceBackupsPath} readonly />
              </div>
            </GridItem>
          </GridContainer>
        </CollapsibleContainer>
      </StyledWrapper>
    </GridItem>
  </GridContainer>
</PageWrapper>
