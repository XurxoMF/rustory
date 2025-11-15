import { app, BrowserWindow, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { autoUpdater } from 'electron-updater'
import Logger from 'electron-log'

// Other imports
import { initDB } from '@main/db'
import { initIPCs } from '@main/ipc'
import { logger } from '@main/utils/logger'
import { getCPUInfo, getGPUsInfo, getNETRuntimesInfo, getNETSDKsInfo, getOSInfo, getRAMInfo, getVolumesInfo } from '@main/utils/system'
import { createMainWindow } from '@main/mainWindow'
import { createTray } from '@main/mainTray'
import { bytesToX } from '@shared/utils/math'
import { padRight } from '@shared/utils/string'

// Ensure there is only 1 instance of the app running
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) app.quit()

// Remove the default APP menu as we don't need it
Menu.setApplicationMenu(null)

// Configure the logger folder and files
app.setAppLogsPath(join(app.getPath('userData'), 'Logs'))
Logger.transports.file.resolvePathFn = (_variables, message): string => {
  const logsPath = app.getPath('logs')
  if (message && (message.level === 'debug' || message.level === 'verbose')) {
    return join(logsPath, `extended.log`)
  }
  return join(logsPath, `main.log`)
}

// Set up the logger for auto-updater
autoUpdater.logger = logger

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  try {
    await createTray()
  } catch (_err) {
    // Without tray a lot of errors may appear so close the APP.
    // TODO: Improve this to just disable the hide() methods so the app can run normally.
    app.exit(1)
  }

  await logOSInfo()

  try {
    await initDB()
  } catch (_err) {
    // Without DB we can't do anything so cose the APP.
    app.exit(1)
  }

  await initIPCs()

  logger.info('Electron is ready! Creating main window...')

  // Set app user model id for windows
  electronApp.setAppUserModelId('xyz.rustory')

  // Default open or close DevTools by F12 in development and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  await createMainWindow()

  app.on('activate', async () => {
    // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) await createMainWindow()
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
  const cpuInfo: string = cpu
    ? `CPU: ${cpu.processors} x ${cpu.manufacturer} ${cpu.brand} ${cpu.physicalCores}C/${cpu.cores}T ${cpu.speed}GHz* ${cpu.speedMax}GHz`
    : 'CPU: Unknown'

  const ram = await getRAMInfo()
  let ramInfo: string = ram ? `RAM: ${bytesToX(ram.total, 'MB').toLocaleString('es-ES')}MB total` : 'RAM: Unknown'

  const gpus = await getGPUsInfo()
  const gpusInfo: string[] = gpus ? gpus.controllers.map((c, i) => `GPU ${i}: ${c.vendor} ${c.model} ${c.vram}MB*`) : ['GPU: Unknown']

  const volumes = await getVolumesInfo()
  const volumesInfo: string[] = volumes
    ? volumes.map((v, i) => `VOL ${i}: ${v.fs} ${v.type} ${v.mount} ${bytesToX(v.used, 'GB')}GB/${bytesToX(v.size, 'GB')}GB`)
    : ['VOL: Unknown']

  const dotnetSDKs = await getNETSDKsInfo()
  const dotnetSDKsInfo: string[] = dotnetSDKs ? dotnetSDKs.map((sdk) => `.NET SDK ${sdk}`) : ['.NET SDK: Unknown']

  const dotnetRuntimes = await getNETRuntimesInfo()
  const dotnetRuntimesInfo: string[] = dotnetRuntimes ? dotnetRuntimes.map((rt) => `.NET Runtime ${rt}`) : ['.NET Runtime: Unknown']

  // Emojis use 2 spaces for some reason so + 1 to width
  logger.info(SEPARATOR)
  logger.info(`| ${padRight('    ____  __  _________________  ______  __', WIDTH)} |`)
  logger.info(`| ${padRight('   / __ \\/ / / / ___/_  __/ __ \\/ __ \\ \\/ /    Made with love by XurxoMF and all the contributors! ❤️', WIDTH)} |`)
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
