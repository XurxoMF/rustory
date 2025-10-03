<script lang="ts">
  import { DropdownMenu, type WithoutChild } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { StyledContainer, StaticContainer } from '@renderer/lib/ui/layout/Containers'

  type Props = Omit<DropdownMenu.RootProps, 'class'> & {
    items: { label: string; value: string; onselect: () => void | Promise<void>; icon: string; disabled?: boolean | undefined }[]
    contentProps?: Omit<WithoutChild<DropdownMenu.ContentProps>, 'class'>
  }

  let { open = $bindable(false), items, contentProps, ...restProps }: Props = $props()
</script>

<DropdownMenu.Root bind:open {...restProps}>
  <DropdownMenu.Trigger
    class={[
      'h-7 w-fit flex items-center justify-center rounded-md p-1 transition-[opacity] duration-200',
      'focus:outline-2',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-50',
      't-dark:focus:outline-zinc-750',
      't-light:focus:outline-zinc-250',
      't-rust:focus:outline-rust-750',
      't-midnight:focus:outline-gray-750'
    ]}
  >
    <Icon icon="ph:dots-three-bold" class="text-xl" />
  </DropdownMenu.Trigger>

  <DropdownMenu.Portal to="#portal">
    <DropdownMenu.Content class="min-w-48" sideOffset={4} {...contentProps}>
      <StyledContainer>
        <StaticContainer>
          <DropdownMenu.Group>
            {#each items as { label, value, onselect, disabled, icon }}
              <DropdownMenu.Item
                class={[
                  'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-[opacity] duration-200',
                  'outline-none',
                  'cursor-pointer disabled:cursor-not-allowed',
                  'disabled:opacity-50',
                  't-dark:focus:bg-zinc-800',
                  't-light:focus:bg-zinc-200',
                  't-rust:focus:bg-rust-800',
                  't-midnight:focus:bg-gray-800'
                ]}
                onSelect={onselect}
                {disabled}
                textValue={value}
              >
                <Icon {icon} />
                <span>{label}</span>
              </DropdownMenu.Item>
            {/each}
          </DropdownMenu.Group>
        </StaticContainer>
      </StyledContainer>

      <DropdownMenu.Arrow class={['t-dark:text-zinc-750', 't-light:text-zinc-250', 't-rust:text-rust-750', 't-midnight:text-gray-750']} />
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
