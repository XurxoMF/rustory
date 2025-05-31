<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { onOpenUrl } from "@tauri-apps/plugin-deep-link";
  import { quadOut } from "svelte/easing";
  import { onMount } from "svelte";

  import "../app.css";

  import { Loader } from "$lib/classes/Loader.svelte";

  import { rConfig, rInfo, rMainWindow, rUser } from "$lib/stores/rustory.svelte";
  import { loader } from "$lib/stores/loader.svelte";

  import { sleep } from "$lib/utils/basics";
  import { manageDeepLinks } from "$lib/utils/deep-links";
  import { log } from "$lib/utils/logger";

  import WindowBar from "$lib/ui/app/WindowBar.svelte";
  import MainNav from "$lib/ui/app/MainNav.svelte";
  import Icon from "$lib/ui/base/Icon.svelte";
  import ProgressBar from "$lib/ui/form/ProgressBar.svelte";

  let { children } = $props();

  // If we should show tasks or not.
  let showTasks: boolean = $state(false);

  // Start loading the UI after all the data was loaded.
  let loadUI: boolean = $state(false);

  // Load all the data ince the loader is mounted.
  onMount(async () => {
    // Ensure the tasks list is empty. Some times it may be completed if the APP reloaded incorrectly.
    loader.resetCompletedTasks();
    showTasks = false;

    // Load the app data and wait a bit so the theme and localization get's correctly changed.
    // Show the tasks list and loader bar, wait for them to be shown and then check the first task(app data loading) as completed.
    await rConfig.init();
    await rInfo.init();
    await rMainWindow.init();
    await sleep(500);
    showTasks = true;
    await sleep(500);
    loader.completeTask("app-init");

    // Here will be added the future tasks like Instance and Server loading, app updating, check mod updates...

    // Get the user data and tokens
    await rUser.init();

    // Add listener for deep-links
    await onOpenUrl((urls) => {
      log("info", `Opened a deep-link!`);
      manageDeepLinks(urls);
    });

    // Start preloading the UI on the background, wait a few ms for it to load and then complete the last task.
    loadUI = true;
    await sleep(500);
    loader.completeTask("timeout");
  });
</script>

<!-- Show the loader while there are some taks running on the intializing process. -->
{#if loader.isVisible}
  <div
    class={[
      "fixed z-[1000] w-full h-full flex flex-col items-center justify-center gap-8 border transition-[color,background-color,border] duration-200",
      "t-dark:text-zinc-100 t-dark:bg-zinc-900 t-dark:border-zinc-750",
      "t-light:text-zinc-900 t-light:bg-zinc-100 t-light:border-zinc-250",
      "t-rust:text-rust-100 t-rust:bg-rust-900 t-rust:border-rust-750",
      "t-midnight:text-gray-100 t-midnight:bg-gray-900 t-midnight:border-gray-750",
      !rMainWindow.isMaximized && "rounded-md",
    ]}
    out:fade={{ duration: 200, delay: 200 }}
  >
    <img src="/img/icon.png" alt="Rustory" class="w-36 h-36" />

    {#if showTasks}
      <div in:slide={{ duration: 500, easing: quadOut }} class="w-full">
        <div class="flex flex-col items-center justify-center gap-8">
          <div class="w-1/3">
            <ProgressBar progress={(loader.completedTasks.length / Loader.TOTAL_TASKS) * 100} />
          </div>

          <div class="w-full max-h-40">
            <div class="flex flex-col items-center justify-center overflow-y-scroll">
              {#each Loader.TASKS as TASK}
                {@const isCompleted = loader.completedTasks.includes(TASK.id)}

                <div class="w-fit flex items-center gap-1">
                  <Icon
                    class={["text-lg", isCompleted && "text-green-700"]}
                    icon={isCompleted
                      ? "fluent:checkmark-circle-48-regular"
                      : "svg-spinners:6-dots-scale"}
                  />
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
{#if loadUI}
  <div
    class={[
      "w-screen h-screen flex flex-col select-none overflow-hidden border transition-[color,background-color,border] duration-200",
      "t-dark:text-zinc-100 t-dark:bg-zinc-900 t-dark:border-zinc-750",
      "t-light:text-zinc-900 t-light:bg-zinc-100 t-light:border-zinc-250",
      "t-rust:text-rust-100 t-rust:bg-rust-900 t-rust:border-rust-750",
      "t-midnight:text-gray-100 t-midnight:bg-gray-900 t-midnight:border-gray-750",
      !rMainWindow.isMaximized && "rounded-md",
    ]}
  >
    <WindowBar />

    <div class="w-full h-full flex overflow-hidden">
      <MainNav />

      <main class="w-full h-full overflow-hidden">
        {@render children()}
      </main>
    </div>

    <div id="portal"></div>
  </div>
{/if}
