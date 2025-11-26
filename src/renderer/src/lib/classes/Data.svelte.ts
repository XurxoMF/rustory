import { RustoryDataError } from '@shared/errors/RustoryDataError'

import { VSInstance } from '@renderer/lib/classes/vintagestory/VSInstance.svelte'

/**
 * Data of the app.
 */
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
   * Vintage Story Instances.
   */
  private _vsInstances: VSInstance[]

  private constructor(data: { vsInstances: VSInstance[] }) {
    this._vsInstances = $state(data.vsInstances)
  }

  /**
   * Loads all the Rustory data on this instance.
   */
  public static async init(): Promise<void> {
    try {
      // Load all the VS Instances
      const vsInstancesJSON = await VSInstance.getAllFromDB()
      const vsInstances = await Promise.all(vsInstancesJSON.map((vsijson) => VSInstance.fromJSON(vsijson)))

      Data._instance = new Data({
        vsInstances
      })
    } catch (err) {
      window.api.logger.error('There was an error initializating the data! The app will be closed!')
      window.api.logger.debug(`There was an error initializating the data:\n${JSON.stringify(err)}`)
      window.api.rustory.exit(1)
    }
  }

  /**
   * Vintage Story Instances.
   */
  public get vsInstances(): VSInstance[] {
    return this._vsInstances
  }

  /**
   * Vintage Story Instances.
   */
  public set vsInstances(vsInstances: VSInstance[]) {
    this._vsInstances = vsInstances
  }
}
