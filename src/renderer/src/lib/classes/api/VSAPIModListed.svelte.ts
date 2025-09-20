// THIS IS THE MODDB MOD BUT FROM THE MODS LIST
// Query it with /api/mods

/**
 * Must have at least the same properties as {@link VSAPIModListedType}
 */
export class VSAPIModListed {
  private _modid: number

  private _assetid: number

  private _downloads: number

  private _follows: number

  private _trendingpoints: number

  private _comments: number

  private _name: string

  private _summary: string | undefined

  private _modidstrs: string[]

  private _author: string

  private _urlalias: string | undefined

  private _side: string

  private _type: string

  private _logo: string

  private _tags: string[]

  private _lastreleased: string

  public constructor(data: {
    modid: number
    assetid: number
    downloads: number
    follows: number
    trendingpoints: number
    comments: number
    name: string
    summary: string | undefined
    modidstrs: string[]
    author: string
    urlalias: string | undefined
    side: string
    type: string
    logo: string
    tags: string[]
    lastreleased: string
  }) {
    this._modid = $state(data.modid)
    this._assetid = $state(data.assetid)
    this._downloads = $state(data.downloads)
    this._follows = $state(data.follows)
    this._trendingpoints = $state(data.trendingpoints)
    this._comments = $state(data.comments)
    this._name = $state(data.name)
    this._summary = $state(data.summary)
    this._modidstrs = $state(data.modidstrs)
    this._author = $state(data.author)
    this._urlalias = $state(data.urlalias)
    this._side = $state(data.side)
    this._type = $state(data.type)
    this._logo = $state(data.logo)
    this._tags = $state(data.tags)
    this._lastreleased = $state(data.lastreleased)
  }

  public get modid(): number {
    return this._modid
  }

  public get assetid(): number {
    return this._assetid
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

  public get name(): string {
    return this._name
  }

  public get summary(): string | undefined {
    return this._summary
  }

  public get modidstrs(): string[] {
    return this._modidstrs
  }

  public get author(): string {
    return this._author
  }

  public get urlalias(): string | undefined {
    return this._urlalias
  }

  public get side(): string {
    return this._side
  }

  public get type(): string {
    return this._type
  }

  public get logo(): string {
    return this._logo
  }

  public get tags(): string[] {
    return this._tags
  }

  public get lastreleased(): string {
    return this._lastreleased
  }

  /**
   * Convert this {@link VSAPIModListed} into a {@link VSAPIModListedType} json
   * @returns The {@link VSAPIModListed} json
   */
  public toJSON(): VSAPIModListedType {
    return {
      modid: this._modid,
      assetid: this._assetid,
      downloads: this._downloads,
      follows: this._follows,
      trendingpoints: this._trendingpoints,
      comments: this._comments,
      name: this._name,
      summary: this._summary,
      modidstrs: this._modidstrs,
      author: this._author,
      urlalias: this._urlalias,
      side: this._side,
      type: this._type,
      logo: this._logo,
      tags: this._tags,
      lastreleased: this._lastreleased
    }
  }

  /**
   * Converts a {@link VSAPIModListedType} json to a {@link VSAPIModListed}
   * @param json The {@link VSAPIModListedType} to convert
   * @returns The {@link VSAPIModListed}
   */
  public static fromJSON(json: VSAPIModListedType): VSAPIModListed {
    return new VSAPIModListed({
      modid: json.modid,
      assetid: json.assetid,
      downloads: json.downloads,
      follows: json.follows,
      trendingpoints: json.trendingpoints,
      comments: json.comments,
      name: json.name,
      summary: json.summary,
      modidstrs: json.modidstrs,
      author: json.author,
      urlalias: json.urlalias,
      side: json.side,
      type: json.type,
      logo: json.logo,
      tags: json.tags,
      lastreleased: json.lastreleased
    })
  }
}
