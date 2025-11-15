<script lang="ts">
  import { Dialog, type WithoutChildrenOrChild } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'

  type DialogProps = Dialog.RootProps & {
    title: string
    description: string
    overlayProps?: Omit<WithoutChildrenOrChild<Dialog.OverlayProps>, 'class'>
    contentProps?: Omit<WithoutChildrenOrChild<Dialog.ContentProps>, 'class'>
    titleProps?: Omit<WithoutChildrenOrChild<Dialog.TitleProps>, 'class'>
    descriptionProps?: Omit<WithoutChildrenOrChild<Dialog.DescriptionProps>, 'class'>
  }

  let { open = $bindable(false), title, description, children, overlayProps, contentProps, titleProps, descriptionProps, ...restProps }: DialogProps = $props()
</script>

<Dialog.Root bind:open {...restProps}>
  <Dialog.Portal to="#portal">
    <Dialog.Overlay
      class={[
        'absolute top-0 z-50 w-screen h-screen backdrop-blur-xs transition-all',
        't-dark:bg-zinc-850/20',
        't-light:bg-zinc-100/20',
        't-rust:bg-rust-850/20',
        't-midnight:bg-gray-850/20'
      ]}
      {...overlayProps}
    />

    <Dialog.Content
      class={[
        'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[50vw] max-w-100 h-screen p-2 z-100',
        'rounded-md border shadow/30 transition-all',
        't-dark:bg-zinc-850 t-dark:border-zinc-800',
        't-light:bg-zinc-100 t-light:border-zinc-300',
        't-rust:bg-rust-850 t-rust:border-rust-800',
        't-midnight:bg-gray-850 t-midnight:border-gray-800'
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
