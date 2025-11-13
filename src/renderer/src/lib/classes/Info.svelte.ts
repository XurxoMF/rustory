import type { Systeminformation } from 'systeminformation'

import { RustoryInfoError } from '@shared/errors/RustoryInfoError'

/**
 * Info of the app.
 */
export class Info {
  /**
   * Singleton instance of the Info.
   */
  private static _instance: Info | null = null

  /**
   * Get the instance of the Info.
   * @throws A {@link RustoryInfoError} if the Info is not initialized.
   */
  public static get instance(): Info {
    if (Info._instance === null) throw new RustoryInfoError('Info not initialized!', RustoryInfoError.Codes.NOT_INITIALIZED)
    return Info._instance
  }

  /**
   * Name of the APP.
   */
  private _name: string

  /**
   * Current version of the APP.
   */
  private _version: string

  /**
   * OS info.
   */
  private _os: Systeminformation.OsData

  /**
   * CPU info.
   */
  private _cpu: Systeminformation.CpuData

  /**
   * RAM info.
   */
  private _ram: Systeminformation.MemData

  /**
   * GPUs info.
   */
  private _gpus: Systeminformation.GraphicsData

  /**
   * Volumes info.
   */
  private _volumes: Systeminformation.FsSizeData[]

  /**
   * NET SDKs info.
   */
  private _netSdks: string[]

  /**
   * NET Runtimes info.
   */
  private _netRuntimes: string[]

  /**
   * Path for the APP data.
   */
  private _dataPath: string

  /**
   * Path for the APP cache.
   */
  private _cachePath: string

  /**
   * Path for the APP temporals.
   */
  private _tempPath: string

  /**
   * Path for the APP logs.
   */
  private _logsPath: string

  private constructor(data: {
    name: string
    version: string
    os: Systeminformation.OsData
    cpu: Systeminformation.CpuData
    ram: Systeminformation.MemData
    gpus: Systeminformation.GraphicsData
    volumes: Systeminformation.FsSizeData[]
    netSdks: string[]
    netRuntimes: string[]
    dataPath: string
    cachePath: string
    tempPath: string
    logsPath: string
  }) {
    this._name = data.name
    this._version = data.version
    this._os = data.os
    this._cpu = data.cpu
    this._ram = data.ram
    this._gpus = data.gpus
    this._volumes = data.volumes
    this._netSdks = data.netSdks
    this._netRuntimes = data.netRuntimes
    this._dataPath = data.dataPath
    this._cachePath = data.cachePath
    this._tempPath = data.tempPath
    this._logsPath = data.logsPath
  }

  /**
   * Loads all the info about Rustory on this instance.
   */
  public static async init(): Promise<void> {
    try {
      // Load basic info.
      const name = await window.api.rustory.getName()
      const version = await window.api.rustory.getVersion()

      // Load system info.
      const os = await window.api.system.getOSInfo()
      const cpu = await window.api.system.getCPUInfo()
      const ram = await window.api.system.getRAMInfo()
      const gpus = await window.api.system.getGPUsInfo()
      const volumes = await window.api.system.getVolumesInfo()
      const netSdks = await window.api.system.getNETSDKsInfo()
      const netRuntimes = await window.api.system.getNETRuntimesInfo()

      // Load paths
      const dataPath = await window.api.fs.getPath('userData')
      const cachePath = await window.api.fs.join(dataPath, 'Cache')
      const logsPath = await window.api.fs.getPath('logs')
      const temp = await window.api.fs.getPath('temp')
      const tempPath = await window.api.fs.join(temp, name)

      // Set the info
      Info._instance = new Info({
        name,
        version,
        os,
        cpu,
        ram,
        gpus,
        volumes,
        netSdks,
        netRuntimes,
        dataPath,
        cachePath,
        tempPath,
        logsPath
      })
    } catch (err) {
      window.api.logger.error('There was an error initializating the info! The app will be closed!')
      window.api.logger.debug(`There was an error initializating the info:\n${JSON.stringify(err)}`)
      window.api.rustory.exit(1)
    }
  }

  /**
   * Name of the APP.
   */
  public get name(): string {
    return this._name
  }

  /**
   * Current version of the APP.
   */
  public get version(): string {
    return this._version
  }

  /**
   * OS info.
   */
  public get os(): Systeminformation.OsData {
    return this._os
  }

  /**
   * CPU info.
   */
  public get cpu(): Systeminformation.CpuData {
    return this._cpu
  }

  /**
   * RAM info.
   */
  public get ram(): Systeminformation.MemData {
    return this._ram
  }

  /**
   * GPUs info.
   */
  public get gpus(): Systeminformation.GraphicsData {
    return this._gpus
  }

  /**
   * Volumes info.
   */
  public get volumes(): Systeminformation.FsSizeData[] {
    return this._volumes
  }

  /**
   * NET SDKs info.
   */
  public get netSdks(): string[] {
    return this._netSdks
  }

  /**
   * NET Runtimes info.
   */
  public get netRuntimes(): string[] {
    return this._netRuntimes
  }

  /**
   * Path for the APP data.
   */
  public get dataPath(): string {
    return this._dataPath
  }

  /**
   * Path for the APP cache.
   */
  public get cachePath(): string {
    return this._cachePath
  }

  /**
   * Path for the APP temporals.
   */
  public get tempPath(): string {
    return this._tempPath
  }

  /**
   * Path for the APP logs.
   */
  public get logsPaths(): string {
    return this._logsPath
  }
}
