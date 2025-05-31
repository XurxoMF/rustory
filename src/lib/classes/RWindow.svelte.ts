import { getCurrentWindow } from "@tauri-apps/api/window";

import { Breadcrumbs } from "$lib/classes/Breadcrumbs.svelte";

export class RWindow {
  private static instance: RWindow | null = null;

  static getInstance(): RWindow {
    if (RWindow.instance === null) {
      RWindow.instance = new RWindow();
    }
    return RWindow.instance;
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
   *
   */
  breadcrumbs: Breadcrumbs;

  private constructor() {
    this.breadcrumbs = new Breadcrumbs();
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
