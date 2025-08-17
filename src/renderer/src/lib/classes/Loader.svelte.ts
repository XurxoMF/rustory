import { m } from '@renderer/paraglide/messages'

export class Loader {
  /**
   * Singleton instance of the Loader.
   */
  private static _instance: Loader | null = null

  /**
   * Get the instance of the Loader.
   */
  static get instance(): Loader {
    if (Loader._instance === null) Loader._instance = new Loader()
    return Loader._instance
  }

  /**
   * List of tasks to complete.
   * If you want to add a new tasks to the list just add a new task here.
   */
  static TASKS = [
    { id: 'app-init', description: m.loader__tasks__desc__app_init() },
    { id: 'timeout', description: m.loader__tasks__desc__timeout() }
  ] as const

  /**
   * Total amount of tasks.
   */
  static TOTAL_TASKS: number = Loader.TASKS.length

  /**
   * List of completed task IDs.
   */
  private _completedTasks: string[] = $state([])

  /**
   * If the loader is visible or not.
   * This is not calculated using the completed.ids.length directly to fix a rendering bug.
   * If not used, the last task will not be changed to completed on the UI.
   */
  private _isVisible: boolean = $state(true)

  /**
   * If we should show tasks or not.
   */
  showTasks: boolean = $state(false)

  /**
   * Start loading the UI after all the data was loaded.
   */
  loadUI: boolean = $state(false)

  private constructor() {}

  /**
   * List of completed task IDs.
   */
  get completedTasks(): string[] {
    return this._completedTasks
  }

  /**
   * If the loader is visible or not.
   * This is not calculated using the completed.ids.length directly to fix a rendering bug.
   * If not used, the last task will not be changed to completed on the UI.
   */
  get isVisible(): boolean {
    return this._isVisible
  }

  /**
   * Marks a task as completed and increments the completed tasks counter.
   * @param id - The id of the task you want to complete.
   */
  completeTask(id: Loader.TaskIdType): void {
    this._completedTasks.push(id)
    // Check the `visible` variable description to know why this is here xD
    if (this._completedTasks.length === Loader.TOTAL_TASKS) setTimeout(() => (this._isVisible = false), 100)
  }

  /**
   * Resets the loader's completed tasks.
   */
  resetCompletedTasks(): void {
    this._completedTasks = []
    this._isVisible = true
  }
}

export namespace Loader {
  export type TasksType = typeof Loader.TASKS
  export type TaskType = TasksType[number]
  export type TaskIdType = TaskType['id']
}
