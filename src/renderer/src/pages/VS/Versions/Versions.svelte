<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { Data } from '@renderer/lib/classes/Data.svelte'
  import { TaskBase } from '@renderer/lib/classes/tasks/TaskBase.svelte'
  import { VSVersion } from '@renderer/lib/classes/vintagestory/VSVersion.svelte'
  import { RAPIVSVersion } from '@renderer/lib/classes/api/RAPIVSVersion.svelte'
  import { Toasts, Toast } from '@renderer/lib/classes/Toasts.svelte'

  import Icon from '@renderer/lib/ui/components/Icon.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import { GridItem, GridContainer } from '@renderer/lib/ui/layout/Grid'
  import Label from '@renderer/lib/ui/components/Label.svelte'
  import Info from '@renderer/lib/ui/components/Info.svelte'
  import Input from '@renderer/lib/ui/components/Input.svelte'
  import { VersionsToInstall } from '@renderer/lib/ui/features/VS/Versions'
  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'
  import H4 from '@renderer/lib/ui/components/H4.svelte'
  import P from '@renderer/lib/ui/components/P.svelte'
  import ProgressBar from '@renderer/lib/ui/components/ProgressBar.svelte'
  import Tooltip from '@renderer/lib/ui/components/Tooltip.svelte'
  import Sheet from '@renderer/lib/ui/components/Sheet.svelte'
  import ScrollableContainer from '@renderer/lib/ui/layout/ScrollableContainer.svelte'
  import H1 from '@renderer/lib/ui/components/H1.svelte'

  Breadcrumbs.instance.segments = [{ label: m.vintagestory__versions(), href: '/vs/versions' }]

  let addVersionDialogOpen = $state(false)

  let version: RAPIVSVersion | undefined = $state()
  let path: string | undefined = $state()

  function manageInstallVersion(): void {
    let missingFields: number = 0

    if (!version) missingFields++

    if (missingFields <= 0) {
      version?.addAndInstall(path)
      return
    }

    const toast = new Toast({
      title: m.toasts__title__missing_fields(),
      type: Toast.Type.DANGER,
      description: m.toasts__description__missing_fields()
    })
    Toasts.instance.addToast(toast)
  }
</script>

<ScrollableContainer>
  <FlexContainer direction="col" padding="xl" gap="xl">
    <FlexContainer direction="col">
      <FlexContainer>
        <H1>{m.vintagestory__versions()}</H1>

        <Tooltip disableHoverableContent>
          {#snippet trigger()}
            <Button mode="neutral" onclick={() => (addVersionDialogOpen = true)}>
              <Icon icon="ph:plus-bold" class="text-2xl text-current/50" />
            </Button>
          {/snippet}

          Install a new VS Version
        </Tooltip>
      </FlexContainer>

      <P mode="secondary">{m.descriptions__vs_versions_page()}</P>
    </FlexContainer>

    <GridContainer columns={3} gap="base">
      {#each Data.instance.vsVersions as vsVersion (vsVersion.version)}
        <GridItem>
          <FlexContainer overflowHidden direction="col" gap="sm" mode="neutral" padding="base">
            <FlexContainer gap="base" alignX="start">
              <H4 overflow="nowrap">{vsVersion.version}</H4>

              <FlexContainer gap="sm">
                <Tooltip disableHoverableContent>
                  {#snippet trigger()}
                    <Button mode="neutral" onclick={() => window.api.shell.openPath(vsVersion.path)}><Icon icon="ph:folder-open-bold" /></Button>
                  {/snippet}

                  Open folder on file explorer
                </Tooltip>

                <Tooltip disableHoverableContent>
                  {#snippet trigger()}
                    <Button
                      mode="danger"
                      disabled={vsVersion.state === VSVersion.State.DELETING || vsVersion.state === VSVersion.State.INSTALLING}
                      onclick={async () => {
                        await vsVersion.delete()
                        Data.instance.vsVersions.delete(vsVersion)
                      }}
                    >
                      <Icon icon="ph:trash-bold" />
                    </Button>
                  {/snippet}

                  Uninstall VS Version
                </Tooltip>
              </FlexContainer>
            </FlexContainer>

            <FlexContainer gap="sm">
              <Tooltip disableHoverableContent>
                {#snippet trigger()}
                  <P mode="secondary" overflow="ellipsis">{vsVersion.path}</P>
                {/snippet}

                {vsVersion.path}
              </Tooltip>
            </FlexContainer>

            {#if vsVersion.task}
              <FlexContainer direction="col" gap="xs">
                <FlexContainer gap="xs" alignX="between">
                  <P mode="secondary">{vsVersion.task.type === TaskBase.Type.VS_VERSION_INSTALL && 'Installing...'}</P>
                  <P mode="secondary">{vsVersion.task.progress}%</P>
                </FlexContainer>
                <ProgressBar value={vsVersion.task.progress} />
              </FlexContainer>
            {/if}
          </FlexContainer>
        </GridItem>
      {/each}
    </GridContainer>
  </FlexContainer>
</ScrollableContainer>

<Sheet bind:open={addVersionDialogOpen} width="base" title="Install a VS Version" description="Select the VS Version you want to install and click install.">
  <FlexContainer direction="col" height="full" gap="base" alignY="between">
    <FlexContainer direction="col" gap="sm">
      <FlexContainer direction="col" gap="xs">
        <FlexContainer gap="xs">
          <Label for="versions-to-install">{m.vintagestory__version()}</Label>
          <Info>{m.descriptions__vs_version_to_install()}</Info>
        </FlexContainer>

        <VersionsToInstall bind:version />
      </FlexContainer>

      <FlexContainer direction="col" gap="xs">
        <FlexContainer gap="xs">
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
            <Icon icon="ph:magnifying-glass-bold" />
          </Button>

          <Input type="text" name={m.labels__vs_version_path()} placeholder={m.labels__vs_version_path()} value={path} readonly />
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>

    <FlexContainer gap="sm">
      <Button mode="neutral" width="flex-1" onclick={() => (addVersionDialogOpen = false)}>
        {m.common__install()}
      </Button>

      <Button mode="success" width="flex-1" onclick={manageInstallVersion}>
        {m.common__install()}
      </Button>
    </FlexContainer>
  </FlexContainer>
</Sheet>
