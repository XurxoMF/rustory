<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Button } from '@renderer/lib/ui/form/Buttons'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
</script>

<Button padding="icon" size="none" onclick={() => window.api.window.minimize()} title={m.common__minimize()}>
  <Icon icon="ph:minus" />
</Button>

<Button padding="icon" size="none" onclick={() => window.api.window.maximize()} title={m.common__maximize()}>
  <Icon icon="ph:arrows-out-simple" />
</Button>

<Button padding="icon" size="none" onclick={() => window.api.window.hide()} title={m.common__hide()}>
  <Icon icon="ph:eye-slash" />
</Button>

<Button padding="icon" size="none" onclick={() => window.api.window.close()} title={m.common__close()}>
  <Icon icon="ph:x" />
</Button>
