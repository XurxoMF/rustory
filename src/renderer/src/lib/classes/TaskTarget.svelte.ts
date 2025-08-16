export class TaskTarget {
  /**
   * Type of the target.
   */
  private _type: TaskTarget.TypeType

  /**
   * ID of the target.
   */
  private _id: string

  constructor(taskTarget: { type: TaskTarget.TypeType; id: string }) {
    this._type = taskTarget.type
    this._id = taskTarget.id
  }

  /**
   * Type of the target.
   */
  get type(): TaskTarget.TypeType {
    return this._type
  }

  /**
   * ID of the target.
   */
  get id(): string {
    return this._id
  }
}

export namespace TaskTarget {
  /**
   * TypeType is not a missinput. Type of TaskTarget.Type so TypeType + it's a Type so TypeType...
   */
  export type TypeType = 'instance' | 'version'
}
