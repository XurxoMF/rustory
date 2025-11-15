<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export type DialogOverlayProps = Omit<WithoutChildrenOrChild<Dialog.OverlayProps>, 'class'>

  export type DialogContentProps = Omit<WithoutChildrenOrChild<Dialog.ContentProps>, 'class'>

  export type DialogTitleProps = Omit<WithoutChildrenOrChild<Dialog.TitleProps>, 'class'>

  export type DialogDescriptionProps = Omit<WithoutChildrenOrChild<Dialog.DescriptionProps>, 'class'>

  export type DialogProps = Dialog.RootProps & {
    title: string
    description: string
    overlayProps?: DialogOverlayProps | undefined
    contentProps?: DialogContentProps | undefined
    titleProps?: DialogTitleProps | undefined
    descriptionProps?: DialogDescriptionProps | undefined
  }
</script>

<script lang="ts">
  import { Dialog } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'

  let { open = $bindable(false), title, description, children, overlayProps, contentProps, titleProps, descriptionProps, ...restProps }: DialogProps = $props()
</script>

<Dialog.Root bind:open {...restProps}>
  <Dialog.Portal to="#portal">
    <Dialog.Overlay class={['absolute top-0 z-50 w-screen h-screen backdrop-blur-xs transition-all', 'bg-zinc-850/20']} {...overlayProps} />

    <Dialog.Content
      class={[
        'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[50vw] max-w-100 h-screen p-2 z-100',
        'rounded-md border shadow-xl transition-all',
        'bg-zinc-850 border-zinc-800'
      ]}
      {...contentProps}
    >
      <div class="w-full flex items-center justify-between gap-2">
        <Dialog.Title {...titleProps}>{title}</Dialog.Title>

        <Button tabindex={-1} onclick={() => (open = false)}>
          <Icon icon="ph:x" class="opacity-40" />
        </Button>
      </div>

      <Dialog.Description class="opacity-40 mb-2" {...descriptionProps}>
        {description}
      </Dialog.Description>

      {@render children?.()}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
