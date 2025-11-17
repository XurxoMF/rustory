<script lang="ts">
  import type { WithoutChildren } from 'bits-ui'

  import BaseIcon, { type BaseIconProps } from '../BaseIcon.svelte'

  let { ...restProps }: WithoutChildren<BaseIconProps> = $props()
</script>

<BaseIcon {...restProps}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" class="w-[1em] h-[1em]">
    <path fill="currentColor" d="m232.49 80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183L215.51 63.51a12 12 0 0 1 17 17Z" />
  </svg>
</BaseIcon>
