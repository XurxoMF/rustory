<script lang="ts" module>
  import { type WithoutChildren, type WithoutChildrenOrChild } from 'bits-ui'

  export type AlertOverlayProps = Omit<WithoutChildrenOrChild<Dialog.OverlayProps>, 'class'>

  export type AlertContentProps = Omit<WithoutChildrenOrChild<Dialog.ContentProps>, 'class'>

  export type AlertTitleProps = Omit<WithoutChildrenOrChild<Dialog.TitleProps>, 'class'>

  export type AlertDescriptionProps = Omit<WithoutChildrenOrChild<Dialog.DescriptionProps>, 'class'>

  export type AlertProps = WithoutChildren<Dialog.RootProps> & {
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
  import { Dialog } from 'bits-ui'

  import Button from '@renderer/lib/ui/components/Button.svelte'
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
        'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-100 w-1/4 h-fit max-h-screen flex flex-col gap-4 p-8 rounded-md shadow-xl outline-none transition-colors @container',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'inset-ring-2',
        'bg-zinc-900/95 inset-ring-zinc-800'
      ]}
      {...contentProps}
    >
      <Dialog.Title class="text-2xl font-bold" {...titleProps}>{title}</Dialog.Title>

      <Dialog.Description class="text-current/50 mb-4" {...descriptionProps}>
        {description}
      </Dialog.Description>

      <FlexContainer gap="sm">
        <Button
          mode="neutral"
          width="flex-1"
          onclick={() => {
            open = false
            oncancel?.()
          }}
        >
          Cancel
        </Button>

        <Button
          mode="success"
          width="flex-1"
          onclick={() => {
            open = false
            onaccept?.()
          }}
        >
          Accept
        </Button>
      </FlexContainer>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
