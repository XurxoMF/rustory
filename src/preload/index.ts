import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { IPC_CHANNELS } from '@main/ipc/channels'

// Custom APIs for renderer
// There is no need to specify the parameters for the functions. Just use ...params -> params
const api: BridgeAPI = {
  logger: {
    info: (...params) => ipcRenderer.send(IPC_CHANNELS.logger.info, ...params),
    warn: (...params) => ipcRenderer.send(IPC_CHANNELS.logger.warn, ...params),
    error: (...params) => ipcRenderer.send(IPC_CHANNELS.logger.error, ...params),
    debug: (...params) => ipcRenderer.send(IPC_CHANNELS.logger.debug, ...params),
    verbose: (...params) => ipcRenderer.send(IPC_CHANNELS.logger.verbose, ...params)
  },
  fs: {
    readJSON: (...params) => ipcRenderer.invoke(IPC_CHANNELS.fs.readJSON, ...params),
    writeJSON: (...params) => ipcRenderer.invoke(IPC_CHANNELS.fs.writeJSON, ...params),
    showDialog: (...params) => ipcRenderer.invoke(IPC_CHANNELS.fs.showDialog, ...params),
    join: (...params) => ipcRenderer.invoke(IPC_CHANNELS.fs.join, ...params),
    getPath: (...params) => ipcRenderer.invoke(IPC_CHANNELS.fs.getPath, ...params),
    changePerms: (...params) => ipcRenderer.invoke(IPC_CHANNELS.fs.changePerms, ...params),
    deletePaths: (...params) => ipcRenderer.invoke(IPC_CHANNELS.fs.deletePaths, ...params)
  },
  system: {
    getOSInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getOSInfo),
    getCPUInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getCPUInfo),
    getRAMInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getRAMInfo),
    getGPUsInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getGPUsInfo),
    getVolumesInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getVolumesInfo),
    getNETSDKsInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getNETSDKsInfo),
    getNETRuntimesInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getNETRuntimesInfo)
  },
  window: {
    minimize: () => ipcRenderer.send(IPC_CHANNELS.window.minimize),
    minimized: () => ipcRenderer.invoke(IPC_CHANNELS.window.minimized),
    maximize: () => ipcRenderer.send(IPC_CHANNELS.window.maximize),
    maximized: () => ipcRenderer.invoke(IPC_CHANNELS.window.maximized),
    fullscreened: () => ipcRenderer.invoke(IPC_CHANNELS.window.fullscreened),
    hide: () => ipcRenderer.send(IPC_CHANNELS.window.hide),
    close: () => ipcRenderer.send(IPC_CHANNELS.window.close),
    show: () => ipcRenderer.send(IPC_CHANNELS.window.show),
    on: {
      maximize: (...params) => {
        ipcRenderer.on(IPC_CHANNELS.window.on.maximize, ...params)
        return () => ipcRenderer.off(IPC_CHANNELS.window.on.maximize, ...params)
      },
      minimize: (...params) => {
        ipcRenderer.on(IPC_CHANNELS.window.on.minimize, ...params)
        return () => ipcRenderer.off(IPC_CHANNELS.window.on.minimize, ...params)
      },
      fullscreen: (...params) => {
        ipcRenderer.on(IPC_CHANNELS.window.on.fullscreen, ...params)
        return () => ipcRenderer.off(IPC_CHANNELS.window.on.fullscreen, ...params)
      }
    }
  },
  rustory: {
    getName: () => ipcRenderer.invoke(IPC_CHANNELS.rustory.getName),
    getVersion: () => ipcRenderer.invoke(IPC_CHANNELS.rustory.getVersion),
    exit: (...params) => ipcRenderer.send(IPC_CHANNELS.rustory.exit, ...params)
  },
  shell: {
    openURL: (...params) => ipcRenderer.send(IPC_CHANNELS.shell.openURL, ...params),
    openPath: (...params) => ipcRenderer.send(IPC_CHANNELS.shell.openPath, ...params)
  },
  db: {
    config: {
      getItem: (...params) => ipcRenderer.invoke(IPC_CHANNELS.db.config.getItem, ...params),
      setItem: (...params) => ipcRenderer.invoke(IPC_CHANNELS.db.config.setItem, ...params)
    },
    vsVersion: {
      getAll: (...params) => ipcRenderer.invoke(IPC_CHANNELS.db.vsVersion.getAll, ...params),
      save: (...params) => ipcRenderer.invoke(IPC_CHANNELS.db.vsVersion.save, ...params),
      delete: (...params) => ipcRenderer.invoke(IPC_CHANNELS.db.vsVersion.delete, ...params)
    },
    vsInstance: {
      getAll: (...params) => ipcRenderer.invoke(IPC_CHANNELS.db.vsInstance.getAll, ...params),
      save: (...params) => ipcRenderer.invoke(IPC_CHANNELS.db.vsInstance.save, ...params),
      delete: (...params) => ipcRenderer.invoke(IPC_CHANNELS.db.vsInstance.delete, ...params)
    }
  },
  zip: {
    extractor: {
      extract: (...params) => ipcRenderer.invoke(IPC_CHANNELS.zip.extractor.extract, ...params),
      on: {
        progress: (...params) => {
          ipcRenderer.on(IPC_CHANNELS.zip.extractor.on.progress, ...params)
          return () => ipcRenderer.off(IPC_CHANNELS.zip.extractor.on.progress, ...params)
        }
      }
    },
    compressor: {
      compress: (...params) => ipcRenderer.invoke(IPC_CHANNELS.zip.compressor.compress, ...params),
      on: {
        progress: (...params) => {
          ipcRenderer.on(IPC_CHANNELS.zip.extractor.on.progress, ...params)
          return () => ipcRenderer.off(IPC_CHANNELS.zip.extractor.on.progress, ...params)
        }
      }
    }
  },
  net: {
    request: (...params) => ipcRenderer.invoke(IPC_CHANNELS.net.request, ...params),
    downloader: {
      download: (...params) => ipcRenderer.invoke(IPC_CHANNELS.net.downloader.download, ...params),
      on: {
        progress: (...params) => {
          ipcRenderer.on(IPC_CHANNELS.net.downloader.on.progress, ...params)
          return () => ipcRenderer.off(IPC_CHANNELS.net.downloader.on.progress, ...params)
        }
      }
    }
  },
  notifications: {
    notify: (...params) => ipcRenderer.invoke(IPC_CHANNELS.notifications.notify, ...params),
    on: {
      click: (...params) => {
        ipcRenderer.on(IPC_CHANNELS.notifications.on.click, ...params)
        return () => ipcRenderer.off(IPC_CHANNELS.notifications.on.click, ...params)
      }
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
