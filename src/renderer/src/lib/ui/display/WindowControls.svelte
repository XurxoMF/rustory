<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Window } from '@renderer/lib/classes/Rustory'

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
    Window.instance.isMaximized = !Window.instance.isMaximized
  }}
  title={Window.instance.isMaximized ? m.common__minimize() : m.common__maximize()}
>
  <Icon icon={Window.instance.isMaximized ? 'ph:arrows-in-simple-bold' : 'ph:arrows-out-simple-bold'} />
</ButtonUnstyled>

<ButtonUnstyled icon onclick={() => window.api.window.hide()} title={m.common__hide()}>
  <Icon icon="ph:eye-slash-bold" />
</ButtonUnstyled>

<ButtonUnstyled
  icon
  onclick={() => {
    window.api.window.close()
    if (!Window.instance.preventClose.prevented) return /* appWindow.close() */
  }}
  title={m.common__close()}
>
  <Icon icon="ph:x-bold" />
</ButtonUnstyled>
