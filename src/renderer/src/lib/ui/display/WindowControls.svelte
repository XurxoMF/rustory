<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { PreventClose } from '@renderer/lib/classes/PreventClose.svelte'

  import { ButtonUnstyled } from '@renderer/lib/ui/form/Buttons'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
</script>

<ButtonUnstyled icon onclick={() => window.api.window.minimize()} title={m.common__minimize()}>
  <Icon icon="ph:minus-bold" />
</ButtonUnstyled>

<ButtonUnstyled
  icon
  onclick={() => {
    window.api.window.maximize()
  }}
  title={m.common__maximize()}
>
  <Icon icon="ph:arrows-out-simple-bold" />
</ButtonUnstyled>

<ButtonUnstyled icon onclick={() => window.api.window.hide()} title={m.common__hide()}>
  <Icon icon="ph:eye-slash-bold" />
</ButtonUnstyled>

<ButtonUnstyled
  icon
  onclick={() => {
    window.api.window.close()
    if (!PreventClose.instance.prevented) return /* appWindow.close() */
  }}
  title={m.common__close()}
>
  <Icon icon="ph:x-bold" />
</ButtonUnstyled>
