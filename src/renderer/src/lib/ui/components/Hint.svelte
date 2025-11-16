<script lang="ts" module>
  import type { Snippet } from 'svelte'

  export type HintModes = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

  export const HINT_ICON_CLASSES = {
    neutral: 'ph:info-bold',
    info: 'ph:info-bold',
    success: 'ph:check-bold',
    warning: 'ph:warning-bold',
    danger: 'ph:prohibit-bold'
  } as const

  export type HintProps = {
    title: string
    description: string
    children?: Snippet | undefined
    mode?: HintModes
  }
</script>

<script lang="ts">
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'
  import H4 from '@renderer/lib/ui/components/H4.svelte'
  import P from '@renderer/lib/ui/components/P.svelte'

  let { title, description, children, mode = 'info' }: HintProps = $props()
</script>

<FlexContainer {mode} direction="col" padding="base" gap="sm">
  <FlexContainer gap="sm">
    <Icon icon={HINT_ICON_CLASSES[mode]} class="text-2xl" />
    <H4>{title}</H4>
  </FlexContainer>

  <FlexContainer gap="sm" direction="col">
    <P>{description}</P>
    {@render children?.()}
  </FlexContainer>
</FlexContainer>
