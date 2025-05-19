<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { app } from "@tauri-apps/api";
  import { onMount } from "svelte";
  import "../app.css";

  import { maximized, setMaximized } from "$lib/stores/MaximizedStateStore.svelte";

  import WindowBar from "$lib/ui/app/WindowBar.svelte";
  import MainNav from "$lib/ui/app/MainNav.svelte";
  import Loader, { incrementLoader, resetLoader } from "$lib/ui/app/Loader.svelte";
  import { setTheme } from "$lib/ui/settings/Theme.svelte";

  let { children } = $props();

  let appVersion = $state("X.X.X");

  onMount(() => {
    let theme = localStorage.getItem("theme");
    setTheme(theme);

    (async () => {
      setMaximized(await getCurrentWindow().isMaximized());
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

<Loader />

<div
  class={[
    "w-screen h-screen overflow-hidden flex flex-col select-none duration-200",
    "t-dark:text-zinc-100 t-dark:bg-zinc-900",
    "t-light:text-zinc-900 t-light:bg-zinc-100",
    "t-rust:text-rust-100 t-rust:bg-rust-900",
    "t-midnight:text-gray-100 t-midnight:bg-gray-900",
    !maximized.value && "rounded-md",
  ]}
>
  <WindowBar {appVersion} />

  <div class="w-full h-full flex">
    <MainNav />

    <main
      class={[
        "w-full h-full rounded-tl-lg p-2 inset-shadow-sm/25 duration-200",
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
