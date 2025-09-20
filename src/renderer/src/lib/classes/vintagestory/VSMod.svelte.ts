import { VSModRelease } from './VSModRelease.svelte'
import { VSModScreenshot } from './VSModScreenshot.svelte'

// THIS IS THE MODDB MOD
// Query it with /api/mods/{modid}

/**
 * Must have at least the same properties as {@link VSModType}
 */
export class VSMod {
  private _modid: number

  private _assetid: number

  private _name: string

  private _text: string

  private _author: string

  private _urlalias: string | undefined

  private _logofilename: string | undefined

  private _logofile: string | undefined

  private _homepageurl: string | undefined

  private _sourcecodeurl: string | undefined

  private _trailervideourl: string | undefined

  private _issuetrackerurl: string | undefined

  private _wikiurl: string | undefined

  private _downloads: number

  private _follows: number

  private _trendingpoints: number

  private _comments: number

  private _side: string

  private _type: string

  private _createdat: string

  private _lastmodified: string

  private _tags: string[]

  private _releases: VSModRelease[]

  private _screenshots: VSModScreenshot[]

  public constructor(data: {
    modid: number
    assetid: number
    name: string
    text: string
    author: string
    urlalias: string | undefined
    logofilename: string | undefined
    logofile: string | undefined
    homepageurl: string | undefined
    sourcecodeurl: string | undefined
    trailervideourl: string | undefined
    issuetrackerurl: string | undefined
    wikiurl: string | undefined
    downloads: number
    follows: number
    trendingpoints: number
    comments: number
    side: string
    type: string
    createdat: string
    lastmodified: string
    tags: string[]
    releases: VSModRelease[]
    screenshots: VSModScreenshot[]
  }) {
    this._modid = $state(data.modid)
    this._assetid = $state(data.assetid)
    this._name = $state(data.name)
    this._text = $state(data.text)
    this._author = $state(data.author)
    this._urlalias = $state(data.urlalias)
    this._logofilename = $state(data.logofilename)
    this._logofile = $state(data.logofile)
    this._homepageurl = $state(data.homepageurl)
    this._sourcecodeurl = $state(data.sourcecodeurl)
    this._trailervideourl = $state(data.trailervideourl)
    this._issuetrackerurl = $state(data.issuetrackerurl)
    this._wikiurl = $state(data.wikiurl)
    this._downloads = $state(data.downloads)
    this._follows = $state(data.follows)
    this._trendingpoints = $state(data.trendingpoints)
    this._comments = $state(data.comments)
    this._side = $state(data.side)
    this._type = $state(data.type)
    this._createdat = $state(data.createdat)
    this._lastmodified = $state(data.lastmodified)
    this._tags = $state(data.tags)
    this._releases = $state(data.releases)
    this._screenshots = $state(data.screenshots)
  }

  public get modid(): number {
    return this._modid
  }

  public get assetid(): number {
    return this._assetid
  }

  public get name(): string {
    return this._name
  }

  public get text(): string {
    return this._text
  }

  public get author(): string {
    return this._author
  }

  public get urlalias(): string | undefined {
    return this._urlalias
  }

  public get logofilename(): string | undefined {
    return this._logofilename
  }

  public get logofile(): string | undefined {
    return this._logofile
  }

  public get homepageurl(): string | undefined {
    return this._homepageurl
  }

  public get sourcecodeurl(): string | undefined {
    return this._sourcecodeurl
  }

  public get trailervideourl(): string | undefined {
    return this._trailervideourl
  }

  public get issuetrackerurl(): string | undefined {
    return this._issuetrackerurl
  }

  public get wikiurl(): string | undefined {
    return this._wikiurl
  }

  public get downloads(): number {
    return this._downloads
  }

  public get follows(): number {
    return this._follows
  }

  public get trendingpoints(): number {
    return this._trendingpoints
  }

  public get comments(): number {
    return this._comments
  }

  public get side(): string {
    return this._side
  }

  public get type(): string {
    return this._type
  }

  public get createdat(): string {
    return this._createdat
  }

  public get lastmodified(): string {
    return this._lastmodified
  }

  public get tags(): string[] {
    return this._tags
  }

  public get releases(): VSModRelease[] {
    return this._releases
  }

  public get screenshots(): VSModScreenshot[] {
    return this._screenshots
  }

  /**
   * Convert this {@link VSMod} into a {@link VSModType} json
   * @returns The {@link VSModType} json
   */
  public toJSON(): VSModType {
    return {
      modid: this._modid,
      assetid: this._assetid,
      name: this._name,
      text: this._text,
      author: this._author,
      urlalias: this._urlalias,
      logofilename: this._logofilename,
      logofile: this._logofile,
      homepageurl: this._homepageurl,
      sourcecodeurl: this._sourcecodeurl,
      trailervideourl: this._trailervideourl,
      issuetrackerurl: this._issuetrackerurl,
      wikiurl: this._wikiurl,
      downloads: this._downloads,
      follows: this._follows,
      trendingpoints: this._trendingpoints,
      comments: this._comments,
      side: this._side,
      type: this._type,
      createdat: this._createdat,
      lastmodified: this._lastmodified,
      tags: this._tags,
      releases: this._releases,
      screenshots: this._screenshots
    }
  }

  /**
   * Converts a {@link VSModType} json to a {@link VSMod}
   * @param json The {@link VSModType} to convert
   * @returns The {@link VSMod}
   */
  public static fromJSON(json: VSModType): VSMod {
    return new VSMod({
      modid: json.modid,
      assetid: json.assetid,
      name: json.name,
      text: json.text,
      author: json.author,
      urlalias: json.urlalias,
      logofilename: json.logofilename,
      logofile: json.logofile,
      homepageurl: json.homepageurl,
      sourcecodeurl: json.sourcecodeurl,
      trailervideourl: json.trailervideourl,
      issuetrackerurl: json.issuetrackerurl,
      wikiurl: json.wikiurl,
      downloads: json.downloads,
      follows: json.follows,
      trendingpoints: json.trendingpoints,
      comments: json.comments,
      side: json.side,
      type: json.type,
      createdat: json.createdat,
      lastmodified: json.lastmodified,
      tags: json.tags,
      releases: json.releases.map((release) => VSModRelease.fromJSON(release)),
      screenshots: json.screenshots.map((screenshot) => VSModScreenshot.fromJSON(screenshot))
    })
  }
}
