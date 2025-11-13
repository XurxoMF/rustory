<script lang="ts">
  import { Dialog, type WithoutChildren, type WithoutChildrenOrChild } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'

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

  let { open = $bindable(false), title, description, onaccept, oncancel, overlayProps, contentProps, titleProps, descriptionProps, ...restProps }: AlertProps = $props()
</script>

<Dialog.Root bind:open {...restProps}>
  <Dialog.Portal to="#portal">
    <Dialog.Overlay
      class={[
        'absolute top-0 z-50 w-screen h-screen backdrop-blur-xs transition-[background-color] duration-200',
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
        'rounded-md border shadow/20 transition-[border,background-color] duration-200',
        't-dark:bg-zinc-850 t-dark:border-zinc-750',
        't-light:bg-zinc-100 t-light:border-zinc-300',
        't-rust:bg-rust-850 t-rust:border-rust-750',
        't-midnight:bg-gray-850 t-midnight:border-gray-750'
      ]}
      {...contentProps}
    >
      <div class="w-full flex items-center justify-between gap-2">
        <Dialog.Title {...titleProps}>{title}</Dialog.Title>

        <Button
          tabindex={-1}
          onclick={() => {
            open = false
            oncancel?.()
          }}
        >
          <Icon icon="ph:x" class="opacity-40" />
        </Button>
      </div>

      <Dialog.Description class="opacity-40 mb-2" {...descriptionProps}>
        {description}
      </Dialog.Description>

      <div>
        <Button
          onclick={() => {
            open = false
            oncancel?.()
          }}
        >
          Cancel
        </Button>

        <Button
          onclick={() => {
            open = false
            onaccept?.()
          }}
        >
          Accept
        </Button>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
