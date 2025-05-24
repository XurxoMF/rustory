<script lang="ts">
  import gsap from "gsap";

  type ProgressBarPropsType = {
    progress: number;
  };

  let { progress }: ProgressBarPropsType = $props();
</script>

<div
  class={[
    "w-full h-2 rounded-full overflow-hidden transition-[background-color] duration-200",
    "t-dark:bg-zinc-800",
    "t-light:bg-zinc-300",
    "t-rust:bg-rust-800",
    "t-midnight:bg-gray-800",
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
      "t-dark:bg-zinc-700",
      "t-light:bg-zinc-400",
      "t-rust:bg-rust-700",
      "t-midnight:bg-gray-700",
    ]}
  ></div>
</div>
