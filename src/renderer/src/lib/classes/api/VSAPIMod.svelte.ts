import { VSAPIModRelease } from './VSAPIModRelease.svelte'
import { VSAPIModScreenshot } from './VSAPIModScreenshot.svelte'

// THIS IS THE MODDB MOD
// Query it with /api/mods/{modid}

/**
 * Must have at least the same properties as {@link VSAPIModType}
 */
export class VSAPIMod {
  /**
   * The id of the mod.
   */
  private _modid: number

  /**
   * The id of the asset.
   */
  private _assetid: number

  /**
   * The name of the mod.
   */
  private _name: string

  /**
   * The description of the mod.
   */
  private _text: string

  /**
   * The author of the mod.
   */
  private _author: string

  /**
   * The url alias of the mod.
   */
  private _urlalias: string | undefined

  /**
   * The logo filename of the mod.
   */
  private _logofilename: string | undefined

  /**
   * The logo file of the mod.
   */
  private _logofile: string | undefined

  /**
   * The homepage url of the mod.
   */
  private _homepageurl: string | undefined

  /**
   * The source code url of the mod.
   */
  private _sourcecodeurl: string | undefined

  /**
   * The trailer video url of the mod.
   */
  private _trailervideourl: string | undefined

  /**
   * The issue tracker url of the mod.
   */
  private _issuetrackerurl: string | undefined

  /**
   * The wiki url of the mod.
   */
  private _wikiurl: string | undefined

  /**
   * The downloads of the mod.
   */
  private _downloads: number

  /**
   * The follows of the mod.
   */
  private _follows: number

  /**
   * The trending points of the mod.
   */
  private _trendingpoints: number

  /**
   * The comments of the mod.
   */
  private _comments: number

  /**
   * The side of the mod.
   */
  private _side: string

  /**
   * The type of the mod.
   */
  private _type: string

  /**
   * The created at of the mod.
   */
  private _createdat: string

  /**
   * The last modified of the mod.
   */
  private _lastmodified: string

  /**
   * The tags of the mod.
   */
  private _tags: string[]

  /**
   * The releases of the mod.
   */
  private _releases: VSAPIModRelease[]

  /**
   * The screenshots of the mod.
   */
  private _screenshots: VSAPIModScreenshot[]

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
    releases: VSAPIModRelease[]
    screenshots: VSAPIModScreenshot[]
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

  /**
   * The modid of the mod.
   */
  public get modid(): number {
    return this._modid
  }

  /**
   * The assetid of the mod.
   */
  public get assetid(): number {
    return this._assetid
  }

  /**
   * The name of the mod.
   */
  public get name(): string {
    return this._name
  }

  /**
   * The text of the mod.
   */
  public get text(): string {
    return this._text
  }

  /**
   * The author of the mod.
   */
  public get author(): string {
    return this._author
  }

  /**
   * The urlalias of the mod.
   */
  public get urlalias(): string | undefined {
    return this._urlalias
  }

  /**
   * The logofilename of the mod.
   */
  public get logofilename(): string | undefined {
    return this._logofilename
  }

  /**
   * The logofile of the mod.
   */
  public get logofile(): string | undefined {
    return this._logofile
  }

  /**
   * The homepageurl of the mod.
   */
  public get homepageurl(): string | undefined {
    return this._homepageurl
  }

  /**
   * The sourcecodeurl of the mod.
   */
  public get sourcecodeurl(): string | undefined {
    return this._sourcecodeurl
  }

  /**
   * The trailervideourl of the mod.
   */
  public get trailervideourl(): string | undefined {
    return this._trailervideourl
  }

  /**
   * The issuetrackerurl of the mod.
   */
  public get issuetrackerurl(): string | undefined {
    return this._issuetrackerurl
  }

  /**
   * The wikiurl of the mod.
   */
  public get wikiurl(): string | undefined {
    return this._wikiurl
  }

  /**
   * The downloads of the mod.
   */
  public get downloads(): number {
    return this._downloads
  }

  /**
   * The follows of the mod.
   */
  public get follows(): number {
    return this._follows
  }

  /**
   * The trendingpoints of the mod.
   */
  public get trendingpoints(): number {
    return this._trendingpoints
  }

  /**
   * The comments of the mod.
   */
  public get comments(): number {
    return this._comments
  }

  /**
   * The side of the mod.
   */
  public get side(): string {
    return this._side
  }

  /**
   * The type of the mod.
   */
  public get type(): string {
    return this._type
  }

  /**
   * The createdat of the mod.
   */
  public get createdat(): string {
    return this._createdat
  }

  /**
   * The lastmodified of the mod.
   */
  public get lastmodified(): string {
    return this._lastmodified
  }

  /**
   * The tags of the mod.
   */
  public get tags(): string[] {
    return this._tags
  }

  /**
   * The releases of the mod.
   */
  public get releases(): VSAPIModRelease[] {
    return this._releases
  }

  /**
   * The screenshots of the mod.
   */
  public get screenshots(): VSAPIModScreenshot[] {
    return this._screenshots
  }

  /**
   * Convert this {@link VSAPIMod} into a {@link VSAPIModType} json
   * @returns The {@link VSAPIModType} json
   */
  public toJSON(): VSAPIModType {
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
   * Converts a {@link VSAPIModType} json to a {@link VSAPIMod}
   * @param json The {@link VSAPIModType} to convert
   * @returns The {@link VSAPIMod}
   */
  public static fromJSON(json: VSAPIModType): VSAPIMod {
    return new VSAPIMod({
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
      releases: json.releases.map((release) => VSAPIModRelease.fromJSON(release)),
      screenshots: json.screenshots.map((screenshot) => VSAPIModScreenshot.fromJSON(screenshot))
    })
  }
}
