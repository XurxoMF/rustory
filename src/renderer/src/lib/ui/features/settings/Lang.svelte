<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Config } from '@renderer/lib/classes/Config.svelte'

  import Select from '@renderer/lib/ui/form/Select.svelte'
</script>

<Select
  placeholder={m.placeholders__select_one()}
  type="single"
  items={Config.LANGUAGES.map((LANG) => ({
    value: LANG.lang,
    label: LANG.name
  }))}
  value={Config.instance.locale}
  onValueChange={(e) => {
    if (e !== undefined) Config.instance.setLocale(e)
  }}
/>
