<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'
  import type { HTMLAttributes } from 'svelte/elements'

  export type PaginationPRevButtonProps = Omit<WithoutChildrenOrChild<Pagination.PrevButtonProps>, 'class'>

  export type PaginationEllipsisProps = Omit<WithoutChildrenOrChild<HTMLAttributes<HTMLDivElement>>, 'class'>

  export type PaginationPageProps = Omit<WithoutChildrenOrChild<Pagination.PageProps>, 'class'>

  export type PaginationNextButtonProps = Omit<WithoutChildrenOrChild<Pagination.NextButtonProps>, 'class'>

  export type PaginationProps = Omit<WithoutChildrenOrChild<Pagination.RootProps>, 'class'> & {
    resume?: boolean | undefined
    prevButtonProps?: PaginationPRevButtonProps | undefined
    ellipsisProps?: PaginationEllipsisProps | undefined
    pageProps?: PaginationPageProps | undefined
    nextButtonProps?: PaginationNextButtonProps | undefined
  }
</script>

<script lang="ts">
  import { Pagination } from 'bits-ui'

  import { m } from '@renderer/paraglide/messages'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

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
            'shrink-0 min-w-9 min-h-9 flex items-center justify-center gap-2 p-2 leading-tight rounded-sm outline-none transition-colors',
            'focus-visible:inset-ring-1 focus-visible:ring-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'disabled:opacity-40',
            'not-disabled:hover:bg-zinc-800 data-selected:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
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
                'shrink-0 min-w-9 min-h-9 flex items-center justify-center gap-2 p-2 leading-tight rounded-sm outline-none transition-colors',
                'focus-visible:inset-ring-1 focus-visible:ring-2',
                'cursor-pointer disabled:cursor-not-allowed',
                'disabled:opacity-40',
                'not-disabled:hover:bg-zinc-800 data-selected:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
              ]}
              {...pageProps}
            >
              {page.value}
            </Pagination.Page>
          {/if}
        {/each}

        <Pagination.NextButton
          class={[
            'shrink-0 min-w-9 min-h-9 flex items-center justify-center gap-2 p-2 leading-tight rounded-sm outline-none transition-colors',
            'focus-visible:inset-ring-1 focus-visible:ring-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'disabled:opacity-40',
            'not-disabled:hover:bg-zinc-800 data-selected:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
          ]}
          {...nextButtonProps}
        >
          <Icon icon="ph:caret-right" />
        </Pagination.NextButton>
      </div>

      {#if resume}
        <p class={['text-current/50']}>
          {m.common__showing()}
          {range.start} - {range.end}
        </p>
      {/if}
    </div>
  {/snippet}
</Pagination.Root>
