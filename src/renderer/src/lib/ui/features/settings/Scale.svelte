<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Config } from '@renderer/lib/classes/Config.svelte'

  import Select, { type SelectProps } from '@renderer/lib/ui/components/Select.svelte'

  type ScaleProps = WithoutKeys<SelectProps, 'placeholder' | 'type' | 'value' | 'allowDeselect' | 'items' | 'onValueChange'>

  let { ...restProps }: ScaleProps = $props()
</script>

<Select
  placeholder={m.placeholders__select_one()}
  type="single"
  items={Config.SCALES.map((SCALE) => ({
    value: SCALE.scale,
    label: SCALE.name,
    comment: SCALE.scale === '100' ? m.common__default() : undefined
  }))}
  value={Config.instance.scale}
  onValueChange={(e: string) => {
    if (e !== undefined) Config.instance.setScale(e)
  }}
  {...restProps}
/>
