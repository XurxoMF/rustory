import { m } from "$lib/paraglide/messages";
import { rustory } from "$lib/stores/rustory.svelte";
import { defaultWindowIcon } from "@tauri-apps/api/app";
import { Menu } from "@tauri-apps/api/menu";
import { TrayIcon, type TrayIconEvent, type TrayIconOptions } from "@tauri-apps/api/tray";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { exit } from "@tauri-apps/plugin-process";

// Instance of the TrayIcon. This is to ensure only one TrayIcon is created
let trayIconInstance: TrayIcon | null = null;

export const TRAY_ICON_ID = "TRAYICON";

// Event Manager for TrayIconEvents
export function manageTrayIconEvents(e: TrayIconEvent) {
  switch (e.type) {
    case "DoubleClick":
      let currentWindow = getCurrentWindow();
      currentWindow.show();
      currentWindow.setFocus();
      break;
  }
}

// Default Menu for the Default TrayIconOptions
export async function getDefaultTrayIconMenu(): Promise<Menu> {
  return await Menu.new({
    items: [
      {
        id: "quit",
        text: m.common__quit(),
        action: () => {
          // TODO: If the close is prevented show a notification.
          if (!rustory.window.preventClose.prevented) return exit(0);
        },
      },
      {
        id: "open",
        text: m.common__open(),
        action: () => {
          let currentWindow = getCurrentWindow();
          currentWindow.show();
          currentWindow.setFocus();
        },
      },
    ],
  });
}

// Default TrayIconOptions for the TrayIcon
export async function getDefaultTrayIconOptions(): Promise<TrayIconOptions> {
  const icon = await defaultWindowIcon();
  const defaultTrayIconMenu = await getDefaultTrayIconMenu();

  return {
    id: TRAY_ICON_ID,
    menu: defaultTrayIconMenu,
    showMenuOnLeftClick: false,
    icon: icon ?? undefined,
    action: (e) => manageTrayIconEvents(e),
  };
}

/**
 * Get the current TrayIcon instance.
 *
 * @returns Modifieable TrayIcon instance
 */
export async function getTrayIcon() {
  return trayIconInstance;
}

/**
 * Set a new TrayIcon.
 *
 * @param options - The TrayIconOptions to use on the TrayIcon
 */
export async function setTrayIcon(options: TrayIconOptions) {
  // TODO: Find a way to remove the old try icon if the frontend reloads to avoid errors.
  const oldTrayIcon = await TrayIcon.getById(TRAY_ICON_ID);
  if (oldTrayIcon) {
    await oldTrayIcon.close();
  }
  trayIconInstance = await TrayIcon.new(options);
}
