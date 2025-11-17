<script lang="ts" module>
  import { type WithoutChild } from 'bits-ui'

  export type LabelProps = WithoutKeys<WithoutChild<Label.RootProps>, 'class'> & {
    disabled?: boolean | undefined
    required?: boolean | undefined
  }
</script>

<script lang="ts">
  import { Label } from 'bits-ui'

  let { children, disabled = false, required = false, ...restProps }: LabelProps = $props()
</script>

<Label.Root
  data-disabled={disabled}
  class={[
    'flex items-center gap-1 font-medium text-current/50 leading-tight',
    'data-[disabled=true]:opacity-40',
    'cursor-pointer data-[disabled=true]:cursor-not-allowed'
  ]}
  {...restProps}
>
  {@render children?.()}

  {#if required}
    <span class="text-red-500">*</span>
  {/if}
</Label.Root>
