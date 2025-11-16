<script lang="ts" module>
  export const MODE_CLASSES: Record<Toast.Type, string[]> = {
    neutral: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'bg-zinc-800/50 inset-ring-zinc-800 ring-zinc-800'],
    info: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'text-blue-500 bg-blue-800/30 inset-ring-blue-800 ring-blue-800'],
    success: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'text-green-500 bg-green-800/30 inset-ring-green-800 ring-green-800'],
    warning: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'text-yellow-500 bg-yellow-800/30 inset-ring-yellow-800 ring-yellow-800'],
    danger: ['inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2', 'text-red-500 bg-red-800/30 inset-ring-red-800 ring-red-800']
  } as const

  export const TOAST_ICON_CLASSES: Record<Toast.Type, string> = {
    neutral: 'ph:info-bold',
    info: 'ph:info-bold',
    success: 'ph:check-bold',
    warning: 'ph:warning-bold',
    danger: 'ph:prohibit-bold'
  } as const
</script>

<script lang="ts">
  import { Toast, Toasts } from '@renderer/lib/classes/Toasts.svelte'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import FlexContainer from '@renderer/lib/ui/layout/Flex/FlexContainer.svelte'
  import H5 from '@renderer/lib/ui/components/H5.svelte'
  import P from '@renderer/lib/ui/components/P.svelte'
</script>

<div class="pointer-events-none absolute w-full top-0 right-0 z-400 p-4 flex flex-col items-end justify-start gap-2">
  {#each Toasts.instance.toasts as toast (toast.id)}
    <div
      class={['shrink-0 w-1/5 leading-tight rounded-md pointer-events-auto outline-none backdrop-blur-xs transition-all', ...MODE_CLASSES[toast.type]]}
      onmouseenter={() => Toasts.instance.clearToast(toast)}
      onmouseleave={() => Toasts.instance.restartToast(toast)}
      role="alert"
    >
      {#if toast.onclick}
        <button onclick={toast.onclick} class="cursor-pointer">
          {@render content(toast)}
        </button>
      {:else}
        {@render content(toast)}
      {/if}
    </div>
  {/each}
</div>

{#snippet content(toast: Toast)}
  <FlexContainer padding="base" gap="sm">
    <FlexContainer direction="col" gap="sm">
      <FlexContainer gap="sm">
        <Icon icon={TOAST_ICON_CLASSES[toast.type]} class="text-2xl" />
        <H5>{toast.title}</H5>
      </FlexContainer>

      <FlexContainer gap="sm" direction="col">
        <P>{toast.description}</P>
      </FlexContainer>
    </FlexContainer>

    <Button
      mode={toast.type}
      onclick={(e) => {
        e.stopPropagation()
        Toasts.instance.removeToast(toast)
      }}
    >
      <Icon icon="ph:x-bold" />
    </Button>
  </FlexContainer>
{/snippet}
