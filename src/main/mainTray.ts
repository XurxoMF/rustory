import { app, Menu, Tray } from 'electron'

import { mainWindow } from '@main/mainWindow'

import icon from '../../resources/icon.png?asset'

export let tray: Tray

export async function createTray(): Promise<void> {
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open', toolTip: 'Open Rustory', type: 'normal', click: () => mainWindow.show() },
    { label: 'Close', toolTip: 'Close Rsutory', click: () => app.quit() }
  ])

  tray.setContextMenu(contextMenu)

  tray.setToolTip('Rustory')
  tray.setTitle('Rustory')
}
