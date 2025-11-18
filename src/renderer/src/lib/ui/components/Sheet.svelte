<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export const SHEET_WIDTH_CLASSES = {
    xs: ['w-1/5'],
    sm: ['w-2/6'],
    base: ['w-2/5'],
    lg: ['w-3/6'],
    xl: ['w-3/5'],
    full: ['w-full']
  } as const

  export type SheetWidthClasses = keyof typeof SHEET_WIDTH_CLASSES

  export type SheetOverlayProps = WithoutKeys<WithoutChildrenOrChild<Dialog.OverlayProps>, 'class'>

  export type SheetContentProps = WithoutKeys<WithoutChildrenOrChild<Dialog.ContentProps>, 'class'>

  export type SheetTitleProps = WithoutKeys<WithoutChildrenOrChild<Dialog.TitleProps>, 'class'>

  export type SheetDescriptionProps = WithoutKeys<WithoutChildrenOrChild<Dialog.DescriptionProps>, 'class'>

  export type SheetProps = Dialog.RootProps & {
    title: string
    description: string
    onclose?: (() => void | Promise<void>) | undefined
    width?: SheetWidthClasses | undefined
    overlayProps?: SheetOverlayProps | undefined
    contentProps?: SheetContentProps | undefined
    titleProps?: SheetTitleProps | undefined
    descriptionProps?: SheetDescriptionProps | undefined
  }
</script>

<script lang="ts">
  import { Dialog } from 'bits-ui'

  import { MainWindow } from '@renderer/lib/classes/MainWindow.svelte'

  import Button from '@renderer/lib/ui/components/Button.svelte'
  import FlexContainer from '@renderer/lib/ui/layout/Flex/FlexContainer.svelte'
  import { PHXBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

  let {
    open = $bindable(false),
    title,
    description,
    /**
     * Executed when the user closes the dialog WITH THE CLOSE BUTTON ONLY!
     * Use contentProps.onEscapeKeydown and contentProps.onInteractOutside to handle closing with those actions.
     */
    onclose,
    width = 'sm',
    children,
    overlayProps,
    contentProps,
    titleProps,
    descriptionProps,
    ...restProps
  }: SheetProps = $props()
</script>

<Dialog.Root bind:open {...restProps}>
  <Dialog.Portal to="#portal">
    <Dialog.Overlay
      class={[
        'absolute top-0 left-0 z-100 w-screen h-screen backdrop-blur-xs transition-all',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        MainWindow.instance && !MainWindow.instance.maximized && !MainWindow.instance.fullscreened && 'rounded-md'
      ]}
      {...overlayProps}
    />

    <Dialog.Content
      class={[
        'absolute top-0 right-0 z-100 h-full shadow-xl outline-none @container',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right-10',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-10',
        'bg-zinc-900/95 border-zinc-800',
        't-light:bg-zinc-100/95 t-light:border-zinc-300',
        width !== 'full' && 'border-l-2',
        ...SHEET_WIDTH_CLASSES[width],
        MainWindow.instance && !MainWindow.instance.maximized && !MainWindow.instance.fullscreened && 'rounded-r-md'
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
