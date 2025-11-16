<script lang="ts" module>
  import type { WithoutChildren } from 'bits-ui'
  import type { HTMLAttributes } from 'svelte/elements'

  export type IconProps = WithoutChildren<HTMLAttributes<HTMLSpanElement>> & {
    icon: string
  }
</script>

<script lang="ts">
  import Icon from '@iconify/svelte'

  let { icon, ...restProps }: IconProps = $props()
</script>

<span {...restProps}>
  <Icon {icon} />
</span>
