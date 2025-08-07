import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  type BridgeAPI = {
    test: {
      ping: (test: string) => void
    }
  }

  interface Window {
    electron: ElectronAPI
    api: BridgeAPI
  }
}
