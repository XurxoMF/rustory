/**
 * Must have the same properties as {@link VSModListedType}
 */
export class VSModListed {
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

  constructor(vsModListed: {
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
    this._modid = $state(vsModListed.modid)
    this._assetid = $state(vsModListed.assetid)
    this._downloads = $state(vsModListed.downloads)
    this._follows = $state(vsModListed.follows)
    this._trendingpoints = $state(vsModListed.trendingpoints)
    this._comments = $state(vsModListed.comments)
    this._name = $state(vsModListed.name)
    this._summary = $state(vsModListed.summary)
    this._modidstrs = $state(vsModListed.modidstrs)
    this._author = $state(vsModListed.author)
    this._urlalias = $state(vsModListed.urlalias)
    this._side = $state(vsModListed.side)
    this._type = $state(vsModListed.type)
    this._logo = $state(vsModListed.logo)
    this._tags = $state(vsModListed.tags)
    this._lastreleased = $state(vsModListed.lastreleased)
  }

  public get modid(): number {
    return this._modid
  }

  get assetid(): number {
    return this._assetid
  }

  get downloads(): number {
    return this._downloads
  }

  get follows(): number {
    return this._follows
  }

  get trendingpoints(): number {
    return this._trendingpoints
  }

  get comments(): number {
    return this._comments
  }

  get name(): string {
    return this._name
  }

  get summary(): string | undefined {
    return this._summary
  }

  get modidstrs(): string[] {
    return this._modidstrs
  }

  get author(): string {
    return this._author
  }

  get urlalias(): string | undefined {
    return this._urlalias
  }

  get side(): string {
    return this._side
  }

  get type(): string {
    return this._type
  }

  get logo(): string {
    return this._logo
  }

  get tags(): string[] {
    return this._tags
  }

  get lastreleased(): string {
    return this._lastreleased
  }

  /**
   * Convert this {@link VSModListed} into a {@link VSModListedType} json
   *
   * @returns The {@link VSModListed} json
   */
  toJSON(): VSModListedType {
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
   * Converts a {@link VSModListedType} json to a {@link VSModListed}
   *
   * @param json The {@link VSModListedType} to convert
   * @returns The {@link VSModListed}
   */
  static fromJSON(json: VSModListedType): VSModListed {
    return new VSModListed({
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
