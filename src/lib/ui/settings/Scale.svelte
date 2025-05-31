<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { RConfig } from "$lib/classes/RConfig.svelte";

  import { rConfig } from "$lib/stores/rustory.svelte";

  import Select, { type SelectItemType } from "$lib/ui/form/Select.svelte";

  let scales: SelectItemType[] = RConfig.SCALES.map((SCALE) => ({
    value: SCALE.scale,
    label: SCALE.name,
  }));
</script>

<Select
  placeholder={m.placeholders__select_one()}
  items={scales}
  value={rConfig.scale}
  onValueChange={(e) => {
    if (e !== undefined) rConfig.scale = e;
  }}
/>
