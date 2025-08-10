declare global {
  type TMainWindowState = {
    width: number
    height: number
    x: number
    y: number
    maximized: boolean
  }

  type TSizeUits = 'KB' | 'MB' | 'GB' | 'TB'

  type TPaths = 'home' | 'appData' | 'userData' | 'sessionData' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps'
}

export {}
