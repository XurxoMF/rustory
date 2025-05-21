<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount, untrack } from "svelte";
  import gsap from "gsap";

  import "../app.css";

  import { rustory } from "$lib/stores/rustory";
  import { loader } from "$lib/stores/loader";

  import { sleep } from "$lib/utils/basics";

  import WindowBar from "$lib/ui/app/WindowBar.svelte";
  import MainNav from "$lib/ui/app/MainNav.svelte";
  import Icon from "$lib/ui/base/Icon.svelte";
  import { Loader } from "$lib/classes/Loader.svelte";

  let { children } = $props();

  // Start loading the UI after all the data was loaded.
  let loadUI: boolean = $state(false);

  // Load all the data ince the loader is mounted.
  onMount(async () => {
    // Ensure the tasks list is empty. Some times it may be completed if the APP reloaded incorrectly.
    loader.resetCompletedTasks();

    await rustory.info.init();
    loader.completeTask("app-info-init");

    await rustory.config.init();
    loader.completeTask("app-config-init");

    await rustory.mainWindow.init();
    loader.completeTask("app-main-window-init");

    loadUI = true;

    await sleep(500);
    loader.completeTask("timeout");
  });
</script>

<!-- Show the loader while there are some taks running on the intializing process. -->
{#if loader.isVisible}
  <div
    class="fixed z-[1000] text-[16px] w-full h-full flex flex-col items-center justify-center gap-[32px] text-zinc-100 bg-zinc-900"
    transition:fade={{ duration: 200, delay: 200 }}
  >
    <img src="/img/icon.png" alt="Rustory" class="w-[144px] h-[144px]" />

    <div class="w-1/3 h-[8px] rounded-full overflow-hidden bg-zinc-800">
      <div
        {@attach (element: HTMLDivElement) => {
          const progressPercent = (loader.completedTasks.length / Loader.TOTAL_TASKS) * 100;

          gsap.to(element, {
            width: `${progressPercent}%`,
            duration: 0.2,
            overwrite: "auto",
          });
        }}
        class="h-full w-0 bg-zinc-700"
      ></div>
    </div>

    <div class="w-full max-h-[160px] flex flex-col items-center justify-center overflow-y-scroll">
      {#each Loader.TASKS as TASK}
        {@const isCompleted = loader.completedTasks.includes(TASK.id)}

        <div class="w-fit flex items-center gap-[4px]">
          <Icon
            class={["text-[18px]", isCompleted && "text-green-700"]}
            icon={isCompleted ? "fluent:checkmark-circle-48-regular" : "svg-spinners:6-dots-scale"}
          />
          <!-- TODO: paraglide -->
          <p>{TASK.localesDescriptionKey}</p>
        </div>
      {/each}
    </div>
  </div>
{/if}

<!-- Start loading the data when all the data is loaded. Preloader will stay for 1 second while the UI is loading. -->
{#if loadUI}
  <div
    class={[
      "w-screen h-screen flex flex-col select-none overflow-hidden duration-200",
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
          "w-full h-full rounded-tl-lg inset-shadow-sm/25 overflow-hidden duration-200",
          "t-dark:text-zinc-100 t-dark:bg-zinc-800",
          "t-light:text-zinc-900 t-light:bg-zinc-300",
          "t-rust:text-rust-100 t-rust:bg-rust-800",
          "t-midnight:text-gray-100 t-midnight:bg-gray-800",
        ]}
      >
        {@render children()}
      </main>
    </div>
  </div>
{/if}
