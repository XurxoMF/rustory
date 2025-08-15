import type { VSMod } from './VSMod.svelte'

export class VSModInstalled {
  private _name: string

  private _modid: string

  private _version: string

  private _path: string

  private _description: string | null

  private _side: string | null

  private _authors: string[]

  private _contributors: string[]

  private _type: string | null

  private _image: string | null

  private _mod: VSMod

  constructor(
    name: string,
    modid: string,
    version: string,
    path: string,
    description: string | null,
    side: string | null,
    authors: string[],
    contributors: string[],
    type: string | null,
    image: string | null,
    mod: VSMod
  ) {
    this._name = $state(name)
    this._modid = $state(modid)
    this._version = $state(version)
    this._path = $state(path)
    this._description = $state(description)
    this._side = $state(side)
    this._authors = $state(authors)
    this._contributors = $state(contributors)
    this._type = $state(type)
    this._image = $state(image)
    this._mod = $state(mod)
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
  public get description(): string | null {
    return this._description
  }
  public get side(): string | null {
    return this._side
  }
  public get authors(): string[] {
    return this._authors
  }
  public get contributors(): string[] {
    return this._contributors
  }
  public get type(): string | null {
    return this._type
  }
  public get image(): string | null {
    return this._image
  }
  public get mod(): VSMod {
    return this._mod
  }
}
