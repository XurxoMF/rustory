<script lang="ts">
  import type { WithoutChildren } from 'bits-ui'

  import BaseIcon, { type BaseIconProps } from '../BaseIcon.svelte'

  let { ...restProps }: WithoutChildren<BaseIconProps> = $props()
</script>

<BaseIcon {...restProps}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" class="w-[1em] h-[1em]">
    <path
      fill="currentColor"
      d="M216.49 56.48L177 96h19a12 12 0 0 1 0 24h-48a12 12 0 0 1-12-12V60a12 12 0 0 1 24 0v19l39.51-39.52a12 12 0 0 1 17 17ZM108 136H60a12 12 0 0 0 0 24h19l-39.49 39.51a12 12 0 0 0 17 17L96 177v19a12 12 0 0 0 24 0v-48a12 12 0 0 0-12-12"
    />
  </svg>
</BaseIcon>
