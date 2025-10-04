<script lang="ts">
  import { Pagination } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  type PaginationProps = {
    page: number
    count: number
    perPage: number
  }

  let { page = $bindable(), count, perPage }: PaginationProps = $props()
</script>

<Pagination.Root bind:page {count} {perPage} siblingCount={1}>
  {#snippet children({ pages, range })}
    <div class="w-full flex flex-col items-center justify-center gap-1">
      <div class="flex items-center justify-center gap-1">
        <Pagination.PrevButton
          class={[
            'h-9 w-9 flex items-center justify-center shrink-0 p-1 rounded-md transition-[opacity] duration-200',
            'focus-visible:outline-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'disabled:opacity-40',
            't-dark:not-disabled:hover:bg-zinc-800 t-dark:focus-visible:outline-zinc-750',
            't-light:not-disabled:hover:bg-zinc-200 t-light:focus-visible:outline-zinc-300',
            't-rust:not-disabled:hover:bg-rust-800 t-rust:focus-visible:outline-rust-750',
            't-midnight:not-disabled:hover:bg-gray-800 t-midnight:focus-visible:outline-gray-750'
          ]}
        >
          <Icon icon="ph:caret-left" />
        </Pagination.PrevButton>

        {#each pages as page (page.key)}
          {#if page.type === 'ellipsis'}
            <div class={['h-9 w-9 flex items-center justify-center shrink-0 p-1 rounded-md']}>...</div>
          {:else}
            <Pagination.Page
              {page}
              class={[
                'h-9 w-9 flex items-center justify-center shrink-0 p-1 rounded-md transition-[opacity] duration-200',
                'focus-visible:outline-2',
                'cursor-pointer disabled:cursor-not-allowed',
                'disabled:opacity-40',
                't-dark:not-disabled:hover:bg-zinc-800 t-dark:data-selected:bg-zinc-750 t-dark:focus-visible:outline-zinc-750',
                't-light:not-disabled:hover:bg-zinc-200 t-light:data-selected:bg-zinc-300 t-light:focus-visible:outline-zinc-300',
                't-rust:not-disabled:hover:bg-rust-800 t-rust:data-selected:bg-rust-750 t-rust:focus-visible:outline-rust-750',
                't-midnight:not-disabled:hover:bg-gray-800 t-midnight:data-selected:bg-gray-750 t-midnight:focus-visible:outline-gray-750'
              ]}
            >
              {page.value}
            </Pagination.Page>
          {/if}
        {/each}

        <Pagination.NextButton
          class={[
            'h-9 w-9 flex items-center justify-center shrink-0 p-1 rounded-md transition-[opacity] duration-200',
            'focus-visible:outline-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'disabled:opacity-40',
            't-dark:not-disabled:hover:bg-zinc-800 t-dark:focus-visible:outline-zinc-750',
            't-light:not-disabled:hover:bg-zinc-200 t-light:focus-visible:outline-zinc-300',
            't-rust:not-disabled:hover:bg-rust-800 t-rust:focus-visible:outline-rust-750',
            't-midnight:not-disabled:hover:bg-gray-800t-midnight:focus-visible:outline-gray-750'
          ]}
        >
          <Icon icon="ph:caret-right" />
        </Pagination.NextButton>
      </div>

      <p class={['text-sm opacity-40']}>
        Showing {range.start} - {range.end}
      </p>
    </div>
  {/snippet}
</Pagination.Root>
