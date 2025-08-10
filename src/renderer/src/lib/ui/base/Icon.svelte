<script lang="ts">
  import Icon from '@iconify/svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  type IconProps = HTMLAttributes<HTMLSpanElement> & {
    icon: string
  }

  let { icon, ...restProps }: IconProps = $props()
</script>

<span {...restProps}>
  <Icon {icon} />
</span>
