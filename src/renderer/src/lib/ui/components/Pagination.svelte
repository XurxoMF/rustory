<script lang="ts">
  import { Pagination, type WithoutChildrenOrChild } from 'bits-ui'
  import type { HTMLAttributes } from 'svelte/elements'

  import { m } from '@renderer/paraglide/messages'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  type PaginationProps = Omit<WithoutChildrenOrChild<Pagination.RootProps>, 'class'> & {
    resume?: boolean | undefined
    prevButtonProps?: Omit<WithoutChildrenOrChild<Pagination.PrevButtonProps>, 'class'> | undefined
    ellipsisProps?: Omit<WithoutChildrenOrChild<HTMLAttributes<HTMLDivElement>>, 'class'> | undefined
    pageProps?: Omit<WithoutChildrenOrChild<Pagination.PageProps>, 'class'> | undefined
    nextButtonProps?: Omit<WithoutChildrenOrChild<Pagination.NextButtonProps>, 'class'> | undefined
  }

  let {
    page = $bindable(),
    siblingCount = 1,
    resume = true,
    prevButtonProps,
    ellipsisProps,
    pageProps,
    nextButtonProps,
    ...restProps
  }: PaginationProps = $props()
</script>

<Pagination.Root bind:page {siblingCount} {...restProps}>
  {#snippet children({ pages, range })}
    <div class="w-full flex flex-col items-center justify-center gap-1">
      <div class="flex items-center justify-center gap-1">
        <Pagination.PrevButton
          class={[
            'h-9 w-9 flex items-center justify-center shrink-0 p-1 rounded-md transition-opacity',
            'focus-visible:outline-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'disabled:opacity-40',
            't-dark:not-disabled:hover:bg-zinc-800 t-dark:focus-visible:outline-zinc-800',
            't-light:not-disabled:hover:bg-zinc-200 t-light:focus-visible:outline-zinc-300',
            't-rust:not-disabled:hover:bg-rust-800 t-rust:focus-visible:outline-rust-750',
            't-midnight:not-disabled:hover:bg-gray-800 t-midnight:focus-visible:outline-gray-750'
          ]}
          {...prevButtonProps}
        >
          <Icon icon="ph:caret-left" />
        </Pagination.PrevButton>

        {#each pages as page (page.key)}
          {#if page.type === 'ellipsis'}
            <div class={['h-9 w-9 flex items-center justify-center shrink-0 p-1 rounded-md']} {...ellipsisProps}>...</div>
          {:else}
            <Pagination.Page
              {page}
              class={[
                'h-9 w-9 flex items-center justify-center shrink-0 p-1 rounded-md transition-opacity',
                'focus-visible:outline-2',
                'cursor-pointer disabled:cursor-not-allowed',
                'disabled:opacity-40',
                't-dark:not-disabled:hover:bg-zinc-800 t-dark:data-selected:bg-zinc-750 t-dark:focus-visible:outline-zinc-800',
                't-light:not-disabled:hover:bg-zinc-200 t-light:data-selected:bg-zinc-300 t-light:focus-visible:outline-zinc-300',
                't-rust:not-disabled:hover:bg-rust-800 t-rust:data-selected:bg-rust-750 t-rust:focus-visible:outline-rust-750',
                't-midnight:not-disabled:hover:bg-gray-800 t-midnight:data-selected:bg-gray-750 t-midnight:focus-visible:outline-gray-750'
              ]}
              {...pageProps}
            >
              {page.value}
            </Pagination.Page>
          {/if}
        {/each}

        <Pagination.NextButton
          class={[
            'h-9 w-9 flex items-center justify-center shrink-0 p-1 rounded-md transition-opacity',
            'focus-visible:outline-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'disabled:opacity-40',
            't-dark:not-disabled:hover:bg-zinc-800 t-dark:focus-visible:outline-zinc-800',
            't-light:not-disabled:hover:bg-zinc-200 t-light:focus-visible:outline-zinc-300',
            't-rust:not-disabled:hover:bg-rust-800 t-rust:focus-visible:outline-rust-750',
            't-midnight:not-disabled:hover:bg-gray-800t-midnight:focus-visible:outline-gray-750'
          ]}
          {...nextButtonProps}
        >
          <Icon icon="ph:caret-right" />
        </Pagination.NextButton>
      </div>

      {#if resume}
        <p class={['text-sm opacity-40']}>
          {m.common__showing()}
          {range.start} - {range.end}
        </p>
      {/if}
    </div>
  {/snippet}
</Pagination.Root>
