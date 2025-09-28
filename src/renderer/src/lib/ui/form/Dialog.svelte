<script lang="ts">
  import { Dialog, type WithoutChild } from 'bits-ui'
  import { fade } from 'svelte/transition'
  import type { Snippet } from 'svelte'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { Button } from '@renderer/lib/ui/form/Buttons'
  import { StyledContainer, ScrollableContainer } from '@renderer/lib/ui/layout/Containers'

  type Props = Dialog.RootProps & {
    title: string
    description: Snippet
    contentProps?: Omit<WithoutChild<Dialog.ContentProps>, 'class'>
  }

  let { open = $bindable(false), children, contentProps, title, description, ...restProps }: Props = $props()
</script>

<Dialog.Root bind:open {...restProps}>
  <Dialog.Portal to="#portal">
    <Dialog.Overlay class={['absolute top-0 z-[100] w-screen h-screen', 't-dark:bg-zinc-900/80', 't-light:bg-zinc-100/80', 't-rust:bg-rust-900/80', 't-midnight:bg-gray-900/80']} forceMount>
      {#snippet child({ props })}
        {#if open}
          <div {...props} transition:fade={{ duration: 100 }}></div>
        {/if}
      {/snippet}
    </Dialog.Overlay>

    <Dialog.Content class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] max-w-1/2" {...contentProps} forceMount>
      {#snippet child({ props })}
        {#if open}
          <div {...props} transition:fade={{ duration: 100 }}>
            <StyledContainer>
              <ScrollableContainer orientation="vertical">
                {#snippet headerContent()}
                  <Dialog.Title><h1>{title}</h1></Dialog.Title>

                  <Button padding="none" onclick={() => (open = false)}>
                    <Icon icon="ph:x-bold" class="opacity-50" />
                  </Button>
                {/snippet}

                <Dialog.Description class="opacity-50 mb-2">
                  {@render description()}
                </Dialog.Description>

                {@render children?.()}
              </ScrollableContainer>
            </StyledContainer>
          </div>
        {/if}
      {/snippet}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
