declare global {
  type TMainWindowState = {
    width: number
    height: number
    x: number
    y: number
    maximized: boolean
  }

  type TSizeUits = 'KB' | 'MB' | 'GB' | 'TB'

  type TPaths = 'home' | 'appData' | 'userData' | 'temp' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'logs'

  type VSModListedType = {
    modid: number
    assetid: number
    downloads: number
    follows: number
    trendingpoints: number
    comments: number
    name: string
    summary: string | null
    modidstrs: string[]
    author: string
    urlalias: string | null
    side: string
    type: string
    logo: string
    tags: string[]
    lastreleased: string
  }
}

export {}
