<script lang="ts" module>
  import { type WithoutChildren, type WithoutChildrenOrChild } from 'bits-ui'

  export type AlertOverlayProps = WithoutKeys<WithoutChildrenOrChild<AlertDialog.OverlayProps>, 'class'>

  export type AlertContentProps = WithoutKeys<WithoutChildrenOrChild<AlertDialog.ContentProps>, 'class' | 'onInteractOutside' | 'onEscapeKeydown'>

  export type AlertTitleProps = WithoutKeys<WithoutChildrenOrChild<AlertDialog.TitleProps>, 'class'>

  export type AlertDescriptionProps = WithoutKeys<WithoutChildrenOrChild<AlertDialog.DescriptionProps>, 'class'>

  export type AlertProps = WithoutChildren<AlertDialog.RootProps> & {
    title: string
    description: string
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
              'shrink-0 flex-1 min-w-10 min-h-10 flex items-center justify-center gap-2 p-2 font-medium rounded-sm outline-none',
              'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
              'cursor-pointer disabled:cursor-not-allowed',
              'disabled:opacity-40',
              'bg-zinc-800/50 not-disabled:hover:bg-zinc-800/70 inset-ring-zinc-800 ring-zinc-800',
              't-light:bg-zinc-300/50 t-light:not-disabled:hover:bg-zinc-300/70 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
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
              'shrink-0 flex-1 min-w-10 min-h-10 flex items-center justify-center gap-2 p-2 font-medium rounded-sm outline-none',
              'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
              'cursor-pointer disabled:cursor-not-allowed',
              'disabled:opacity-40',
              'text-green-500 not-disabled:hover:text-green-200 bg-green-800/30 not-disabled:hover:bg-green-800/70 inset-ring-green-800 ring-green-800',
              't-light:text-green-500 t-light:not-disabled:hover:text-green-800 t-light:bg-green-300/30 t-light:not-disabled:hover:bg-green-300/70 t-light:inset-ring-green-300 t-light:ring-green-300'
            ]}
          >
            Accept
          </AlertDialog.Action>
        </FlexContainer>
      </FlexContainer>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>
