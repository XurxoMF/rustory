<script lang="ts">
  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'
  import { Router, type RouteConfig } from '@mateothegreat/svelte5-router'

  import './styles.css'

  import RustoryIcon from '@renderer/assets/icon.png'

  import { sleep } from '@shared/utils/common'

  import { Data } from '@renderer/lib/classes/Data.svelte'
  import { Loader } from '@renderer/lib/classes/Loader.svelte'
  import { Info } from '@renderer/lib/classes/Info.svelte'
  import { Config } from '@renderer/lib/classes/Config.svelte'
  import { Hotkeys } from '@renderer/lib/classes/Hotkeys.svelte'
  import { Tasks } from '@renderer/lib/classes/Tasks.svelte'

  import WindowBar from '@renderer/lib/ui/app/WindowBar.svelte'
  import MainNav from '@renderer/lib/ui/app/MainNav.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import ProgressBar from '@renderer/lib/ui/form/ProgressBar.svelte'
  import Toasts from '@renderer/lib/ui/app/Toasts.svelte'
  import Command from './lib/ui/app/Command.svelte'

  import HomePage from '@renderer/pages/Home.svelte'
  import ConfigPage from '@renderer/pages/Config/Config.svelte'
  import VSVersionsPage from '@renderer/pages/VS/Versions/Versions.svelte'

  // Routes of the app
  const routes: RouteConfig[] = [{ component: HomePage }, { path: '/vs/versions', component: VSVersionsPage }, { path: '/config', component: ConfigPage }]

  // Loader data manager.
  const loader = Loader.instance

  // Load all the data ince the loader is mounted.
  onMount(async () => {
    // Ensure the tasks list is empty. Some times it may be completed if the APP reloaded incorrectly.
    loader.resetCompletedTasks()

    // Load the app config and info.
    await Config.init()
    await Info.init()
    await Tasks.init()
    loader.completeTask('app-init')

    // Load the hotkeys.
    await Hotkeys.init()
    loader.completeTask('hotkeys-loading')

    // Load data like Versions, Instances...
    await Data.init()
    loader.completeTask('data-loading')

    // Here will be added the future tasks like Instance and Server loading, app updating, check mod updates...

    // Start preloading the UI on the background, wait a few ms for it to load and then complete the last task.
    loader.loadUI = true
    await sleep(500)
    loader.completeTask('timeout')
  })
</script>

<!-- Show the loader while there are some taks running on the intializing process. -->
{#if loader.isVisible}
  <div
    class={[
      'fixed z-1000 w-screen h-screen flex flex-col items-center justify-center gap-8 rounded-md border transition-[color,border, background-color] duration-200',
      't-dark:text-zinc-100 t-dark:bg-zinc-850 t-dark:border-zinc-750',
      't-light:text-zinc-650 t-light:bg-zinc-100 t-light:border-zinc-350',
      't-rust:text-rust-100 t-rust:bg-rust-850 t-rust:border-rust-750',
      't-midnight:text-gray-100 t-midnight:bg-gray-850 t-midnight:border-gray-750'
    ]}
    out:fade={{ duration: 200, delay: 200 }}
  >
    <img src={RustoryIcon} alt="Rustory" class="w-36 h-36" />

    <div class="w-full flex flex-col items-center justify-center gap-8">
      <div class="w-1/3">
        <ProgressBar value={(loader.completedTasks.length / Loader.TOTAL_TASKS) * 100} />
      </div>

      <div class="w-full max-h-40">
        <div class="flex flex-col items-center justify-center overflow-y-scroll">
          {#each Loader.TASKS as TASK (TASK.id)}
            {@const isCompleted = loader.completedTasks.includes(TASK.id)}

            <div class="w-fit flex items-center gap-1">
              <Icon class={['text-lg', isCompleted && 'text-green-700']} icon={isCompleted ? 'ph:check-circle' : 'svg-spinners:6-dots-scale'} />
              <p>{TASK.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Start loading the data when all the data is loaded. Preloader will stay for 1 second while the UI is loading. -->
{#if loader.loadUI}
  <div
    class={[
      'relative w-screen h-screen overflow-hidden bg-cover rounded-md border transition-[border,background-color] duration-200',
      't-dark:bg-image-dark t-dark:bg-zinc-850 t-dark:border-zinc-750',
      't-light:bg-image-light t-light:bg-zinc-100 t-light:border-zinc-350',
      't-rust:bg-image-rust t-rust:bg-rust-850 t-rust:border-rust-750',
      't-midnight:bg-image-midnight t-midnight:bg-gray-850 t-midnight:border-gray-750'
    ]}
  >
    <div
      class={[
        'w-full h-full flex flex-col select-none backdrop-blur-xs transition-[color,background-color] duration-200',
        't-dark:text-zinc-100 t-dark:bg-zinc-850/80',
        't-light:text-zinc-650 t-light:bg-zinc-100/80',
        't-rust:text-rust-100 t-rust:bg-rust-850/80',
        't-midnight:text-gray-100 t-midnight:bg-gray-850/80'
      ]}
    >
      <WindowBar />

      <div class="w-full h-full relative flex overflow-hidden">
        <MainNav />

        <main class="w-full h-full overflow-hidden">
          <Router {routes} />
        </main>
      </div>

      <Toasts />
      <Command />
    </div>
  </div>

  <div
    id="portal"
    class={[
      'select-none transition-[color,background-color] duration-200',
      't-dark:text-zinc-100 t-dark:bg-zinc-850/80',
      't-light:text-zinc-650 t-light:bg-zinc-100/80',
      't-rust:text-rust-100 t-rust:bg-rust-850/80',
      't-midnight:text-gray-100 t-midnight:bg-gray-850/80'
    ]}
  ></div>
{/if}
