import { VSAPIMod } from '../api/VSAPIMod.svelte'

// THIS IS THE INSTALLED MOD
// Get the modinfo.json properties from the mod .zip file

/**
 * Must have at least the same properties as {@link VSModType}
 */
export class VSMod {
  /**
   * The name of the mod.
   */
  private _name: string

  /**
   * The modid of the mod.
   */
  private _modid: string

  /**
   * The version of the mod.
   */
  private _version: string

  /**
   * The path to the mod.
   */
  private _path: string

  /**
   * The description of the mod.
   */
  private _description: string | undefined

  /**
   * The side of the mod.
   */
  private _side: string | undefined

  /**
   * The authors of the mod.
   */
  private _authors: string[]

  /**
   * The contributors of the mod.
   */
  private _contributors: string[]

  /**
   * The type of the mod.
   */
  private _type: string | undefined

  /**
   * The image of the mod.
   */
  private _image: string | undefined

  /**
   * The mod info from the ModDB.
   */
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

  /**
   * The name of the mod.
   */
  public get name(): string {
    return this._name
  }

  /**
   * The modid of the mod.
   */
  public get modid(): string {
    return this._modid
  }

  /**
   * The version of the mod.
   */
  public get version(): string {
    return this._version
  }

  /**
   * The path to the mod.
   */
  public get path(): string {
    return this._path
  }

  /**
   * The description of the mod.
   */
  public get description(): string | undefined {
    return this._description
  }

  /**
   * The side of the mod.
   */
  public get side(): string | undefined {
    return this._side
  }

  /**
   * The authors of the mod.
   */
  public get authors(): string[] {
    return this._authors
  }

  /**
   * The contributors of the mod.
   */
  public get contributors(): string[] {
    return this._contributors
  }

  /**
   * The type of the mod.
   */
  public get type(): string | undefined {
    return this._type
  }

  /**
   * The image of the mod.
   */
  public get image(): string | undefined {
    return this._image
  }

  /**
   * The mod info from the ModDB.
   */
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
