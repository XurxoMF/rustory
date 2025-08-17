<script lang="ts">
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import ButtonNeutral from '@renderer/lib/ui/form/Buttons/ButtonNeutral.svelte'
  import { Notifications } from '@renderer/lib/classes/Notifications.svelte'

  Breadcrumbs.instance.segments = []
</script>

<PageWrapper scrollable={false}>
  <div class="flex flex-col gap-2 flex-wrap">
    <p>Hola mundo!</p>

    <ButtonNeutral
      onclick={async () => {
        const notification = Notifications.instance.notify('Hola', 'Hola Mundo!')
        notification.onClick(() => window.api.logger.debug('Notification clicked!'))
      }}>Send notification</ButtonNeutral
    >
  </div>
</PageWrapper>
