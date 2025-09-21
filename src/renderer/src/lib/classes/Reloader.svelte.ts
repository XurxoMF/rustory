/**
 * Store for the reaload functions.
 */
export class Reloader {
  /**
   * Singleton instance of the Window.
   */
  private static _instance: Reloader = new Reloader()

  /**
   * Get the instance of the Window.
   */
  public static get instance(): Reloader {
    return Reloader._instance
  }

  /**
   * The callbacks that will be executed when the page is reloaded.
   */
  private _callbacks: Reloader.Task[] = []

  private constructor() {}

  /**
   * Add a new task to the reloader.
   * @param task - The task to add to the onReload list
   */
  public addTask(task: Reloader.Task) {
    this._callbacks.push(task)
  }

  /**
   * Remove a task from the reloader.
   * @param id - The if of the task to remove from the onReload list
   */
  public removeTask(id: string) {
    this._callbacks = this._callbacks.filter((task) => task.id !== id)
  }

  /**
   * Executes the reload tasks.
   */
  public executeTasks() {
    for (const task of this._callbacks) {
      task.action()
    }
  }
}

export namespace Reloader {
  /**
   * A task to executer when the page is reloaded.
   */
  export type Task = { id: string; action: () => void | Promise<void> }
}
