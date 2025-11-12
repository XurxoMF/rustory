<script lang="ts">
  import { type Snippet } from 'svelte'
  import { Label } from 'bits-ui'

  type LabelProps = Omit<Label.RootProps, 'class'> & {
    children: Snippet
    required?: boolean | undefined
    disabled?: boolean | undefined
  }

  let { children, required = false, disabled = false, ...restProps }: LabelProps = $props()
</script>

<Label.Root data-disabled={disabled} class={['flex items-center gap-1 flex-wrap pointer', 'data-[disabled=true]:opacity-40', 'cursor-pointer data-[disabled=true]:cursor-not-allowed']} {...restProps}>
  {@render children()}

  {#if required}
    <span class="text-red-500">*</span>
  {/if}
</Label.Root>
