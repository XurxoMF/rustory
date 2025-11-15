<script lang="ts">
  import { Dialog, type WithoutChildren, type WithoutChildrenOrChild } from 'bits-ui'

  import Button from '@renderer/lib/ui/components/Button.svelte'
  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'

  type AlertProps = WithoutChildren<Dialog.RootProps> & {
    title: string
    description: string
    onaccept?: (() => void | Promise<void>) | undefined
    oncancel?: (() => void | Promise<void>) | undefined
    overlayProps?: Omit<WithoutChildrenOrChild<Dialog.OverlayProps>, 'class'> | undefined
    contentProps?: Omit<WithoutChildrenOrChild<Dialog.ContentProps>, 'class'> | undefined
    titleProps?: Omit<WithoutChildrenOrChild<Dialog.TitleProps>, 'class'> | undefined
    descriptionProps?: Omit<WithoutChildrenOrChild<Dialog.DescriptionProps>, 'class'> | undefined
  }

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
        'absolute top-0 left-0 z-100 w-screen h-screen backdrop-blur-xs transition-all',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
      ]}
      {...overlayProps}
    />

    <Dialog.Content
      class={[
        'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-100 w-1/4 h-fit max-h-screen flex flex-col gap-4 p-8 rounded-md shadow-xl outline-none transition-all',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'inset-ring-2',
        't-dark:bg-zinc-900/95 t-dark:inset-ring-zinc-800'
      ]}
      {...contentProps}
    >
      <Dialog.Title class="text-2xl font-bold" {...titleProps}>{title}</Dialog.Title>

      <Dialog.Description class="text-zinc-200/50 mb-4" {...descriptionProps}>
        {description}
      </Dialog.Description>

      <FlexContainer>
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
