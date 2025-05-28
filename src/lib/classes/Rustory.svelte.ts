import { RustoryWindow } from "./RustoryWindow.svelte";
import { RustoryInfo } from "./RustoryInfo.svelte";
import { RustoryConfig } from "./RustoryConfig.svelte";
import { RustoryUser } from "./RustoryUser.svelte";

export class Rustory {
  /**
   * The Rustory API URL to fetch thing to it.
   */
  static API_BASE = import.meta.env.VITE_RUSTORY_API;

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
   * The user account.
   */
  user: RustoryUser;

  /**
   * Creates a new instance of Rustory.
   *
   * Data is not loaded! Execute the .init() method of each property to load the data.
   */
  constructor() {
    this.info = new RustoryInfo();
    this.config = new RustoryConfig();
    this.mainWindow = new RustoryWindow();
    this.user = new RustoryUser();
  }
}
