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

  export type DialogOverlayProps = Omit<WithoutChildrenOrChild<Dialog.OverlayProps>, 'class'>

  export type DialogContentProps = Omit<WithoutChildrenOrChild<Dialog.ContentProps>, 'class'>

  export type DialogTitleProps = Omit<WithoutChildrenOrChild<Dialog.TitleProps>, 'class'>

  export type DialogDescriptionProps = Omit<WithoutChildrenOrChild<Dialog.DescriptionProps>, 'class'>

  export type DialogProps = Dialog.RootProps & {
    title: string
    description: string
    width?: DialogWidthClasses | undefined
    overlayProps?: DialogOverlayProps | undefined
    contentProps?: DialogContentProps | undefined
    titleProps?: DialogTitleProps | undefined
    descriptionProps?: DialogDescriptionProps | undefined
  }
</script>

<script lang="ts">
  import { Dialog } from 'bits-ui'
  import FlexContainer from '../layout/Flex/FlexContainer.svelte'
  import Button from './Button.svelte'
  import Icon from './Icon.svelte'

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
  }: DialogProps = $props()
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
        'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-100 max-w-full h-fit max-h-full flex flex-col gap-4 p-8 rounded-md shadow-xl outline-none transition-colors @container',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'inset-ring-2',
        'bg-zinc-900/95 inset-ring-zinc-800',
        ...DIALOG_WIDTH_CLASSES[width]
      ]}
      {...contentProps}
    >
      <FlexContainer gap="base" alignX="between">
        <Dialog.Title class="text-2xl font-bold" {...titleProps}>{title}</Dialog.Title>

        <Button mode="transparent" onclick={() => (open = false)}>
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
