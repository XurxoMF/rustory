<script lang="ts">
  import "../app.css";
  import { getCurrentWindow } from "@tauri-apps/api/window";

  const appWindow = getCurrentWindow();

  let { children } = $props();
</script>

<div class="w-screen h-screen overflow-hidden">
  <div class="titlebar">
    <div data-tauri-drag-region>Hola</div>
    <button onclick={() => appWindow.minimize()}>_</button>
    <button onclick={() => appWindow.toggleMaximize()}>^</button>
    <button onclick={() => appWindow.close()}>x</button>
  </div>

  {@render children()}
</div>
