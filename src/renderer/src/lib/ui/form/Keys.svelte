<script lang="ts">
  type KeysProps = {
    keys: string[]
  }

  let { keys }: KeysProps = $props()
</script>

<div class="w-fit shrink-0 flex items-center justify-center gap-1 select-none">
  {#each keys as key (key)}
    <kbd
      class={[
        key.length > 1 ? 'w-fit' : 'w-5',
        'h-5 flex items-center justify-center text-xs p-1 rounded-md border-b-2',
        't-dark:bg-zinc-900 t-dark:border-b-zinc-700',
        't-light:bg-zinc-150 t-light:border-b-zinc-300',
        't-rust:bg-rust-900 t-rust:border-b-rust-700',
        't-midnight:bg-gray-900 t-midnight:border-b-gray-700'
      ]}
    >
      {key}
    </kbd>
  {/each}
</div>
