<script lang="ts">
  import { type SelectItem } from '@renderer/lib/ui/form/Select'

  import { m } from '@renderer/paraglide/messages'

  import { Config } from '@renderer/lib/classes/Config.svelte'

  import Select from '@renderer/lib/ui/form/Select.svelte'

  let langs: SelectItem[] = Config.LANGUAGES.map((LANG) => ({
    value: LANG.lang,
    label: LANG.name,
    comment: LANG.credits.join(', ')
  }))
</script>

<Select
  placeholder={m.placeholders__select_one()}
  type="single"
  items={langs}
  value={Config.instance.locale}
  onValueChange={(e) => {
    if (e !== undefined) Config.instance.setLocale(e)
  }}
/>
