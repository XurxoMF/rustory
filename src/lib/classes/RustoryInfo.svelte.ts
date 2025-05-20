import { app } from "@tauri-apps/api";

export class RustoryInfo {
  /**
   * Name of the APP.
   */
  name: string = $state("");

  /**
   * Current Rustory version.
   */
  version: string = $state("");

  /**
   * Loads all the info about Rustory on this instance of RustoryInfo.
   */
  async init(): Promise<void> {
    this.name = await app.getName();
    this.version = await app.getVersion();
  }
}
