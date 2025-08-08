import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { autoUpdater } from 'electron-updater'
import Logger from 'electron-log'

// Change the name if on development mode to not confict with production data
if (process.env['DEV'] == 'true') app.setName('rustory-dev')

// Ensure there is only 1 instance of the app running
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) app.quit()

// Assets
import icon from '../../resources/icon.png?asset'

// Other imports
import { logger } from '@main/utils/logger'
import { initDB } from '@main/db'
import { initIPCs } from '@main/ipc'
import { readJSON, writeJSON } from '@main/utils/fs'

// Configure the logger to write logs to a specific folder
Logger.transports.file.resolvePathFn = (_variables, message): string => {
  const logsPath = app.getPath('logs')
  if (message && (message.level === 'debug' || message.level === 'verbose')) {
    return join(logsPath, `extended.log`)
  }
  return join(logsPath, `main.log`)
}

// Set up the logger for auto-updater
autoUpdater.logger = logger
logger.info('Logger configured for auto-updater.')

// Constants
const MAIN_WINDOW_STATE_PATH = join(app.getPath('userData'), 'window_state.json')

let mainWindow: BrowserWindow

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    center: true,
    width: 1280,
    height: 720,
    title: `Rustory - ${app.getVersion()}`,
    show: false,
    autoHideMenuBar: true,
    fullscreenable: false,
    minWidth: 1024,
    minHeight: 600,
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
    mainWindow.show()
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

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // TODO: Show a loader while the app is initializing everything.

  // Initialize the database
  await initDB()

  // Initialize the IPCs
  await initIPCs()

  logger.info('Electron is ready! Creating main window...')

  // Set app user model id for windows
  electronApp.setAppUserModelId('xyz.rustory')

  // Default open or close DevTools by F12 in development and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

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
