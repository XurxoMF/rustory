<script lang="ts">
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { Data } from '@renderer/lib/classes/Data.svelte'
  import { TaskBase } from '@renderer/lib/classes/tasks/TaskBase.svelte'
  import { VSVersion } from '@renderer/lib/classes/vintagestory/VSVersion.svelte'
  import { RAPIVSVersion } from '@renderer/lib/classes/api/RAPIVSVersion.svelte'
  import { Info as AppInfo } from '@renderer/lib/classes/Info.svelte'

  import { PHFolderOpenBoldIcon, PHMagnifyingGlassBoldIcon, PHPlusBoldIcon, PHTrashBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import { GridItem, GridContainer } from '@renderer/lib/ui/layout/Grid'
  import Label from '@renderer/lib/ui/components/Label.svelte'
  import Info from '@renderer/lib/ui/components/Info.svelte'
  import Input from '@renderer/lib/ui/components/Input.svelte'
  import { VersionsToInstall } from '@renderer/lib/ui/features/VS/Versions'
  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'
  import { P, H1, H4 } from '@renderer/lib/ui/components/Fonts'
  import ProgressBar from '@renderer/lib/ui/components/ProgressBar.svelte'
  import Tooltip from '@renderer/lib/ui/components/Tooltip.svelte'
  import Sheet from '@renderer/lib/ui/components/Sheet.svelte'
  import ScrollableContainer from '@renderer/lib/ui/layout/ScrollableContainer.svelte'
  import Form from '@renderer/lib/ui/components/Form.svelte'
  import { ask } from '@renderer/lib/ui/app/AlertManager.svelte'
  import FormInfo from '@renderer/lib/ui/components/FormInfo.svelte'

  Breadcrumbs.instance.segments = [{ label: 'VS Versions', href: '/vs/versions' }]

  // If the dialog to install a version is open
  let isAddVSVersionDialogOpen = $state(false)

  // VS Version form data
  let version: RAPIVSVersion | undefined = $state()
  let versionErrors: string[] = $state([])

  // Path form data
  let path: string | undefined = $state()
  let pathErrors: string[] = $state([])

  let totalErrors = $derived(versionErrors.length + pathErrors.length)

  async function manageInstallVersion(): Promise<void> {
    // Clear errors
    versionErrors = []
    pathErrors = []

    // Check if a version is selected
    if (!version) versionErrors.push('You need to select a version!')

    // Install the version if there are no errors
    if (totalErrors <= 0) {
      const vsv = await version!.add(path)
      vsv.install(version!)
      clearInstallVersion()
      return
    }
  }

  function clearInstallVersion(): void {
    isAddVSVersionDialogOpen = false

    version = undefined
    versionErrors = []

    path = undefined
    pathErrors = []
  }
</script>

<ScrollableContainer isBreakpoint>
  <FlexContainer direction="col" padding="xl" gap="xl">
    <FlexContainer direction="col" gap="base">
      <FlexContainer gap="base">
        <H1>VS Versions</H1>

        <Tooltip disableHoverableContent>
          {#snippet trigger()}
            <Button mode="neutral" onclick={() => (isAddVSVersionDialogOpen = true)} disabled={!AppInfo.instance.online}>
              <PHPlusBoldIcon class="text-2xl text-current/50" />
            </Button>
          {/snippet}

          {#if AppInfo.instance.online}
            Install a new VS Version.
          {:else}
            You need to be online to install a new VS Version.
          {/if}
        </Tooltip>
      </FlexContainer>

      <P mode="secondary">Manage your Vintage Story Versions and everythig related with them.</P>
    </FlexContainer>

    <GridContainer columns={3} gap="lg">
      {#each Data.instance.vsVersions as vsVersion (vsVersion.version)}
        <GridItem>
          <FlexContainer overflowHidden direction="col" gap="base" padding="base" mode="neutral">
            <FlexContainer direction="col" gap="sm">
              <FlexContainer gap="base" alignX="start">
                <H4 overflow="nowrap">{vsVersion.version}</H4>

                <FlexContainer gap="sm">
                  <Tooltip disableHoverableContent>
                    {#snippet trigger()}
                      <Button mode="neutral" onclick={() => window.api.shell.openPath(vsVersion.path)}><PHFolderOpenBoldIcon /></Button>
                    {/snippet}

                    Open folder on file explorer
                  </Tooltip>

                  <Tooltip disableHoverableContent>
                    {#snippet trigger()}
                      <Button
                        mode="danger"
                        disabled={vsVersion.state === VSVersion.State.DELETING || vsVersion.state === VSVersion.State.INSTALLING}
                        onclick={async () => {
                          const ok = await ask('Are you sure?', 'Are you sure you want to delete this VS Version? This action cannot be undone!')
                          if (ok) {
                            await vsVersion.delete()
                            Data.instance.vsVersions = Data.instance.vsVersions.filter((v) => v.version !== vsVersion.version)
                          }
                        }}
                      >
                        <PHTrashBoldIcon />
                      </Button>
                    {/snippet}

                    Uninstall VS Version
                  </Tooltip>
                </FlexContainer>
              </FlexContainer>

              <FlexContainer gap="sm">
                <Tooltip triggerWidth="full" delayDuration={500}>
                  {#snippet trigger()}
                    <P mode="secondary" overflow="ellipsis">{vsVersion.path}</P>
                  {/snippet}

                  {vsVersion.path}
                </Tooltip>
              </FlexContainer>
            </FlexContainer>

            {#if vsVersion.task}
              <FlexContainer direction="col" gap="sm">
                <FlexContainer gap="sm" alignX="between">
                  <P mode="secondary">{vsVersion.task.type === TaskBase.Type.VS_VERSION_INSTALL && 'Installing...'}</P>
                  <P mode="secondary">{vsVersion.task.progress}%</P>
                </FlexContainer>
                <ProgressBar mode="success" value={vsVersion.task.progress} />
              </FlexContainer>
            {/if}
          </FlexContainer>
        </GridItem>
      {/each}
    </GridContainer>
  </FlexContainer>
</ScrollableContainer>

<Sheet
  bind:open={isAddVSVersionDialogOpen}
  contentProps={{ onEscapeKeydown: clearInstallVersion, onInteractOutside: clearInstallVersion }}
  onclose={clearInstallVersion}
  width="xs"
  title="Install VS Version"
  description="Select the VS Version you want to install and click install."
>
  <Form onsubmit={manageInstallVersion}>
    <FlexContainer direction="col" height="full" gap="xl" alignY="between">
      <FlexContainer direction="col" gap="base">
        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="versions-to-install">Vintage Story Version</Label>
            <Info>The Vinatger Story Version to install.</Info>
          </FlexContainer>

          <VersionsToInstall
            inputProps={{ id: 'versions-to-install' }}
            bind:version
            mode={versionErrors.length > 0 ? 'danger' : 'neutral'}
            onValueChange={() => (versionErrors = [])}
            disableInstalled
            required
          />

          <FormInfo error={versionErrors} />
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="version-path">Path</Label>
            <Info>The path where the VS Version will be installed.<br />It'll use the default path + the version if left empty.</Info>
          </FlexContainer>

          <FlexContainer gap="xs">
            <Button
              mode="neutral"
              id="version-path"
              title="Select a folder"
              onclick={async () => {
                const selected = await window.api.fs.showDialog('Select a folder', 'openDirectory', false, [])
                path = selected[0]
              }}
            >
              <PHMagnifyingGlassBoldIcon />
            </Button>

            <Input type="text" placeholder="Path" value={path} readonly required />
          </FlexContainer>

          <FormInfo error={pathErrors} />
        </FlexContainer>
      </FlexContainer>

      <FlexContainer gap="sm">
        <Button mode="neutral" width="flex-1" onclick={clearInstallVersion}>Cancel</Button>

        <Button mode="success" width="flex-1" type="submit">Install</Button>
      </FlexContainer>
    </FlexContainer>
  </Form>
</Sheet>
