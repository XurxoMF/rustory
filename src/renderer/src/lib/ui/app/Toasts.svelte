<script lang="ts">
  import { Toast, Toasts } from '@renderer/lib/classes/Toasts.svelte'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import FlexContainer from '../layout/Flex/FlexContainer.svelte'
  import H5 from '../components/H5.svelte'
  import P from '../components/P.svelte'

  const MODE_CLASSES: Record<Toast.Type, string[]> = {
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
    ],
    info: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 not-disabled:hover:bg-zinc-800',
      'text-blue-500 inset-ring-blue-800 ring-blue-800'
    ],
    success: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 not-disabled:hover:bg-zinc-800',
      'text-green-500 inset-ring-green-800 ring-green-800'
    ],
    warning: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 not-disabled:hover:bg-zinc-800',
      'text-yellow-500 inset-ring-yellow-800 ring-yellow-800'
    ],
    danger: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 not-disabled:hover:bg-zinc-800',
      'text-red-500 inset-ring-red-800 ring-red-800'
    ]
  } as const
</script>

<div class="app-no-drag pointer-events-none absolute w-full top-0 right-0 z-400 p-4 flex flex-col items-end justify-start gap-2">
  {#each Toasts.instance.toasts as toast (toast.id)}
    <button
      class={[
        'shrink-0 w-1/5 p-4 leading-tight rounded-md pointer-events-auto outline-none backdrop-blur-xs transition-all',
        toast.onclick && 'cursor-pointer',
        ...MODE_CLASSES[toast.type]
      ]}
      onmouseenter={() => Toasts.instance.clearToast(toast)}
      onmouseleave={() => Toasts.instance.restartToast(toast)}
      onclick={toast.onclick}
    >
      <FlexContainer>
        <FlexContainer direction="col" gap="xs">
          <H5>{toast.title}</H5>
          <P mode="secondary" align="start">{toast.description}</P>
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
    </button>
  {/each}
</div>
