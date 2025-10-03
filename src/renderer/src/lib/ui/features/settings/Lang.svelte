<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import { Config } from '@renderer/lib/classes/Config.svelte'

  import ComboBox from '@renderer/lib/ui/form/ComboBox.svelte'
</script>

<ComboBox
  type="single"
  value={Config.instance.locale}
  inputProps={{ placeholder: Config.instance.locale ? Config.LANGUAGES.find((l) => l.lang === Config.instance.locale).name : m.placeholders__select_one() }}
  items={Config.LANGUAGES.map((LANG) => ({
    value: LANG.lang,
    label: LANG.name
  }))}
  onValueChange={(e) => {
    if (e !== undefined) Config.instance.setLocale(e)
  }}
/>
