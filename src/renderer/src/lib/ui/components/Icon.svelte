<script lang="ts">
  import Icon from '@iconify/svelte'
  import type { WithoutChildren } from 'bits-ui'
  import type { HTMLAttributes } from 'svelte/elements'

  type IconProps = WithoutChildren<HTMLAttributes<HTMLSpanElement>> & {
    icon: string
  }

  let { icon, ...restProps }: IconProps = $props()
</script>

<span {...restProps}>
  <Icon {icon} />
</span>
