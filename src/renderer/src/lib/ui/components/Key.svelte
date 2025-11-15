<script lang="ts" module>
  export type KeyProps = {
    key: string
  }
</script>

<script lang="ts">
  let { key }: KeyProps = $props()
</script>

<kbd
  class={[
    key.length > 1 ? 'w-fit' : 'w-5',
    'h-5 flex items-center justify-center text-xs p-1 rounded-md border border-b-3 shadow-xl transition-all',
    'bg-zinc-850 border-zinc-800',
    't-light:bg-zinc-100 t-light:border-zinc-300',
    't-rust:bg-rust-850 t-rust:border-rust-800',
    't-midnight:bg-gray-850 t-midnight:border-gray-800'
  ]}
>
  {key}
</kbd>
