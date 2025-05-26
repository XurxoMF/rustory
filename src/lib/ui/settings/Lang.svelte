<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { RustoryConfig } from "$lib/classes/RustoryConfig.svelte";

  import { rustory } from "$lib/stores/rustory";

  import Select, { type SelectItemType } from "$lib/ui/form/Select.svelte";

  let langs: SelectItemType[] = RustoryConfig.LANGUAGES_DATA.map((LANG) => ({
    value: LANG.lang,
    label: LANG.name,
    comment: LANG.credits.join(", "),
  }));
</script>

<Select
  placeholder={m.placeholders__select_one()}
  items={langs}
  value={rustory.config.lang}
  onValueChange={(e) => {
    if (e !== undefined) rustory.config.lang = e;
  }}
/>
