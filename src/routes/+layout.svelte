<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { quadOut } from "svelte/easing";
  import { onMount } from "svelte";
  import gsap from "gsap";

  import "../app.css";

  import { Loader } from "$lib/classes/Loader.svelte";

  import { rustory } from "$lib/stores/rustory";
  import { loader } from "$lib/stores/loader";

  import { sleep } from "$lib/utils/basics";

  import WindowBar from "$lib/ui/app/WindowBar.svelte";
  import MainNav from "$lib/ui/app/MainNav.svelte";
  import Icon from "$lib/ui/base/Icon.svelte";

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
    await rustory.config.init();
    await rustory.info.init();
    await rustory.mainWindow.init();
    await sleep(500);
    showTasks = true;
    await sleep(500);
    loader.completeTask("app-init");

    // Here will be added the future tasks like Instance and Server loading, app updating, check mod updates...

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
      "fixed z-[1000] w-full h-full flex flex-col items-center justify-center gap-8 transition-colors duration-200",
      "t-dark:text-zinc-100 t-dark:bg-zinc-900",
      "t-light:text-zinc-900 t-light:bg-zinc-100",
      "t-rust:text-rust-100 t-rust:bg-rust-900",
      "t-midnight:text-gray-100 t-midnight:bg-gray-900",
      !rustory.mainWindow.isMaximized && "rounded-md",
    ]}
    out:fade={{ duration: 200, delay: 200 }}
  >
    <img src="/img/icon.png" alt="Rustory" class="w-36 h-36" />

    {#if showTasks}
      <div in:slide={{ duration: 500, easing: quadOut }} class="w-full">
        <div class="w-full flex flex-col items-center justify-start gap-4">
          <div
            class={[
              "w-1/3 h-2 rounded-full overflow-hidden transition-[background-color] duration-200",
              "t-dark:bg-zinc-800",
              "t-light:bg-zinc-300",
              "t-rust:bg-rust-800",
              "t-midnight:bg-gray-800",
            ]}
          >
            <div
              {@attach (element: HTMLDivElement) => {
                const progressPercent = (loader.completedTasks.length / Loader.TOTAL_TASKS) * 100;

                gsap.to(element, {
                  width: `${progressPercent}%`,
                  duration: 0.5,
                  overwrite: "auto",
                });
              }}
              class={[
                "h-full w-0 transition-[background-color] rounded-r-full duration-200",
                "t-dark:bg-zinc-700",
                "t-light:bg-zinc-400",
                "t-rust:bg-rust-700",
                "t-midnight:bg-gray-700",
              ]}
            ></div>
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
      "w-screen h-screen flex flex-col select-none overflow-hidden transition-colors duration-200",
      "t-dark:text-zinc-100 t-dark:bg-zinc-900",
      "t-light:text-zinc-900 t-light:bg-zinc-100",
      "t-rust:text-rust-100 t-rust:bg-rust-900",
      "t-midnight:text-gray-100 t-midnight:bg-gray-900",
      !rustory.mainWindow.isMaximized && "rounded-md",
    ]}
  >
    <WindowBar />

    <div class="w-full h-full flex overflow-hidden">
      <MainNav />

      <main
        class={[
          "w-full h-full rounded-tl-lg inset-shadow-sm/25 overflow-hidden transition-[background-color] duration-200",
          "t-dark:bg-zinc-800",
          "t-light:bg-zinc-300",
          "t-rust:bg-rust-800",
          "t-midnight:bg-gray-800",
        ]}
      >
        {@render children()}
      </main>
    </div>
  </div>
{/if}
