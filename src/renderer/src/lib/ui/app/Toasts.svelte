<script lang="ts">
  import { Toast, Toasts } from '@renderer/lib/classes/Toasts.svelte'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'

  const ICONS: Record<Toast.Type, string> = {
    info: 'ph:info',
    warning: 'ph:warning',
    error: 'ph:prohibit',
    success: 'ph:check-circle'
  } as const

  const COLOR_CLASSES: Record<Toast.Type, string[]> = {
    info: ['text-blue-500'],
    warning: ['text-yellow-600'],
    error: ['text-red-800'],
    success: ['text-green-700']
  } as const
</script>

<div class="app-no-drag pointer-events-none absolute top-0 right-0 z-400 p-2 flex flex-col items-end justify-start gap-2">
  {#each Toasts.instance.toasts as toast (toast.id)}
    <div
      class={['group w-72 pointer-events-auto']}
      onmouseenter={() => Toasts.instance.clearToast(toast)}
      onmouseleave={() => Toasts.instance.restartToast(toast)}
      role="alert"
    >
      {#if toast.onclick}
        <!-- TODO: Probably change the Button for a new ButtonContainer component? -->
        <Button onclick={toast.onclick}>
          {@render content(toast)}
        </Button>
      {:else}
        {@render content(toast)}
      {/if}
    </div>
  {/each}
</div>

{#snippet content(toast: Toast)}
  <div class="w-full flex gap-2 items-center">
    <div class="w-full flex gap-2 items-center">
      <div>
        <Icon icon={ICONS[toast.type]} class={['text-2xl transition-[color] duration-100', ...COLOR_CLASSES[toast.type]]} />
      </div>

      <div>
        <p class="text-sm">{toast.title}</p>

        {#each toast.description as description}
          <p class="text-xs opacity-40">{description}</p>
        {/each}
      </div>
    </div>

    <div class="shrink-0 opacity-0 group-hover:opacity-40 transition-opacity duration-100">
      <Button
        onclick={(e) => {
          e.stopPropagation()
          Toasts.instance.removeToast(toast)
        }}
      >
        <Icon icon="ph:x" class="cursor-pointer" />
      </Button>
    </div>
  </div>
{/snippet}
