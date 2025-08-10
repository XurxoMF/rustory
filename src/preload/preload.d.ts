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
    fs: {
      readJSON: (filePath: string) => Promise<any | null>
      writeJSON: (filePath: string, content: any) => Promise<boolean>
      showDialog: (title: string, type: 'openFile' | 'openDirectory', multiple: boolean, extensions: string[]) => Promise<string[] | null>
      join: (...parts: string[]) => Promise<string>
      getPath: (path: TPaths) => Promise<string>
    }
    system: {
      getOSInfo: () => Promise<Systeminformation.OsData | null>
      getCPUInfo: () => Promise<Systeminformation.CpuData | null>
      getRAMInfo: () => Promise<Systeminformation.MemData | null>
      getGPUsInfo: () => Promise<Systeminformation.GraphicsData | null>
      getVolumesInfo: () => Promise<Systeminformation.FsSizeData[] | null>
      getNETSDKsInfo: () => Promise<string[] | null>
      getNETRuntimesInfo: () => Promise<string[] | null>
    }
    window: {
      minimize: () => void
      maximize: () => void
      isMaximized: () => Promise<boolean>
      hide: () => void
      close: () => void
      getName: () => Promise<string>
    }
    rustory: {
      getName: () => Promise<string>
      getVersion: () => Promise<string>
    }
    shell: {
      openURL: (url: string) => void
      openPath: (path: string) => void
    }
  }

  interface Window {
    electron: ElectronAPI
    api: BridgeAPI
  }
}
