<script lang="ts">
  import { parse } from 'jsonc-parser'
  import { onMount } from 'svelte'

  import { m } from '@renderer/paraglide/messages'

  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { Request } from '@renderer/lib/classes/Request.svelte'
  import { RAPIVSVersion } from '@renderer/lib/classes/api/RAPIVSVersion.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import { GridItem, GridContainer } from '@renderer/lib/ui/layout/Containers/Grid'
  import { StyledContainer, ScrollableContainer, StaticContainer } from '@renderer/lib/ui/layout/Containers'
  import Select from '@renderer/lib/ui/form/Select.svelte'

  Breadcrumbs.instance.segments = [
    { label: m.vintagestory__versions(), href: '/vs/versions' },
    { label: m.vintagestory__versions_add(), href: '/vs/versions/add' }
  ]

  let versions: RAPIVSVersion[] = $state([])
  let version: string | undefined = $state()

  $effect(() => {
    window.api.logger.debug(`Selected version: ${version}`)
  })

  onMount(async () => {
    const res = await Request.instance.get('https://vslapi.xurxomf.xyz/versions')
    const json: TRAPIVSVersion[] = await parse(res)

    versions = json.map((v) => RAPIVSVersion.fromJSON(v))
  })
</script>

<PageWrapper>
  <ScrollableContainer orientation="vertical">
    <GridContainer columns={1} breakpoint>
      <GridItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>{m.common__basics()}</p>
            {/snippet}

            <GridContainer>
              <GridItem>
                <Select
                  placeholder={m.placeholders__select_one()}
                  type="single"
                  items={versions.map((v) => {
                    return {
                      label: v.version,
                      value: v.version
                    }
                  })}
                  bind:value={version}
                />
              </GridItem>
            </GridContainer>
          </StaticContainer>
        </StyledContainer>
      </GridItem>
    </GridContainer>
  </ScrollableContainer>
</PageWrapper>
