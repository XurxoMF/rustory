type LoaderStoreType = {
  completed: number;
  total: number;
};

/**
 * 1. Ger maximized state and app version.
 * 2. Small timeout after everything else was completed.
 */
const TOTAL_TASKS = 2;

export const loader = $state<LoaderStoreType>({ completed: 0, total: TOTAL_TASKS });

/**
 * Increments the loader's completed tasks by the specified number.
 *
 * @param by - Number of tasks completed.
 */
export const incrementLoader = (by: number) => {
  loader.completed += by;
};

/**
 * Resets the loader's completed tasks.
 *
 * @param by - Number of tasks completed.
 */
export const resetLoader = () => {
  loader.completed = 0;
};
