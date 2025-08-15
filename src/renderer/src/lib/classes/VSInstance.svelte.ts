import type { VSInstanceBackup } from './VSInstanceBackup.svelte'
import type { VSModInstalled } from './VSModInstalled.svelte'

export class VSInstance {
  private _id: string

  private _name: string

  // private _icon: string

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

  constructor(
    id: string,
    name: string,
    path: string,
    versions: string,
    startParams: string,
    backupsLimit: number,
    backupsAuto: boolean,
    compressionLevel: number,
    backups: VSInstanceBackup[],
    mods: VSModInstalled[],
    lastTimePlayed: number,
    totalTimePlayed: number,
    mesaGlThread: boolean,
    envVars: string
  ) {
    this._id = $state(id)
    this._name = $state(name)
    this._path = $state(path)
    this._version = $state(versions)
    this._startParams = $state(startParams)
    this._backupsLimit = $state(backupsLimit)
    this._backupsAuto = $state(backupsAuto)
    this._compressionLevel = $state(compressionLevel)
    this._backups = $state(backups)
    this._mods = $state(mods)
    this._lastTimePlayed = $state(lastTimePlayed)
    this._totalTimePlayed = $state(totalTimePlayed)
    this._mesaGlThread = $state(mesaGlThread)
    this._envVars = $state(envVars)
  }

  public get id(): string {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  // public get icon(): string {
  //   return this._icon
  // }

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
}
