<script lang="ts">
  import json5 from 'json5'
  import { onMount } from 'svelte'

  import { m } from '@renderer/paraglide/messages'

  import { Request } from '@renderer/lib/classes/Request.svelte'
  import { RAPIVSVersion } from '@renderer/lib/classes/api/RAPIVSVersion.svelte'
  import { Config } from '@renderer/lib/classes/Config.svelte'

  import ComboBox from '@renderer/lib/ui/components/ComboBox.svelte'

  type VersionsToInstallProps = {
    version?: RAPIVSVersion | undefined
  }

  let { version = $bindable() }: VersionsToInstallProps = $props()

  let versions: RAPIVSVersion[] = $state([])
  let value: string | undefined = $state()

  $effect(() => {
    version = versions.find((v) => v.version === value)
  })

  onMount(async () => {
    const res = await Request.instance.get('https://vslapi.xurxomf.xyz/versions')
    const json: TRAPIVSVersion[] = json5.parse(res)

    versions = json.map((v) => RAPIVSVersion.fromJSON(v))
  })
</script>

<ComboBox
  required
  type="single"
  bind:value
  items={versions.map((v) => {
    // TODO: Disable versions that are already installed
    return {
      label: v.version,
      value: v.version,
      comment: `${v.type} · ${new Date(v.releaseDate).toLocaleDateString(Config.instance.locale)}`
    }
  })}
  inputProps={{ placeholder: m.vintagestory__version() }}
/>
