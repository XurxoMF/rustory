/**
 * Notifications store and manager.
 */
export class Notifications {
  /**
   * Singleton instance of the Notifications.
   */
  private static _instance: Notifications = new Notifications()

  /**
   * Get the instance of the Notifications.
   */
  public static get instance(): Notifications {
    return Notifications._instance
  }

  /**
   * The list of notifications.
   */
  private _notifications: Notification[] = $state([])

  public constructor() {
    window.api.notifications.on.click((_event, id) => {
      const notification = this._notifications.find((n) => n.id === id)
      if (notification) notification.onclick?.()
    })
  }

  /**
   * Add a new notification to the list and shows it.
   * @param notification The notification to add and show.
   */
  public addNotification(notification: Notification): void {
    this._notifications.push(notification)
    notification.show()
  }
}

/**
 * A system notification.
 */
export class Notification {
  /**
   * The id of the notification.
   */
  private _id: string

  /**
   * The title of the notification.
   */
  private _title: string

  /**
   * The description of the notification.
   */
  private _description: string

  /**
   * The onclick callback of the notification.
   */
  private _onclick?: (() => void | Promise<void>) | undefined

  public constructor(data: { title: string; description: string; onclick?: (() => void | Promise<void>) | undefined }) {
    this._id = crypto.randomUUID()
    this._title = data.title
    this._description = data.description
    this._onclick = data.onclick
  }

  /**
   * The id of the notification.
   */
  public get id(): string {
    return this._id
  }

  /**
   * The title of the notification.
   */
  public get title(): string {
    return this._title
  }

  /**
   * The description of the notification.
   */
  public get description(): string {
    return this._description
  }

  /**
   * The onclick callback of the notification.
   */
  public get onclick(): (() => void | Promise<void>) | undefined {
    return this._onclick
  }

  /**
   * Show the notification.
   */
  public show(): void {
    window.api.notifications.notify(this._id, this._title, this._description)
  }
}
