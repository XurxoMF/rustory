<script lang="ts">
  import { Config } from '@renderer/lib/classes/Config.svelte'
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import { PHMagnifyingGlassBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'
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
  import { P, H1, H3 } from '@renderer/lib/ui/components/Fonts'

  Breadcrumbs.instance.segments = [{ label: 'Configuration', href: '/config' }]
</script>

<ScrollableContainer isBreakpoint>
  <FlexContainer direction="col" padding="xl" gap="xl">
    <FlexContainer direction="col" gap="base">
      <H1>Configuration</H1>
      <P mode="secondary">Configure the app to fit your needs.</P>
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
              <Label for="lang">Language</Label>
              <Info>The language of the app.</Info>
            </FlexContainer>

            <Lang inputProps={{ id: 'lang' }} />
          </FlexContainer>
        </GridItem>

        <GridItem>
          <FlexContainer direction="col" gap="sm">
            <FlexContainer gap="sm">
              <Label for="scale">UI scale</Label>
              <Info>The scale of the UI of the app.</Info>
            </FlexContainer>

            <Scale triggerProps={{ id: 'scale' }} />
          </FlexContainer>
        </GridItem>

        <GridItem>
          <FlexContainer direction="col" gap="sm">
            <FlexContainer gap="sm">
              <Label>Theme</Label>
              <Info>The color theme of the app.</Info>
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

      <GridContainer columns={1} gap="base">
        <GridItem>
          <FlexContainer direction="col" gap="sm">
            <FlexContainer gap="sm">
              <Label for="instanes-folder">VS Instances</Label>
              <Info>The folder where the VS Instances will be created.</Info>
            </FlexContainer>

            <FlexContainer gap="xs">
              <Button
                mode="neutral"
                id="instanes-folder"
                title="Select a folder"
                onclick={async () => {
                  const folder = await window.api.fs.showDialog('VS Instances', 'openDirectory', false, [])
                  if (!folder || folder.length < 1) return
                  Config.instance.setVSInstancesPath(folder[0])
                }}
              >
                <PHMagnifyingGlassBoldIcon />
              </Button>

              <Input type="text" placeholder="Path" value={Config.instance.vsInstancesPath} readonly />
            </FlexContainer>
          </FlexContainer>
        </GridItem>
      </GridContainer>
    </FlexContainer>
  </FlexContainer>
</ScrollableContainer>
