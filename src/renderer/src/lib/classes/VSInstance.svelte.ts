import { VSInstanceBackup } from './VSInstanceBackup.svelte'
import { VSModInstalled } from './VSModInstalled.svelte'

/**
 * Must have the same properties as {@link VSInstanceType}
 */
export class VSInstance {
  private _id: number

  private _name: string

  private _path: string

  private _version: string

  private _startParams: string

  private _backupsLimit: number

  private _backupsAuto: boolean

  private _compressionLevel: number

  private _backups: VSInstanceBackup[]

  private _mods: VSModInstalled[]

  private _lastTimePlayed: number

  private _totalTimePlayed: number

  private _mesaGlThread: boolean

  private _envVars: string

  constructor(vsInstance: {
    id: number
    name: string
    path: string
    version: string
    startParams: string
    backupsLimit: number
    backupsAuto: boolean
    compressionLevel: number
    backups: VSInstanceBackup[]
    mods: VSModInstalled[]
    lastTimePlayed: number
    totalTimePlayed: number
    mesaGlThread: boolean
    envVars: string
  }) {
    this._id = $state(vsInstance.id)
    this._name = $state(vsInstance.name)
    this._path = $state(vsInstance.path)
    this._version = $state(vsInstance.version)
    this._startParams = $state(vsInstance.startParams)
    this._backupsLimit = $state(vsInstance.backupsLimit)
    this._backupsAuto = $state(vsInstance.backupsAuto)
    this._compressionLevel = $state(vsInstance.compressionLevel)
    this._backups = $state(vsInstance.backups)
    this._mods = $state(vsInstance.mods)
    this._lastTimePlayed = $state(vsInstance.lastTimePlayed)
    this._totalTimePlayed = $state(vsInstance.totalTimePlayed)
    this._mesaGlThread = $state(vsInstance.mesaGlThread)
    this._envVars = $state(vsInstance.envVars)
  }

  public get id(): number {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  public get path(): string {
    return this._path
  }

  public get version(): string {
    return this._version
  }

  public get startParams(): string {
    return this._startParams
  }

  public get backupsLimit(): number {
    return this._backupsLimit
  }

  public get backupsAuto(): boolean {
    return this._backupsAuto
  }

  public get compressionLevel(): number {
    return this._compressionLevel
  }

  public get backups(): VSInstanceBackup[] {
    return this._backups
  }

  public get mods(): VSModInstalled[] {
    return this._mods
  }

  public get lastTimePlayed(): number {
    return this._lastTimePlayed
  }

  public get totalTimePlayed(): number {
    return this._totalTimePlayed
  }

  public get mesaGlThread(): boolean {
    return this._mesaGlThread
  }

  public get envVars(): string {
    return this._envVars
  }

  /**
   * Convert this {@link VSInstance} into a {@link VSInstanceType} json
   *
   * @returns The {@link VSInstanceType} json
   */
  toJSON(): VSInstanceType {
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
   * Converts a {@link VSInstanceType} json to a {@link VSInstance}
   *
   * @param json The {@link VSInstanceType} to convert
   * @returns The {@link VSInstance}
   */
  static fromJSON(json: VSInstanceType): VSInstance {
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
      mods: json.mods.map((mod) => VSModInstalled.fromJSON(mod)),
      lastTimePlayed: json.lastTimePlayed,
      totalTimePlayed: json.totalTimePlayed,
      mesaGlThread: json.mesaGlThread,
      envVars: json.envVars
    })
  }
}
