<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Reloader } from '@renderer/lib/classes/Reloader.svelte'

  import { Button } from '@renderer/lib/ui/form/Buttons'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
</script>

<Button mode="icon" onclick={() => Reloader.instance.executeTasks()} title={m.common__reload()}>
  <Icon icon="ph:arrow-clockwise-bold" />
</Button>
<Button mode="icon" onclick={() => history.back()} title={m.common__previous()}>
  <Icon icon="ph:caret-left-bold" />
</Button>
<Button mode="icon" onclick={() => history.forward()} title={m.common__next()}>
  <Icon icon="ph:caret-right-bold" />
</Button>
