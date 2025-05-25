<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { RustoryConfig } from "$lib/classes/RustoryConfig.svelte";

  import { rustory } from "$lib/stores/rustory";

  import Select, { type SelectItemType } from "$lib/ui/form/Select.svelte";

  let langs: SelectItemType[] = RustoryConfig.LANGUAGES_DATA.map((lang) => ({
    value: lang.lang,
    label: lang.name,
    comment: lang.credits.join(", "),
  }));
  let lang: string | undefined = rustory.config.lang;
</script>

<Select
  placeholder={m.placeholders__select_one()}
  items={langs}
  bind:value={lang}
  onValueChange={(e) => {
    if (e !== undefined) rustory.config.lang = e;
  }}
/>
