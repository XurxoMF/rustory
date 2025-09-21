import { RustoryVSVersionError } from '@shared/errors/RustoryVSVersionError'
import { TaskInstallVersion } from '../tasks/TaskInstallVersion.svelte'
import { Data } from '../Data.svelte'
import { TaskBase } from '../tasks/TaskBase.svelte'

/**
 * Vintage Storty Version.
 *
 * Must have at least the same properties as {@link TVSVersion}.
 */
export class VSVersion {
  /**
   * The version string, e.g. "1.15.4".
   */
  private _version: string

  /**
   * The path to the version, e.g. "/path/to/vintagestory/versions/1.15.4".
   */
  private _path: string

  /**
   * The state of the version.
   */
  private _state: VSVersion.State

  public constructor(data: { version: string; path: string; state?: VSVersion.State | undefined }) {
    this._version = data.version
    this._path = data.path
    this._state = $state(data.state ?? VSVersion.State.NOT_INSTALLED)
  }

  /**
   * The version string, e.g. "1.15.4".
   */
  public get version(): string {
    return this._version
  }

  /**
   * The path to the version, e.g. "/path/to/vintagestory/versions/1.15.4".
   */
  public get path(): string {
    return this._path
  }

  /**
   * The state of the version.
   */
  public get state(): VSVersion.State {
    return this._state
  }

  /**
   * The state of the version.
   */
  public set state(state: VSVersion.State) {
    this._state = state
  }

  /**
   * Convert this {@link VSVersion} into a {@link TVSVersion} json.
   * @returns The {@link TVSVersion} json.
   */
  public toJSON(): TVSVersion {
    return {
      version: this._version,
      path: this._path
    }
  }

  /**
   * Converts a {@link TVSVersion} json to a {@link VSVersion}.
   * @param json The {@link TVSVersion} to convert.
   * @param state The state of the versino.
   * @returns The {@link VSVersion}.
   */
  public static fromJSON(json: TVSVersion, state?: VSVersion.State): VSVersion {
    return new VSVersion({
      version: json.version,
      path: json.path,
      state: state ?? VSVersion.State.NOT_INSTALLED
    })
  }

  /**
   * Delete this version from the DB.
   * @throws {RustoryVSVersionError} When there is an error deleting the version from the DB.
   */
  public async delete(): Promise<void> {
    try {
      await window.api.db.vsVersion.deleteVSVersion(this.toJSON())
    } catch (err) {
      window.api.logger.error('There was an error deleting the vs version to the DB!')
      window.api.logger.debug(`There was an error deleting the vs version to the DB:\n${JSON.stringify(err)}`)
      throw new RustoryVSVersionError(`There was an error deleting the vs version to the DB:\n${JSON.stringify(err)}`, RustoryVSVersionError.Codes.VSVERSION_ERROR)
    }
  }

  /**
   * Save this version to the DB.
   * @throws {RustoryVSVersionError} When there is an error saving the version to the DB.
   */
  public async save(): Promise<void> {
    try {
      window.api.logger.info(`Saving version ${this._version}...`)

      await window.api.db.vsVersion.saveVSVersion(this.toJSON())

      window.api.logger.info(`Successfully saved version ${this._version}!`)
    } catch (err) {
      window.api.logger.error(`There was an error saving the vs version ${this._version} to the DB!`)
      window.api.logger.debug(`There was an error saving the vs version ${this._version} to the DB:\n${JSON.stringify(err)}`)
      throw new RustoryVSVersionError(`There was an error saving the vs version ${this._version} to the DB:\n${JSON.stringify(err)}`, RustoryVSVersionError.Codes.VSVERSION_ERROR)
    }
  }

  /**
   * Install this version.
   * @param url The url to download the version from.
   */
  public async install(url: string): Promise<void> {
    window.api.logger.info(`Installing version ${this._version}...`)

    this._state = VSVersion.State.INSTALLING

    const task = new TaskInstallVersion({ version: this._version, url, outputPath: this._path })

    Data.instance.tasks.push(task)

    const status = await task.execute()

    if (status === TaskBase.Status.COMPLETED) {
      window.api.logger.info(`Successfully installed version ${this._version}!`)
      this._state = VSVersion.State.INSTALLED
      this.save()
    } else {
      this._state = VSVersion.State.NOT_INSTALLED
    }
  }

  /**
   * Get all the VS Versions from the DB.
   * @returns All the {@link VSVersion} from the DB.
   * @throws {RustoryVSVersionError} When there is an error getting the VS Versions.
   */
  public static async getAllFromDB(): Promise<VSVersion[]> {
    try {
      const versions = await window.api.db.vsVersion.getVSVersions()

      return versions.map((v) => VSVersion.fromJSON(v))
    } catch (err) {
      window.api.logger.error('There was an error getting the VS Versions!')
      window.api.logger.debug(`There was an error getting the VS Versions:\n${JSON.stringify(err)}`)
      throw new RustoryVSVersionError(`There was an error getting the VS Versions:\n${JSON.stringify(err)}`, RustoryVSVersionError.Codes.VSVERSION_ERROR)
    }
  }
}

export namespace VSVersion {
  /**
   * State of the version.
   */
  export enum State {
    NOT_INSTALLED = 'not_installed',
    INSTALLED = 'installed',
    INSTALLING = 'installing',
    DELETING = 'deleting'
  }
}
