<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export const DIALOG_WIDTH_CLASSES = {
    sm: ['w-1/5'],
    base: ['w-2/5'],
    lg: ['w-3/5'],
    xl: ['w-4/5'],
    full: ['w-full']
  } as const

  export type DialogWidthClasses = keyof typeof DIALOG_WIDTH_CLASSES

  export type DialogOverlayProps = WithoutKeys<WithoutChildrenOrChild<Dialog.OverlayProps>, 'class'>

  export type DialogContentProps = WithoutKeys<WithoutChildrenOrChild<Dialog.ContentProps>, 'class'>

  export type DialogTitleProps = WithoutKeys<WithoutChildrenOrChild<Dialog.TitleProps>, 'class'>

  export type DialogDescriptionProps = WithoutKeys<WithoutChildrenOrChild<Dialog.DescriptionProps>, 'class'>

  export type DialogProps = Dialog.RootProps & {
    title: string
    description: string
    onclose?: (() => void | Promise<void>) | undefined
    width?: DialogWidthClasses | undefined
    overlayProps?: DialogOverlayProps | undefined
    contentProps?: DialogContentProps | undefined
    titleProps?: DialogTitleProps | undefined
    descriptionProps?: DialogDescriptionProps | undefined
  }
</script>

<script lang="ts">
  import { Dialog } from 'bits-ui'

  import { MainWindow } from '@renderer/lib/classes/MainWindow.svelte'

  import FlexContainer from '@renderer/lib/ui/layout/Flex/FlexContainer.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import { PHXBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

  let {
    open = $bindable(true),
    title,
    description,
    /**
     * Executed when the user closes the dialog WITH THE CLOSE BUTTON ONLY!
     * Use contentProps.onEscapeKeydown and contentProps.onInteractOutside to handle closing with those actions.
     */
    onclose,
    width = 'base',
    children,
    overlayProps,
    contentProps,
    titleProps,
    descriptionProps,
    ...restProps
  }: DialogProps = $props()
</script>

<Dialog.Root bind:open {...restProps}>
  <Dialog.Portal to="#portal">
    <Dialog.Overlay
      class={[
        'absolute top-0 left-0 z-100 w-screen h-screen backdrop-blur-xs',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        MainWindow.instance && !MainWindow.instance.maximized && !MainWindow.instance.fullscreened && 'rounded-md'
      ]}
      {...overlayProps}
    />

    <Dialog.Content
      class={[
        'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-100 max-w-full h-fit max-h-full rounded-md shadow-xl outline-none @container',
        'inset-ring-2',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'bg-zinc-900/95 inset-ring-zinc-800',
        't-light:bg-zinc-100/95 t-light:inset-ring-zinc-300',
        ...DIALOG_WIDTH_CLASSES[width]
      ]}
      {...contentProps}
    >
      <FlexContainer direction="col" height="full" padding="xl" gap="xl">
        <FlexContainer direction="col" gap="xs">
          <FlexContainer gap="base" alignX="between">
            <Dialog.Title class="text-2xl font-bold" {...titleProps}>{title}</Dialog.Title>

            <Button
              mode="transparent"
              onclick={() => {
                open = false
                onclose?.()
              }}
            >
              <PHXBoldIcon class="text-current/50" />
            </Button>
          </FlexContainer>

          <Dialog.Description class="text-current/50" {...descriptionProps}>
            {description}
          </Dialog.Description>
        </FlexContainer>

        {@render children?.()}
      </FlexContainer>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
