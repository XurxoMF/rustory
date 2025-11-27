<script lang="ts">
  import json5 from 'json5'
  import { mergeProps } from 'bits-ui'

  import { Request } from '@renderer/lib/classes/Request.svelte'
  import { RAPIVSVersion } from '@renderer/lib/classes/api/RAPIVSVersion.svelte'
  import { Config } from '@renderer/lib/classes/Config.svelte'

  import ComboBox, { type ComboBoxInputProps, type ComboBoxProps } from '@renderer/lib/ui/components/ComboBox.svelte'

  type VersionsToInstallProps = WithoutKeys<ComboBoxProps, 'items' | 'type' | 'value' | 'onValueChange'> & {
    version?: RAPIVSVersion | undefined
    onValueChange?: ((version: RAPIVSVersion) => void) | undefined
    inputProps?: WithoutKeys<ComboBoxInputProps, 'placeholder'> | undefined
  }

  let { version = $bindable(), onValueChange, inputProps, ...restProps }: VersionsToInstallProps = $props()

  let versions: RAPIVSVersion[] = $state([])
  Request.instance
    .get('https://vslapi.xurxomf.xyz/versions')
    .then((res): Promise<RAPIVSVersion[]> => json5.parse(res))
    .then((json) => (versions = json.map((v) => RAPIVSVersion.fromJSON(v))))
    .catch((err) => {
      window.api.logger.error('There was an error loading the RSAPIVersions!')
      window.api.logger.debug(`There was an error loading the RSAPIVersions:\n${JSON.stringify(err)}`)
    })

  let value: string | undefined = $state(version?.version)

  $effect(() => {
    value = version?.version
  })

  function handleValueChange(e: string) {
    version = versions.find((v) => v.version === e)
    if (!version) throw new Error('The selected version does not exist!')
    onValueChange?.(version)
  }

  let mergedInputProps = $derived(
    mergeProps(inputProps, {
      placeholder: 'VS Version'
    })
  )
</script>

<ComboBox
  type="single"
  {value}
  items={versions.map((v) => ({
    label: v.version,
    value: v.version,
    comment: `${v.type} · ${new Date(v.releaseDate).toLocaleDateString(Config.instance.locale)}`
  }))}
  onValueChange={handleValueChange}
  inputProps={mergedInputProps}
  {...restProps}
/>
