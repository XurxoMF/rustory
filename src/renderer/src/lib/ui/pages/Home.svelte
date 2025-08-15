<script lang="ts">
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import ButtonNeutral from '../form/Buttons/ButtonNeutral.svelte'

  Breadcrumbs.instance.segments = []
</script>

<PageWrapper scrollable={false}>
  <div class="flex flex-col gap-2 flex-wrap">
    <p>Hola mundo!</p>

    <ButtonNeutral onclick={() => window.api.notifications.notify('Test', 'Hola mundo!')}>Send notification</ButtonNeutral>
  </div>
</PageWrapper>
