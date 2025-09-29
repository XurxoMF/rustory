import { RustoryVSVersionError } from '@shared/errors/RustoryVSVersionError'

import { TaskInstallVSVersion } from '@renderer/lib/classes/tasks/TaskInstallVSVersion.svelte'
import { Data } from '../Data.svelte'
import { TaskBase } from '../tasks/TaskBase.svelte'

/**
 * VS Version.
 *
 * Must have at least the same properties as {@link TVSVersion}.
 */
export class VSVersion {
  /**
   * The version string, e.g. "1.15.4".
   */
  private _version: string

  /**
   * The path to the VS Version, e.g. "/path/to/vintagestory/versions/1.15.4".
   */
  private _path: string

  /**
   * The state of the VS Version.
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
   * The path to the VS Version, e.g. "/path/to/vintagestory/versions/1.15.4".
   */
  public get path(): string {
    return this._path
  }

  /**
   * The state of the VS Version.
   */
  public get state(): VSVersion.State {
    return this._state
  }

  /**
   * The state of the VS Version.
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
   * Delete this VS Version from the file system and the DB.
   * @throws A {@link RustoryVSVersionError} error.
   */
  public async delete(): Promise<void> {
    try {
      window.api.logger.info(`Deleting VS Version ${this._version}...`)

      await window.api.fs.deletePaths([this._path])
      await window.api.db.vsVersion.deleteVSVersion(this.toJSON())

      window.api.logger.info(`Successfully deleted VS Version ${this._version}!`)
    } catch (err) {
      window.api.logger.error('There was an error deleting the VS Version!')
      window.api.logger.debug(`There was an error deleting the VS Version:\n${JSON.stringify(err)}`)
      throw new RustoryVSVersionError(`There was an error deleting the VS Version:\n${JSON.stringify(err)}`, RustoryVSVersionError.Codes.VSVERSION_ERROR)
    }
  }

  /**
   * Save this VS Version to the DB.
   * @throws A {@link RustoryVSVersionError} error.
   */
  public async save(): Promise<void> {
    try {
      window.api.logger.info(`Saving VS Version ${this._version}...`)

      await window.api.db.vsVersion.saveVSVersion(this.toJSON())

      window.api.logger.info(`Successfully saved VS Version ${this._version}!`)
    } catch (err) {
      window.api.logger.error(`There was an error saving the VS Version ${this._version} to the DB!`)
      window.api.logger.debug(`There was an error saving the VS Version ${this._version} to the DB:\n${JSON.stringify(err)}`)
      throw new RustoryVSVersionError(`There was an error saving the VS Version ${this._version} to the DB:\n${JSON.stringify(err)}`, RustoryVSVersionError.Codes.VSVERSION_ERROR)
    }
  }

  /**
   * Install this VS Version.
   * @param url The url to download the VS Version from.
   */
  public async install(url: string): Promise<void> {
    window.api.logger.info(`Installing VS Version ${this._version}...`)

    this._state = VSVersion.State.INSTALLING

    const task = new TaskInstallVSVersion({ version: this._version, url, outputPath: this._path })

    Data.instance.tasks.push(task)

    const status = await task.execute()

    if (status === TaskBase.Status.COMPLETED) {
      window.api.logger.info(`Successfully installed VS Version ${this._version}!`)
      this._state = VSVersion.State.INSTALLED
      this.save()
    } else {
      this._state = VSVersion.State.NOT_INSTALLED
    }
  }

  /**
   * Get all the VS Versions from the DB.
   * @returns All the {@link VSVersion} from the DB.
   * @throws A {@link RustoryVSVersionError} error.
   */
  public static async getAllFromDB(): Promise<VSVersion[]> {
    try {
      window.api.logger.info('Getting all the VS Versions from the DB...')

      const versions = await window.api.db.vsVersion.getVSVersions()

      window.api.logger.info('Successfully got all the VS Versions from the DB!')

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
   * State of the VS Versions.
   */
  export enum State {
    NOT_INSTALLED = 'not_installed',
    INSTALLED = 'installed',
    INSTALLING = 'installing',
    DELETING = 'deleting'
  }
}
