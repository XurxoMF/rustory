import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

import { logger } from '@main/utils/logger'
import { readJSON, writeJSON } from '@main/utils/fs'

// Assets
import icon from '../../resources/icon.png?asset'
import { IPC_CHANNELS } from './ipc/channels'

// Constants
const MAIN_WINDOW_STATE_PATH = join(app.getPath('userData'), 'window_state.json')

export let mainWindow: BrowserWindow

export async function createMainWindow(): Promise<void> {
  logger.info('Getting old state...')

  let oldState: TMainWindowState = {
    width: 1600,
    height: 900,
    x: 0,
    y: 0,
    maximized: false
  }

  try {
    oldState = await readJSON(MAIN_WINDOW_STATE_PATH)
  } catch (error) {
    logger.error('Old state could not be read!')
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    center: true,
    width: oldState.width,
    height: oldState.height,
    x: oldState.x,
    y: oldState.y,
    title: `Rustory ${app.getVersion()}`,
    autoHideMenuBar: true,
    fullscreenable: false,
    minWidth: 1024,
    minHeight: 600,
    titleBarStyle: 'hidden',
    frame: false,
    show: false,
    ...(process.platform === 'linux' ? { transparent: true } : {}),
    icon,
    webPreferences: {
      sandbox: false,
      preload: join(__dirname, '../preload/index.js')
    }
  })

  logger.info('Main window ready!')

  mainWindow.on('ready-to-show', async () => {
    if (oldState.maximized) mainWindow.maximize()
  })

  // Events to report window state
  mainWindow.on('enter-full-screen', () => {
    mainWindow.webContents.send(IPC_CHANNELS.window.on.fullscreen, true)
  })

  mainWindow.on('leave-full-screen', () => {
    mainWindow.webContents.send(IPC_CHANNELS.window.on.fullscreen, false)
  })

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send(IPC_CHANNELS.window.on.maximize, true)
  })

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send(IPC_CHANNELS.window.on.maximize, false)
  })

  mainWindow.on('minimize', () => {
    mainWindow.webContents.send(IPC_CHANNELS.window.on.minimize, true)
  })

  mainWindow.on('restore', () => {
    mainWindow.webContents.send(IPC_CHANNELS.window.on.minimize, false)
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
