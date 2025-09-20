// THIS IS THE MODDB MOD BUT FROM THE MODS LIST
// Query it with /api/mods

/**
 * Must have at least the same properties as {@link VSAPIModListedType}
 */
export class VSAPIModListed {
  /**
   * The id of the mod.
   */
  private _modid: number

  /**
   * The assetid of the mod.
   */
  private _assetid: number

  /**
   * The downloads of the mod.
   */
  private _downloads: number

  /**
   * The follows of the mod.
   */
  private _follows: number

  /**
   * The trendingpoints of the mod.
   */
  private _trendingpoints: number

  /**
   * The comments of the mod.
   */
  private _comments: number

  /**
   * The name of the mod.
   */
  private _name: string

  /**
   * The summary of the mod.
   */
  private _summary: string | undefined

  /**
   * The modidstrs of the mod.
   */
  private _modidstrs: string[]

  /**
   * The author of the mod.
   */
  private _author: string

  /**
   * The urlalias of the mod.
   */
  private _urlalias: string | undefined

  /**
   * The side of the mod.
   */
  private _side: string

  /**
   * The type of the mod.
   */
  private _type: string

  /**
   * The logo of the mod.
   */
  private _logo: string

  /**
   * The tags of the mod.
   */
  private _tags: string[]

  /**
   * The lastreleased of the mod.
   */
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

  /**
   * The id of the mod.
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
   * The name of the mod.
   */
  public get name(): string {
    return this._name
  }

  /**
   * The summary of the mod.
   */
  public get summary(): string | undefined {
    return this._summary
  }

  /**
   * The modidstrs of the mod.
   */
  public get modidstrs(): string[] {
    return this._modidstrs
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
   * The logo of the mod.
   */
  public get logo(): string {
    return this._logo
  }

  /**
   * The tags of the mod.
   */
  public get tags(): string[] {
    return this._tags
  }

  /**
   * The lastreleased of the mod.
   */
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
