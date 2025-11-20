<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { Data } from '@renderer/lib/classes/Data.svelte'
  import { TaskBase } from '@renderer/lib/classes/tasks/TaskBase.svelte'
  import { VSVersion } from '@renderer/lib/classes/vintagestory/VSVersion.svelte'
  import { RAPIVSVersion } from '@renderer/lib/classes/api/RAPIVSVersion.svelte'
  import { Toasts, Toast } from '@renderer/lib/classes/Toasts.svelte'

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

  Breadcrumbs.instance.segments = [{ label: m.vintagestory__versions(), href: '/vs/versions' }]

  // If the dialog to install a version is open
  let isAddVSVersionDialogOpen = $state(false)

  // VS Version form data
  let version: RAPIVSVersion | undefined = $state()
  let versionErrors: string[] = $state([])

  // Path form data
  let path: string | undefined = $state()
  let pathErrors: string[] = $state([])

  function manageInstallVersion(): void {
    let errors = 0

    // Check if a version is selected
    if (!version) {
      versionErrors = ['You need to select a version!']
      errors++
    }

    // Install the version if there are no errors
    if (errors <= 0) {
      version?.addAndInstall(path)
      clearInstallVersion()
      return
    }

    // If there are errors, show a toast
    const toast = new Toast({
      title: m.toasts__title__missing_fields(),
      type: Toast.Type.DANGER,
      description: m.toasts__description__missing_fields()
    })
    Toasts.instance.addToast(toast)
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
        <H1>{m.vintagestory__versions()}</H1>

        <Tooltip disableHoverableContent>
          {#snippet trigger()}
            <Button mode="neutral" onclick={() => (isAddVSVersionDialogOpen = true)}>
              <PHPlusBoldIcon class="text-2xl text-current/50" />
            </Button>
          {/snippet}

          Install a new VS Version
        </Tooltip>
      </FlexContainer>

      <P mode="secondary">{m.descriptions__vs_versions_page()}</P>
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
                            Data.instance.vsVersions.delete(vsVersion)
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
                <P mode="secondary" overflow="ellipsis">{vsVersion.path} asd sad adas da</P>
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
            <Label for="versions-to-install">{m.vintagestory__version()}</Label>
            <Info>{m.descriptions__vs_version_to_install()}</Info>
          </FlexContainer>

          <VersionsToInstall bind:version mode={versionErrors.length > 0 ? 'danger' : 'neutral'} onValueChange={() => (versionErrors = [])} required />

          <FlexContainer direction="col" gap="xs">
            <FormInfo error={versionErrors} />
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="version-path">{m.labels__vs_version_path()}</Label>
            <Info>{m.descriptions__vs_version_path()}</Info>
          </FlexContainer>

          <FlexContainer gap="xs">
            <Button
              mode="neutral"
              id="version-path"
              title={m.common__select_folder()}
              onclick={async () => {
                const selected = await window.api.fs.showDialog(m.settings__vs_instance_backups_folder(), 'openDirectory', false, [])
                path = selected[0]
              }}
            >
              <PHMagnifyingGlassBoldIcon />
            </Button>

            <Input type="text" name={m.labels__vs_version_path()} placeholder={m.labels__vs_version_path()} value={path} readonly required />
          </FlexContainer>

          <FlexContainer direction="col" gap="xs">
            <FormInfo error={pathErrors} />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>

      <FlexContainer gap="sm">
        <Button mode="neutral" width="flex-1" onclick={clearInstallVersion}>
          {m.common__cancel()}
        </Button>

        <Button mode="success" width="flex-1" type="submit">
          {m.common__install()}
        </Button>
      </FlexContainer>
    </FlexContainer>
  </Form>
</Sheet>
