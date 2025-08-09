import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { IPC_CHANNELS } from '@main/ipc/channels'

// Custom APIs for renderer
// There is no need to specify the parameters for the functions. Just use ...params -> params
const api: BridgeAPI = {
  logger: {
    info: (...params) => ipcRenderer.send(IPC_CHANNELS.logger.info, params),
    warn: (...params) => ipcRenderer.send(IPC_CHANNELS.logger.warn, params),
    error: (...params) => ipcRenderer.send(IPC_CHANNELS.logger.error, params),
    debug: (...params) => ipcRenderer.send(IPC_CHANNELS.logger.debug, params),
    verbose: (...params) => ipcRenderer.send(IPC_CHANNELS.logger.verbose, params)
  },
  fs: {
    readJSON: (...params) => ipcRenderer.invoke(IPC_CHANNELS.fs.readJSON, params),
    writeJSON: (...params) => ipcRenderer.invoke(IPC_CHANNELS.fs.writeJSON, params)
  },
  system: {
    getOSInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getOSInfo),
    getCPUInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getCPUInfo),
    getRAMInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getRAMInfo),
    getGPUsInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getGPUsInfo),
    getVolumesInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getVolumesInfo),
    getNETSDKsInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getNETSDKsInfo),
    getNETRuntimesInfo: () => ipcRenderer.invoke(IPC_CHANNELS.system.getNETRuntimesInfo)
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
