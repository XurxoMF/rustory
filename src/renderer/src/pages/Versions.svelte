<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { Data } from '@renderer/lib/classes/Data.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { Button } from '@renderer/lib/ui/form/Buttons'
  import StyledWrapper from '@renderer/lib/ui/layout/StyledWrapper.svelte'
  import { GridItem, GridContainer } from '@renderer/lib/ui/layout/Containers/Grid'
  import { StaticContainer } from '@renderer/lib/ui/layout/Containers'

  Breadcrumbs.instance.segments = [{ label: m.vintagestory__versions(), href: '/versions' }]
</script>

<PageWrapper scrollable={true}>
  <GridContainer columns={3}>
    <GridItem spanX="full">
      <StyledWrapper>
        <Button mode="container">
          <div class="w-full flex justify-center items-center p-2"><Icon icon="ph:plus" class="text-2xl opacity-50" /></div>
        </Button>
      </StyledWrapper>
    </GridItem>

    {#each Data.instance.vsVersions as vsVersion (vsVersion.version)}
      <GridItem>
        <StyledWrapper>
          <StaticContainer>
            <div class="w-full flex items-center justify-between">
              <div class="w-full flex flex-col justify-center items-start overflow-hidden">
                <h1>{vsVersion.version}</h1>
                <p class="w-full text-sm opacity-50 overflow-hidden whitespace-nowrap text-ellipsis" title={vsVersion.path}>{vsVersion.path}</p>
              </div>
              <div class="w-fit flex justify-center opacity-50">
                <Button mode="icon"><Icon icon="ph:folder-open" /></Button>
                <Button mode="icon"><Icon icon="ph:trash" /></Button>
              </div>
            </div>
          </StaticContainer>
        </StyledWrapper>
      </GridItem>
    {/each}
  </GridContainer>
</PageWrapper>
