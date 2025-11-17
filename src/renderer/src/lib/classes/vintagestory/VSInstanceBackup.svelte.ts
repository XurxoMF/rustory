/**
 * VS Instance Backup.
 *
 * Must have at least the same properties as {@link TVSInstanceBackup}.
 */
export class VSInstanceBackup {
  /**
   * The id of the VS Instance Backup.
   */
  private _id: string

  /**
   * The id of the VS Instance this VS Instance Backup is from.
   */
  private _vsInstanceId: string

  /**
   * The date of the VS Instance Backup.
   */
  private _date: number

  /**
   * The path of the VS Instance Backup.
   */
  private _path: string

  /**
   * The state of the VS Instance Backup.
   */
  private _state: VSInstanceBackup.State

  public constructor(data: { id: string; vsInstanceId: string; date: number; path: string; state?: VSInstanceBackup.State | undefined }) {
    this._id = data.id
    this._vsInstanceId = data.vsInstanceId
    this._date = data.date
    this._path = data.path
    this._state = $state(data.state ?? VSInstanceBackup.State.READY)
  }

  /**
   * The id of the VS Instance Backup.
   */
  public get id(): string {
    return this._id
  }

  /**
   * The id of the VS Instance this VS Instance Backup is from.
   */
  public get vsInstanceId(): string {
    return this._vsInstanceId
  }

  /**
   * The date of the VS Instance Backup.
   */
  public get date(): number {
    return this._date
  }

  /**
   * The path of the VS Instance Backup.
   */
  public get path(): string {
    return this._path
  }

  /**
   * The state of the VS Instance Backup.
   */
  public get state(): VSInstanceBackup.State {
    return this._state
  }

  /**
   * Convert this {@link VSInstanceBackup} into a {@link TVSInstanceBackup} json.
   * @returns The {@link TVSInstanceBackup} json.
   */
  public toJSON(): TVSInstanceBackup {
    return {
      id: this._id,
      vsInstanceId: this._vsInstanceId,
      date: this._date,
      path: this._path
    }
  }

  /**
   * Converts a {@link TVSInstanceBackup} json to a {@link VSInstanceBackup}.
   * @param json The {@link TVSInstanceBackup} to convert.
   * @returns The {@link VSInstanceBackup}.
   */
  public static fromJSON(json: TVSInstanceBackup, state?: VSInstanceBackup.State | undefined): VSInstanceBackup {
    return new VSInstanceBackup({
      id: json.id,
      vsInstanceId: json.vsInstanceId,
      date: json.date,
      path: json.path,
      state: state ?? VSInstanceBackup.State.READY
    })
  }
}

export namespace VSInstanceBackup {
  /**
   * State of the VS Instance Backup.
   */
  export enum State {
    CREATING = 'creating',
    DELETING = 'deleting',
    RESTORING = 'restoring',
    READY = 'ready'
  }
}
