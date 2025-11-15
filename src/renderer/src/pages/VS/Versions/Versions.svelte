<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { Data } from '@renderer/lib/classes/Data.svelte'

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
  <GridContainer columns={3} isBreakpoint>
    <GridItem spanX="full">
      <GridContainer columns={2}>
        <GridItem>
          <FlexContainer direction="col">
            <FlexContainer>
              <Label for="versions-to-install">{m.vintagestory__version()}</Label>
              <Info>{m.descriptions__vs_version_to_install()}</Info>
            </FlexContainer>

            <VersionsToInstall bind:version />
          </FlexContainer>
        </GridItem>

        <GridItem>
          <div class="flex flex-col items-start justify-center gap-1">
            <div class="flex gap-1 items-center">
              <Label>{m.labels__vs_version_path()}</Label>
              <Info>{m.descriptions__vs_version_path()}</Info>
            </div>

            <div class="w-full flex items-stretch justify-center gap-1">
              <Button
                mode="neutral"
                title={m.common__select_folder()}
                onclick={async () => {
                  const selected = await window.api.fs.showDialog(m.settings__vs_instance_backups_folder(), 'openDirectory', false, [])
                  path = selected[0]
                }}
              >
                <Icon icon="ph:magnifying-glass" />
              </Button>

              <Input type="text" name={m.labels__vs_version_path()} placeholder={m.labels__vs_version_path()} value={path} readonly />
            </div>
          </div>
        </GridItem>

        <GridItem spanX="full">
          <div class="h-full flex flex-col items-end gap-1">
            <Button mode="success" onclick={manageInstallVersion}>
              {m.common__install()}
            </Button>
          </div>
        </GridItem>
      </GridContainer>
    </GridItem>

    {#each Data.instance.vsVersions as vsVersion (vsVersion.version)}
      <GridItem>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex flex-col justify-center items-start overflow-hidden">
            <h1>{vsVersion.version}</h1>
            <p class="w-full text-sm opacity-40 overflow-hidden whitespace-nowrap text-ellipsis" title={vsVersion.path}>{vsVersion.path}</p>
            <p class="w-full text-sm opacity-40 overflow-hidden whitespace-nowrap text-ellipsis">{vsVersion.task?.progress}</p>
          </div>
          <div class="w-fit flex justify-center">
            <Button><Icon icon="ph:folder-open" class="opacity-40" /></Button>
            <Button><Icon icon="ph:trash" class="opacity-40" /></Button>
          </div>
        </div>
      </GridItem>
    {/each}
  </GridContainer>
</PageWrapper>
