<script lang="ts">
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { Toast, Toasts } from '@renderer/lib/classes/Toasts.svelte'
  import ButtonNeutral from '@renderer/lib/ui/form/Buttons/ButtonNeutral.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import { sleep } from '@shared/utils/common'

  Breadcrumbs.instance.segments = []
</script>

<PageWrapper scrollable={false}>
  <div class="flex flex-col gap-2 flex-wrap">
    <p>Hola mundo!</p>

    <ButtonNeutral
      onclick={async () => {
        const toast1 = new Toast({
          title: 'Test toasts',
          type: Toast.Type.INFO,
          hideAfter: 60000
        })
        Toasts.instance.addToast(toast1)

        await sleep(500)

        const toast2 = new Toast({
          title: 'Test toasts',
          type: Toast.Type.WARNING,
          hideAfter: 60000,
          onclick: async () => {
            window.api.logger.info('Toast clicked!')
          }
        })
        Toasts.instance.addToast(toast2)

        await sleep(500)

        const toast3 = new Toast({
          title: 'Test toasts',
          description: 'This is a test toast',
          type: Toast.Type.ERROR,
          hideAfter: 60000
        })
        Toasts.instance.addToast(toast3)

        await sleep(500)

        const toast4 = new Toast({
          title: 'Test toasts',
          type: Toast.Type.SUCCESS,
          hideAfter: 60000,
          onclick: async () => {
            window.api.logger.info('Toast clicked!')
          }
        })
        Toasts.instance.addToast(toast4)
      }}>Show Toast</ButtonNeutral
    >
  </div>
</PageWrapper>
