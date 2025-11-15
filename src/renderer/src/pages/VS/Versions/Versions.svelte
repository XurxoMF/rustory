<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { Data } from '@renderer/lib/classes/Data.svelte'
  import { TaskBase } from '@renderer/lib/classes/tasks/TaskBase.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import { GridItem, GridContainer } from '@renderer/lib/ui/layout/Grid'
  import Label from '@renderer/lib/ui/components/Label.svelte'
  import Info from '@renderer/lib/ui/components/Info.svelte'
  import Input from '@renderer/lib/ui/components/Input.svelte'
  import { RAPIVSVersion } from '@renderer/lib/classes/api/RAPIVSVersion.svelte'
  import { VersionsToInstall } from '@renderer/lib/ui/features/VS/Versions'
  import { Toasts, Toast } from '@renderer/lib/classes/Toasts.svelte'
  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'
  import H4 from '@renderer/lib/ui/components/H4.svelte'
  import P from '@renderer/lib/ui/components/P.svelte'
  import ProgressBar from '@renderer/lib/ui/components/ProgressBar.svelte'

  Breadcrumbs.instance.segments = [{ label: m.vintagestory__versions(), href: '/vs/versions' }]

  let version: RAPIVSVersion | undefined = $state()
  let path: string | undefined = $state()

  function manageInstallVersion(): void {
    let missingFields: number = 0

    if (!version) missingFields++

    if (missingFields > 0) {
      const toast = new Toast({
        title: m.toasts__title__missing_fields(),
        type: Toast.Type.DANGER,
        description: m.toasts__description__missing_fields()
      })
      Toasts.instance.addToast(toast)
      return
    }

    version?.addAndInstall(path)
  }
</script>

<PageWrapper title={m.vintagestory__versions()} description={m.descriptions__vs_versions_page()}>
  <GridContainer columns={1} gap="xl" isBreakpoint>
    <GridItem spanX="full">
      <GridContainer columns={2} gap="sm">
        <GridItem>
          <FlexContainer direction="col" gap="xs">
            <FlexContainer gap="xs">
              <Label for="versions-to-install">{m.vintagestory__version()}</Label>
              <Info>{m.descriptions__vs_version_to_install()}</Info>
            </FlexContainer>

            <VersionsToInstall bind:version />
          </FlexContainer>
        </GridItem>

        <GridItem>
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
                <Icon icon="ph:magnifying-glass" />
              </Button>

              <Input type="text" name={m.labels__vs_version_path()} placeholder={m.labels__vs_version_path()} value={path} readonly />
            </FlexContainer>
          </FlexContainer>
        </GridItem>

        <GridItem spanX="full">
          <FlexContainer alignX="end">
            <Button mode="success" onclick={manageInstallVersion}>
              {m.common__install()}
            </Button>
          </FlexContainer>
        </GridItem>
      </GridContainer>
    </GridItem>

    <GridItem>
      <GridContainer columns={3}>
        {#each Data.instance.vsVersions as vsVersion (vsVersion.version)}
          <GridItem>
            <FlexContainer direction="col" gap="xs" mode="neutral" padding="base">
              <FlexContainer gap="base" alignX="between">
                <FlexContainer direction="col" gap="xs">
                  <H4>{vsVersion.version}</H4>
                  <P mode="secondary" title={vsVersion.path}>{vsVersion.path}</P>
                </FlexContainer>

                <FlexContainer gap="xs" alignX="end">
                  <Button mode="transparent"><Icon icon="ph:folder-open-bold" class="text-current/50" /></Button>
                  <Button mode="transparent"><Icon icon="ph:trash-bold" class="text-current/50" /></Button>
                </FlexContainer>
              </FlexContainer>

              {#if vsVersion.task && vsVersion.task.type === TaskBase.Type.VS_VERSION_INSTALL}
                <ProgressBar value={vsVersion.task.progress} />
              {/if}
            </FlexContainer>
          </GridItem>
        {/each}
      </GridContainer>
    </GridItem>
  </GridContainer>
</PageWrapper>
