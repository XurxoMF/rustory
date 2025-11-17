<script lang="ts">
  import type { WithoutChildren } from 'bits-ui'

  import BaseIcon, { type IconProps } from '../BaseIcon.svelte'

  let { ...restProps }: WithoutChildren<IconProps> = $props()
</script>

<BaseIcon {...restProps}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" class="w-[1em] h-[1em]">
    <path
      fill="currentColor"
      d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
    />
  </svg>
</BaseIcon>
