import { RustoryHotkeysError } from '@shared/errors/RustoryHotkeysError'

import { openCommand } from '@renderer/lib/ui/app/Command.svelte'

/**
 * Hotkeys of the app.
 */
export class Hotkeys {
  /**
   * Singleton instance of the Hotkeys.
   */
  private static _instance: Hotkeys | null = null

  /**
   * Get the instance of the Hotkeys.
   * @throws A {@link RustoryHotkeysError} if the Hotkeys is not initialized.
   */
  public static get instance(): Hotkeys {
    if (Hotkeys._instance === null) throw new RustoryHotkeysError('Hotkeys not initialized!', RustoryHotkeysError.Codes.NOT_INITIALIZED)
    return Hotkeys._instance
  }

  /**
   * Hotkeys of the app.
   */
  private _hotkeys: Hotkey[]

  private constructor(data: { hotkeys: Hotkey[] }) {
    this._hotkeys = $state(data.hotkeys)

    window.addEventListener('keydown', this.handleKeyDown)
  }

  /**
   * Loads all the hotkeys on this instance.
   */
  public static async init(): Promise<void> {
    try {
      let hotkeys: Hotkey[] = []

      const hkOpenCommand = new Hotkey({
        id: 'hkOpenCommand',
        keys: ['ctrl', 'k'],
        action: () => openCommand()
      })
      hotkeys.push(hkOpenCommand)

      // TODO: Load all the Hotkeys

      Hotkeys._instance = new Hotkeys({
        hotkeys
      })
    } catch (err) {
      window.api.logger.error('There was an error initializating the hotkeys! The app will be closed!')
      window.api.logger.debug(`There was an error initializating the hotkeys:\n${JSON.stringify(err)}`)
      window.api.rustory.exit(1)
    }
  }

  /**
   * Hotkeys of the app.
   */
  public get hotkeys(): Hotkey[] {
    return this._hotkeys
  }

  /**
   * Normalizes a key.
   * @param key The key to normalize.
   * @returns The key normalized.
   */
  private normalizeKey(key: string): string {
    return key.toLowerCase()
  }

  /**
   * Handles the keydown event.
   * @param e The keydown event.
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    const pressed: string[] = []

    if (e.ctrlKey) pressed.push('ctrl')
    if (e.shiftKey) pressed.push('shift')
    if (e.altKey) pressed.push('alt')
    if (e.metaKey) pressed.push('meta')

    const mainKey = this.normalizeKey(e.key)
    if (!['control', 'shift', 'alt', 'meta'].includes(mainKey)) {
      pressed.push(mainKey)
    }

    for (const hk of this._hotkeys) {
      if (this.isMatch(hk.keys, pressed)) {
        e.preventDefault()
        hk.action()
        break
      }
    }
  }

  /**
   * Checks if the keys are the same.
   * @param defined The keys defined.
   * @param pressed The keys pressed.
   * @returns True if the keys are the same.
   */
  private isMatch(defined: string[], pressed: string[]): boolean {
    const a = [...defined].sort().join('+')
    const b = [...pressed].sort().join('+')
    return a === b
  }
}

/**
 * A Hotkey.
 */
export class Hotkey {
  /**
   * The ID of the hotkey.
   */
  private _id: string

  /**
   * The keys of the hotkey.
   */
  private _keys: string[]

  /**
   * The action of the hotkey.
   */
  private _action: () => void | Promise<void>

  public constructor(data: { id: string; keys: string[]; action: () => void | Promise<void> }) {
    this._id = data.id
    this._keys = data.keys
    this._action = data.action
  }

  /**
   * The ID of the hotkey.
   */
  public get id(): string {
    return this._id
  }

  /**
   * The keys of the hotkey.
   */
  public get keys(): string[] {
    return this._keys
  }

  /**
   * The action of the hotkey.
   */
  public get action(): () => void | Promise<void> {
    return this._action
  }
}
