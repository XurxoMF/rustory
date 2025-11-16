<script lang="ts">
  import { ScrollArea, type WithoutChild } from 'bits-ui'

  import H1 from '@renderer/lib/ui/components/H1.svelte'
  import P from '@renderer/lib/ui/components/P.svelte'

  type ScrollableProps = Omit<WithoutChild<ScrollArea.RootProps>, 'class' | 'title'> & {
    title: string
    description: string
  }

  let { ref = $bindable(null), title, description, children, ...restProps }: ScrollableProps = $props()
</script>

<div class="w-full h-full">
  <ScrollArea.Root bind:ref type="always" class="w-full h-full" {...restProps}>
    <ScrollArea.Viewport class="w-full h-full p-8 @container @container/page">
      <div class="flex flex-col gap-4 mb-8">
        <H1>{title}</H1>
        <P mode="secondary">{description}</P>
      </div>

      {@render children?.()}
    </ScrollArea.Viewport>

    <ScrollArea.Scrollbar orientation="vertical" class="w-1.5 flex p-px transition-colors">
      <ScrollArea.Thumb class={['flex-1 rounded-full transition-colors']} />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
</div>
