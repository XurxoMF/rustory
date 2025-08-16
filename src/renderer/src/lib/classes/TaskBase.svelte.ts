import type { TaskTarget } from './TaskTarget.svelte'

export interface TaskBase {
  id: string
  target: TaskTarget
  status: TaskBase.Status
  progress: number
  start(): Promise<boolean>
  cancel(): Promise<boolean>
}

export namespace TaskBase {
  export enum Status {
    PENDING = 'pending',
    RUNNING = 'running',
    COMPLETED = 'completed',
    FAILED = 'failed',
    CANCELLED = 'cancelled'
  }
}
