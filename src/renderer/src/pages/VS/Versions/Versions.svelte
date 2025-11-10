<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { Data } from '@renderer/lib/classes/Data.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { Button, ButtonSuccess } from '@renderer/lib/ui/form/Buttons'
  import { GridItem, GridContainer } from '@renderer/lib/ui/layout/Containers/Grid'
  import { StaticContainer, StyledContainer, ScrollableContainer, CollapsibleContainer } from '@renderer/lib/ui/layout/Containers'
  import Label from '@renderer/lib/ui/form/Label.svelte'
  import Description from '@renderer/lib/ui/form/Description.svelte'
  import Input from '@renderer/lib/ui/form/Input.svelte'
  import { ButtonNeutral } from '@renderer/lib/ui/form/Buttons'
  import { RAPIVSVersion } from '@renderer/lib/classes/api/RAPIVSVersion.svelte'
  import { VersionsToInstall } from '@renderer/lib/ui/features/VS/Versions'
  import { Toasts, Toast } from '@renderer/lib/classes/Toasts.svelte'

  Breadcrumbs.instance.segments = [{ label: m.vintagestory__versions(), href: '/vs/versions' }]

  let version: RAPIVSVersion | undefined = $state()
  let path: string | undefined = $state()

  function manageInstallVersion(): void {
    let missingFields: string[] = []

    if (!version) missingFields.push(m.vintagestory__version())

    if (missingFields.length > 0) {
      const toast = new Toast({
        title: m.toasts__title__missing_fields(),
        type: Toast.Type.ERROR,
        description: [m.toasts__description__missing_fields(), ...missingFields.map((mf) => `- ${mf}`)]
      })
      Toasts.instance.addToast(toast)
      return
    }

    version?.addAndInstall(path)
  }
</script>

<PageWrapper>
  <ScrollableContainer orientation="vertical">
    <GridContainer columns={3} breakpoint>
      <GridItem spanX="full">
        <StyledContainer>
          <CollapsibleContainer>
            {#snippet headerContent()}
              <p>{m.vintagestory__versions_add()}</p>
            {/snippet}

            <GridContainer columns={2}>
              <GridItem>
                <div class="flex flex-col items-start justify-center gap-1">
                  <div class="flex gap-1 items-center">
                    <Label required>{m.vintagestory__version()}</Label>
                    <Description>{m.descriptions__vs_version_to_install()}</Description>
                  </div>

                  <VersionsToInstall bind:version />
                </div>
              </GridItem>

              <GridItem>
                <div class="flex flex-col items-start justify-center gap-1">
                  <div class="flex gap-1 items-center">
                    <Label>{m.labels__vs_version_path()}</Label>
                    <Description>{m.descriptions__vs_version_path()}</Description>
                  </div>

                  <div class="w-full flex items-stretch justify-center gap-1">
                    <ButtonNeutral
                      size="square"
                      padding="icon"
                      title={m.common__select_folder()}
                      onclick={async () => {
                        const selected = await window.api.fs.showDialog(m.settings__vs_instance_backups_folder(), 'openDirectory', false, [])
                        path = selected[0]
                      }}
                    >
                      <Icon icon="ph:magnifying-glass" />
                    </ButtonNeutral>

                    <Input type="text" name={m.labels__vs_version_path()} placeholder={m.labels__vs_version_path()} value={path} readonly />
                  </div>
                </div>
              </GridItem>

              <GridItem spanX="full">
                <div class="h-full flex flex-col items-end gap-1">
                  <ButtonSuccess onclick={manageInstallVersion}>
                    {m.common__install()}
                  </ButtonSuccess>
                </div>
              </GridItem>
            </GridContainer>
          </CollapsibleContainer>
        </StyledContainer>
      </GridItem>

      {#each Data.instance.vsVersions as vsVersion (vsVersion.version)}
        <GridItem>
          <StyledContainer>
            <StaticContainer>
              <div class="w-full flex items-center justify-between">
                <div class="w-full flex flex-col justify-center items-start overflow-hidden">
                  <h1>{vsVersion.version}</h1>
                  <p class="w-full text-sm opacity-40 overflow-hidden whitespace-nowrap text-ellipsis" title={vsVersion.path}>{vsVersion.path}</p>
                  <p class="w-full text-sm opacity-40 overflow-hidden whitespace-nowrap text-ellipsis">{vsVersion.task?.progress}</p>
                </div>
                <div class="w-fit flex justify-center">
                  <Button padding="icon" size="square"><Icon icon="ph:folder-open" class="opacity-40" /></Button>
                  <Button padding="icon" size="square"><Icon icon="ph:trash" class="opacity-40" /></Button>
                </div>
              </div>
            </StaticContainer>
          </StyledContainer>
        </GridItem>
      {/each}
    </GridContainer>
  </ScrollableContainer>
</PageWrapper>
