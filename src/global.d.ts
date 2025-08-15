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

  type VSAccountType = {
    id: number
    email: string
    playerName: string
    playerUid: string
    playerEntitlements: string
    sessionKey: string
    sessionSignature: string
    mptoken: string | null
    hostGameServer: boolean
  }

  type VSInstanceType = {
    id: number
    name: string
    // icon: string
    path: string
    version: string
    startParams: string
    backupsLimit: number
    backupsAuto: boolean
    compressionLevel: number
    backups: VSInstanceBackupType[]
    mods: VSModInstalledType[]
    lastTimePlayed: number
    totalTimePlayed: number
    mesaGlThread: boolean
    envVars: string
  }

  type VSInstanceBackupType = {
    id: number
    date: number
    path: string
  }

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

  type VSModType = {
    modid: number
    assetid: number
    name: string
    text: string
    author: string
    urlalias: string | null
    logofilename: string | null
    logofile: string | null
    homepageurl: string | null
    sourcecodeurl: string | null
    trailervideourl: string | null
    issuetrackerurl: string | null
    wikiurl: string | null
    downloads: number
    follows: number
    trendingpoints: number
    comments: number
    side: string
    type: string
    createdat: string
    lastmodified: string
    tags: string[]
    releases: VSModReleaseType[]
    screenshots: VSModScreenshotType[]
  }

  type VSModAuthorType = {
    userid: string
    name: string
  }

  type VSModGameVersionType = {
    tagid: string
    name: string
    color: string
  }

  type VSModInstalledType = {
    name: string
    modid: string
    version: string
    path: string
    description: string | null
    side: string | null
    authors: string[]
    contributors: string[]
    type: string | null
    image: string | null
    mod: VSModType
  }

  type VSModReleaseType = {
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

  type VSModScreenshotType = {
    fileid: number
    mainfile: string
    filename: string
    thumbnailfile: string
    createdat: string
  }

  type VSModTagType = {
    tagid: number
    name: string
    color: string
  }

  type VSVersionType = {
    version: string
    path: string
  }
}

export {}
