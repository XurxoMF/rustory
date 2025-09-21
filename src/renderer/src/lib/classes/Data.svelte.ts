import { RustoryDataError } from '@shared/errors/RustoryDataError'
import type { TaskBase } from './tasks/TaskBase.svelte'
import type { VSInstance } from './vintagestory/VSInstance.svelte'
import { VSVersion } from './vintagestory/VSVersion.svelte'

export class Data {
  /**
   * Singleton instance of the Data.
   */
  private static _instance: Data | null = null

  /**
   * Get the instance of the Data.
   * @throws A {@link RustoryDataError} if the Data is not initialized.
   */
  public static get instance(): Data {
    if (Data._instance === null) throw new RustoryDataError('Data not initialized!', RustoryDataError.Codes.NOT_INITIALIZED)
    return Data._instance
  }

  /**
   * List of tasks.
   */
  private _tasks: TaskBase[]

  /**
   * Vintage Story Instances.
   */
  private _vsInstances: VSInstance[]

  /**
   * Vintage Story Versions.
   */
  private _vsVersions: VSVersion[]

  private constructor(data: { tasks: TaskBase[]; vsInstances: VSInstance[]; vsVersions: VSVersion[] }) {
    this._tasks = $state(data.tasks)
    this._vsInstances = $state(data.vsInstances)
    this._vsVersions = $state(data.vsVersions)
  }

  /**
   * Loads all the Rustory data on this instance.
   */
  public static async init(): Promise<void> {
    try {
      // Load tasks. AKA do nothing.
      const tasks: TaskBase[] = []

      // Load all the Versions.
      const vsVersionsJSON = await VSVersion.getAllFromDB()
      const vsVersions: VSVersion[] = []
      for (const vsVersion of vsVersionsJSON) {
        vsVersions.push(VSVersion.fromJSON(vsVersion, VSVersion.State.INSTALLED))
      }

      // TODO: Load all the Instances.
      const vsInstances: VSInstance[] = []
      // TODO: Add the Instances to the array. Also add Versions as NOT_INSTALLED if an instance needs that Version but it's missing.

      Data._instance = new Data({
        tasks,
        vsVersions,
        vsInstances
      })
    } catch (err) {
      window.api.logger.error('There was an error initializating the data! The app will be closed!')
      window.api.logger.debug(`There was an error initializating the data:\n${JSON.stringify(err)}`)
      window.api.rustory.exit(1)
    }
  }
  s
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
