<script lang="ts">
  import { goto } from '@mateothegreat/svelte5-router'

  import { ask } from '@renderer/lib/ui/app/AlertManager.svelte'

  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { Data } from '@renderer/lib/classes/Data.svelte'
  import { VSInstance } from '@renderer/lib/classes/vintagestory/VSInstance.svelte'
  import { Info as AppInfo } from '@renderer/lib/classes/Info.svelte'

  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'
  import { P, H1, H4 } from '@renderer/lib/ui/components/Fonts'
  import ScrollableContainer from '@renderer/lib/ui/layout/ScrollableContainer.svelte'
  import Tooltip from '@renderer/lib/ui/components/Tooltip.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import { PHPlusBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'
  import { GridContainer, GridItem } from '@renderer/lib/ui/layout/Grid'
  import { PHFolderOpenBoldIcon, PHTrashBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

  Breadcrumbs.instance.segments = [
    { label: 'VS', href: '/vs' },
    { label: 'Instances', href: '/vs/instnces' }
  ]
</script>

<ScrollableContainer isBreakpoint>
  <FlexContainer direction="col" padding="xl" gap="xl">
    <FlexContainer direction="col" gap="base">
      <FlexContainer gap="base">
        <H1>VS Instances</H1>

        <Tooltip disableHoverableContent>
          {#snippet trigger()}
            <Button mode="neutral" onclick={() => goto('/vs/instances/add')} disabled={!AppInfo.instance.online}>
              <PHPlusBoldIcon class="text-2xl text-current/50" />
            </Button>
          {/snippet}

          {#if AppInfo.instance.online}
            Add a new VS Instance
          {:else}
            You need to be online to add a new VS Instance.
          {/if}
        </Tooltip>
      </FlexContainer>

      <P mode="secondary">Manage your Vintage Story Instances and everythig related with them.</P>
    </FlexContainer>

    <GridContainer columns={3} gap="lg">
      {#each Data.instance.vsInstances as vsInstance (vsInstance.id)}
        <GridItem>
          <FlexContainer overflowHidden direction="col" gap="base" padding="base" mode="neutral">
            <FlexContainer direction="col" gap="sm">
              <FlexContainer gap="base" alignX="start">
                <H4 overflow="nowrap">{vsInstance.name}</H4>

                <FlexContainer gap="sm">
                  <Tooltip disableHoverableContent>
                    {#snippet trigger()}
                      <Button mode="neutral" onclick={() => window.api.shell.openPath(vsInstance.path)}><PHFolderOpenBoldIcon /></Button>
                    {/snippet}

                    Open folder on file explorer
                  </Tooltip>

                  <Tooltip disableHoverableContent>
                    {#snippet trigger()}
                      <Button
                        mode="danger"
                        disabled={vsInstance.state !== VSInstance.State.STOPPED}
                        onclick={async () => {
                          const ok = await ask(
                            'Are you sure?',
                            "Are you sure you want to delete this VS Instance? This action cannot be undone and you'll loose your worlds!"
                          )
                          if (ok) {
                            await vsInstance.delete()
                            Data.instance.vsInstances = Data.instance.vsInstances.filter((i) => i.id !== vsInstance.id)
                          }
                        }}
                      >
                        <PHTrashBoldIcon />
                      </Button>
                    {/snippet}

                    Uninstall VS Instance
                  </Tooltip>
                </FlexContainer>
              </FlexContainer>

              <FlexContainer direction="col" gap="sm">
                <Tooltip triggerWidth="full" delayDuration={500}>
                  {#snippet trigger()}
                    <P mode="secondary" overflow="ellipsis">{vsInstance.path}</P>
                  {/snippet}

                  {vsInstance.path}
                </Tooltip>

                <P mode="secondary">{vsInstance.version}</P>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
        </GridItem>
      {/each}
    </GridContainer>
  </FlexContainer>
</ScrollableContainer>
