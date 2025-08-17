<script lang="ts">
  import { fade, slide } from 'svelte/transition'
  import { quadOut } from 'svelte/easing'
  import { onMount } from 'svelte'
  import { Router, type RouteConfig } from '@mateothegreat/svelte5-router'

  import './styles.css'

  import RustoryIcon from '@renderer/assets/icon.png'

  import { Loader } from '@renderer/lib/classes/Loader.svelte'
  import { Info } from '@renderer/lib/classes/Info.svelte'
  import { Config } from '@renderer/lib/classes/Config.svelte'

  import { sleep } from '@shared/utils/common'

  import WindowBar from '@renderer/lib/ui/app/WindowBar.svelte'
  import MainNav from '@renderer/lib/ui/app/MainNav.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import ProgressBar from '@renderer/lib/ui/form/ProgressBar.svelte'

  import HomePage from '@renderer/pages/Home.svelte'
  import ConfigPage from '@renderer/pages/Config.svelte'

  // Routes of the page
  const routes: RouteConfig[] = [{ component: HomePage }, { path: '/config', component: ConfigPage }]

  // Loader data manager.
  const loader = Loader.instance

  // Load all the data ince the loader is mounted.
  onMount(async () => {
    // Ensure the tasks list is empty. Some times it may be completed if the APP reloaded incorrectly.
    loader.resetCompletedTasks()
    loader.showTasks = false

    // Load the app data and wait a bit so the theme and localization get's correctly changed.
    await Config.instance.init()
    await Info.instance.init()

    // Show the tasks list and loader bar, wait for them to be shown and then complete the first task(app data loading).
    loader.showTasks = true
    await sleep(500)
    loader.completeTask('app-init')

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
      'fixed z-[1000] w-screen h-screen flex flex-col items-center justify-center gap-8 rounded-md border transition-[color,background-color,border] duration-200',
      't-dark:text-zinc-100 t-dark:bg-zinc-900 t-dark:border-zinc-750',
      't-light:text-zinc-900 t-light:bg-zinc-100 t-light:border-zinc-250',
      't-rust:text-rust-100 t-rust:bg-rust-900 t-rust:border-rust-750',
      't-midnight:text-gray-100 t-midnight:bg-gray-900 t-midnight:border-gray-750'
    ]}
    out:fade={{ duration: 200, delay: 200 }}
  >
    <img src={RustoryIcon} alt="Rustory" class="w-36 h-36" />

    {#if loader.showTasks}
      <div in:slide={{ duration: 500, easing: quadOut }} class="w-full">
        <div class="flex flex-col items-center justify-center gap-8">
          <div class="w-1/3">
            <ProgressBar value={(loader.completedTasks.length / Loader.TOTAL_TASKS) * 100} />
          </div>

          <div class="w-full max-h-40">
            <div class="flex flex-col items-center justify-center overflow-y-scroll">
              {#each Loader.TASKS as TASK (TASK.id)}
                {@const isCompleted = loader.completedTasks.includes(TASK.id)}

                <div class="w-fit flex items-center gap-1">
                  <Icon class={['text-lg', isCompleted && 'text-green-700']} icon={isCompleted ? 'fluent:checkmark-circle-48-regular' : 'svg-spinners:6-dots-scale'} />
                  <p>{TASK.description}</p>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<!-- Start loading the data when all the data is loaded. Preloader will stay for 1 second while the UI is loading. -->
{#if loader.loadUI}
  <div
    class={[
      'w-screen h-screen overflow-hidden bg-cover',
      't-dark:bg-image-dark',
      't-light:bg-image-light',
      't-rust:bg-image-rust',
      't-midnight:bg-image-midnight',
      'rounded-md border transition-[border] duration-200 t-dark:border-zinc-750 t-light:border-zinc-250 t-rust:border-rust-750 t-midnight:border-gray-750'
    ]}
  >
    <div
      class={[
        'w-full h-full flex flex-col select-none backdrop-blur-xs transition-[color,background-color] duration-200',
        't-dark:text-zinc-100 t-dark:bg-zinc-900/80',
        't-light:text-zinc-900 t-light:bg-zinc-100/80',
        't-rust:text-rust-100 t-rust:bg-rust-900/80',
        't-midnight:text-gray-100 t-midnight:bg-gray-900/80'
      ]}
    >
      <WindowBar />

      <div class="w-full h-full flex overflow-hidden">
        <MainNav />

        <main class="w-full h-full overflow-hidden">
          <Router {routes} />
        </main>
      </div>

      <div id="portal"></div>
    </div>
  </div>
{/if}
