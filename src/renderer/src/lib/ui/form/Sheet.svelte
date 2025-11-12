<script lang="ts">
  import { Dialog, type WithoutChild } from 'bits-ui'
  import { fade, fly } from 'svelte/transition'
  import type { Snippet } from 'svelte'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { Button } from '@renderer/lib/ui/form/Buttons'
  import { StyledContainer, ScrollableContainer } from '@renderer/lib/ui/layout/Containers'

  type Props = Dialog.RootProps & {
    title: string
    description?: Snippet | undefined
    contentProps?: Omit<WithoutChild<Dialog.ContentProps>, 'class'>
  }

  let { open = $bindable(false), children, contentProps, title, description, ...restProps }: Props = $props()
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
      forceMount
    >
      {#snippet child({ props })}
        {#if open}
          <div {...props} transition:fade={{ duration: 100 }}></div>
        {/if}
      {/snippet}
    </Dialog.Overlay>

    <Dialog.Content class="absolute top-0 right-0 z-100 w-fit h-fit" {...contentProps} forceMount>
      {#snippet child({ props })}
        {#if open}
          <div {...props} transition:fly={{ duration: 200, x: 200 }}>
            <div class="w-[50vw] max-w-100 h-screen p-2 flex">
              <StyledContainer>
                <ScrollableContainer orientation="vertical">
                  {#snippet headerContent()}
                    <Dialog.Title><h1>{title}</h1></Dialog.Title>

                    <Button padding="icon" size="none" tabindex={-1} onclick={() => (open = false)}>
                      <Icon icon="ph:x" class="opacity-40" />
                    </Button>
                  {/snippet}

                  <div class="h-full w-full flex flex-col gap-2">
                    {#if description}
                      <Dialog.Description class="opacity-40 mb-2">
                        {@render description()}
                      </Dialog.Description>
                    {/if}

                    {@render children?.()}
                  </div>
                </ScrollableContainer>
              </StyledContainer>
            </div>
          </div>
        {/if}
      {/snippet}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
