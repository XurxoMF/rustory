/**
 * Basic task interface.
 */
export interface TaskBase {
  type: TaskBase.Type
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
  /**
   * Type fo task.
   */
  export enum Type {
    VS_VERSION_INSTALL = 'vs_version_install'
  }
}
