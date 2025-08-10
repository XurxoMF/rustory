import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

import { logger } from '@main/utils/logger'
import { readJSON, writeJSON } from '@main/utils/fs'

// Assets
import icon from '../../../resources/icon.png?asset'

// Constants
const MAIN_WINDOW_STATE_PATH = join(app.getPath('userData'), 'window_state.json')

export let mainWindow: BrowserWindow

export function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    center: true,
    width: 1600,
    height: 900,
    title: `Rustory - ${app.getVersion()}`,
    show: false,
    autoHideMenuBar: true,
    fullscreenable: false,
    minWidth: 1024,
    minHeight: 600,
    titleBarStyle: 'hidden',
    transparent: true,
    frame: false,
    icon: icon,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      sandbox: false,
      preload: join(__dirname, '../preload/index.js')
    }
  })

  mainWindow.on('ready-to-show', async () => {
    logger.info('Main window ready to show! Getting previous window state...')

    let oldState: TMainWindowState | null = await readJSON(MAIN_WINDOW_STATE_PATH)

    if (oldState) {
      logger.info('Previous window state found! Restoring dimensions and position...')

      mainWindow.setBounds({ width: oldState.width, height: oldState.height }, true)
      mainWindow.setPosition(oldState.x, oldState.y, true)
      if (oldState.maximized) mainWindow.maximize()
    }

    logger.info('Main window ready! Showing it...')
    mainWindow?.show()
  })

  // Before closing the window, save the current state
  mainWindow.on('close', async () => await saveCurrentWindowState())

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli. Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

/**
 * Saves the current window state to a JSON file.
 */
async function saveCurrentWindowState(): Promise<void> {
  logger.info('Saving current window state...')

  const { width, height } = mainWindow.getBounds()
  const [x, y] = mainWindow.getPosition()
  const maximized = mainWindow.isMaximized()

  const newState: TMainWindowState = {
    width,
    height,
    x,
    y,
    maximized
  }

  const res = await writeJSON(MAIN_WINDOW_STATE_PATH, newState)

  if (!res) return logger.error('Current window state could not be saved!')
  return logger.info('Current window state saved successfully!')
}
