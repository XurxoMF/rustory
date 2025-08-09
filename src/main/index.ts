import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { autoUpdater } from 'electron-updater'
import Logger from 'electron-log'

// Change the name if on development mode to not confict with production data
if (!app.isPackaged && process.env['DEV'] == 'true') app.setName('rustory-dev')

// Ensure there is only 1 instance of the app running
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) app.quit()

// Assets
import icon from '../../resources/icon.png?asset'

// Other imports
import { initDB } from '@main/db'
import { initIPCs } from '@main/ipc'
import { logger } from '@main/utils/logger'
import { readJSON, writeJSON } from '@main/utils/fs'
import { getCPUInfo, getGPUsInfo, getNETRuntimesInfo, getNETSDKsInfo, getOSInfo, getRAMInfo, getVolumesInfo } from '@main/utils/system'
import { bytesToX } from '@shared/utils/math'
import { padRight } from '@shared/utils/string'

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
  await logOSInfo()

  await initDB()

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

async function logOSInfo() {
  const WIDTH = 120
  const SEPARATOR = `+${'-'.repeat(WIDTH + 2)}+`
  const VERSION: string = `Version: v${app.getVersion()}`

  const os = await getOSInfo()
  const osInfo: string = os ? `OS: ${os.distro} ${os.platform} · ${os.release} · ${os.arch}` : 'OS: Unknown'

  const cpu = await getCPUInfo()
  const cpuInfo: string = cpu ? `CPU: ${cpu.processors} x ${cpu.manufacturer} ${cpu.brand} ${cpu.physicalCores}C/${cpu.cores}T ${cpu.speed}GHz* ${cpu.speedMax}GHz` : 'CPU: Unknown'

  const ram = await getRAMInfo()
  let ramInfo: string = ram ? `RAM: ${bytesToX(ram.total, 'MB').toLocaleString('es-ES')}MB total` : 'RAM: Unknown'

  const gpus = await getGPUsInfo()
  const gpusInfo: string[] = gpus ? gpus.controllers.map((c, i) => `GPU ${i}: ${c.vendor} ${c.model} ${c.vram}MB*`) : ['GPU: Unknown']

  const volumes = await getVolumesInfo()
  const volumesInfo: string[] = volumes ? volumes.map((v, i) => `VOL ${i}: ${v.fs} ${v.type} ${v.mount} ${bytesToX(v.used, 'GB')}GB/${bytesToX(v.size, 'GB')}GB`) : ['VOL: Unknown']

  const dotnetSDKs = await getNETSDKsInfo()
  const dotnetSDKsInfo: string[] = dotnetSDKs ? dotnetSDKs.map((sdk) => `.NET SDK ${sdk}`) : ['.NET SDK: Unknown']

  const dotnetRuntimes = await getNETRuntimesInfo()
  const dotnetRuntimesInfo: string[] = dotnetRuntimes ? dotnetRuntimes.map((rt) => `.NET Runtime ${rt}`) : ['.NET Runtime: Unknown']

  logger.info(SEPARATOR)
  logger.info(`| ${padRight('    ____  __  _________________  ______  __', WIDTH)} |`)
  logger.info(`| ${padRight('   / __ \\/ / / / ___/_  __/ __ \\/ __ \\ \\/ /    Made with love by XurxoMF and all the contributors! ❤️', WIDTH + 1)} |`)
  logger.info(`| ${padRight('  / /_/ / / / /\\__ \\ / / / / / / /_/ /\\  /     Copyright © 2025 - Today · XurxoMF', WIDTH)} |`)
  logger.info(`| ${padRight(` / _, _/ /_/ /___/ // / / /_/ / _, _/ / /      ${VERSION}`, WIDTH)} |`)
  logger.info(`| ${padRight('/_/ |_|\\____//____//_/  \\____/_/ |_| /_/', WIDTH)} |`)
  logger.info(SEPARATOR)
  logger.info(`| ${padRight(osInfo, WIDTH)} |`)
  logger.info(`| ${padRight(cpuInfo, WIDTH)} |`)
  logger.info(`| ${padRight(ramInfo, WIDTH)} |`)
  gpusInfo.forEach((gpu) => logger.info(`| ${padRight(gpu, WIDTH)} |`))
  volumesInfo.forEach((vol) => logger.info(`| ${padRight(vol, WIDTH)} |`))
  logger.info(SEPARATOR)
  dotnetSDKsInfo.forEach((sdk) => logger.info(`| ${padRight(sdk, WIDTH)} |`))
  dotnetRuntimesInfo.forEach((rt) => logger.info(`| ${padRight(rt, WIDTH)} |`))
  logger.info(SEPARATOR)
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
