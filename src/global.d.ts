declare global {
  type MainWindowStateType = {
    width: number
    height: number
    x: number
    y: number
    maximized: boolean
  }

  type SizeUitsType = 'KB' | 'MB' | 'GB' | 'TB'

  type PathsTypes = 'home' | 'appData' | 'userData' | 'logs' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos'

  type VSAccountType = {
    id: number
    email: string
    playerName: string
    playerUid: string
    playerEntitlements: string
    sessionKey: string
    sessionSignature: string
    mptoken?: string | undefined
    hostGameServer: boolean
  }

  type VSInstanceType = {
    id: string
    name: string
    path: string
    version: string
    startParams: string
    backupsLimit: number
    backupsAuto: boolean
    compressionLevel: number
    lastTimePlayed: number
    totalTimePlayed: number
    mesaGlThread: boolean
    envVars: string
  }

  type VSInstanceBackupType = {
    id: string
    vsInstanceId: string
    date: number
    path: string
  }

  type VSAPIModListedType = {
    modid: number
    assetid: number
    downloads: number
    follows: number
    trendingpoints: number
    comments: number
    name: string
    summary?: string | undefined
    modidstrs: string[]
    author: string
    urlalias?: string | undefined
    side: string
    type: string
    logo: string
    tags: string[]
    lastreleased: string
  }

  type VSAPIModType = {
    modid: number
    assetid: number
    name: string
    text: string
    author: string
    urlalias?: string | undefined
    logofilename?: string | undefined
    logofile?: string | undefined
    homepageurl?: string | undefined
    sourcecodeurl?: string | undefined
    trailervideourl?: string | undefined
    issuetrackerurl?: string | undefined
    wikiurl?: string | undefined
    downloads: number
    follows: number
    trendingpoints: number
    comments: number
    side: string
    type: string
    createdat: string
    lastmodified: string
    tags: string[]
    releases: VSAPIModReleaseType[]
    screenshots: VSAPIModScreenshotType[]
  }

  type VSAPIModAuthorType = {
    userid: string
    name: string
  }

  type VSAPIModGameVersionType = {
    tagid: string
    name: string
    color: string
  }

  type VSModType = {
    vsInstanceId: string
    name: string
    modid: string
    version: string
    path: string
    description?: string | undefined
    side?: string | undefined
    authors: string[]
    contributors: string[]
    type?: string | undefined
    image?: string | undefined
    mod: VSAPIModType
  }

  type VSAPIModReleaseType = {
    releaseid: number
    mainfile: string
    filename: string
    fileid: number
    downloads: number
    tags: string[]
    modidstr: string
    modversion: string
    created: string
    changelog: string
  }

  type VSAPIModScreenshotType = {
    fileid: number
    mainfile: string
    filename: string
    thumbnailfile: string
    createdat: string
  }

  type VSAPIModTagType = {
    tagid: number
    name: string
    color: string
  }

  type VSVersionType = {
    version: string
    path: string
  }

  type RAPIVSVersionTypes = 'stable' | 'rc' | 'pre'

  type RAPIVSVersionType = {
    version: string
    type: RAPIVSVersionTypes
    releaseDate: number
    importedDate: number
    windows: string
    windowsSha: string
    linux: string
    linuxSha: string
    mac: string
    macSha: string
  }

  type WithoutKeys<T, K extends keyof any> = T extends object ? Omit<T, Extract<keyof T, K>> : T
}

export {}
