<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { Config } from "$lib/classes/Rustory";

  import Select, { type SelectItemType } from "$lib/ui/form/Select.svelte";

  let scales: SelectItemType[] = Config.SCALES.map((SCALE) => ({
    value: SCALE.scale,
    label: SCALE.name,
  }));
</script>

<Select
  placeholder={m.placeholders__select_one()}
  items={scales}
  value={Config.instance.scale}
  onValueChange={(e) => {
    if (e !== undefined) Config.instance.scale = e;
  }}
/>
