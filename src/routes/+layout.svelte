<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { onMount } from "svelte";
  import "../app.css";

  import WindowBar from "$modules/layout/components/WindowBar.svelte";
  import MainNav from "$modules/layout/components/MainNav.svelte";

  let { children } = $props();

  let maximized = $state(false);

  onMount(async () => (maximized = await getCurrentWindow().isMaximized()));
</script>

<div
  class={[
    "w-screen h-screen overflow-hidden text-zinc-200 bg-zinc-900 flex flex-col select-none",
    !maximized && "rounded-md",
  ]}
>
  <WindowBar bind:maximized />

  <div class="w-full h-full flex">
    <MainNav />

    <main class="w-full h-full bg-zinc-850 rounded-tl-lg p-2 inset-shadow-sm/25">
      {@render children()}
    </main>
  </div>
</div>
