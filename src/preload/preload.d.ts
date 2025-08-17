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
      readJSON: (filePath: string) => Promise<any | undefined>
      writeJSON: (filePath: string, content: any) => Promise<boolean>
      showDialog: (title: string, type: 'openFile' | 'openDirectory', multiple: boolean, extensions: string[]) => Promise<string[]>
      join: (...parts: string[]) => Promise<string>
      getPath: (path: TPaths) => Promise<string>
      changePerms: (paths: string[], perms: number) => Promise<boolean>
    }
    system: {
      getOSInfo: () => Promise<Systeminformation.OsData>
      getCPUInfo: () => Promise<Systeminformation.CpuData>
      getRAMInfo: () => Promise<Systeminformation.MemData>
      getGPUsInfo: () => Promise<Systeminformation.GraphicsData>
      getVolumesInfo: () => Promise<Systeminformation.FsSizeData[]>
      getNETSDKsInfo: () => Promise<string[]>
      getNETRuntimesInfo: () => Promise<string[]>
    }
    window: {
      minimize: () => void
      maximize: () => void
      hide: () => void
      close: () => void
    }
    app: {
      exit: () => void
    }
    rustory: {
      getName: () => Promise<string>
      getVersion: () => Promise<string>
    }
    shell: {
      openURL: (url: string) => void
      openPath: (path: string) => void
    }
    db: {
      config: {
        getItem: (key: string) => Promise<string | undefined>
        setItem: (key: string, value: string) => Promise<boolean>
      }
    }
    zip: {
      extractor: {
        extract: (id: string, filePath: string, outputPath: string, deleteZip: boolean) => Promise<boolean>
        on: {
          progress: (callback: (event: Electron.IpcRendererEvent, id: string, progress: number) => void) => void
        }
      }
      compressor: {
        compress: (id: string, inputPaths: string[], outputPath: string, outputFileName: string, compressionLevel?: number) => Promise<boolean>
        on: {
          progress: (callback: (event: Electron.IpcRendererEvent, id: string, progress: number) => void) => void
        }
      }
    }
    net: {
      request: (url: string) => Promise<string>
      downloader: {
        download: (id: string, url: string, outputPath: string, fileName: string) => Promise<void>
        on: {
          progress: (callback: (event: Electron.IpcRendererEvent, id: string, progress: number) => void) => void
        }
      }
    }
    notifications: {
      notify: (title: string, body: string) => Promise<string>
      on: {
        click: (callback: (event: Electron.IpcRendererEvent, id: string) => void) => void
      }
    }
  }

  interface Window {
    electron: ElectronAPI
    api: BridgeAPI
  }
}
