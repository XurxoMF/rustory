<script lang="ts" module>
  export type FormErrorsProps = {
    info?: string[] | undefined
    success?: string[] | undefined
    warning?: string[] | undefined
    error?: string[] | undefined
  }
</script>

<script lang="ts">
  import { fade } from 'svelte/transition'

  import { PHCheckBoldIcon, PHInfoBoldIcon, PHProhibitedBoldIcon, PHWarningBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

  let { info, success, warning, error }: FormErrorsProps = $props()
</script>

{#each info as inf, i (i)}
  <p class={['flex items-center gap-1 font-medium', 'text-blue-500', 't-light:text-blue-500']} transition:fade={{ duration: 200 }}><PHInfoBoldIcon />{inf}</p>
{/each}

{#each success as suc, i (i)}
  <p class={['flex items-center gap-1 font-medium', 'text-green-500', 't-light:text-green-500']} transition:fade={{ duration: 200 }}>
    <PHCheckBoldIcon />{suc}
  </p>
{/each}

{#each warning as war, i (i)}
  <p class={['flex items-center gap-1 font-medium', 'text-yellow-500', 't-light:text-yellow-500']} transition:fade={{ duration: 200 }}>
    <PHWarningBoldIcon />{war}
  </p>
{/each}

{#each error as err, i (i)}
  <p class={['flex items-center gap-1 font-medium', 'text-red-500', 't-light:text-red-500']} transition:fade={{ duration: 200 }}>
    <PHProhibitedBoldIcon />{err}
  </p>
{/each}
