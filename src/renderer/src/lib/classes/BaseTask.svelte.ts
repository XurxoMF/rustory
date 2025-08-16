import type { TaskTarget } from './TaskTarget.svelte'

export interface BaseTask {
  id: string
  target: TaskTarget
  status: BaseTask.Status
  progress: number
  start(): Promise<boolean>
  cancel(): Promise<boolean>
}

export namespace BaseTask {
  export enum Status {
    PENDING = 'pending',
    RUNNING = 'running',
    COMPLETED = 'completed',
    FAILED = 'failed',
    CANCELLED = 'cancelled'
  }
}
