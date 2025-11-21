<script lang="ts">
  import { Config } from '@renderer/lib/classes/Config.svelte'

  import Select, { type SelectProps } from '@renderer/lib/ui/components/Select.svelte'

  type ScaleProps = WithoutKeys<SelectProps, 'placeholder' | 'type' | 'value' | 'allowDeselect' | 'items' | 'onValueChange'>

  let { ...restProps }: ScaleProps = $props()
</script>

<Select
  placeholder="Select one"
  type="single"
  items={Config.SCALES.map((SCALE) => ({
    value: SCALE.scale,
    label: SCALE.name,
    comment: SCALE.scale === '100' ? 'Default' : undefined
  }))}
  value={Config.instance.scale}
  onValueChange={(e: string) => {
    if (e !== undefined) Config.instance.setScale(e)
  }}
  {...restProps}
/>
