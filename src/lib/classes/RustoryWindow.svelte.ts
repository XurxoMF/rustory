import { getCurrentWindow } from "@tauri-apps/api/window";

import { Breadcrumbs } from "$lib/classes/Breadcrumbs.svelte";

export class RustoryWindow {
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

  constructor() {
    this.breadcrumbs = new Breadcrumbs();
  }

  /**
   * Loads all the Window info on this instance of RustoryWindow.
   */
  async init(): Promise<void> {
    const currentWindow = getCurrentWindow();

    this.label = currentWindow.label;
    this.title = await currentWindow.title();
    this.isMaximized = await getCurrentWindow().isMaximized();
  }
}
