<script lang="ts" module>
  import type { Component } from 'svelte'
  import type { IconProps } from '@renderer/lib/ui/components/Icons/BaseIcon.svelte'

  export const DATA_TABLE_BUTTON_MODE_CLASSES = {
    transparent: [
      'focus-visible:inset-ring-1 focus-visible:ring-2',
      'not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
      't-light:not-disabled:hover:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
    ],
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
      't-light:bg-zinc-300/50 t-light:not-disabled:hover:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
    ],
    info: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-blue-500 not-disabled:hover:text-blue-200 bg-blue-800/30 not-disabled:hover:bg-blue-800 inset-ring-blue-800 ring-blue-800',
      't-light:text-blue-500 t-light:not-disabled:hover:text-blue-800 t-light:bg-blue-300/30 t-light:not-disabled:hover:bg-blue-300 t-light:inset-ring-blue-300 t-light:ring-blue-300'
    ],
    success: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-green-500 not-disabled:hover:text-green-200 bg-green-800/30 not-disabled:hover:bg-green-800 inset-ring-green-800 ring-green-800',
      't-light:text-green-500 t-light:not-disabled:hover:text-green-800 t-light:bg-green-300/30 t-light:not-disabled:hover:bg-green-300 t-light:inset-ring-green-300 t-light:ring-green-300'
    ],
    warning: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-yellow-500 not-disabled:hover:text-yellow-200 bg-yellow-800/30 not-disabled:hover:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800',
      't-light:text-yellow-500 t-light:not-disabled:hover:text-yellow-800 t-light:bg-yellow-300/30 t-light:not-disabled:hover:bg-yellow-300 t-light:inset-ring-yellow-300 t-light:ring-yellow-300'
    ],
    danger: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-red-500 not-disabled:hover:text-red-200 bg-red-800/30 not-disabled:hover:bg-red-800 inset-ring-red-800 ring-red-800',
      't-light:text-red-500 t-light:not-disabled:hover:text-red-800 t-light:bg-red-300/30 t-light:not-disabled:hover:bg-red-300 t-light:inset-ring-red-300 t-light:ring-red-300'
    ]
  } as const

  export type DataTableButtonModeTypes = keyof typeof DATA_TABLE_BUTTON_MODE_CLASSES

  export type DataTableButton<T> = {
    icon?: Component<IconProps> | undefined
    label?: string | undefined
    mode?: DataTableButtonModeTypes | undefined
    onclick: (row: T) => void
  }

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
    buttons?: DataTableButton<T>[] | undefined
    selectable?: boolean | undefined
    selected?: DataTableRows<T> | undefined
  }
</script>

<script lang="ts" generics="T extends DataTableRequiredRowFileds">
  import ScrollableContainer from '@renderer/lib/ui/layout/ScrollableContainer.svelte'
  import { PHSortAscendingBoldIcon, PHSortDescendingIcon, PHListBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'
  import Checkbox from '@renderer/lib/ui/components/Checkbox.svelte'

  let { columns, rows, buttons = [], selectable = false, selected = $bindable([]) }: DataTableProps<T> = $props()

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
      <tr>
        {#if selectable}
          <th class={['w-px text-start p-2 whitespace-nowrap']}>
            <Checkbox checked={selected.length === rows.length} onCheckedChange={toggleAll} />
          </th>
        {/if}
        {#each columns as col (col.key)}
          <th class={['text-start px-1 py-2 whitespace-nowrap']}>
            {#if col.sort}
              <button
                type="button"
                onclick={() => handleSort(col)}
                class={[
                  'flex items-center justify-center gap-2 px-1 rounded-sm outline-none',
                  'focus-visible:inset-ring-1 focus-visible:ring-2',
                  'cursor-pointer disabled:cursor-not-allowed',
                  'disabled:opacity-40',
                  'inset-ring-zinc-800 ring-zinc-800',
                  't-light:inset-ring-zinc-300 t-light:ring-zinc-300'
                ]}
              >
                {col.label}

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
        {#if buttons.length > 0}
          <th class={['w-px text-start p-2 whitespace-nowrap']}>Actions</th>
        {/if}
      </tr>
    </thead>
    <tbody class={['divide-y', 'divide-zinc-800', 't-light:divide-zinc-300']}>
      {#each sortedRows as row (row.id)}
        <tr data-selected={selected.some((s) => s.id === row.id)} class={['data-[selected=true]:bg-zinc-800', 't-light:data-[selected=true]:bg-zinc-300']}>
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
          {#if buttons.length > 0}
            <td class={['flex items-center gap-2 p-2 text-start whitespace-nowrap']}>
              {#each buttons as button, i (row.id + i)}
                {@const Icon = button.icon}
                <button
                  type="button"
                  class={[
                    'shrink-0 min-w-6 min-h-6 flex items-center justify-center gap-1 p-1 leading-tight font-medium text-sm rounded-sm outline-none',
                    'cursor-pointer disabled:cursor-not-allowed',
                    'disabled:opacity-40',
                    ...DATA_TABLE_BUTTON_MODE_CLASSES[button.mode || 'neutral']
                  ]}
                  onclick={() => button.onclick?.(row)}
                >
                  {#if Icon}
                    <Icon />
                  {/if}
                  {button.label}
                </button>
              {/each}
            </td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</ScrollableContainer>
