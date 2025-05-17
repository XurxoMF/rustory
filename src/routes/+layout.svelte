<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { app } from "@tauri-apps/api";
  import { onMount } from "svelte";
  import "../app.css";

  import { incrementLoader, resetLoader } from "$modules/layout/stores/Loader.svelte";

  import WindowBar from "$modules/layout/components/WindowBar.svelte";
  import MainNav from "$modules/layout/components/MainNav.svelte";
  import Loader from "$modules/layout/components/Loader.svelte";

  let { children } = $props();

  let maximized = $state(false);
  let appVersion = $state("X.X.X");

  onMount(() => {
    (async () => {
      maximized = await getCurrentWindow().isMaximized();
      appVersion = await app.getVersion();
      incrementLoader(1);

      setTimeout(() => {
        incrementLoader(1);
      }, 500);
    })();

    return () => {
      resetLoader();
    };
  });
</script>

<Loader {maximized} />

<div
  class={[
    "w-screen h-screen overflow-hidden text-zinc-200 bg-zinc-900 flex flex-col select-none",
    !maximized && "rounded-md",
  ]}
>
  <WindowBar bind:maximized {appVersion} />

  <div class="w-full h-full flex">
    <MainNav />

    <main class="w-full h-full bg-zinc-850 rounded-tl-lg p-2 inset-shadow-sm/25">
      {@render children()}
    </main>
  </div>
</div>
