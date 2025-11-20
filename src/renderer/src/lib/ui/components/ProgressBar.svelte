<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export type ProgressBarModeTypes = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

  export const PROGRESS_BAR_ROOT_MODE_CLASSES: Record<ProgressBarModeTypes, string[]> = {
    neutral: ['bg-zinc-800/50 inset-ring-zinc-800', 't-light:bg-zinc-300/50 t-light:inset-ring-zinc-300'],
    info: ['bg-blue-800/30 inset-ring-blue-800', 't-light:bg-blue-300/30 t-light:inset-ring-blue-300'],
    success: ['bg-green-800/30 inset-ring-green-800', 't-light:bg-green-300/30 t-light:inset-ring-green-300'],
    warning: ['bg-yellow-800/30 inset-ring-yellow-800', 't-light:bg-yellow-300/30 t-light:inset-ring-yellow-300'],
    danger: ['bg-red-800/30 inset-ring-red-800', 't-light:bg-red-300/30 t-light:inset-ring-red-300']
  } as const

  export const PROGRESS_BAR_INNER_MODE_CLASSES: Record<ProgressBarModeTypes, string[]> = {
    neutral: ['bg-zinc-800', 't-light:bg-zinc-300'],
    info: ['bg-blue-800', 't-light:bg-blue-300'],
    success: ['bg-green-800', 't-light:bg-green-300'],
    warning: ['bg-yellow-800', 't-light:bg-yellow-300'],
    danger: ['bg-red-800', 't-light:bg-red-300']
  } as const

  export type ProgressBarProps = WithoutKeys<WithoutChildrenOrChild<Progress.RootProps>, 'class'> & {
    mode?: ProgressBarModeTypes | undefined
  }
</script>

<script lang="ts">
  import { Progress } from 'bits-ui'

  let { value = 0, mode = 'neutral', ...restProps }: ProgressBarProps = $props()
</script>

<Progress.Root {value} class={[['w-full h-2 rounded-full overflow-hidden shadow-xl', 'inset-ring-1', ...PROGRESS_BAR_ROOT_MODE_CLASSES[mode]]]} {...restProps}>
  <div
    class={['w-full h-full flex-1 rounded-full transition-transform', ...PROGRESS_BAR_INNER_MODE_CLASSES[mode]]}
    style={`transform: translateX(-${100 - (100 * (value ?? 0)) / 100}%)`}
  ></div>
</Progress.Root>
