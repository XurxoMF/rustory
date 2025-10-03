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
        'h-5 flex items-center justify-center text-xs p-1 rounded-md border border-b-3 transition-[border,background-color] duration-200',
        't-dark:bg-zinc-850 t-dark:border-zinc-750',
        't-light:bg-zinc-100 t-light:border-zinc-300',
        't-rust:bg-rust-850 t-rust:border-rust-750',
        't-midnight:bg-gray-850 t-midnight:border-gray-750'
      ]}
    >
      {key}
    </kbd>
  {/each}
</div>
