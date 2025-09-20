/**
 * Basic task interface.
 */
export interface TaskBase {
  id: string
  status: TaskBase.Status
  progress: number
  execute(): Promise<TaskBase.Status>
  cancel(): Promise<boolean>
}

export namespace TaskBase {
  /**
   * Task statuses.
   */
  export enum Status {
    PENDING = 'pending',
    RUNNING = 'running',
    COMPLETED = 'completed',
    FAILED = 'failed',
    CANCELED = 'canceled'
  }
}
