<script lang="ts">
  import { Label, type WithoutChild } from 'bits-ui'

  type LabelProps = Omit<WithoutChild<Label.RootProps>, 'class'> & {
    disabled?: boolean | undefined
  }

  let { children, disabled = false, ...restProps }: LabelProps = $props()
</script>

<Label.Root
  data-disabled={disabled}
  class={['flex items-center gap-1 flex-wrap pointer', 'data-[disabled=true]:opacity-40', 'cursor-pointer data-[disabled=true]:cursor-not-allowed']}
  {...restProps}
>
  {@render children?.()}
</Label.Root>
