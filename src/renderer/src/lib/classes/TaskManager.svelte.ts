import { SvelteMap } from 'svelte/reactivity'

import { BaseTask } from './BaseTask.svelte'
import type { TaskTarget } from './TaskTarget.svelte'

export class TaskManagerClass {
  /**
   * Singleton instance of the TaskManagerClass.
   */
  private static _instance: TaskManagerClass | null = null

  /**
   * Get the instance of the TaskManagerClass.
   */
  static get instance(): TaskManagerClass {
    if (TaskManagerClass._instance === null) TaskManagerClass._instance = new TaskManagerClass()
    return TaskManagerClass._instance
  }

  /**
   * The list of ID <-> Task.
   */
  private _tasks = new SvelteMap<string, BaseTask>()

  private constructor() {
    window.api.zip.compressor.on.progress((_event, id, progress) => this.setTaskProgress(id, progress))
    window.api.zip.extractor.on.progress((_event, id, progress) => this.setTaskProgress(id, progress))
    window.api.net.downloader.on.progress((_event, id, progress) => this.setTaskProgress(id, progress))
  }

  /**
   * Get a list with all the tasks.
   *
   * @returns The tasks.
   */
  getAllTasks(): BaseTask[] {
    return Array.from(this._tasks.values())
  }

  /**
   * Get a list with all the tasks of a specified type.
   *
   * @param type The type of the task.
   * @returns The tasks.
   */
  getTasksByTarget(type: TaskTarget.TypeType): BaseTask[] {
    return Array.from(this._tasks.values()).filter((task) => task.target.type === type)
  }

  /**
   * Get the tasks with the specified ID.
   *
   * @param id The ID of the task.
   * @returns The tasks.
   */
  getTask(id: string): BaseTask | undefined {
    return this._tasks.get(id)
  }

  /**
   * Remove the task with the specified ID.
   *
   * @param id The ID of the task.
   */
  removeTask(id: string): void {
    this._tasks.delete(id)
  }

  /**
   * Remove the completed tasks.
   */
  clearCompletedTasks(): void {
    for (const [id, task] of this._tasks) {
      if (task.status === BaseTask.Status.COMPLETED) {
        this.removeTask(id)
      }
    }
  }

  /**
   * Set the rpogress of a task by ID.
   *
   * @param id The ID of the task.
   * @param progress The progress to set.
   */
  setTaskProgress(id: string, progress: number): void {
    const task = this._tasks.get(id)
    if (task) task.progress = progress
  }
}
