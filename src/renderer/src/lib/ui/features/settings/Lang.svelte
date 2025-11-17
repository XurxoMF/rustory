<script lang="ts">
  import { mergeProps } from 'bits-ui'

  import { m } from '@renderer/paraglide/messages'

  import { Config } from '@renderer/lib/classes/Config.svelte'

  import ComboBox, { type ComboBoxInputProps, type ComboBoxProps } from '@renderer/lib/ui/components/ComboBox.svelte'

  type LangProps = WithoutKeys<ComboBoxProps, 'type' | 'value' | 'placeholder' | 'allowDeselect' | 'items' | 'onValueChange'> & {
    inputProps?: WithoutKeys<ComboBoxInputProps, 'placeholder'> | undefined
  }

  let { inputProps, ...restProps }: LangProps = $props()

  let mergedInputProps = $derived(
    mergeProps(inputProps, {
      placeholder: Config.instance.locale ? Config.LANGUAGES.find((l) => l.lang === Config.instance.locale)?.name : m.placeholders__select_one()
    })
  )
</script>

<ComboBox
  type="single"
  value={Config.instance.locale}
  allowDeselect={false}
  items={Config.LANGUAGES.map((LANG) => ({
    value: LANG.lang,
    label: LANG.name,
    comment: LANG.lang === 'en' ? m.common__default() : undefined
  }))}
  onValueChange={(e: string) => {
    if (e !== undefined) Config.instance.setLocale(e)
  }}
  inputProps={mergedInputProps}
  {...restProps}
/>
