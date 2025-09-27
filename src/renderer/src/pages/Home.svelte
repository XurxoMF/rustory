<script lang="ts">
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import { StaticContainer } from '@renderer/lib/ui/layout/Containers'

  import ButtonNeutral from '@renderer/lib/ui/form/Buttons/ButtonNeutral.svelte'
  import Alert from '@renderer/lib/ui/form/Alert.svelte'

  Breadcrumbs.instance.segments = []

  let open = $state(false)
</script>

<PageWrapper>
  <StaticContainer>
    <p>Hola mundo!</p>

    <ButtonNeutral onclick={() => (open = !open)}>Open</ButtonNeutral>

    <Alert title="Alert title" bind:open>
      {#snippet description()}
        <p>Hola mundo!</p>
        <p>Text psdnf jksdndfksdn fksjdn fksnfjksdn fjksdnfjk nsdjkfn sjkn fjksdn fjk</p>
      {/snippet}
    </Alert>
  </StaticContainer>
</PageWrapper>
