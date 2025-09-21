import { SvelteMap } from 'svelte/reactivity'

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
   * List of id <-> callback to execute when a notification is clicked-
   */
  private clickCallbacks = new SvelteMap<string, Notifications.Callback>()

  public constructor() {
    window.api.notifications.on.click((_event, id) => {
      const cb = this.clickCallbacks.get(id)
      if (cb) {
        cb()
        this.clickCallbacks.delete(id)
      }
    })
  }

  /**
   * Send a notification to the user.
   * @param title Title of the notification
   * @param body Body of the notification
   * @returns A list of events
   */
  public notify(title: string, body: string) {
    return {
      onClick: async (callback: Notifications.Callback) => {
        const id = await window.api.notifications.notify(title, body)
        this.clickCallbacks.set(id, callback)
      }
    }
  }
}

export namespace Notifications {
  /**
   * Callback to execute when a notification is clicked.
   */
  export type Callback = () => void
}
