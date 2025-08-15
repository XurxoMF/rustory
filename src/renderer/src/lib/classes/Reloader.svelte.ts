export class Reloader {
  /**
   * Singleton instance of the Window.
   */
  private static _instance: Reloader | null = null

  /**
   * Get the instance of the Window.
   */
  static get instance(): Reloader {
    if (Reloader._instance === null) Reloader._instance = new Reloader()
    return Reloader._instance
  }

  /**
   * The callbacks that will be executed when the page is reloaded.
   */
  private _callbacks: Reloader.Action[] = []

  private constructor() {}

  /**
   * Add a new task to the reloader.
   *
   * @param task - The task to add to the onReload list
   */
  addTask(task: Reloader.Action) {
    this._callbacks.push(task)
  }

  /**
   * Remove a task from the reloader.
   *
   * @param id - The if of the task to remove from the onReload list
   */
  removeTask(id: string) {
    this._callbacks = this._callbacks.filter((task) => task.id !== id)
  }

  /**
   * Executes the reload tasks.
   */
  executeTasks() {
    for (const task of this._callbacks) {
      task.action()
    }
  }
}

export namespace Reloader {
  export type Action = { id: string; action: () => void | Promise<void> }
}
