<script lang="ts">
  import json5 from 'json5'
  import { onMount } from 'svelte'

  import { m } from '@renderer/paraglide/messages'

  import { Config } from '@renderer/lib/classes/Config.svelte'
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { Request } from '@renderer/lib/classes/Request.svelte'
  import { RAPIVSVersion } from '@renderer/lib/classes/api/RAPIVSVersion.svelte'
  import { Data } from '@renderer/lib/classes/Data.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { Button, ButtonSuccess } from '@renderer/lib/ui/form/Buttons'
  import { GridItem, GridContainer } from '@renderer/lib/ui/layout/Containers/Grid'
  import { StaticContainer, StyledContainer, ScrollableContainer } from '@renderer/lib/ui/layout/Containers'
  import Label from '@renderer/lib/ui/form/Label.svelte'
  import Description from '@renderer/lib/ui/form/Description.svelte'
  import Input from '@renderer/lib/ui/form/Input.svelte'
  import { ButtonNeutral } from '@renderer/lib/ui/form/Buttons'
  import ComboBox from '@renderer/lib/ui/form/ComboBox.svelte'

  Breadcrumbs.instance.segments = [{ label: m.vintagestory__versions(), href: '/vs/versions' }]

  let versions: RAPIVSVersion[] = $state([])
  let version: string | undefined = $state()

  let path: string | undefined = $state()

  onMount(async () => {
    const res = await Request.instance.get('https://vslapi.xurxomf.xyz/versions')
    const json: TRAPIVSVersion[] = await json5.parse(res)

    versions = json.map((v) => RAPIVSVersion.fromJSON(v))
  })
</script>

<PageWrapper>
  <ScrollableContainer orientation="vertical">
    <GridContainer columns={3} breakpoint>
      <GridItem spanX="full">
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>{m.vintagestory__versions_add()}</p>
            {/snippet}

            <GridContainer columns={2}>
              <GridItem>
                <div class="flex flex-col items-start justify-center gap-1">
                  <div class="flex gap-1 items-center">
                    <Label required>{m.vintagestory__version()}</Label>
                    <Description>The VS Version to install</Description>
                  </div>

                  <ComboBox
                    required
                    type="single"
                    bind:value={version}
                    items={versions.map((v) => {
                      return {
                        label: v.version,
                        value: v.version,
                        comment: `${v.type} · ${new Date(v.releaseDate).toLocaleDateString(Config.instance.locale)}`
                      }
                    })}
                    inputProps={{ placeholder: m.vintagestory__version() }}
                  />
                </div>
              </GridItem>

              <GridItem>
                <div class="flex flex-col items-start justify-center gap-1">
                  <div class="flex gap-1 items-center">
                    <Label>VS Version path</Label>
                    <Description>Path to install the version</Description>
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

                    <Input type="text" name="VS Version path" placeholder="VS Version path" value={path} readonly />
                  </div>
                </div>
              </GridItem>

              <GridItem spanX="full">
                <div class="h-full flex flex-col items-end gap-1">
                  <ButtonSuccess
                    onclick={async () => {
                      window.api.logger.debug(`Installing VS Version "${version}" on "${path}"...`)
                    }}
                  >
                    Install
                  </ButtonSuccess>
                </div>
              </GridItem>
            </GridContainer>
          </StaticContainer>
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
                </div>
                <div class="w-fit flex justify-center opacity-40">
                  <Button padding="icon" size="square"><Icon icon="ph:folder-open" /></Button>
                  <Button padding="icon" size="square"><Icon icon="ph:trash" /></Button>
                </div>
              </div>
            </StaticContainer>
          </StyledContainer>
        </GridItem>
      {/each}
    </GridContainer>
  </ScrollableContainer>
</PageWrapper>
