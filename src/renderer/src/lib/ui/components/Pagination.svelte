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

  import Icon from '@renderer/lib/ui/components/Icon.svelte'
  import P from '@renderer/lib/ui/components/P.svelte'
  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'

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
            'shrink-0 min-w-9 min-h-9 flex items-center justify-center p-2 leading-tight font-medium rounded-sm outline-none transition-colors',
            'focus-visible:inset-ring-1 focus-visible:ring-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'disabled:opacity-40',
            'not-disabled:hover:bg-zinc-800 data-selected:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
          ]}
          {...prevButtonProps}
        >
          <Icon icon="ph:caret-left-bold" />
        </Pagination.PrevButton>

        {#each pages as page (page.key)}
          {#if page.type === 'ellipsis'}
            <div class={['h-9 w-9 flex items-center justify-center shrink-0 p-1 rounded-md']} {...ellipsisProps}>...</div>
          {:else}
            <Pagination.Page
              {page}
              class={[
                'shrink-0 min-w-9 min-h-9 flex items-center justify-center p-2 leading-tight font-medium rounded-sm outline-none transition-colors',
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
            'shrink-0 min-w-9 min-h-9 flex items-center justify-center p-2 leading-tight font-medium rounded-sm outline-none transition-colors',
            'focus-visible:inset-ring-1 focus-visible:ring-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'disabled:opacity-40',
            'not-disabled:hover:bg-zinc-800 data-selected:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
          ]}
          {...nextButtonProps}
        >
          <Icon icon="ph:caret-right-bold" />
        </Pagination.NextButton>
      </FlexContainer>

      {#if resume}
        <P mode="secondary">{m.common__showing()} {range.start} - {range.end}</P>
      {/if}
    </FlexContainer>
  {/snippet}
</Pagination.Root>
