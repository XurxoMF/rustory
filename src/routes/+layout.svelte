<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { app } from "@tauri-apps/api";
  import { onMount } from "svelte";
  import "../app.css";

  import { incrementLoader, resetLoader } from "$modules/basics/stores/LoaderStore.svelte";
  import { setTheme } from "$modules/basics/stores/ThemeStore.svelte";

  import WindowBar from "$modules/basics/components/layout/WindowBar.svelte";
  import MainNav from "$modules/basics/components/layout/MainNav.svelte";
  import Loader from "$modules/basics/components/layout/Loader.svelte";

  let { children } = $props();

  let maximized = $state(false);
  let appVersion = $state("X.X.X");

  onMount(() => {
    let theme = localStorage.getItem("theme");
    setTheme(theme);

    (async () => {
      maximized = await getCurrentWindow().isMaximized();
      appVersion = await app.getVersion();
      incrementLoader(1);

      setTimeout(() => {
        incrementLoader(1);
      }, 5_000);
    })();

    return () => {
      resetLoader();
    };
  });
</script>

<Loader {maximized} />

<div
  class={[
    "w-screen h-screen overflow-hidden flex flex-col select-none duration-200",
    "t-dark:text-zinc-100 t-dark:bg-zinc-900",
    "t-light:text-zinc-900 t-light:bg-zinc-100",
    "t-rust:text-rust-100 t-rust:bg-rust-900",
    "t-midnight:text-gray-100 t-midnight:bg-gray-900",
    !maximized && "rounded-md",
  ]}
>
  <WindowBar bind:maximized {appVersion} />

  <div class="w-full h-full flex">
    <MainNav />

    <main
      class={[
        "w-full h-full rounded-tl-lg p-2 inset-shadow-sm/25 duration-200",
        "t-dark:text-zinc-100 t-dark:bg-zinc-800",
        "t-light:text-zinc-900 t-light:bg-zinc-200",
        "t-rust:text-rust-100 t-rust:bg-rust-800",
        "t-midnight:text-gray-100 t-midnight:bg-gray-800",
      ]}
    >
      {@render children()}
    </main>
  </div>
</div>
