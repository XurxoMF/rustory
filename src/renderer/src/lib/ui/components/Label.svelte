<script lang="ts" module>
  import { type WithoutChild } from 'bits-ui'

  export type LabelProps = Omit<WithoutChild<Label.RootProps>, 'class'> & {
    disabled?: boolean | undefined
  }
</script>

<script lang="ts">
  import { Label } from 'bits-ui'

  let { children, disabled = false, ...restProps }: LabelProps = $props()
</script>

<Label.Root
  data-disabled={disabled}
  class={['flex items-center gap-1 flex-wrap pointer', 'data-[disabled=true]:opacity-40', 'cursor-pointer data-[disabled=true]:cursor-not-allowed']}
  {...restProps}
>
  {@render children?.()}
</Label.Root>
