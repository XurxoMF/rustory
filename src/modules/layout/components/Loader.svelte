<script lang="ts">
  import { fade } from "svelte/transition";
  import i18n from "$i18n";
  import gsap from "gsap";

  import { loader } from "$modules/layout/stores/LoaderStore.svelte";

  let { maximized }: { maximized: boolean } = $props();

  let loaderBar = $state<HTMLDivElement>();
  let loaderAnimation: gsap.core.Tween;

  $effect(() => {
    if (loaderBar) {
      const progressPercent = loader.total > 0 ? (loader.completed / loader.total) * 100 : 0;

      loaderAnimation?.kill();
      loaderAnimation = gsap.to(loaderBar, {
        width: `${progressPercent}%`,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  });
</script>

{#if loader.completed < loader.total}
  <div
    class={[
      "fixed z-[1000] w-full h-full flex flex-col items-center justify-center gap-4 bg-zinc-900 text-white",
      !maximized && "rounded-md",
    ]}
    transition:fade
  >
    <h1 class="text-xl">{`${$i18n.t("common.Loading")}...`}</h1>
    <div class="w-60 h-2 bg-zinc-700/50 rounded-full overflow-hidden">
      <div bind:this={loaderBar} class={`h-full bg-zinc-700`}></div>
    </div>
  </div>
{/if}
