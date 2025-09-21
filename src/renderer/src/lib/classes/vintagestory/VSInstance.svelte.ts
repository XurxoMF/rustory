import { RustoryVSInstanceError } from '@shared/errors/RustoryVSInstanceError'

/**
 * Vintage StoryInstance.
 *
 * Must have at least the same properties as {@link TVSInstance}.
 */
export class VSInstance {
  /**
   * The id of the instance.
   */
  private _id: string

  /**
   * The name of the instance.
   */
  private _name: string

  /**
   * The path of the instance.
   */
  private _path: string

  /**
   * The version of the instance.
   */
  private _version: string

  /**
   * The start parameters of the instance.
   */
  private _startParams: string

  /**
   * The backups limit of the instance.
   */
  private _backupsLimit: number

  /**
   * The backups auto of the instance.
   */
  private _backupsAuto: boolean

  /**
   * The compression level of the instance.
   */
  private _compressionLevel: number

  /**
   * The last time played of the instance.
   */
  private _lastTimePlayed: number

  /**
   * The total time played of the instance.
   */
  private _totalTimePlayed: number

  /**
   * The mesa gl thread of the instance.
   */
  private _mesaGlThread: boolean

  /**
   * The env vars of the instance.
   */
  private _envVars: string

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
  }) {
    this._id = data.id
    this._name = $state(data.name)
    this._path = data.path
    this._version = $state(data.version)
    this._startParams = $state(data.startParams)
    this._backupsLimit = $state(data.backupsLimit)
    this._backupsAuto = $state(data.backupsAuto)
    this._compressionLevel = $state(data.compressionLevel)
    this._lastTimePlayed = $state(data.lastTimePlayed)
    this._totalTimePlayed = $state(data.totalTimePlayed)
    this._mesaGlThread = $state(data.mesaGlThread)
    this._envVars = $state(data.envVars)
  }

  /**
   * The id of the instance.
   */
  public get id(): string {
    return this._id
  }

  /**
   * The name of the instance.
   */
  public get name(): string {
    return this._name
  }

  /**
   * The path of the instance.
   */
  public get path(): string {
    return this._path
  }

  /**
   * The version of the instance.
   */
  public get version(): string {
    return this._version
  }

  /**
   * The start parameters of the instance.
   */
  public get startParams(): string {
    return this._startParams
  }

  /**
   * The backups limit of the instance.
   */
  public get backupsLimit(): number {
    return this._backupsLimit
  }

  /**
   * The backups auto of the instance.
   */
  public get backupsAuto(): boolean {
    return this._backupsAuto
  }

  /**
   * The compression level of the instance.
   */
  public get compressionLevel(): number {
    return this._compressionLevel
  }

  /**
   * The last time played of the instance.
   */
  public get lastTimePlayed(): number {
    return this._lastTimePlayed
  }

  /**
   * The total time played of the instance.
   */
  public get totalTimePlayed(): number {
    return this._totalTimePlayed
  }

  /**
   * The mesa gl thread of the instance.
   */
  public get mesaGlThread(): boolean {
    return this._mesaGlThread
  }

  /**
   * The env vars of the instance.
   */
  public get envVars(): string {
    return this._envVars
  }

  /**
   * Convert this {@link VSInstance} into a {@link TVSInstance} json.
   * @returns The {@link TVSInstance} json.
   */
  public toJSON(): TVSInstance {
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
   * Converts a {@link TVSInstance} json to a {@link VSInstance}.
   * @param json The {@link TVSInstance} to convert.
   * @returns The {@link VSInstance}.
   */
  public static fromJSON(json: TVSInstance): VSInstance {
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
      envVars: json.envVars
    })
  }

  /**
   * Get all the VS Instances from the DB.
   * @returns All the {@link VSInstance} from the DB.
   * @throws A {@link RustoryVSInstanceError} error.
   */
  public static async getAllFromDB(): Promise<VSInstance[]> {
    try {
      window.api.logger.info('Getting all the VS Instances from the DB...')

      const instances = await window.api.db.vsInstance.getVSInstances()

      window.api.logger.info('Successfully got all the VS Instances from the DB!')

      return instances.map((i) => VSInstance.fromJSON(i))
    } catch (err) {
      window.api.logger.error('There was an error getting the VS Instances!')
      window.api.logger.debug(`There was an error getting the VS Instances:\n${JSON.stringify(err)}`)
      throw new RustoryVSInstanceError(`There was an error getting the VS Instances:\n${JSON.stringify(err)}`, RustoryVSInstanceError.Codes.VSINSTANCE_ERROR)
    }
  }
}
