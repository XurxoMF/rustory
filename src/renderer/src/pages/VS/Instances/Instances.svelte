<script lang="ts">
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'
  import { P, H1 } from '@renderer/lib/ui/components/Fonts'
  import ScrollableContainer from '@renderer/lib/ui/layout/ScrollableContainer.svelte'

  Breadcrumbs.instance.segments = [{ label: 'VS Instances', href: '/vs/instnces' }]
</script>

<ScrollableContainer isBreakpoint>
  <FlexContainer direction="col" padding="xl" gap="xl">
    <FlexContainer direction="col" gap="base">
      <H1>VS Instances</H1>
      <P mode="secondary">Manage your Vintage Story Instances and everythig related with them.</P>
    </FlexContainer>
  </FlexContainer>
</ScrollableContainer>
