<script lang="ts">
  import { type Snippet } from 'svelte'

  type GridContainerType = {
    children: Snippet<[]>
    columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined
  }

  let { children, columns = 1 }: GridContainerType = $props()
</script>

<div class="w-full @container">
  <div
    class={[
      'w-full grid grid-cols-1 gap-3',
      columns === 2 && '@3xl:grid-cols-2',
      columns === 3 && '@2xl:grid-cols-2 @6xl:grid-cols-3',
      columns === 4 && '@xl:grid-cols-2 @4xl:grid-cols-3 @8xl:grid-cols-4',
      columns === 5 && '@lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4 @9xl:grid-cols-5',
      columns === 6 && '@md:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 @8xl:grid-cols-6',
      columns === 7 && '@sm:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4 @6xl:grid-cols-5 @9xl:grid-cols-7'
    ]}
  >
    {@render children()}
  </div>
</div>
