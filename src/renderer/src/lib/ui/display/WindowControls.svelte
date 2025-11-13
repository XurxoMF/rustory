<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import Button from '@renderer/lib/ui/components/Button.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
</script>

<Button onclick={() => window.api.window.minimize()} title={m.common__minimize()}>
  <Icon icon="ph:minus" class="opacity-40" />
</Button>

<Button onclick={() => window.api.window.maximize()} title={m.common__maximize()}>
  <Icon icon="ph:arrows-out-simple" class="opacity-40" />
</Button>

<Button onclick={() => window.api.window.hide()} title={m.common__hide()}>
  <Icon icon="ph:eye-slash" class="opacity-40" />
</Button>

<Button onclick={() => window.api.window.close()} title={m.common__close()}>
  <Icon icon="ph:x" class="opacity-40" />
</Button>
