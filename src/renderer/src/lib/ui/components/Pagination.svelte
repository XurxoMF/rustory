<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'
  import type { HTMLAttributes } from 'svelte/elements'

  export type PaginationPRevButtonProps = WithoutKeys<WithoutChildrenOrChild<Pagination.PrevButtonProps>, 'class'>

  export type PaginationEllipsisProps = WithoutKeys<WithoutChildrenOrChild<HTMLAttributes<HTMLDivElement>>, 'class'>

  export type PaginationPageProps = WithoutKeys<WithoutChildrenOrChild<Pagination.PageProps>, 'class'>

  export type PaginationNextButtonProps = WithoutKeys<WithoutChildrenOrChild<Pagination.NextButtonProps>, 'class'>

  export type PaginationProps = WithoutKeys<WithoutChildrenOrChild<Pagination.RootProps>, 'class'> & {
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

  import { P } from '@renderer/lib/ui/components/Fonts'
  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'
  import { PHCaretLeftBoldIcon, PHCaretRightBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

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
    <FlexContainer direction="col" gap="sm" alignX="center">
      <FlexContainer gap="sm">
        <Pagination.PrevButton
          class={[
            'shrink-0 min-w-10 min-h-10 flex items-center justify-center p-2 font-medium rounded-sm outline-none transition-all duration-200',
            'focus-visible:inset-ring-1 focus-visible:ring-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'disabled:opacity-40',
            'not-disabled:hover:bg-zinc-800 data-selected:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
            't-light:not-disabled:hover:bg-zinc-300 t-light:data-selected:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
          ]}
          {...prevButtonProps}
        >
          <PHCaretLeftBoldIcon />
        </Pagination.PrevButton>

        {#each pages as page (page.key)}
          {#if page.type === 'ellipsis'}
            <div class={['h-10 w-10 flex items-center justify-center shrink-0 p-1 rounded-md']} {...ellipsisProps}>...</div>
          {:else}
            <Pagination.Page
              {page}
              class={[
                'shrink-0 min-w-10 min-h-10 flex items-center justify-center p-2 font-medium rounded-sm outline-none transition-all duration-200',
                'focus-visible:inset-ring-1 focus-visible:ring-2',
                'cursor-pointer disabled:cursor-not-allowed',
                'disabled:opacity-40',
                'not-disabled:hover:bg-zinc-800 data-selected:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
                't-light:not-disabled:hover:bg-zinc-300 t-light:data-selected:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
              ]}
              {...pageProps}
            >
              {page.value}
            </Pagination.Page>
          {/if}
        {/each}

        <Pagination.NextButton
          class={[
            'shrink-0 min-w-10 min-h-10 flex items-center justify-center p-2 font-medium rounded-sm outline-none transition-all duration-200',
            'focus-visible:inset-ring-1 focus-visible:ring-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'disabled:opacity-40',
            'not-disabled:hover:bg-zinc-800 data-selected:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
            't-light:not-disabled:hover:bg-zinc-300 t-light:data-selected:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
          ]}
          {...nextButtonProps}
        >
          <PHCaretRightBoldIcon />
        </Pagination.NextButton>
      </FlexContainer>

      {#if resume}
        <P mode="secondary">{m.common__showing()} {range.start} - {range.end}</P>
      {/if}
    </FlexContainer>
  {/snippet}
</Pagination.Root>
