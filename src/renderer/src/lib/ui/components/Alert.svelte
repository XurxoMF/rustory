<script lang="ts" module>
  import { type WithoutChildren, type WithoutChildrenOrChild } from 'bits-ui'

  export const ALERT_MODE_CLASSES = {
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
      't-light:bg-zinc-300/50 t-light:not-disabled:hover:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
    ],
    info: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-blue-500 not-disabled:hover:text-blue-200 bg-blue-800/30 not-disabled:hover:bg-blue-800 inset-ring-blue-800 ring-blue-800',
      't-light:text-blue-500 t-light:not-disabled:hover:text-blue-800 t-light:bg-blue-300/30 t-light:not-disabled:hover:bg-blue-300 t-light:inset-ring-blue-300 t-light:ring-blue-300'
    ],
    success: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-green-500 not-disabled:hover:text-green-200 bg-green-800/30 not-disabled:hover:bg-green-800 inset-ring-green-800 ring-green-800',
      't-light:text-green-500 t-light:not-disabled:hover:text-green-800 t-light:bg-green-300/30 t-light:not-disabled:hover:bg-green-300 t-light:inset-ring-green-300 t-light:ring-green-300'
    ],
    warning: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-yellow-500 not-disabled:hover:text-yellow-200 bg-yellow-800/30 not-disabled:hover:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800',
      't-light:text-yellow-500 t-light:not-disabled:hover:text-yellow-800 t-light:bg-yellow-300/30 t-light:not-disabled:hover:bg-yellow-300 t-light:inset-ring-yellow-300 t-light:ring-yellow-300'
    ],
    danger: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-red-500 not-disabled:hover:text-red-200 bg-red-800/30 not-disabled:hover:bg-red-800 inset-ring-red-800 ring-red-800',
      't-light:text-red-500 t-light:not-disabled:hover:text-red-800 t-light:bg-red-300/30 t-light:not-disabled:hover:bg-red-300 t-light:inset-ring-red-300 t-light:ring-red-300'
    ]
  } as const

  export type AlertModeTypes = keyof typeof ALERT_MODE_CLASSES

  export type AlertOverlayProps = WithoutKeys<WithoutChildrenOrChild<AlertDialog.OverlayProps>, 'class'>

  export type AlertContentProps = WithoutKeys<WithoutChildrenOrChild<AlertDialog.ContentProps>, 'class' | 'onInteractOutside' | 'onEscapeKeydown'>

  export type AlertTitleProps = WithoutKeys<WithoutChildrenOrChild<AlertDialog.TitleProps>, 'class'>

  export type AlertDescriptionProps = WithoutKeys<WithoutChildrenOrChild<AlertDialog.DescriptionProps>, 'class'>

  export type AlertProps = WithoutChildren<AlertDialog.RootProps> & {
    title: string
    description: string
    mode?: AlertModeTypes | undefined
    onaccept?: (() => void | Promise<void>) | undefined
    oncancel?: (() => void | Promise<void>) | undefined
    overlayProps?: AlertOverlayProps | undefined
    contentProps?: AlertContentProps | undefined
    titleProps?: AlertTitleProps | undefined
    descriptionProps?: AlertDescriptionProps | undefined
  }
</script>

<script lang="ts">
  import { AlertDialog } from 'bits-ui'

  import { MainWindow } from '@renderer/lib/classes/MainWindow.svelte'

  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'

  let {
    open = $bindable(true),
    title,
    description,
    mode = 'success',
    onaccept,
    oncancel,
    overlayProps,
    contentProps,
    titleProps,
    descriptionProps,
    ...restProps
  }: AlertProps = $props()
</script>

<AlertDialog.Root bind:open {...restProps}>
  <AlertDialog.Portal to="#portal">
    <AlertDialog.Overlay
      class={[
        'absolute top-0 left-0 z-100 w-screen h-screen backdrop-blur-xs',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        MainWindow.instance && !MainWindow.instance.maximized && !MainWindow.instance.fullscreened && 'rounded-md'
      ]}
      {...overlayProps}
    />

    <AlertDialog.Content
      onInteractOutside={() => {
        open = false
        oncancel?.()
      }}
      onEscapeKeydown={() => {
        open = false
        oncancel?.()
      }}
      class={[
        'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-100 w-1/4 h-fit max-h-screen rounded-md shadow-xl outline-none @container',
        'inset-ring-2',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'bg-zinc-900/95 inset-ring-zinc-800',
        't-light:bg-zinc-100/90 t-light:inset-ring-zinc-300'
      ]}
      {...contentProps}
    >
      <FlexContainer direction="col" height="full" padding="xl" gap="xl">
        <FlexContainer direction="col" gap="xs">
          <AlertDialog.Title class="text-2xl font-bold" {...titleProps}>{title}</AlertDialog.Title>

          <AlertDialog.Description class="text-current/50" {...descriptionProps}>
            {description}
          </AlertDialog.Description>
        </FlexContainer>

        <FlexContainer gap="sm">
          <AlertDialog.Cancel
            onclick={() => {
              open = false
              oncancel?.()
            }}
            class={[
              'shrink-0 flex-1 min-w-9 min-h-9 flex items-center justify-center gap-2 p-2 leading-tight font-medium rounded-sm outline-none',
              'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
              'cursor-pointer disabled:cursor-not-allowed',
              'disabled:opacity-40',
              'bg-zinc-800/50 not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
              't-light:bg-zinc-300/50 t-light:not-disabled:hover:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
            ]}
          >
            Calcel
          </AlertDialog.Cancel>

          <AlertDialog.Action
            onclick={() => {
              open = false
              onaccept?.()
            }}
            class={[
              'shrink-0 flex-1 min-w-9 min-h-9 flex items-center justify-center gap-2 p-2 leading-tight font-medium rounded-sm outline-none',
              'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
              'cursor-pointer disabled:cursor-not-allowed',
              'disabled:opacity-40',
              ...ALERT_MODE_CLASSES[mode]
            ]}
          >
            Accept
          </AlertDialog.Action>
        </FlexContainer>
      </FlexContainer>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>
