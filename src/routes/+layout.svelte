<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { app } from "@tauri-apps/api";
  import { onMount } from "svelte";
  import "../app.css";

  import { appMaximized, setAppMaximized, setAppVersion } from "$lib/stores/AppStore.svelte";

  import WindowBar from "$lib/ui/app/WindowBar.svelte";
  import MainNav from "$lib/ui/app/MainNav.svelte";
  import Loader, { completeTask, resetCompletedTasks } from "$lib/ui/app/Loader.svelte";
  import { setTheme } from "$lib/ui/settings/Theme.svelte";

  let { children } = $props();

  onMount(() => {
    let theme = localStorage.getItem("theme");
    setTheme(theme);

    (async () => {
      setAppMaximized(await getCurrentWindow().isMaximized());
      setAppVersion(await app.getVersion());
      completeTask("app-data");

      setTimeout(() => {
        // Small timeout to ensure the APP UI is fully rendered before hiding the Loader.
        completeTask("timeout");
      }, 500);
    })();

    return () => {
      // Clear the completed tasks so the Loader shows up as loading again.
      resetCompletedTasks();
    };
  });
</script>

<Loader />

<div
  class={[
    "w-screen h-screen flex flex-col select-none overflow-hidden duration-200",
    "t-dark:text-zinc-100 t-dark:bg-zinc-900",
    "t-light:text-zinc-900 t-light:bg-zinc-100",
    "t-rust:text-rust-100 t-rust:bg-rust-900",
    "t-midnight:text-gray-100 t-midnight:bg-gray-900",
    !appMaximized.value && "rounded-md",
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
