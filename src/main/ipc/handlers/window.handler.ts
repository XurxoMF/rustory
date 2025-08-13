import { ipcMain } from 'electron'
import { IPC_CHANNELS } from '../channels'
import { mainWindow } from '@main/mainWindow'

export async function registerWindowHandlers(): Promise<void> {
  ipcMain.on(IPC_CHANNELS.window.minimize, (_event) => mainWindow.minimize())

  ipcMain.on(IPC_CHANNELS.window.maximize, (_event) => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })

  ipcMain.on(IPC_CHANNELS.window.hide, (_event) => mainWindow.hide())

  ipcMain.on(IPC_CHANNELS.window.close, (_event) => mainWindow.close())

  ipcMain.handle(IPC_CHANNELS.window.getName, (_event): string => mainWindow.title)
}
