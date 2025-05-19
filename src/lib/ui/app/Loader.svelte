<script lang="ts" module>
  /**
   * List of tasks to complete.
   *
   * If you want to add a new tasks to the list just add a new task here.
   */
  const TASKS = [
    { id: "app-data", localesDescriptionKey: "loader.tasks.AppDataDescription" },
    { id: "timeout", localesDescriptionKey: "loader.tasks.TimeoutDescription" },
  ] as const;

  /**
   * Type of the TASKS list.
   */
  type TasksType = typeof TASKS;

  /**
   * Type of each individual task.
   */
  type TaskType = TasksType[number];

  /**
   * Type with the IDs of the TASKS.
   */
  type TaskIdType = TaskType["id"];

  /**
   * Total amount of tasks.
   */
  const TOTAL: number = TASKS.length;

  /**
   * Type of the completed task IDs list.
   */
  type CompletedType = {
    ids: string[];
  };

  /**
   * List of completed task IDs.
   */
  const completed: CompletedType = $state({ ids: [] });

  /**
   * Type of the loader store.
   */
  type LoaderType = {
    TASKS: TasksType;
    TOTAL: number;
    completed: CompletedType;
  };

  /**
   * Loader data containing:
   * - TASKS - List of available tasks.
   * - TOTAL - Total amount of tasks.
   * - completed - Ids of the completed tasks.
   */
  export const loader: LoaderType = { TASKS, TOTAL, completed };

  /**
   * If the loader is visible or not.
   *
   * This is not calculated using the completed.ids.length directly to fix a rendering bug.
   *
   * If not used, the last task will not be changed to completed on the UI.
   */
  let visible: boolean = $state(true);

  /**
   * Marks a task as completed and increments the completed tasks counter.
   *
   * @param id - The id of the task you want to complete.
   */
  export const completeTask = (id: TaskIdType) => {
    completed.ids.push(id);

    // Check the `visible` variable description to know why this is here xD
    if (completed.ids.length === TOTAL) setTimeout(() => (visible = false), 100);
  };

  /**
   * Resets the loader's completed tasks.
   */
  export const resetCompletedTasks = () => {
    completed.ids = [];
    visible = true;
  };
</script>

<script lang="ts">
  import { fade } from "svelte/transition";
  import i18n from "$i18n";
  import gsap from "gsap";

  import { appMaximized } from "$lib/stores/AppStore.svelte";

  import Icon from "$lib/ui/base/Icon.svelte";

  let loaderBar: HTMLDivElement | undefined = $state();
  let loaderAnimation: gsap.core.Tween;

  $inspect(completed.ids);

  $effect(() => {
    if (loaderBar) {
      const progressPercent = TOTAL > 0 ? (completed.ids.length / TOTAL) * 100 : 0;

      loaderAnimation?.kill();
      loaderAnimation = gsap.to(loaderBar, {
        width: `${progressPercent}%`,
        duration: 0.2,
      });
    }
  });
</script>

{#if visible}
  <div
    class={[
      "fixed z-[1000] w-full h-full flex flex-col items-center justify-center gap-8 duration-200",
      "t-dark:text-zinc-100 t-dark:bg-zinc-900",
      "t-light:text-zinc-900 t-light:bg-zinc-100",
      "t-rust:text-rust-100 t-rust:bg-rust-900",
      "t-midnight:text-gray-100 t-midnight:bg-gray-900",
      !appMaximized.value && "rounded-md",
    ]}
    transition:fade={{ duration: 200, delay: 200 }}
  >
    <h1 class="text-4xl">{`${$i18n.t("generic.WelcomeToRustory")}`}</h1>

    <div
      class={[
        "w-1/3 h-2 rounded-full overflow-hidden duration-200",
        "t-dark:bg-zinc-800",
        "t-light:bg-zinc-300",
        "t-rust:bg-rust-800",
        "t-midnight:bg-gray-800",
      ]}
    >
      <div
        bind:this={loaderBar}
        class={[
          "h-full w-0 duration-200",
          "t-dark:bg-zinc-700",
          "t-light:bg-zinc-400",
          "t-rust:bg-rust-700",
          "t-midnight:bg-gray-700",
        ]}
      ></div>
    </div>

    <div class="w-full max-h-40 flex flex-col items-center justify-center overflow-y-scroll">
      {#each TASKS as TASK}
        {@const isCompleted = completed.ids.includes(TASK.id)}

        <div class="w-fit flex items-center gap-1">
          <Icon
            class={["text-lg", isCompleted && "text-green-700"]}
            icon={isCompleted ? "fluent:checkmark-circle-48-regular" : "svg-spinners:6-dots-scale"}
          />
          <p>{$i18n.t(TASK.localesDescriptionKey)}</p>
        </div>
      {/each}
    </div>
  </div>
{/if}
