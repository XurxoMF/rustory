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
  name: string = $state('')

  /**
   * Name of the APP with spaces and other styles.
   */
  productName: string = $state('')

  /**
   * Current Rustory version.
   */
  version: string = $state('')

  /**
   * Path for the APP data.
   */
  dataPath: string = $state('')

  /**
   * Path for the APP cache.
   */
  cachePath: string = $state('')

  /**
   * Path for the APP temporals.
   */
  tempPath: string = $state('')

  /**
   * Path for the APP logs.
   */
  logsPath: string = $state('')

  private constructor() {}

  /**
   * Loads all the info about Rustory on this instance.
   */
  async init(): Promise<void> {
    this.name = await window.api.rustory.getName()
    this.productName = 'Rustory'
    this.version = await window.api.rustory.getVersion()

    this.dataPath = await window.api.fs.getPath('userData')
    this.cachePath = await window.api.fs.join(this.dataPath, 'Cache')
    this.tempPath = await window.api.fs.getPath('temp')
    this.logsPath = await window.api.fs.getPath('logs')
  }
}
