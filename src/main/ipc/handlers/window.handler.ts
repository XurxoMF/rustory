import { ipcMain } from 'electron'
import { IPC_CHANNELS } from '@main/ipc/channels'
import { mainWindow } from '@main/mainWindow'

export async function registerWindowHandlers(): Promise<void> {
  ipcMain.on(IPC_CHANNELS.window.minimize, (_event): void => mainWindow.minimize())

  ipcMain.handle(IPC_CHANNELS.window.minimized, async (_event): Promise<boolean> => mainWindow.isMinimized())

  ipcMain.on(IPC_CHANNELS.window.maximize, (_event): void => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })

  ipcMain.handle(IPC_CHANNELS.window.maximized, async (_event): Promise<boolean> => mainWindow.isMaximized())

  ipcMain.handle(IPC_CHANNELS.window.fullscreened, async (_event): Promise<boolean> => mainWindow.isFullScreen())

  ipcMain.on(IPC_CHANNELS.window.hide, (_event): void => mainWindow.hide())

  ipcMain.on(IPC_CHANNELS.window.close, (_event): void => mainWindow.close())

  ipcMain.on(IPC_CHANNELS.window.show, (_event): void => mainWindow.show())
}
