import { TaskBase } from './TaskBase.svelte'
import type { TaskTarget } from './TaskTarget.svelte'

export class TaskCompress implements TaskBase {
  /**
   * ID of the task.
   */
  private _id: string

  /**
   * What is this target for.
   */
  private _target: TaskTarget

  /**
   * Status of the task.
   */
  private _status: TaskBase.Status

  /**
   * Current progress of the task.
   */
  private _progress: number

  constructor(taskCompress: { id: string; target: TaskTarget }) {
    this._id = $state(taskCompress.id)
    this._target = $state(taskCompress.target)
    this._status = $state(TaskBase.Status.PENDING)
    this._progress = $state(0)
  }

  /**
   * ID of the task.
   */
  get id(): string {
    return this._id
  }

  /**
   * What is this target for.
   */
  get target(): TaskTarget {
    return this._target
  }

  /**
   * Status of the task.
   */
  get status(): TaskBase.Status {
    return this._status
  }

  /**
   * Current progress of the task.
   */
  get progress(): number {
    return this._progress
  }

  /**
   * Current progress of the task.
   * @param progress The progress to set.
   */
  set progress(progress: number) {
    if (progress < 0 || progress > 100) throw new Error("Progress can't be greater than 100 or less than 0!")
    this._progress = progress
  }

  /**
   * Starts the task.
   * @returns If the task could be started or not.
   */
  async start(): Promise<boolean> {
    // TODO: Implement task start
    throw new Error('Method not implemented.')
  }

  /**
   * Cancels the task.
   * @returns If the task could be calnceled or not.
   */
  async cancel(): Promise<boolean> {
    // TODO: Implement task cancel
    throw new Error('Method not implemented.')
  }
}
