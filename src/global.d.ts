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

  type TVSAccount = {
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

  type TVSInstance = {
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

  type TVSInstanceBackup = {
    id: string
    vsInstanceId: string
    date: number
    path: string
  }

  type TVSAPIModListed = {
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

  type TVSAPIMod = {
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
    releases: TVSAPIModRelease[]
    screenshots: TVSAPIModScreenshot[]
  }

  type TVSAPIModAuthor = {
    userid: string
    name: string
  }

  type TVSAPIModGameVersion = {
    tagid: string
    name: string
    color: string
  }

  type TVSMod = {
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
    mod: TVSAPIMod
  }

  type TVSAPIModRelease = {
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

  type TVSAPIModScreenshot = {
    fileid: number
    mainfile: string
    filename: string
    thumbnailfile: string
    createdat: string
  }

  type TVSAPIModTag = {
    tagid: number
    name: string
    color: string
  }

  type TVSVersion = {
    version: string
    path: string
  }

  type TRAPIVSVersionType = 'stable' | 'rc' | 'pre'

  type TRAPIVSVersion = {
    version: string
    type: TRAPIVSVersionType
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
