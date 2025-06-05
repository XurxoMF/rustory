import { getCurrentWindow } from "@tauri-apps/api/window";

import { Breadcrumbs } from "$lib/classes/Breadcrumbs.svelte";
import { PreventClose } from "$lib/classes/PreventClose.svelte";

export class Window {
  /**
   * Singleton instance of the Window.
   */
  private static _instance: Window | null = null;

  /**
   * Get the instance of the Window.
   */
  static get instance(): Window {
    if (Window._instance === null) Window._instance = new Window();
    return Window._instance;
  }

  /**
   * The label of this window.
   */
  label: string = $state("");

  /**
   * The string of this window.
   */
  title: string = $state("");

  /**
   * If this window is maximized or not.
   */
  isMaximized: boolean = $state(false);

  /**
   * The Window Breadcrumbs.
   */
  breadcrumbs: Breadcrumbs = new Breadcrumbs();

  /**
   * The Window PreventClose tasks.
   */
  preventClose: PreventClose = new PreventClose();

  /**
   * The callbacks that will be executed when the page is reloaded.
   */
  private _onReaload: OnReloadAction[] = [];

  private constructor() {}

  /**
   * Loads all the info on this instance.
   */
  async init(): Promise<void> {
    const window = getCurrentWindow();

    this.label = window.label;
    this.title = await window.title();
    this.isMaximized = await window.isMaximized();
  }

  /**
   * The callbacks that will be executed when the page is reloaded.
   *
   * @returns The list of OnReloadFunctions.
   */
  get onReload(): OnReloadAction[] {
    return this._onReaload;
  }

  /**
   * Add a new task to the onRealod list.
   *
   * @param task - The task to add to the onReload list
   */
  addOnReload(task: OnReloadAction) {
    this._onReaload.push(task);
  }

  /**
   * Remove a task from the onRealod list.
   *
   * @param id - The if of the task to remove from the onReload list
   */
  removeOnReload(id: string) {
    this._onReaload = this._onReaload.filter((task) => task.id !== id);
  }

  /**
   * Executes the reload tasks.
   */
  executeOnReload() {
    for (const task of this._onReaload) {
      task.action();
    }
  }
}

export type OnReloadAction = { id: string; action: () => void | Promise<void> };
