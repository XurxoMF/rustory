<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { Config } from "$lib/classes/Rustory";

  import Select, { type SelectItemType } from "$lib/ui/form/Select.svelte";

  let langs: SelectItemType[] = Config.LANGUAGES.map((LANG) => ({
    value: LANG.lang,
    label: LANG.name,
    comment: LANG.credits.join(", "),
  }));
</script>

<Select
  placeholder={m.placeholders__select_one()}
  items={langs}
  value={Config.instance.lang}
  onValueChange={(e) => {
    if (e !== undefined) Config.instance.lang = e;
  }}
/>
