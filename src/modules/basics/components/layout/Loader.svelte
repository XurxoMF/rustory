<script lang="ts">
  import { fade } from "svelte/transition";
  import i18n from "$i18n";
  import gsap from "gsap";

  import { loader } from "$modules/basics/stores/LoaderStore.svelte";

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
      });
    }
  });
</script>

{#if loader.completed < loader.total}
  <div
    class={[
      "fixed z-[1000] w-full h-full flex flex-col items-center justify-center gap-4 duration-200",
      "t-dark:text-zinc-100 t-dark:bg-zinc-900",
      "t-light:text-zinc-900 t-light:bg-zinc-100",
      "t-rust:text-rust-100 t-rust:bg-rust-900",
      "t-midnight:text-gray-100 t-midnight:bg-gray-900",
      !maximized && "rounded-md",
    ]}
    transition:fade={{ duration: 200, delay: 500 }}
  >
    <h1 class="text-xl">{`${$i18n.t("common.Loading")}...`}</h1>
    <div
      class={[
        "w-60 h-2 rounded-full overflow-hidden duration-200",
        "t-dark:bg-zinc-700",
        "t-light:bg-zinc-300",
        "t-rust:bg-rust-700",
        "t-midnight:bg-gray-700",
      ]}
    >
      <div
        bind:this={loaderBar}
        class={[
          "h-full w-0 duration-200",
          "t-dark:bg-zinc-800",
          "t-light:bg-zinc-200",
          "t-rust:bg-rust-800",
          "t-midnight:bg-gray-800",
        ]}
      ></div>
    </div>
  </div>
{/if}
