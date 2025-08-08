import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  // Define here the types for the APIs you want to expose to the renderer process
  type BridgeAPI = {
    logger: {
      info: (message: string) => void
      warn: (message: string) => void
      error: (message: string) => void
      debug: (message: string) => void
      verbose: (message: string) => void
    }
  }

  interface Window {
    electron: ElectronAPI
    api: BridgeAPI
  }
}
