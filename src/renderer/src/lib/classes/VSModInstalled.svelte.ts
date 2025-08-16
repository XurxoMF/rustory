import { VSMod } from './VSMod.svelte'

/**
 * Must have the same properties as {@link VSModInstalledType}
 */
export class VSModInstalled {
  private _name: string

  private _modid: string

  private _version: string

  private _path: string

  private _description: string | undefined

  private _side: string | undefined

  private _authors: string[]

  private _contributors: string[]

  private _type: string | undefined

  private _image: string | undefined

  private _mod: VSMod

  constructor(vsModInstalled: {
    name: string
    modid: string
    version: string
    path: string
    description: string | undefined
    side: string | undefined
    authors: string[]
    contributors: string[]
    type: string | undefined
    image: string | undefined
    mod: VSMod
  }) {
    this._name = $state(vsModInstalled.name)
    this._modid = $state(vsModInstalled.modid)
    this._version = $state(vsModInstalled.version)
    this._path = $state(vsModInstalled.path)
    this._description = $state(vsModInstalled.description)
    this._side = $state(vsModInstalled.side)
    this._authors = $state(vsModInstalled.authors)
    this._contributors = $state(vsModInstalled.contributors)
    this._type = $state(vsModInstalled.type)
    this._image = $state(vsModInstalled.image)
    this._mod = $state(vsModInstalled.mod)
  }

  public get name(): string {
    return this._name
  }

  public get modid(): string {
    return this._modid
  }

  public get version(): string {
    return this._version
  }

  public get path(): string {
    return this._path
  }

  public get description(): string | undefined {
    return this._description
  }

  public get side(): string | undefined {
    return this._side
  }

  public get authors(): string[] {
    return this._authors
  }

  public get contributors(): string[] {
    return this._contributors
  }

  public get type(): string | undefined {
    return this._type
  }

  public get image(): string | undefined {
    return this._image
  }

  public get mod(): VSMod {
    return this._mod
  }

  /**
   * Convert this {@link VSModInstalled} into a {@link VSModInstalledType} json
   *
   * @returns The {@link VSModInstalledType} json
   */
  toJSON(): VSModInstalledType {
    return {
      name: this._name,
      modid: this._modid,
      version: this._version,
      path: this._path,
      description: this._description,
      side: this._side,
      authors: this._authors,
      contributors: this._contributors,
      type: this._type,
      image: this._image,
      mod: this._mod
    }
  }

  /**
   * Converts a {@link VSModInstalledType} json to a {@link VSModInstalled}
   *
   * @param json The {@link VSModInstalledType} to convert
   * @returns The {@link VSModInstalled}
   */
  static fromJSON(json: VSModInstalledType): VSModInstalled {
    return new VSModInstalled({
      name: json.name,
      modid: json.modid,
      version: json.version,
      path: json.path,
      description: json.description,
      side: json.side,
      authors: json.authors,
      contributors: json.contributors,
      type: json.type,
      image: json.image,
      mod: VSMod.fromJSON(json.mod)
    })
  }
}
