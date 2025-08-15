<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Config } from '@renderer/lib/classes/Config.svelte'

  import Select, { type SelectItemType } from '@renderer/lib/ui/form/Select.svelte'

  let langs: SelectItemType[] = Config.LANGUAGES.map((LANG) => ({
    value: LANG.lang,
    label: LANG.name,
    comment: LANG.credits.join(', ')
  }))
</script>

<Select
  placeholder={m.placeholders__select_one()}
  items={langs}
  value={Config.instance.locale}
  onValueChange={(e) => {
    if (e !== undefined) Config.instance.setLocale(e)
  }}
/>
