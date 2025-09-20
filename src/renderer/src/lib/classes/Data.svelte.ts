import type { TaskBase } from './tasks/TaskBase.svelte'

import type { VSInstance } from './vintagestory/VSInstance.svelte'
import type { VSVersion } from './vintagestory/VSVersion.svelte'

export class Data {
  /**
   * Singleton instance of the Data.
   */
  private static _instance: Data | null = null

  /**
   * Get the instance of the Data.
   */
  public static get instance(): Data {
    if (Data._instance === null) Data._instance = new Data()
    return Data._instance
  }

  /**
   * List of tasks.
   */
  private _tasks: TaskBase[] = $state([])

  /**
   * Vintage Story Instances.
   */
  private _vsInstances: VSInstance[] = $state([])

  /**
   * Vintage Story Versions.
   */
  private _vsVersions: VSVersion[] = $state([])

  private constructor() {}

  /**
   * Loads all the Rustory data on this instance.
   */
  public async init(): Promise<void> {
    try {
      // TODO: Load all the data here.
    } catch (err) {
      window.api.logger.error('There was an error initializating the data! The app will be closed!')
      window.api.logger.error(`There was an error initializating the data:\n${JSON.stringify(err)}`)
      window.api.rustory.exit(1)
    }
  }

  /**
   * List of tasks.
   */
  public get tasks(): TaskBase[] {
    return this._tasks
  }

  /**
   * Vintage Story Instances.
   */
  public get vsInstances(): VSInstance[] {
    return this._vsInstances
  }

  /**
   * Vintage Story Versions.
   */
  public get vsVersions(): VSVersion[] {
    return this._vsVersions
  }
}
