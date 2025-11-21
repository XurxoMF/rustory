<script lang="ts">
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { RAPIVSVersion } from '@renderer/lib/classes/api/RAPIVSVersion.svelte'
  import { Info as AppInfo } from '@renderer/lib/classes/Info.svelte'

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
  import Form from '@renderer/lib/ui/components/Form.svelte'
  import Switch from '@renderer/lib/ui/components/Switch.svelte'
  import Slider from '@renderer/lib/ui/components/Slider.svelte'

  Breadcrumbs.instance.segments = [
    { label: 'VS', href: '/vs' },
    { label: 'Instances', href: '/vs/instances' },
    { label: 'Add', href: '/vs/instnces/add' }
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

  // Automatic backups data
  let backupsAuto = $state(false)

  // Backups limit data
  let backupsLimit = $state(0)

  // Backups path data
  let backupsCompression = $state(4)

  // Start params data
  let startParams = $state('')
  let startParamsErrors: string[] = $state([])

  // ENV variables data
  let envVars = $state('')
  let envVarsErrors: string[] = $state([])

  // Mesa Gl Thread data
  let mesaGlthread = $state(false)

  let totalErrors = $derived(nameErrors.length + versionErrors.length + pathErrors.length + iconErrors.length)

  function manageAddInstance(): void {
    // Check if a version is selected
    if (!version) versionErrors.push('You need to select a version!')

    // Check the name
    if (!name) nameErrors.push('You need to enter a name!')

    if (totalErrors <= 0) {
      // TODO: Install the version if needed and add the instance
    }
  }
</script>

<ScrollableContainer isBreakpoint>
  <Form onsubmit={manageAddInstance}>
    <FlexContainer direction="col" padding="xl" gap="xl">
      <FlexContainer direction="col" gap="base">
        <FlexContainer gap="base">
          <H1>Add a new VS Instance</H1>

          <Button mode="success" type="submit">Save</Button>
        </FlexContainer>

        <P mode="secondary">Add a new VS Instance.</P>
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

              <Input
                id="instance-name"
                onchange={() => (nameErrors = [])}
                mode={nameErrors.length > 0 ? 'danger' : 'neutral'}
                type="text"
                placeholder="Name"
                bind:value={name}
                required
              />

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

      <FlexContainer direction="col" gap="lg">
        <FlexContainer direction="col" gap="xs">
          <H3>Backups</H3>
          <P mode="secondary">Backups configuration for this VS Instance.</P>
        </FlexContainer>

        <GridContainer columns={2} gap="base">
          <GridItem spanX="full">
            <FlexContainer gap="sm">
              <Label for="automatic-backups">Automatic backups</Label>
              <Info>Enable automatic backups</Info>
              <Switch id="automatic-backups" bind:checked={backupsAuto} />
            </FlexContainer>
          </GridItem>

          <GridItem>
            <FlexContainer direction="col" gap="sm">
              <FlexContainer gap="sm">
                <Label for="backups-limit">Limit</Label>
                <Info>The maximum number of backups made.<br />Once this limit is reached, the oldest backups will be deleted.</Info>
              </FlexContainer>

              <Input id="backups-limi" type="number" min={1} max={100} placeholder="Limit" bind:value={backupsLimit} />
            </FlexContainer>
          </GridItem>

          <GridItem>
            <FlexContainer direction="col" gap="sm">
              <FlexContainer gap="sm">
                <Label for="backups-compression">Compression level</Label>
                <Info>The compression level for the backups.<br />Higher = less space used but more time to backup.</Info>
              </FlexContainer>

              <Slider id="backups-compression" type="single" min={0} max={9} step={1} bind:value={backupsCompression} withTicks withTickLabels />
            </FlexContainer>
          </GridItem>
        </GridContainer>
      </FlexContainer>

      <FlexContainer direction="col" gap="lg">
        <FlexContainer direction="col" gap="xs">
          <H3>Advanced</H3>
          <P mode="secondary">Advanced configuration for this VS Instance.</P>
        </FlexContainer>

        <GridContainer columns={2} gap="base">
          <GridItem>
            <FlexContainer direction="col" gap="sm">
              <FlexContainer gap="sm">
                <Label for="start-params">Start params</Label>
                <Info>The start parameters for theis VS Instance.</Info>
              </FlexContainer>

              <Input
                id="start-params"
                mode={startParamsErrors.length > 0 ? 'danger' : 'neutral'}
                type="text"
                placeholder="Start params"
                bind:value={startParams}
              />

              <FormInfo error={startParamsErrors} />
            </FlexContainer>
          </GridItem>

          <GridItem>
            <FlexContainer direction="col" gap="sm">
              <FlexContainer gap="sm">
                <Label for="env-variables">ENV variables</Label>
                <Info>The ENV variables for theis VS Instance.</Info>
              </FlexContainer>

              <Input id="env-variables" mode={envVarsErrors.length > 0 ? 'danger' : 'neutral'} type="text" placeholder="ENV variables" bind:value={envVars} />

              <FormInfo error={envVarsErrors} />
            </FlexContainer>
          </GridItem>
        </GridContainer>
      </FlexContainer>

      {#if AppInfo.instance.os.platform === 'linux'}
        <FlexContainer direction="col" gap="lg">
          <FlexContainer direction="col" gap="xs">
            <H3>Linux</H3>
            <P mode="secondary">Linux configuration for this VS Instance.</P>
          </FlexContainer>

          <GridContainer columns={2} gap="base">
            <GridItem>
              <FlexContainer gap="sm">
                <Label for="mesa-glthread">mesa_glthread</Label>
                <Info>Enable mesa_glthread.<br />Improves performance on some Linux systems.</Info>

                <Switch id="mesa-glthread" bind:checked={mesaGlthread} />
              </FlexContainer>
            </GridItem>
          </GridContainer>
        </FlexContainer>
      {/if}
    </FlexContainer>
  </Form>
</ScrollableContainer>
