<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export const SHEET_WIDTH_CLASSES = {
    sm: ['w-1/6'],
    base: ['w-2/6'],
    lg: ['w-3/6'],
    xl: ['w-4/6'],
    full: ['w-full']
  } as const

  export type SheetWidthClasses = keyof typeof SHEET_WIDTH_CLASSES

  export type SheetOverlayProps = Omit<WithoutChildrenOrChild<Dialog.OverlayProps>, 'class'>

  export type SheetContentProps = Omit<WithoutChildrenOrChild<Dialog.ContentProps>, 'class'>

  export type SheetTitleProps = Omit<WithoutChildrenOrChild<Dialog.TitleProps>, 'class'>

  export type SheetDescriptionProps = Omit<WithoutChildrenOrChild<Dialog.DescriptionProps>, 'class'>

  export type SheetProps = Dialog.RootProps & {
    title: string
    description: string
    width?: SheetWidthClasses | undefined
    overlayProps?: SheetOverlayProps | undefined
    contentProps?: SheetContentProps | undefined
    titleProps?: SheetTitleProps | undefined
    descriptionProps?: SheetDescriptionProps | undefined
  }
</script>

<script lang="ts">
  import { Dialog } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import FlexContainer from '@renderer/lib/ui/layout/Flex/FlexContainer.svelte'

  let {
    open = $bindable(false),
    title,
    description,
    width = 'base',
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
        'absolute top-0 left-0 z-100 w-screen h-screen backdrop-blur-xs transition-colors',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
      ]}
      {...overlayProps}
    />

    <Dialog.Content
      class={[
        'absolute top-0 right-0 z-100 h-full flex flex-col gap-4 p-8 shadow-xl outline-none @container',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right-10',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-10',
        'border-l-2',
        'bg-zinc-900/95 border-zinc-800',
        ...SHEET_WIDTH_CLASSES[width]
      ]}
      {...contentProps}
    >
      <FlexContainer gap="base" alignX="between">
        <Dialog.Title class="text-2xl font-bold" {...titleProps}>{title}</Dialog.Title>

        <Button mode="transparent">
          <Icon icon="ph:x-bold" class="text-current/50" />
        </Button>
      </FlexContainer>

      <Dialog.Description class="text-current/50 mb-4" {...descriptionProps}>
        {description}
      </Dialog.Description>

      {@render children?.()}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
