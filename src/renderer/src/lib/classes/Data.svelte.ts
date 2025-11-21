import { RustoryDataError } from '@shared/errors/RustoryDataError'
import { VSInstance } from '@renderer/lib/classes/vintagestory/VSInstance.svelte'
import { VSVersion } from '@renderer/lib/classes/vintagestory/VSVersion.svelte'
import { Config } from '@renderer/lib/classes/Config.svelte'

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

  /**
   * Vintage Story Versions.
   */
  private _vsVersions: VSVersion[]

  private constructor(data: { vsInstances: VSInstance[]; vsVersions: VSVersion[] }) {
    this._vsInstances = $state(data.vsInstances)
    this._vsVersions = $state(data.vsVersions)
  }

  /**
   * Loads all the Rustory data on this instance.
   */
  public static async init(): Promise<void> {
    try {
      // Load all the VS Versions.
      const vsVersionsJSON = await VSVersion.getAllFromDB()
      const vsVersions: VSVersion[] = []
      for (const vsVersion of vsVersionsJSON) {
        vsVersions.push(VSVersion.fromJSON(vsVersion, VSVersion.State.INSTALLED))
      }

      // Load all the VS Instances
      const vsInstancesJSON = await VSInstance.getAllFromDB()
      const vsInstances: VSInstance[] = []
      for (const vsInstance of vsInstancesJSON) {
        vsInstances.push(VSInstance.fromJSON(vsInstance))

        // Check if the VS Version needed by the instance was already loaded. If not, add it as NOT_INSTALLED.
        const version = vsVersions.find((v) => v.version === vsInstance.version)
        if (version === undefined) {
          const path = await window.api.fs.join(Config.instance.vsVersionsPath, vsInstance.version)
          vsVersions.push(new VSVersion({ version: vsInstance.version, path, state: VSVersion.State.NOT_INSTALLED }))
        }
      }

      // TODO: Load all the Mods and Instance Backups.

      Data._instance = new Data({
        vsVersions,
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

  /**
   * Vintage Story Versions.
   */
  public get vsVersions(): VSVersion[] {
    return this._vsVersions
  }

  /**
   * Vintage Story Versions.
   */
  public set vsVersions(vsVersions: VSVersion[]) {
    this._vsVersions = vsVersions
  }
}
