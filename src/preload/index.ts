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
