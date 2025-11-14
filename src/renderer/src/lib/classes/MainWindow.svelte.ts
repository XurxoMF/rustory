import { RustoryWindowError } from '@shared/errors/RustoryWindowError'

/**
 * MainWindow of the app.
 */
export class MainWindow {
  /**
   * Singleton instance of the MainWindow.
   */
  private static _instance: MainWindow | null = null

  /**
   * Get the instance of the MainWindow.
   * @throws A {@link RustoryWindowError} if the MainWindow is not initialized.
   */
  public static get instance(): MainWindow {
    if (MainWindow._instance === null) throw new RustoryWindowError('MainWindow not initialized!', RustoryWindowError.Codes.NOT_INITIALIZED)
    return MainWindow._instance
  }

  /**
   * Maximized state of the Main Window.
   */
  private _maximized: boolean

  /**
   * Minimized state of the Main Window.
   */
  private _minimized: boolean

  /**
   * Fullscreened state of the Main Window.
   */
  private _fullscreened: boolean

  private constructor(data: { maximized: boolean; minimized: boolean; fullscreened: boolean }) {
    this._maximized = $state(data.maximized)
    this._minimized = $state(data.minimized)
    this._fullscreened = $state(data.fullscreened)

    window.api.window.on.maximize((_e, maximized) => (this._maximized = maximized))
    window.api.window.on.minimize((_e, minimized) => (this._minimized = minimized))
    window.api.window.on.fullscreen((_e, fullscreened) => (this._fullscreened = fullscreened))
  }

  /**
   * Loads all the info about Rustory on this instance.
   */
  public static async init(): Promise<void> {
    try {
      // Load basic info.
      const maximized = await window.api.window.maximized()
      const minimized = await window.api.window.minimized()
      const fullscreened = await window.api.window.fullscreened()

      // Set the info
      MainWindow._instance = new MainWindow({
        maximized,
        minimized,
        fullscreened
      })
    } catch (err) {
      window.api.logger.error('There was an error initializating the main window! The app will be closed!')
      window.api.logger.debug(`There was an error initializating the main window:\n${JSON.stringify(err)}`)
      window.api.rustory.exit(1)
    }
  }

  /**
   * Maximized state of the Main Window.
   */
  public get maximized(): boolean {
    return this._maximized
  }

  /**
   * Minimized state of the Main Window.
   */
  public get minimized(): boolean {
    return this._minimized
  }

  /**
   * Fullscreened state of the Main Window.
   */
  public get fullscreened(): boolean {
    return this._fullscreened
  }
}
