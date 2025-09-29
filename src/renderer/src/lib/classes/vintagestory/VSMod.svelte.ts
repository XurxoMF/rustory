import { VSAPIMod } from '@renderer/lib/classes/api/VSAPIMod.svelte'

/**
 * Installed VS Mod info.
 *
 * Must have at least the same properties as {@link TVSMod}.
 */
export class VSMod {
  /**
   * The id of the VS Instance this VS Mod is from.
   */
  private _vsInstanceId: string

  /**
   * The name of the VS Mod.
   */
  private _name: string

  /**
   * The modid of the VS Mod.
   */
  private _modid: string

  /**
   * The version of the VS Mod.
   */
  private _version: string

  /**
   * The path to the VS Mod.
   */
  private _path: string

  /**
   * The description of the VS Mod.
   */
  private _description?: string | undefined

  /**
   * The side of the VS Mod.
   */
  private _side?: string | undefined

  /**
   * The authors of the VS Mod.
   */
  private _authors: string[]

  /**
   * The contributors of the VS Mod.
   */
  private _contributors: string[]

  /**
   * The type of the VS Mod.
   */
  private _type?: string | undefined

  /**
   * The image of the VS Mod.
   */
  private _image?: string | undefined

  /**
   * The VS Mod info from the ModDB.
   */
  private _mod: VSAPIMod

  /**
   * The state of the VS Mod.
   */
  private _state: VSMod.State

  public constructor(data: {
    vsInstanceId: string
    name: string
    modid: string
    version: string
    path: string
    description?: string | undefined
    side?: string | undefined
    authors: string[]
    contributors: string[]
    type?: string | undefined
    image?: string | undefined
    mod: VSAPIMod
    state?: VSMod.State | undefined
  }) {
    this._vsInstanceId = data.vsInstanceId
    this._name = data.name
    this._modid = data.modid
    this._version = data.version
    this._path = data.path
    this._description = data.description
    this._side = data.side
    this._authors = data.authors
    this._contributors = data.contributors
    this._type = data.type
    this._image = data.image
    this._mod = data.mod
    this._state = $state(data.state ?? VSMod.State.INSTALLED)
  }

  /**
   * The id of the VS Instance this VS Mod is from.
   */
  public get vsInstanceId(): string {
    return this._vsInstanceId
  }

  /**
   * The name of the VS Mod.
   */
  public get name(): string {
    return this._name
  }

  /**
   * The modid of the VS Mod.
   */
  public get modid(): string {
    return this._modid
  }

  /**
   * The version of the VS Mod.
   */
  public get version(): string {
    return this._version
  }

  /**
   * The path to the VS Mod.
   */
  public get path(): string {
    return this._path
  }

  /**
   * The description of the VS Mod.
   */
  public get description(): string | undefined {
    return this._description
  }

  /**
   * The side of the VS Mod.
   */
  public get side(): string | undefined {
    return this._side
  }

  /**
   * The authors of the VS Mod.
   */
  public get authors(): string[] {
    return this._authors
  }

  /**
   * The contributors of the VS Mod.
   */
  public get contributors(): string[] {
    return this._contributors
  }

  /**
   * The type of the VS Mod.
   */
  public get type(): string | undefined {
    return this._type
  }

  /**
   * The image of the VS Mod.
   */
  public get image(): string | undefined {
    return this._image
  }

  /**
   * The VS Mod info from the ModDB.
   */
  public get mod(): VSAPIMod {
    return this._mod
  }

  /**
   * The state of the VS Mod.
   */
  public get state(): VSMod.State {
    return this._state
  }

  /**
   * Convert this {@link VSMod} into a {@link TVSMod} json.
   * @returns The {@link TVSMod} json.
   */
  public toJSON(): TVSMod {
    return {
      vsInstanceId: this._vsInstanceId,
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
   * Converts a {@link TVSMod} json to a {@link VSMod}.
   * @param json The {@link TVSMod} to convert.
   * @returns The {@link VSMod}.
   */
  public static fromJSON(json: TVSMod, state?: VSMod.State): VSMod {
    return new VSMod({
      vsInstanceId: json.vsInstanceId,
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
      mod: VSAPIMod.fromJSON(json.mod),
      state: state ?? VSMod.State.INSTALLED
    })
  }
}

export namespace VSMod {
  /**
   * State of the VS Mod.
   */
  export enum State {
    INSTALLED = 'installed',
    NOT_INSTALLED = 'not_installed',
    INSTALLING = 'installing',
    DELETING = 'deleting',
    UPDATING = 'updating'
  }
}
