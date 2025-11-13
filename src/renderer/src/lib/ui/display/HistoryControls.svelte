<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Reloader } from '@renderer/lib/classes/Reloader.svelte'

  import Button from '@renderer/lib/ui/components/Button.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
</script>

<Button onclick={() => Reloader.instance.executeTasks()} title={m.common__reload()}>
  <Icon icon="ph:arrow-clockwise" class="opacity-40" />
</Button>

<Button onclick={() => history.back()} title={m.common__previous()}>
  <Icon icon="ph:caret-left" class="opacity-40" />
</Button>

<Button onclick={() => history.forward()} title={m.common__next()}>
  <Icon icon="ph:caret-right" class="opacity-40" />
</Button>
