<script lang="ts" module>
  import { type Component } from 'svelte'

  import { type IconProps } from '@renderer/lib/ui/components/Icons/BaseIcon.svelte'
  import { PHCheckCircleBoldIcon, PHInfoBoldIcon, PHProhibitedBoldIcon, PHWarningBoldIcon, PHXBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

  export const MODE_CLASSES: Record<Toast.Type, string[]> = {
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 inset-ring-zinc-800 ring-zinc-800',
      't-light:bg-zinc-300/50 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
    ],
    info: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-blue-500 bg-blue-800/30 inset-ring-blue-800 ring-blue-800',
      't-light:text-blue-500 t-light:bg-blue-300/30 t-light:inset-ring-blue-300 t-light:ring-blue-300'
    ],
    success: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-green-500 bg-green-800/30 inset-ring-green-800 ring-green-800',
      't-light:text-green-500 t-light:bg-green-300/30 t-light:inset-ring-green-300 t-light:ring-green-300'
    ],
    warning: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-yellow-500 bg-yellow-800/30 inset-ring-yellow-800 ring-yellow-800',
      't-light:text-yellow-500 t-light:bg-yellow-300/30 t-light:inset-ring-yellow-300 t-light:ring-yellow-300'
    ],
    danger: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-red-500 bg-red-800/30 inset-ring-red-800 ring-red-800',
      't-light:text-red-500 t-light:bg-red-300/30 t-light:inset-ring-red-300 t-light:ring-red-300'
    ]
  } as const

  export const TOAST_ICON_CLASSES: Record<Toast.Type, Component<IconProps>> = {
    neutral: PHInfoBoldIcon,
    info: PHInfoBoldIcon,
    success: PHCheckCircleBoldIcon,
    warning: PHWarningBoldIcon,
    danger: PHProhibitedBoldIcon
  } as const
</script>

<script lang="ts">
  import { Toast, Toasts } from '@renderer/lib/classes/Toasts.svelte'

  import Button from '@renderer/lib/ui/components/Button.svelte'
  import FlexContainer from '@renderer/lib/ui/layout/Flex/FlexContainer.svelte'
  import { P, H5 } from '@renderer/lib/ui/components/Fonts'
</script>

<div class="pointer-events-none absolute w-full top-0 right-0 z-500 p-4 flex flex-col items-end justify-start gap-2">
  {#each Toasts.instance.toasts as toast (toast.id)}
    <div
      class={['shrink-0 w-1/5 rounded-md pointer-events-auto outline-none backdrop-blur-xs transition-all', ...MODE_CLASSES[toast.type]]}
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
    <FlexContainer direction="col" gap="xs">
      <FlexContainer gap="sm">
        {@const Icon = TOAST_ICON_CLASSES[toast.type]}
        <Icon class="text-2xl" />
        <H5>{toast.title}</H5>
      </FlexContainer>

      <FlexContainer gap="sm" direction="col">
        <P fat>{toast.description}</P>
      </FlexContainer>
    </FlexContainer>

    <Button
      mode={toast.type}
      onclick={(e) => {
        e.stopPropagation()
        Toasts.instance.removeToast(toast)
      }}
    >
      <PHXBoldIcon />
    </Button>
  </FlexContainer>
{/snippet}
