<script lang="ts">
  import json5 from 'json5'
  import { onMount } from 'svelte'
  import { mergeProps } from 'bits-ui'
  import { someInSet } from '@shared/utils/common'

  import { Request } from '@renderer/lib/classes/Request.svelte'
  import { RAPIVSVersion } from '@renderer/lib/classes/api/RAPIVSVersion.svelte'
  import { Config } from '@renderer/lib/classes/Config.svelte'
  import { Data } from '@renderer/lib/classes/Data.svelte'

  import ComboBox, { type ComboBoxInputProps, type ComboBoxProps } from '@renderer/lib/ui/components/ComboBox.svelte'

  type VersionsToInstallProps = WithoutKeys<ComboBoxProps, 'items' | 'type' | 'value' | 'onValueChange'> & {
    version?: RAPIVSVersion | undefined
    onValueChange?: ((version: RAPIVSVersion) => void) | undefined
    disableInstalled?: boolean | undefined
    inputProps?: WithoutKeys<ComboBoxInputProps, 'placeholder'> | undefined
  }

  let { version = $bindable(), onValueChange, disableInstalled = false, inputProps, ...restProps }: VersionsToInstallProps = $props()

  let versions: RAPIVSVersion[] = $state([])

  let value: string | undefined = $state()

  function handleValueChange(e: string) {
    value = e
    version = versions.find((v) => v.version === value)
    if (!version) throw new Error('The selected version does not exist!')
    onValueChange?.(version)
  }

  let mergedInputProps = $derived(
    mergeProps(inputProps, {
      placeholder: 'VS Version'
    })
  )

  onMount(async () => {
    const res = await Request.instance.get('https://vslapi.xurxomf.xyz/versions')
    const json: RAPIVSVersionType[] = json5.parse(res)

    versions = json.map((v) => RAPIVSVersion.fromJSON(v))
  })
</script>

<ComboBox
  type="single"
  {value}
  items={versions.map((v) => ({
    label: v.version,
    value: v.version,
    disabled: disableInstalled && someInSet(Data.instance.vsInstances, (i) => i.version === v.version),
    comment: `${v.type} · ${new Date(v.releaseDate).toLocaleDateString(Config.instance.locale)}`
  }))}
  onValueChange={handleValueChange}
  inputProps={mergedInputProps}
  {...restProps}
/>
