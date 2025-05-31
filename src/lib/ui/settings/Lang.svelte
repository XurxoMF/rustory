<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { RConfig } from "$lib/classes/RConfig.svelte";

  import { rConfig } from "$lib/stores/rustory.svelte";

  import Select, { type SelectItemType } from "$lib/ui/form/Select.svelte";

  let langs: SelectItemType[] = RConfig.LANGUAGES_DATA.map((LANG) => ({
    value: LANG.lang,
    label: LANG.name,
    comment: LANG.credits.join(", "),
  }));
</script>

<Select
  placeholder={m.placeholders__select_one()}
  items={langs}
  value={rConfig.lang}
  onValueChange={(e) => {
    if (e !== undefined) rConfig.lang = e;
  }}
/>
