import { getCurrentWindow } from "@tauri-apps/api/window";

import { Breadcrumbs } from "$lib/classes/Breadcrumbs.svelte";

export class RWindow {
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
   * The callbacks that will be executed when the page is reloaded.
   */
  private _onReaload: OnReloadAction[] = [];

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

  executeOnReload() {
    for (const task of this._onReaload) {
      task.action();
    }
  }

  /**
   * Loads all the Window info on this instance of RWindow.
   */
  async init(): Promise<void> {
    const currentWindow = getCurrentWindow();

    this.label = currentWindow.label;
    this.title = await currentWindow.title();
    this.isMaximized = await getCurrentWindow().isMaximized();
  }
}

export type OnReloadAction = { id: string; action: () => void | Promise<void> };
