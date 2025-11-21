<script lang="ts">
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { RAPIVSVersion } from '@renderer/lib/classes/api/RAPIVSVersion.svelte'

  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'
  import { P, H1, H3 } from '@renderer/lib/ui/components/Fonts'
  import ScrollableContainer from '@renderer/lib/ui/layout/ScrollableContainer.svelte'
  import { GridContainer, GridItem } from '@renderer/lib/ui/layout/Grid'
  import Label from '@renderer/lib/ui/components/Label.svelte'
  import Input from '@renderer/lib/ui/components/Input.svelte'
  import Info from '@renderer/lib/ui/components/Info.svelte'
  import FormInfo from '@renderer/lib/ui/components/FormInfo.svelte'
  import VersionsToInstall from '@renderer/lib/ui/features/VS/Versions/VersionsToInstall.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import { PHMagnifyingGlassBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

  Breadcrumbs.instance.segments = [
    { label: 'VS Instances', href: '/vs/instnces' },
    { label: 'Add a new VS Instance', href: '/vs/instnces/add' }
  ]

  // Instance name form data
  let name = $state('')
  let nameErrors: string[] = $state([])

  // VS Version form data
  let version: RAPIVSVersion | undefined = $state()
  let versionErrors: string[] = $state([])

  // Path form data
  let path: string | undefined = $state()
  let pathErrors: string[] = $state([])

  // Icon form data
  let icon: string | undefined = $state()
  let iconErrors: string[] = $state([])
</script>

<ScrollableContainer isBreakpoint>
  <FlexContainer direction="col" padding="xl" gap="xl">
    <FlexContainer direction="col" gap="base">
      <H1>Add a new VS Instance</H1>
      <P mode="secondary">Manage your Vintage Story Instances and everythig related with them.</P>
    </FlexContainer>

    <FlexContainer direction="col" gap="lg">
      <FlexContainer direction="col" gap="xs">
        <H3>Basics</H3>
        <P mode="secondary">Basic data required on a VS Instance.</P>
      </FlexContainer>

      <GridContainer columns={2} gap="base">
        <GridItem>
          <FlexContainer direction="col" gap="sm">
            <FlexContainer gap="sm">
              <Label for="instance-name" required>Name</Label>
              <Info>The name of the VS Instance</Info>
            </FlexContainer>

            <Input id="instance-name" type="text" placeholder="Name" bind:value={name} required />

            <FormInfo error={nameErrors} />
          </FlexContainer>
        </GridItem>

        <GridItem>
          <FlexContainer direction="col" gap="sm">
            <FlexContainer gap="sm">
              <Label for="versions-to-install" required>Vintage Story Version</Label>
              <Info>The Vintage Story Version of the Vintage Story Instance</Info>
            </FlexContainer>

            <VersionsToInstall
              inputProps={{ id: 'versions-to-install' }}
              bind:version
              mode={versionErrors.length > 0 ? 'danger' : 'neutral'}
              onValueChange={() => (versionErrors = [])}
              required
            />

            <FormInfo error={versionErrors} />
          </FlexContainer>
        </GridItem>

        <GridItem>
          <FlexContainer direction="col" gap="sm">
            <FlexContainer gap="sm">
              <Label for="instance-path">Path</Label>
              <Info>The path where the VS Instance will save the data.<br />It'll use the default path + the name if left empty.</Info>
            </FlexContainer>

            <FlexContainer gap="xs">
              <Button
                mode="neutral"
                id="instance-path"
                title="Select folder"
                onclick={async () => {
                  const selected = await window.api.fs.showDialog('VS Instance Path', 'openDirectory', false, [])
                  path = selected[0]
                }}
              >
                <PHMagnifyingGlassBoldIcon />
              </Button>

              <Input type="text" placeholder="Path" value={path} readonly />
            </FlexContainer>

            <FormInfo error={pathErrors} />
          </FlexContainer>
        </GridItem>

        <GridItem>
          <FlexContainer direction="col" gap="sm">
            <FlexContainer gap="sm">
              <Label for="icon-path">Icon</Label>
              <Info>The path to the icon for the VS Instance</Info>
            </FlexContainer>

            <FlexContainer gap="xs">
              <Button
                mode="neutral"
                id="icon-path"
                title="Select file"
                onclick={async () => {
                  const selected = await window.api.fs.showDialog('VS Instance Icon', 'openFile', false, ['png', 'jpg'])
                  icon = selected[0]
                }}
              >
                <PHMagnifyingGlassBoldIcon />
              </Button>

              <Input type="text" placeholder="Icon" value={icon} readonly />
            </FlexContainer>

            <FormInfo error={iconErrors} />
          </FlexContainer>
        </GridItem>
      </GridContainer>
    </FlexContainer>
  </FlexContainer>
</ScrollableContainer>
