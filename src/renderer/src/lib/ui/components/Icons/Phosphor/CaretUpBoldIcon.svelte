<script lang="ts">
  import type { WithoutChildren } from 'bits-ui'

  import BaseIcon, { type BaseIconProps } from '../BaseIcon.svelte'

  let { ...restProps }: WithoutChildren<BaseIconProps> = $props()
</script>

<BaseIcon {...restProps}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" class="w-[1em] h-[1em]">
    <path fill="currentColor" d="M216.49 168.49a12 12 0 0 1-17 0L128 97l-71.51 71.49a12 12 0 0 1-17-17l80-80a12 12 0 0 1 17 0l80 80a12 12 0 0 1 0 17" />
  </svg>
</BaseIcon>
