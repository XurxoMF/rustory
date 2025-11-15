<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export type SheetOverlayProps = Omit<WithoutChildrenOrChild<Dialog.OverlayProps>, 'class'>

  export type SheetContentProps = Omit<WithoutChildrenOrChild<Dialog.ContentProps>, 'class'>

  export type SheetTitleProps = Omit<WithoutChildrenOrChild<Dialog.TitleProps>, 'class'>

  export type SheetDescriptionProps = Omit<WithoutChildrenOrChild<Dialog.DescriptionProps>, 'class'>

  export type SheetProps = Dialog.RootProps & {
    title: string
    description: string
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

  let { open = $bindable(false), title, description, children, overlayProps, contentProps, titleProps, descriptionProps, ...restProps }: SheetProps = $props()
</script>

<Dialog.Root bind:open {...restProps}>
  <Dialog.Portal to="#portal">
    <Dialog.Overlay
      class={[
        'absolute top-0 z-50 w-screen h-screen backdrop-blur-xs transition-all',
        'bg-zinc-850/20',
        't-light:bg-zinc-100/20',
        't-rust:bg-rust-850/20',
        't-midnight:bg-gray-850/20'
      ]}
      {...overlayProps}
    />

    <Dialog.Content
      class={[
        'absolute top-1/2 -translate-y-1/2 right-0 w-[50vw] max-w-100 h-screen p-2 z-100',
        'rounded-md border shadow-xl transition-all',
        'bg-zinc-850 border-zinc-800',
        't-light:bg-zinc-100 t-light:border-zinc-300',
        't-rust:bg-rust-850 t-rust:border-rust-800',
        't-midnight:bg-gray-850 t-midnight:border-gray-800'
      ]}
      {...contentProps}
    >
      <!-- TODO: Fix all the content styles. -->

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
