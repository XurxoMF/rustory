import { RustoryTaskError } from '@shared/errors/RustoryTasksrror'
import type { TaskBase } from '@renderer/lib/classes/tasks/TaskBase.svelte'

/**
 * Tasks of the app.
 */
export class Tasks {
  /**
   * Singleton instance of the Tasks.
   */
  private static _instance: Tasks | null = null

  /**
   * Get the instance of the Tasks.
   * @throws A {@link RustoryTasksError} if the Tasks is not initialized.
   */
  public static get instance(): Tasks {
    if (Tasks._instance === null) throw new RustoryTaskError('Tasks not initialized!', RustoryTaskError.Codes.NOT_INITIALIZED)
    return Tasks._instance
  }

  /**
   * List of tasks.
   */
  private _tasks: TaskBase[]

  private constructor(data: { tasks: TaskBase[] }) {
    this._tasks = $state(data.tasks)
  }

  /**
   * Loads all the Rustory tasks on this instance.
   */
  public static async init(): Promise<void> {
    try {
      // Load tasks. AKA do nothing.
      const tasks: TaskBase[] = []

      Tasks._instance = new Tasks({
        tasks
      })
    } catch (err) {
      window.api.logger.error('There was an error initializating the tasks! The app will be closed!')
      window.api.logger.debug(`There was an error initializating the tasks:\n${JSON.stringify(err)}`)
      window.api.rustory.exit(1)
    }
  }

  /**
   * List of tasks.
   */
  public get tasks(): TaskBase[] {
    return this._tasks
  }
}
