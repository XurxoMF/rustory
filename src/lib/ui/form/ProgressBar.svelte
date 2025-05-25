<script lang="ts">
  import gsap from "gsap";

  type ProgressBarPropsType = {
    progress: number;
  };

  let { progress }: ProgressBarPropsType = $props();
</script>

<div
  class={[
    "w-full h-2 rounded-full overflow-hidden border transition-[border] duration-200",
    "t-dark:border-zinc-750",
    "t-light:border-zinc-250",
    "t-rust:border-rust-750",
    "t-midnight:border-gray-750",
  ]}
>
  <div
    {@attach (element: HTMLDivElement) => {
      gsap.to(element, {
        width: `${progress}%`,
        duration: 0.5,
        overwrite: "auto",
      });
    }}
    class={[
      "w-0 h-full rounded-full transition-[background-color] duration-200",
      "t-dark:bg-zinc-750",
      "t-light:bg-zinc-250",
      "t-rust:bg-rust-750",
      "t-midnight:bg-gray-750",
    ]}
  ></div>
</div>
