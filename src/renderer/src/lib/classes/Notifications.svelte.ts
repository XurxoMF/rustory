import { SvelteMap } from 'svelte/reactivity'

export class Notifications {
  /**
   * Singleton instance of the Notifications.
   */
  private static _instance: Notifications | null = null

  /**
   * Get the instance of the Notifications.
   */
  static get instance(): Notifications {
    if (Notifications._instance === null) Notifications._instance = new Notifications()
    return Notifications._instance
  }

  /**
   * List of id <-> callback to execute when a notification is clicked-
   */
  private clickCallbacks = new SvelteMap<string, Notifications.NotificationCallback>()

  constructor() {
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
   *
   * @param title Title of the notification
   * @param body Body of the notification
   * @returns A list of events
   */
  notify(title: string, body: string) {
    return {
      onClick: async (callback: Notifications.NotificationCallback) => {
        const id = await window.api.notifications.notify(title, body)
        this.clickCallbacks.set(id, callback)
      }
    }
  }
}

export namespace Notifications {
  export type NotificationCallback = () => void
}
