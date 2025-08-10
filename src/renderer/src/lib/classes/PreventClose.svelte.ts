import { v4 as uuidv4 } from 'uuid'

export class PreventClose {
  /**
   * List of tasks that prevent the app from closing.
   */
  private _tasks: PreventClose.PreventCloseTaskType[] = $state([])

  /**
   * If the app can be closed or not.
   */
  private _prevented: boolean = $derived(this._tasks.length >= 1)

  /**
   * List of tasks that prevent the app from closing.
   */
  get tasks(): PreventClose.PreventCloseTaskType[] {
    return this._tasks
  }

  /**
   * Add a new task that will prevent the app from closing.
   *
   * @param reason - The reason why the app can't be closed. It'll be used on notifications.
   * @returns The id of the new task. Used to remove the task.
   */
  addTask(reason: string): string {
    const id: string = uuidv4()
    this._tasks.push({ id, reason })
    return id
  }

  /**
   * Removes a task that prevents the ap from closing.
   *
   * @param id - The id of the task to remove.
   */
  removeTask(id: string) {
    this._tasks = this._tasks.filter((task) => task.id !== id)
  }

  /**
   * If the app can be closed or not.
   */
  get prevented(): boolean {
    return this._prevented
  }
}

export namespace PreventClose {
  export type PreventCloseTaskType = { id: string; reason: string }
}
