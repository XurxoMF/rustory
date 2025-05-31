import { app } from "@tauri-apps/api";

export class RInfo {
  private static instance: RInfo | null = null;

  static getInstance(): RInfo {
    if (RInfo.instance === null) {
      RInfo.instance = new RInfo();
    }
    return RInfo.instance;
  }

  /**
   * Name of the APP.
   */
  name: string = $state("");

  /**
   * Current Rustory version.
   */
  version: string = $state("");

  private constructor() {}

  /**
   * Loads all the info about Rustory on this instance of RustoryInfo.
   */
  async init(): Promise<void> {
    this.name = await app.getName();
    this.version = await app.getVersion();
  }
}
