/**
 * Store for the toast notifications.
 */
export class Toasts {
  /**
   * Singleton instance of the Toasts.
   */
  private static _instance: Toasts = new Toasts()

  /**
   * Get the instance of the Toasts.
   */
  public static get instance(): Toasts {
    return Toasts._instance
  }

  /**
   * The list of toasts.
   */
  private _toasts: Toast[] = $state([])

  private constructor() {}

  /**
   * Get the list of toasts.
   */
  public get toasts(): Toast[] {
    return this._toasts
  }

  /**
   * Remove a toast from the list.
   * @param toast The toast to remove.
   */
  public removeToast(toast: Toast): void {
    toast.clearTimeout() // Limpamos o timeout cando eliminamos o toast
    this._toasts = this._toasts.filter((t) => t.id !== toast.id)
  }

  /**
   * Add a new toast to the list.
   * @param toast The toast to add.
   */
  public addToast(toast: Toast): void {
    this._toasts.push(toast)
    toast.startTimeout(() => this.removeToast(toast))
  }

  /**
   * Restart the timeout for a specific toast.
   * @param toast The toast to restart timeout for.
   */
  public restartToast(toast: Toast): void {
    toast.restartTimeout(() => this.removeToast(toast))
  }
}

/**
 * Toast notification.
 *
 * Add it to the {@link Toasts} store always!
 */
export class Toast {
  /**
   * The id of the toast.
   */
  private _id: string

  /**
   * The type of the toast.
   */
  private _type: Toast.Type

  /**
   * The title of the toast.
   */
  private _title: string

  /**
   * The description of the toast.
   */
  private _description: string

  /**
   * The time that has to pass for the toast to hide.
   */
  private _hideAfter: number

  /**
   * The onclick callback of the toast.
   */
  private _onclick?: (() => void | Promise<void>) | undefined

  /**
   * The timeout ID for auto-removal.
   */
  private _timeout?: NodeJS.Timeout | undefined

  public constructor(data: { type: Toast.Type; title: string; description: string; hideAfter?: number | undefined; onclick?: (() => void | Promise<void>) | undefined }) {
    this._id = crypto.randomUUID()
    this._type = data.type
    this._title = data.title
    this._description = data.description
    this._hideAfter = data.hideAfter ?? 5000
    this._onclick = data.onclick
  }

  /**
   * Start the timeout for auto-removal.
   * @param callback Function to call when timeout expires
   */
  public startTimeout(callback: () => void): void {
    this.clearTimeout() // Limpamos calquera timeout anterior
    this._timeout = setTimeout(callback, this._hideAfter)
  }

  /**
   * Clear the timeout for auto-removal.
   */
  public clearTimeout(): void {
    if (this._timeout) {
      clearTimeout(this._timeout)
      this._timeout = undefined
    }
  }

  /**
   * Restart the timeout (useful for mouse interactions).
   * @param callback Function to call when timeout expires
   */
  public restartTimeout(callback: () => void): void {
    this.startTimeout(callback)
  }

  /**
   * The id of the toast.
   */
  public get id(): string {
    return this._id
  }

  /**
   * The type of the toast.
   */
  public get type(): Toast.Type {
    return this._type
  }

  /**
   * The title of the toast.
   */
  public get title(): string {
    return this._title
  }

  /**
   * The description of the toast.
   */
  public get description(): string {
    return this._description
  }

  /**
   * The time that has to pass for the toast to hide.
   */
  public get hideAfter(): number {
    return this._hideAfter
  }

  /**
   * The onclick callback of the toast.
   */
  public get onclick(): (() => void | Promise<void>) | undefined {
    return this._onclick
  }
}

export namespace Toast {
  /**
   * The types of toast notifications.
   */
  export enum Type {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info'
  }
}
