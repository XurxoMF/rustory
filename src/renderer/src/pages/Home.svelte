<script lang="ts">
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import ButtonNeutral from '@renderer/lib/ui/form/Buttons/ButtonNeutral.svelte'

  import { TaskInstallVersion } from '@renderer/lib/classes/tasks/TaskInstallVersion.svelte'
  import { Data } from '@renderer/lib/classes/Data.svelte'
  import { TaskBase } from '@renderer/lib/classes/tasks/TaskBase.svelte'

  Breadcrumbs.instance.segments = []

  let task: TaskBase | null = null
</script>

<PageWrapper scrollable={false}>
  <div class="flex flex-col gap-2 flex-wrap">
    <p>Hola mundo!</p>

    <ButtonNeutral
      onclick={async () => {
        task = new TaskInstallVersion({ version: '1.21.1', url: 'https://vslapi.xurxomf.xyz/files/versions/linux/1.21.1.zip', outputPath: '/home/xurxomf/Descargas/1.21.1' })

        Data.instance.tasks.push(task)

        task.execute()
      }}>{task ? task.progress : 'Download'}</ButtonNeutral
    >

    {#each Data.instance.vsVersions as version (version.version)}
      <p>Version: {version.version}</p>
      <p>State: {version.state}</p>
    {/each}
  </div>
</PageWrapper>
