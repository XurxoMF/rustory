export class Info {
  /**
   * Singleton instance of the Info.
   */
  private static _instance: Info | null = null

  /**
   * Get the instance of the Info.
   */
  static get instance(): Info {
    if (Info._instance === null) Info._instance = new Info()
    return Info._instance
  }

  /**
   * Name of the APP.
   */
  private _name: string = $state('')

  /**
   * Current Rustory version.
   */
  private _version: string = $state('')

  /**
   * Path for the APP data.
   */
  private _dataPath: string = $state('')

  /**
   * Path for the APP cache.
   */
  private _cachePath: string = $state('')

  /**
   * Path for the APP temporals.
   */
  private _tempPath: string = $state('')

  /**
   * Path for the APP logs.
   */
  private _logsPath: string = $state('')

  private constructor() {}

  /**
   * Name of the APP.
   */
  get name(): string {
    return this._name
  }

  /**
   * Current version of the APP.
   */
  get version(): string {
    return this._version
  }

  /**
   * Path for the APP data.
   */
  get dataPath(): string {
    return this._dataPath
  }

  /**
   * Path for the APP cache.
   */
  get cachePath(): string {
    return this._cachePath
  }

  /**
   * Path for the APP temporals.
   */
  get tempPath(): string {
    return this._tempPath
  }

  /**
   * Path for the APP logs.
   */
  get logsPaths(): string {
    return this._logsPath
  }

  /**
   * Loads all the info about Rustory on this instance.
   */
  async init(): Promise<void> {
    this._name = await window.api.rustory.getName()
    this._version = await window.api.rustory.getVersion()

    this._dataPath = await window.api.fs.getPath('userData')
    this._cachePath = await window.api.fs.join(this.dataPath, 'Cache')
    this._logsPath = await window.api.fs.getPath('logs')

    const temp = await window.api.fs.getPath('temp')
    this._tempPath = await window.api.fs.join(temp, this._name)
  }
}
