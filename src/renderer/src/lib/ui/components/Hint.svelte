<script lang="ts" module>
  import type { Snippet } from 'svelte'

  import { PHCheckCircleBoldIcon, PHInfoBoldIcon, PHProhibitedBoldIcon, PHWarningBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

  export type HintModes = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

  export const HINT_ICON_CLASSES = {
    neutral: PHInfoBoldIcon,
    info: PHInfoBoldIcon,
    success: PHCheckCircleBoldIcon,
    warning: PHWarningBoldIcon,
    danger: PHProhibitedBoldIcon
  } as const

  export type HintProps = {
    title: string
    description: string
    children?: Snippet | undefined
    mode?: HintModes | undefined
  }
</script>

<script lang="ts">
  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'
  import { P, H4 } from '@renderer/lib/ui/components/Fonts'

  let { title, description, children, mode = 'info' }: HintProps = $props()
</script>

<FlexContainer {mode} direction="col" padding="base" gap="base">
  <FlexContainer direction="col" gap="xs">
    <FlexContainer gap="sm">
      {@const Icon = HINT_ICON_CLASSES[mode]}
      <Icon class="text-2xl" />
      <H4>{title}</H4>
    </FlexContainer>

    <FlexContainer gap="sm" direction="col" isBreakpoint>
      <P fat>{description}</P>
    </FlexContainer>
  </FlexContainer>
  {@render children?.()}
</FlexContainer>
