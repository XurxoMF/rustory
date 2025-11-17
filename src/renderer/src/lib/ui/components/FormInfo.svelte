<script lang="ts" module>
  export type FormErrorsProps = {
    info?: string[] | undefined
    success?: string[] | undefined
    warning?: string[] | undefined
    error?: string[] | undefined
  }
</script>

<script lang="ts">
  import Icon from '@renderer/lib/ui/components/Icon.svelte'

  let { info, success, warning, error }: FormErrorsProps = $props()
</script>

{#each info as inf, i (i)}
  <p class={['flex items-center gap-1 font-medium leading-tight text-blue-500']}><Icon icon="ph:info-bold" />{inf}</p>
{/each}

{#each success as suc, i (i)}
  <p class={['flex items-center gap-1 font-medium leading-tight text-green-500']}><Icon icon="ph:check-bold" />{suc}</p>
{/each}

{#each warning as war, i (i)}
  <p class={['flex items-center gap-1 font-medium leading-tight text-yellow-500']}><Icon icon="ph:warning-bold" />{war}</p>
{/each}

{#each error as err, i (i)}
  <p class={['flex items-center gap-1 font-medium leading-tight text-red-500']}><Icon icon="ph:prohibit-bold" />{err}</p>
{/each}
