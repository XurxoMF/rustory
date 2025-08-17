import { app, Menu, Tray } from 'electron'

import { mainWindow } from '@main/mainWindow'
import { logger } from '@main/utils/logger'

import { RustoryTrayError } from '@shared/errors/RustoryTrayError'

import icon from '../../resources/icon.png?asset'

export let tray: Tray

/**
 * Creates the tray icon and menu.
 * @throws A {@link RustoryTrayError} error.
 */
export async function createTray(): Promise<void> {
  try {
    tray = new Tray(icon)

    const contextMenu = Menu.buildFromTemplate([
      { label: 'Open', toolTip: 'Open Rustory', type: 'normal', click: () => mainWindow.show() },
      { label: 'Close', toolTip: 'Close Rsutory', type: 'normal', click: () => app.quit() }
    ])

    tray.setContextMenu(contextMenu)

    tray.setToolTip('Rustory')
    tray.setTitle('Rustory')
  } catch (err) {
    logger.error('Error creating the tray!')
    logger.debug(`Error creating the tray:\n${JSON.stringify(err)}`)
    throw new RustoryTrayError('Error creating the tray!', RustoryTrayError.Codes.TRAY_ERROR)
  }
}
