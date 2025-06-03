import Database from "@tauri-apps/plugin-sql";
import { Config } from "./Config.svelte";
import { Info } from "./Info.svelte";
import { User } from "./User.svelte";
import { Window } from "./Window.svelte";
import { DB } from "./DB.svelte";

export class Rustory {
  /**
   * Singleton instance of the Rustory.
   */
  private static _instance: Rustory | null = null;

  /**
   * Get the instance of the Rustory.
   */
  static get instance(): Rustory {
    if (Rustory._instance === null) Rustory._instance = new Rustory();
    return Rustory._instance;
  }

  /**
   * The app database.
   */
  db = DB.instance;

  /**
   * Info about the app.
   */
  info = Info.instance;

  /**
   * The app window.
   */
  window = Window.instance;

  /**
   * The app config.
   */
  config = Config.instance;

  /**
   * The logged user.
   */
  user = User.instance;

  constructor() {}
}
