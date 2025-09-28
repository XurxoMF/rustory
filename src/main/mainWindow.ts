import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

import { logger } from '@main/utils/logger'
import { readJSON, writeJSON } from '@main/utils/fs'

// Assets
import icon from '../../resources/icon.png?asset'

// Constants
const MAIN_WINDOW_STATE_PATH = join(app.getPath('userData'), 'window_state.json')

export let mainWindow: BrowserWindow

export async function createMainWindow(): Promise<void> {
  logger.info('Getting old state...')

  let oldState: TMainWindowState | null = await readJSON(MAIN_WINDOW_STATE_PATH)

  let width = oldState?.width ?? 1600
  let height = oldState?.height ?? 900
  let x = oldState?.x
  let y = oldState?.y
  let maximized = oldState?.maximized ?? true

  // Create the browser window.
  mainWindow = new BrowserWindow({
    center: true,
    width,
    height,
    x,
    y,
    title: `Rustory ${app.getVersion()}`,
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

  logger.info('Main window ready!')

  mainWindow.on('ready-to-show', async () => {
    if (maximized) mainWindow.maximize()
  })

  // Before closing the window, save the current state
  mainWindow.on('close', async (e) => {
    e.preventDefault()
    await saveCurrentWindowState()
    mainWindow.destroy()
  })

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
