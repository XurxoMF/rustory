<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { RustoryConfig } from "$lib/classes/RustoryConfig.svelte";

  import { rustory } from "$lib/stores/rustory";

  import Select, { type SelectItemType } from "$lib/ui/form/Select.svelte";

  let scales: SelectItemType[] = RustoryConfig.SCALES.map((SCALE) => ({
    value: SCALE.scale,
    label: SCALE.name,
  }));
  let scale: string | undefined = rustory.config.scale;
</script>

<Select
  placeholder={m.placeholders__select_one()}
  items={scales}
  bind:value={scale}
  onValueChange={(e) => {
    if (e !== undefined) rustory.config.scale = e;
  }}
/>
