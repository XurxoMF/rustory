import type { VSModRelease } from './VSModRelease.svelte'
import type { VSModScreenshot } from './VSModScreenshot.svelte'

export class VSMod {
  private _modid: number

  private _assetid: number

  private _name: string

  private _text: string

  private _author: string

  private _urlalias: string | null

  private _logofilename: string | null

  private _logofile: string | null

  private _homepageurl: string | null

  private _sourcecodeurl: string | null

  private _trailervideourl: string | null

  private _issuetrackerurl: string | null

  private _wikiurl: string | null

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

  constructor(
    modid: number,
    assetid: number,
    name: string,
    text: string,
    author: string,
    urlalias: string | null,
    logofilename: string | null,
    logofile: string | null,
    homepageurl: string | null,
    sourcecodeurl: string | null,
    trailervideourl: string | null,
    issuetrackerurl: string | null,
    wikiurl: string | null,
    downloads: number,
    follows: number,
    trendingpoints: number,
    comments: number,
    side: string,
    type: string,
    createdat: string,
    lastmodified: string,
    tags: string[],
    releases: VSModRelease[],
    screenshots: VSModScreenshot[]
  ) {
    this._modid = $state(modid)
    this._assetid = $state(assetid)
    this._name = $state(name)
    this._text = $state(text)
    this._author = $state(author)
    this._urlalias = $state(urlalias)
    this._logofilename = $state(logofilename)
    this._logofile = $state(logofile)
    this._homepageurl = $state(homepageurl)
    this._sourcecodeurl = $state(sourcecodeurl)
    this._trailervideourl = $state(trailervideourl)
    this._issuetrackerurl = $state(issuetrackerurl)
    this._wikiurl = $state(wikiurl)
    this._downloads = $state(downloads)
    this._follows = $state(follows)
    this._trendingpoints = $state(trendingpoints)
    this._comments = $state(comments)
    this._side = $state(side)
    this._type = $state(type)
    this._createdat = $state(createdat)
    this._lastmodified = $state(lastmodified)
    this._tags = $state(tags)
    this._releases = $state(releases)
    this._screenshots = $state(screenshots)
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
  public get urlalias(): string | null {
    return this._urlalias
  }
  public get logofilename(): string | null {
    return this._logofilename
  }
  public get logofile(): string | null {
    return this._logofile
  }
  public get homepageurl(): string | null {
    return this._homepageurl
  }
  public get sourcecodeurl(): string | null {
    return this._sourcecodeurl
  }
  public get trailervideourl(): string | null {
    return this._trailervideourl
  }
  public get issuetrackerurl(): string | null {
    return this._issuetrackerurl
  }
  public get wikiurl(): string | null {
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
}
