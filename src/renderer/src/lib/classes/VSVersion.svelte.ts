/**
 * Must have the same properties as {@link VSVersionType}
 */
export class VSVersion {
  private _version: string

  private _path: string

  constructor(version: string, path: string) {
    this._version = $state(version)
    this._path = $state(path)
  }

  public get version(): string {
    return this._version
  }
  public get path(): string {
    return this._path
  }
}
