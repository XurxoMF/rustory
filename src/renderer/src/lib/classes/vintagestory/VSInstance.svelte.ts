import { RustoryVSInstanceError } from '@shared/errors/RustoryVSInstanceError'

/**
 * VS Instance.
 *
 * Must have at least the same properties as {@link VSInstanceType}.
 */
export class VSInstance {
  /**
   * The id of the VS Instance.
   */
  private _id: string

  /**
   * The name of the VS Instance.
   */
  private _name: string

  /**
   * The path of the VS Instance.
   */
  private _path: string

  /**
   * The version of the VS Instance.
   */
  private _version: string

  /**
   * The mods of the VS Instance.
   */
  private _mods: VSModType[]

  /**
   * The start parameters of the VS Instance.
   */
  private _startParams: string

  /**
   * The backups limit of the VS Instance.
   */
  private _backupsLimit: number

  /**
   * The backups auto of the VS Instance.
   */
  private _backupsAuto: boolean

  /**
   * The compression level of the VS Instance.
   */
  private _compressionLevel: number

  /**
   * The last time played of the VS Instance.
   */
  private _lastTimePlayed: number

  /**
   * The total time played of the VS Instance.
   */
  private _totalTimePlayed: number

  /**
   * The mesa gl thread of the VS Instance.
   */
  private _mesaGlThread: boolean

  /**
   * The env vars of the VS Instance.
   */
  private _envVars: string

  /**
   * The state of the VS Instance.
   */
  private _state: VSInstance.State

  public constructor(data: {
    id: string
    name: string
    path: string
    version: string
    startParams: string
    backupsLimit: number
    backupsAuto: boolean
    compressionLevel: number
    lastTimePlayed: number
    totalTimePlayed: number
    mesaGlThread: boolean
    envVars: string
    state?: VSInstance.State | undefined
  }) {
    this._id = data.id
    this._name = $state(data.name)
    this._path = data.path
    this._version = $state(data.version)
    this._mods = $state([])
    this._startParams = $state(data.startParams)
    this._backupsLimit = $state(data.backupsLimit)
    this._backupsAuto = $state(data.backupsAuto)
    this._compressionLevel = $state(data.compressionLevel)
    this._lastTimePlayed = $state(data.lastTimePlayed)
    this._totalTimePlayed = $state(data.totalTimePlayed)
    this._mesaGlThread = $state(data.mesaGlThread)
    this._envVars = $state(data.envVars)
    this._state = $state(data.state ?? VSInstance.State.STOPPED)
  }

  /**
   * The id of the VS Instance.
   */
  public get id(): string {
    return this._id
  }

  /**
   * The name of the VS Instance.
   */
  public get name(): string {
    return this._name
  }

  /**
   * The path of the VS Instance.
   */
  public get path(): string {
    return this._path
  }

  /**
   * The version of the VS Instance.
   */
  public get version(): string {
    return this._version
  }

  /**
   * The mods of the VS Instance.
   */
  public get mods(): VSModType[] {
    return this._mods
  }

  /**
   * The start parameters of the VS Instance.
   */
  public get startParams(): string {
    return this._startParams
  }

  /**
   * The backups limit of the VS Instance.
   */
  public get backupsLimit(): number {
    return this._backupsLimit
  }

  /**
   * The backups auto of the VS Instance.
   */
  public get backupsAuto(): boolean {
    return this._backupsAuto
  }

  /**
   * The compression level of the VS Instance.
   */
  public get compressionLevel(): number {
    return this._compressionLevel
  }

  /**
   * The last time played of the VS Instance.
   */
  public get lastTimePlayed(): number {
    return this._lastTimePlayed
  }

  /**
   * The total time played of the VS Instance.
   */
  public get totalTimePlayed(): number {
    return this._totalTimePlayed
  }

  /**
   * The mesa gl thread of the VS Instance.
   */
  public get mesaGlThread(): boolean {
    return this._mesaGlThread
  }

  /**
   * The env vars of the VS Instance.
   */
  public get envVars(): string {
    return this._envVars
  }

  /**
   * The state of the VS Instance.
   */
  public get state(): VSInstance.State {
    return this._state
  }

  /**
   * Convert this {@link VSInstance} into a {@link VSInstanceType} json.
   * @returns The {@link VSInstanceType} json.
   */
  public toJSON(): VSInstanceType {
    return {
      id: this._id,
      name: this._name,
      path: this._path,
      version: this._version,
      startParams: this._startParams,
      backupsLimit: this._backupsLimit,
      backupsAuto: this._backupsAuto,
      compressionLevel: this._compressionLevel,
      lastTimePlayed: this._lastTimePlayed,
      totalTimePlayed: this._totalTimePlayed,
      mesaGlThread: this._mesaGlThread,
      envVars: this._envVars
    }
  }

  /**
   * Converts a {@link VSInstanceType} json to a {@link VSInstance}.
   * @param json The {@link VSInstanceType} to convert.
   * @returns The {@link VSInstance}.
   */
  public static fromJSON(json: VSInstanceType, state?: VSInstance.State | undefined): VSInstance {
    return new VSInstance({
      id: json.id,
      name: json.name,
      path: json.path,
      version: json.version,
      startParams: json.startParams,
      backupsLimit: json.backupsLimit,
      backupsAuto: json.backupsAuto,
      compressionLevel: json.compressionLevel,
      lastTimePlayed: json.lastTimePlayed,
      totalTimePlayed: json.totalTimePlayed,
      mesaGlThread: json.mesaGlThread,
      envVars: json.envVars,
      state: state ?? VSInstance.State.STOPPED
    })
  }

  /**
   * Delete this VS Instance from the file system and the DB.
   * @throws A {@link RustoryVSInstanceError} error.
   */
  public async delete(): Promise<void> {
    try {
      window.api.logger.info(`Deleting VS Instance ${this._id}...`)

      await window.api.fs.deletePaths([this._path])

      await window.api.db.vsInstance.delete(this.toJSON())

      window.api.logger.info(`Successfully deleted VS Instance ${this._id}!`)
    } catch (err) {
      window.api.logger.error('There was an error deleting the VS Instance!')
      window.api.logger.debug(`There was an error deleting the VS Instance:\n${JSON.stringify(err)}`)
      throw new RustoryVSInstanceError(`There was an error deleting the VS Instance:\n${JSON.stringify(err)}`, RustoryVSInstanceError.Codes.VSINSTANCE_ERROR)
    }
  }

  /**
   * Save this VS Instance to the DB.
   * @throws A {@link RustoryVSInstanceError} error.
   */
  public async save(): Promise<void> {
    try {
      window.api.logger.info(`Saving VS Instance ${this._id}...`)

      await window.api.db.vsInstance.save(this.toJSON())

      window.api.logger.info(`Successfully saved VS Instance ${this._id}!`)
    } catch (err) {
      window.api.logger.error(`There was an error saving the VS Instance ${this._version} to the DB!`)
      window.api.logger.debug(`There was an error saving the VS Instance ${this._version} to the DB:\n${JSON.stringify(err)}`)
      throw new RustoryVSInstanceError(
        `There was an error saving the VS Instance ${this._version} to the DB:\n${JSON.stringify(err)}`,
        RustoryVSInstanceError.Codes.VSINSTANCE_ERROR
      )
    }
  }

  /**
   * Get all the VS Instances from the DB.
   * @returns All the {@link VSInstance} from the DB.
   * @throws A {@link RustoryVSInstanceError} error.
   */
  public static async getAllFromDB(): Promise<VSInstance[]> {
    try {
      window.api.logger.info('Getting all the VS Instances from the DB...')

      const instances = await window.api.db.vsInstance.getAll()

      window.api.logger.info('Successfully got all the VS Instances from the DB!')

      return instances.map((i) => VSInstance.fromJSON(i))
    } catch (err) {
      window.api.logger.error('There was an error getting the VS Instances!')
      window.api.logger.debug(`There was an error getting the VS Instances:\n${JSON.stringify(err)}`)
      throw new RustoryVSInstanceError(`There was an error getting the VS Instances:\n${JSON.stringify(err)}`, RustoryVSInstanceError.Codes.VSINSTANCE_ERROR)
    }
  }
}

export namespace VSInstance {
  /**
   * State of the VS Instance.
   */
  export enum State {
    BACKUPING = 'backuping',
    PLAYING_CLIENT = 'playing_client',
    PLAYING_SERVER = 'playing_server',
    STOPPED = 'stopped'
  }
}
