<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Config } from '@renderer/lib/classes/Config.svelte'

  import Select from '@renderer/lib/ui/form/Select.svelte'
</script>

<Select
  placeholder={m.placeholders__select_one()}
  type="single"
  items={Config.SCALES.map((SCALE) => ({
    value: SCALE.scale,
    label: SCALE.name
  }))}
  value={Config.instance.scale}
  onValueChange={(e) => {
    if (e !== undefined) Config.instance.setScale(e)
  }}
/>
