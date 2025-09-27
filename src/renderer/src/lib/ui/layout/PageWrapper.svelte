<script lang="ts">
  import { type Snippet } from 'svelte'
  import { fade } from 'svelte/transition'

  import { ScrollableContainer } from '@renderer/lib/ui/layout/Containers'

  type PageWrapperProps = {
    children: Snippet<[]>
    scrollable?: boolean | undefined
  }

  let { children, scrollable = true }: PageWrapperProps = $props()

  const ANIMATION_DURATION: number = 100
</script>

<div class="w-full h-full" in:fade={{ duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 1.5 }} out:fade={{ duration: ANIMATION_DURATION }}>
  {#if scrollable}
    <ScrollableContainer orientation="vertical">
      <div class="w-full p-3">
        {@render children()}
      </div>
    </ScrollableContainer>
  {:else}
    <div class="w-full h-full p-3">
      {@render children()}
    </div>
  {/if}
</div>
