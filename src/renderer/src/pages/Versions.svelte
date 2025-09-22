<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import { GridItem, GridContainer } from '@renderer/lib/ui/layout/Grids'
  import StaticSection from '@renderer/lib/ui/layout/Sections/StaticSection.svelte'
  import { Data } from '@renderer/lib/classes/Data.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { Button } from '@renderer/lib/ui/form/Buttons'

  Breadcrumbs.instance.segments = [{ label: m.vintagestory__versions(), href: '/versions' }]
</script>

<PageWrapper scrollable={true}>
  <div class="w-full flex flex-col gap-3 p-3">
    <GridContainer columns={3}>
      <GridItem spanX="full">
        <Button mode="container">
          <StaticSection>
            <div class="w-full flex items-center justify-center"><Icon icon="ph:plus" class="text-2xl opacity-50" /></div>
          </StaticSection>
        </Button>
      </GridItem>

      {#each Data.instance.vsVersions as vsVersion (vsVersion.version)}
        <GridItem>
          <StaticSection>
            <div class="w-full flex items-center justify-between">
              <div class="w-full flex flex-col justify-center items-start overflow-hidden">
                <h1>{vsVersion.version}</h1>
                <p class="text-sm opacity-50 overflow-hidden whitespace-nowrap text-ellipsis" title={vsVersion.path}>{vsVersion.path}</p>
              </div>
              <div class="w-fit flex justify-center opacity-50">
                <Button mode="icon"><Icon icon="ph:folder-open" /></Button>
                <Button mode="icon"><Icon icon="ph:trash" /></Button>
              </div>
            </div>
          </StaticSection>
        </GridItem>
      {/each}
    </GridContainer>
  </div>
</PageWrapper>
