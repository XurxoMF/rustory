import { VSAPIMod } from '../api/VSAPIMod.svelte'

// THIS IS THE INSTALLED MOD
// Get the modinfo.json properties from the mod .zip file

/**
 * Must have at least the same properties as {@link VSModType}
 */
export class VSMod {
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

  private _mod: VSAPIMod

  public constructor(data: {
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
    mod: VSAPIMod
  }) {
    this._name = $state(data.name)
    this._modid = $state(data.modid)
    this._version = $state(data.version)
    this._path = $state(data.path)
    this._description = $state(data.description)
    this._side = $state(data.side)
    this._authors = $state(data.authors)
    this._contributors = $state(data.contributors)
    this._type = $state(data.type)
    this._image = $state(data.image)
    this._mod = $state(data.mod)
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

  public get mod(): VSAPIMod {
    return this._mod
  }

  /**
   * Convert this {@link VSMod} into a {@link VSModType} json
   * @returns The {@link VSModType} json
   */
  public toJSON(): VSModType {
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
   * Converts a {@link VSModType} json to a {@link VSMod}
   * @param json The {@link VSModType} to convert
   * @returns The {@link VSMod}
   */
  public static fromJSON(json: VSModType): VSMod {
    return new VSMod({
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
      mod: VSAPIMod.fromJSON(json.mod)
    })
  }
}
