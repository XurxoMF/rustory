<script lang="ts">
  import type { Snippet } from 'svelte'

  import { m } from '@renderer/paraglide/messages'

  import Dialog from '@renderer/lib/ui/form/Dialog.svelte'
  import { ButtonNeutral, ButtonSuccess } from '@renderer/lib/ui/form/Buttons'

  type AlertProps = {
    title: string
    description: Snippet
    open?: boolean | undefined
    onaccept?: (() => void | Promise<void>) | undefined
  }

  let { open = $bindable(false), title, description: desc, onaccept }: AlertProps = $props()
</script>

<Dialog bind:open {title}>
  {#snippet description()}
    <div class="text-center">
      {@render desc()}
    </div>
  {/snippet}

  <div class="flex items-center justify-center gap-2">
    <ButtonNeutral onclick={() => (open = false)}>
      {m.common__cancel()}
    </ButtonNeutral>

    <ButtonSuccess
      onclick={() => {
        open = false
        onaccept?.()
      }}
    >
      {m.common__accept()}
    </ButtonSuccess>
  </div>
</Dialog>
