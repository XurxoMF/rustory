import { RustoryWindow } from "./RustoryWindow.svelte";
import { RustoryInfo } from "./RustoryInfo.svelte";
import { RustoryConfig } from "./RustoryConfig.svelte";

export class Rustory {
  /**
   * Info about Rustory.
   */
  info: RustoryInfo;

  /**
   * Rustory configuration.
   */
  config: RustoryConfig;

  /**
   * Main Rustory window.
   */
  mainWindow: RustoryWindow;

  /**
   * Creates a new instance of Rustory.
   *
   * Data is not loaded! Execute the .init() method of each property to load the data.
   */
  constructor() {
    this.info = new RustoryInfo();
    this.config = new RustoryConfig();
    this.mainWindow = new RustoryWindow();
  }
}
