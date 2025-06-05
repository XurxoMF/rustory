import { app, path } from "@tauri-apps/api";

export class Info {
  /**
   * Singleton instance of the Info.
   */
  private static _instance: Info | null = null;

  /**
   * Get the instance of the Info.
   */
  static get instance(): Info {
    if (Info._instance === null) Info._instance = new Info();
    return Info._instance;
  }

  /**
   * Name of the APP.
   */
  name: string = $state("");

  /**
   * Current Rustory version.
   */
  version: string = $state("");

  dataPath: string = $state("");

  configPath: string = $state("");

  cachePath: string = $state("");

  private constructor() {}

  /**
   * Loads all the info about Rustory on this instance.
   */
  async init(): Promise<void> {
    this.name = await app.getName();
    this.version = await app.getVersion();
    this.dataPath = await path.appDataDir();
    this.configPath = await path.appConfigDir();
    this.cachePath = await path.appCacheDir();
  }
}
