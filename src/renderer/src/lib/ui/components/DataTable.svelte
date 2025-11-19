<script lang="ts" module>
  export type DataTableColumn<T extends DataTableRequiredRowFileds, K extends keyof T> = {
    key: K
    label: string
    format: (value: T) => string
    sort?: ((a: T, b: T) => number) | undefined
  }

  export type DataTableColumns<T extends DataTableRequiredRowFileds> = DataTableColumn<T, keyof T>[]

  export type DataTableRequiredRowFileds = {
    id: string
  }

  export type DataTableRow<T extends DataTableRequiredRowFileds> = T

  export type DataTableRows<T extends DataTableRequiredRowFileds> = DataTableRow<T>[]

  export type DataTableProps<T extends DataTableRequiredRowFileds> = {
    columns: DataTableColumns<T>
    rows: DataTableRows<T>
    selectable?: boolean | undefined
    selected?: DataTableRows<T> | undefined
  }
</script>

<script lang="ts" generics="T extends DataTableRequiredRowFileds">
  import ScrollableContainer from '@renderer/lib/ui/layout/ScrollableContainer.svelte'
  import { PHSortAscendingBoldIcon, PHSortDescendingIcon, PHListBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'
  import Checkbox from '@renderer/lib/ui/components/Checkbox.svelte'

  let { columns, rows, selectable = false, selected = $bindable([]) }: DataTableProps<T> = $props()

  let sortColumn: DataTableColumn<T, keyof T> | null = $state(null)
  let sortDirection: 'asc' | 'desc' | null = $state(null)

  let sortedRows: DataTableRow<T>[] = $derived.by(() => {
    const col = sortColumn
    const dir = sortDirection

    if (!col || !dir) return rows

    const sort = col.sort

    if (!sort) return rows

    return [...rows].sort((a, b) => {
      return sort(a, b) * (sortDirection === 'asc' ? 1 : -1)
    })
  })

  function handleSort(column: DataTableColumn<T, keyof T>) {
    if (sortColumn && sortColumn.key === column.key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      sortColumn = column
      sortDirection = 'asc'
    }
  }

  function toggleRow(row: DataTableRow<T>) {
    if (selected.some((s) => s.id === row.id)) {
      selected = selected.filter((s) => s.id !== row.id)
    } else {
      selected = [...selected, row]
    }
  }

  function toggleAll() {
    if (selected.length === rows.length) {
      selected = []
    } else {
      selected = [...rows]
    }
  }
</script>

<ScrollableContainer orientation="horizontal">
  <table class={['w-full overflow-hidden rounded-sm divide-y-2', 'divide-zinc-800', 't-light:divide-zinc-300']}>
    <thead class={['divide-y', 'divide-zinc-800', 't-light:divide-zinc-300']}>
      <tr class={['hover:bg-zinc-800/70', 't-light:hover:bg-zinc-300/70']}>
        {#if selectable}
          <th class={['w-px text-start p-2 whitespace-nowrap']}>
            <Checkbox checked={selected.length === rows.length} onCheckedChange={toggleAll} />
          </th>
        {/if}
        {#each columns as col (col.key)}
          <th class={['text-start p-2 whitespace-nowrap']}>
            {#if col.sort}
              <button
                type="button"
                onclick={() => handleSort(col)}
                class={[
                  'flex items-center justify-center gap-2 rounded-sm outline-none',
                  'focus-visible:inset-ring-1 focus-visible:ring-2',
                  'cursor-pointer disabled:cursor-not-allowed',
                  'disabled:opacity-40',
                  'inset-ring-zinc-800 ring-zinc-800',
                  't-light:inset-ring-zinc-300 t-light:ring-zinc-300'
                ]}
              >
                <span>{col.label}</span>

                {#if sortColumn?.key === col.key}
                  {#if sortDirection === 'asc'}
                    <PHSortAscendingBoldIcon />
                  {:else}
                    <PHSortDescendingIcon />
                  {/if}
                {:else}
                  <PHListBoldIcon class="text-current/50" />
                {/if}
              </button>
            {:else}
              {col.label}
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class={['divide-y', 'divide-zinc-800', 't-light:divide-zinc-300']}>
      {#each sortedRows as row (row.id)}
        <tr
          data-selected={selected.some((s) => s.id === row.id)}
          class={['data-[selected=true]:bg-zinc-800 hover:bg-zinc-800/70', 't-light:data-[selected=true]:bg-zinc-300 t-light:hover:bg-zinc-300/70']}
        >
          {#if selectable}
            <td class={['w-px text-start p-2 whitespace-nowrap']}>
              <Checkbox checked={selected.some((s) => s.id === row.id)} onCheckedChange={() => toggleRow(row)} />
            </td>
          {/if}
          {#each columns as col (col.key)}
            <td class={['text-start p-2 whitespace-nowrap']}>
              {col.format(row)}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</ScrollableContainer>
