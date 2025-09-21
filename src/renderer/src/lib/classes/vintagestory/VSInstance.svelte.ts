import { VSInstanceBackup } from './VSInstanceBackup.svelte'
import { VSMod } from './VSMod.svelte'

/**
 * Vintage StoryInstance.
 *
 * Must have at least the same properties as {@link TVSInstance}.
 */
export class VSInstance {
  /**
   * The id of the instance.
   */
  private _id: number

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
   * The backups of the instance.
   */
  private _backups: VSInstanceBackup[]

  /**
   * The mods of the instance.
   */
  private _mods: VSMod[]

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
    id: number
    name: string
    path: string
    version: string
    startParams: string
    backupsLimit: number
    backupsAuto: boolean
    compressionLevel: number
    backups: VSInstanceBackup[]
    mods: VSMod[]
    lastTimePlayed: number
    totalTimePlayed: number
    mesaGlThread: boolean
    envVars: string
  }) {
    this._id = $state(data.id)
    this._name = $state(data.name)
    this._path = $state(data.path)
    this._version = $state(data.version)
    this._startParams = $state(data.startParams)
    this._backupsLimit = $state(data.backupsLimit)
    this._backupsAuto = $state(data.backupsAuto)
    this._compressionLevel = $state(data.compressionLevel)
    this._backups = $state(data.backups)
    this._mods = $state(data.mods)
    this._lastTimePlayed = $state(data.lastTimePlayed)
    this._totalTimePlayed = $state(data.totalTimePlayed)
    this._mesaGlThread = $state(data.mesaGlThread)
    this._envVars = $state(data.envVars)
  }

  /**
   * The id of the instance.
   */
  public get id(): number {
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
   * The backups of the instance.
   */
  public get backups(): VSInstanceBackup[] {
    return this._backups
  }

  /**
   * The mods of the instance.
   */
  public get mods(): VSMod[] {
    return this._mods
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
      backups: this._backups,
      mods: this._mods,
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
      backups: json.backups.map((backup) => VSInstanceBackup.fromJSON(backup)),
      mods: json.mods.map((mod) => VSMod.fromJSON(mod)),
      lastTimePlayed: json.lastTimePlayed,
      totalTimePlayed: json.totalTimePlayed,
      mesaGlThread: json.mesaGlThread,
      envVars: json.envVars
    })
  }
}
