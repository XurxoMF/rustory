<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Config } from '@renderer/lib/classes/Config.svelte'
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import Icon from '@renderer/lib/ui/components/Icon.svelte'
  import Label from '@renderer/lib/ui/components/Label.svelte'
  import Info from '@renderer/lib/ui/components/Info.svelte'
  import Input from '@renderer/lib/ui/components/Input.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import { GridItem, GridContainer } from '@renderer/lib/ui/layout/Grid'
  import Lang from '@renderer/lib/ui/features/settings/Lang.svelte'
  import Scale from '@renderer/lib/ui/features/settings/Scale.svelte'
  import Theme from '@renderer/lib/ui/features/settings/Theme.svelte'
  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'
  import ScrollableContainer from '@renderer/lib/ui/layout/ScrollableContainer.svelte'
  import P from '@renderer/lib/ui/components/P.svelte'
  import H1 from '@renderer/lib/ui/components/H1.svelte'
  import H3 from '@renderer/lib/ui/components/H3.svelte'

  Breadcrumbs.instance.segments = [{ label: m.common__config(), href: '/config' }]
</script>

<ScrollableContainer isBreakpoint>
  <FlexContainer direction="col" padding="xl" gap="xl">
    <FlexContainer direction="col" gap="base">
      <H1>{m.common__config()}</H1>
      <P mode="secondary">{m.descriptions__config_page()}</P>
    </FlexContainer>

    <FlexContainer direction="col" gap="lg">
      <FlexContainer direction="col" gap="xs">
        <H3>Interface</H3>
        <P mode="secondary">Configurations for the app UI.</P>
      </FlexContainer>

      <GridContainer columns={3} gap="base">
        <GridItem>
          <FlexContainer direction="col" gap="sm">
            <FlexContainer gap="sm">
              <Label for="lang">{m.settings__language()}</Label>
              <Info>{m.settings__language_description()}</Info>
            </FlexContainer>

            <Lang inputProps={{ id: 'lang' }} />
          </FlexContainer>
        </GridItem>

        <GridItem>
          <FlexContainer direction="col" gap="sm">
            <FlexContainer gap="sm">
              <Label for="scale">{m.settings__uiscale()}</Label>
              <Info>{m.settings__uiscale_description()}</Info>
            </FlexContainer>

            <Scale triggerProps={{ id: 'scale' }} />
          </FlexContainer>
        </GridItem>

        <GridItem>
          <FlexContainer direction="col" gap="sm">
            <FlexContainer gap="sm">
              <Label>{m.settings__theme()}</Label>
              <Info>{m.settings__theme_description()}</Info>
            </FlexContainer>

            <FlexContainer gap="xs">
              <Theme />
            </FlexContainer>
          </FlexContainer>
        </GridItem>
      </GridContainer>
    </FlexContainer>

    <FlexContainer direction="col" gap="lg">
      <FlexContainer direction="col" gap="xs">
        <H3>Default folders</H3>
        <P mode="secondary">Default folder used by the app.</P>
      </FlexContainer>

      <GridContainer columns={3} gap="base">
        <GridItem>
          <FlexContainer direction="col" gap="sm">
            <FlexContainer gap="sm">
              <Label for="instanes-folder">{m.settings__vs_instances_folder()}</Label>
              <Info>{m.settings__vs_instances_folder_description()}</Info>
            </FlexContainer>

            <FlexContainer gap="xs">
              <Button
                mode="neutral"
                id="instanes-folder"
                title={m.common__select_folder()}
                onclick={async () => {
                  const folder = await window.api.fs.showDialog(m.settings__vs_instances_folder(), 'openDirectory', false, [])
                  if (!folder || folder.length < 1) return
                  Config.instance.setVSInstancesPath(folder[0])
                }}
              >
                <Icon icon="ph:magnifying-glass-bold" />
              </Button>

              <Input
                type="text"
                name={m.settings__vs_instances_folder()}
                placeholder={m.settings__vs_instances_folder()}
                value={Config.instance.vsInstancesPath}
                readonly
              />
            </FlexContainer>
          </FlexContainer>
        </GridItem>

        <GridItem>
          <FlexContainer direction="col" gap="sm">
            <FlexContainer gap="sm">
              <Label for="versions-folder">{m.settings__vs_versions_folder()}</Label>
              <Info>{m.settings__vs_versions_folder_description()}</Info>
            </FlexContainer>

            <FlexContainer gap="xs">
              <Button
                mode="neutral"
                id="versions-folder"
                title={m.common__select_folder()}
                onclick={async () => {
                  const folder = await window.api.fs.showDialog(m.settings__vs_versions_folder(), 'openDirectory', false, [])
                  if (!folder || folder.length < 1) return
                  Config.instance.setVSVersionsPath(folder[0])
                }}
              >
                <Icon icon="ph:magnifying-glass-bold" />
              </Button>

              <Input
                type="text"
                name={m.settings__vs_versions_folder()}
                placeholder={m.settings__vs_versions_folder()}
                value={Config.instance.vsVersionsPath}
                readonly
              />
            </FlexContainer>
          </FlexContainer>
        </GridItem>

        <GridItem>
          <FlexContainer direction="col" gap="sm">
            <FlexContainer gap="sm">
              <Label for="backups-folder">{m.settings__vs_instance_backups_folder()}</Label>
              <Info>{m.settings__vs_instance_backups_folder_description()}</Info>
            </FlexContainer>

            <FlexContainer gap="xs">
              <Button
                mode="neutral"
                id="backups-folder"
                title={m.common__select_folder()}
                onclick={async () => {
                  const folder = await window.api.fs.showDialog(m.settings__vs_instance_backups_folder(), 'openDirectory', false, [])
                  if (!folder || folder.length < 1) return
                  Config.instance.setVSInstanceBackupsPath(folder[0])
                }}
              >
                <Icon icon="ph:magnifying-glass-bold" />
              </Button>

              <Input
                type="text"
                name={m.settings__vs_instance_backups_folder()}
                placeholder={m.settings__vs_instance_backups_folder()}
                value={Config.instance.vsInstanceBackupsPath}
                readonly
              />
            </FlexContainer>
          </FlexContainer>
        </GridItem>
      </GridContainer>
    </FlexContainer>
  </FlexContainer>
</ScrollableContainer>
