import { getLocale, isLocale, setLocale, type Locale } from '@renderer/paraglide/runtime'
import { RustoryConfigError } from '@shared/errors/RustoryConfigError'

/**
 * Config of the app.
 */
export class Config {
  /**
   * Singleton instance of the Config.
   */
  private static _instance: Config | null = null

  /**
   * Get the instance of the Config.
   * @throws A {@link RustoryConfigError} if the Config is not initialized.
   */
  public static get instance(): Config {
    if (Config._instance === null) throw new RustoryConfigError('Config not initialized!', RustoryConfigError.Codes.NOT_INITIALIZED)
    return Config._instance
  }

  /**
   * List of all the available themes.
   */
  public static THEMES = [
    { key: 'dark', name: 'Dark', color: 'bg-zinc-900' },
    { key: 'light', name: 'Light', color: 'bg-zinc-100' }
  ] as const

  /**
   * List of all the available locales with their data.
   */
  public static LANGUAGES = [
    { lang: 'en', name: 'English', credits: ['XurxoMF'] },
    { lang: 'es', name: 'Español', credits: ['XurxoMF'] }
  ] as const

  /**
   * List of scales for the UI.
   */
  public static SCALES = [
    { scale: '50', name: '50%' },
    { scale: '75', name: '75%' },
    { scale: '100', name: '100%' },
    { scale: '125', name: '125%' },
    { scale: '150', name: '150%' }
  ] as const

  /**
   * Key of the current used theme.
   */
  private _theme: string

  /**
   * Key of the selected language.
   */
  private _locale: Locale

  /**
   * Key of the selected scale.
   */
  private _scale: string

  /**
   * Path where Instances will be saved.
   */
  private _vsInstancesPath: string

  /**
   * Path where Versions will be saved.
   */
  private _vsVersionsPath: string

  /**
   * Path where Backups will be saved.
   */
  private _vsInstanceBackupsPath: string

  private constructor(data: { theme: string; locale: Locale; scale: string; vsInstancesPath: string; vsVersionsPath: string; vsInstanceBackupsPath: string }) {
    this._theme = $state(data.theme)
    this._locale = $state(data.locale)
    this._scale = $state(data.scale)
    this._vsInstancesPath = $state(data.vsInstancesPath)
    this._vsVersionsPath = $state(data.vsVersionsPath)
    this._vsInstanceBackupsPath = $state(data.vsInstanceBackupsPath)
  }

  /**
   * Loads all the configs on this instance.
   */
  public static async init(): Promise<void> {
    try {
      // Locale is loaded Paraglide on startup so just save the value
      const locale = getLocale()

      // Get and apply the theme
      let theme = await window.api.db.config.getItem('theme')
      if (!theme) {
        theme = Config.THEMES[0].key
        Config.saveTheme(theme)
      }
      Config.applyTheme(theme)

      // Get and apply the scale
      let scale = await window.api.db.config.getItem('scale')
      if (!scale) {
        scale = Config.SCALES[2].scale
        Config.saveScale(scale)
      }
      Config.applyScale(scale)

      // Get the user data path for the default paths.
      const defaultUserDataPath = await window.api.fs.getPath('userData')

      // Get and apply the vsInstancesPath
      let vsInstancesPath = await window.api.db.config.getItem('vs-instances-path')
      if (!vsInstancesPath) {
        vsInstancesPath = await window.api.fs.join(defaultUserDataPath, 'VSInstances')
        Config.saveVSInstancesPath(vsInstancesPath)
      }

      // Get and apply the vsVersionsPath
      let vsVersionsPath = await window.api.db.config.getItem('vs-versions-path')
      if (!vsVersionsPath) {
        vsVersionsPath = await window.api.fs.join(defaultUserDataPath, 'VSVersions')
        Config.saveVSVersionsPath(vsVersionsPath)
      }

      // Get and apply the vsInstanceBackupsPath
      let vsInstanceBackupsPath = await window.api.db.config.getItem('vs-instance-backups-path')
      if (!vsInstanceBackupsPath) {
        vsInstanceBackupsPath = await window.api.fs.join(defaultUserDataPath, 'VSInstanceBackups')
        Config.saveVSInstanceBackupsPath(vsInstanceBackupsPath)
      }

      Config._instance = new Config({ theme, locale, scale, vsInstancesPath, vsVersionsPath, vsInstanceBackupsPath })
    } catch (err) {
      window.api.logger.error('There was an error initializating the config! The app will be closed!')
      window.api.logger.debug(`There was an error initializating the config:\n${JSON.stringify(err)}`)
      window.api.rustory.exit(1)
    }
  }

  /**
   * Key of the selected language.
   */
  public get locale(): Locale {
    return this._locale
  }

  /**
   * Set a new locale. Set's english if there provided locale is invalid.
   * @param locale - The key of the language to change to.
   */
  public async setLocale(locale: Locale | string): Promise<void> {
    if (!locale) locale = 'en'

    if (isLocale(locale)) {
      setLocale(locale, { reload: false })
      this._locale = locale
    } else {
      setLocale('en', { reload: false })
    }
  }

  /**
   * Key of the selected theme.
   */
  public get theme(): string {
    return this._theme
  }

  /**
   * Set a new theme.
   * @param theme - The key of the theme to apply.
   * @throws A {@link RustoryConfigError} error.
   */
  public async setTheme(theme: string): Promise<void> {
    try {
      await Config.saveTheme(theme)
      Config.applyTheme(theme)
      this._theme = theme
    } catch (err) {
      window.api.logger.error('There was an error setting the new theme!')
      window.api.logger.debug(`There was an error setting the new theme:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error setting the new theme!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Save a theme.
   * @param theme - The key of the theme to save.
   * @throws A {@link RustoryConfigError} error.
   */
  private static async saveTheme(theme: string): Promise<void> {
    try {
      await window.api.db.config.setItem('theme', theme)
    } catch (err) {
      window.api.logger.error('There was an error saving the new theme!')
      window.api.logger.debug(`There was an error saving the new theme:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new theme!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Apply a theme.
   * @param theme The theme to apply.
   */
  private static applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme)
  }

  /**
   * Key of the selected scale.
   */
  public get scale(): string {
    return this._scale
  }

  /**
   * Set a new UI scale.
   * @param scale - The key of the scale to apply.
   * @throws A {@link RustoryConfigError} error.
   */
  public async setScale(scale: string): Promise<void> {
    try {
      await Config.saveScale(scale)
      Config.applyScale(scale)
      this._scale = scale
    } catch (err) {
      window.api.logger.error('There was an error setting the new scale!')
      window.api.logger.debug(`There was an error setting the new scale:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error setting the new scale!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Save a scale.
   * @param scale - The key of the scale to save.
   * @throws A {@link RustoryConfigError} error.
   */
  private static async saveScale(scale: string): Promise<void> {
    try {
      await window.api.db.config.setItem('scale', scale)
    } catch (err) {
      window.api.logger.error('There was an error saving the new scale!')
      window.api.logger.debug(`There was an error saving the new scale:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new scale!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Apply a scale.
   * @param scale The scale to apply.
   */
  private static applyScale(scale: string): void {
    document.documentElement.setAttribute('data-uiscale', scale)
  }

  /**
   * Path where VS Instances will be saved.
   */
  public get vsInstancesPath(): string {
    return this._vsInstancesPath
  }

  /**
   * Set a new path for the VS Instances.
   * @param scale - The path to save.
   * @throws A {@link RustoryConfigError} error.
   */
  public async setVSInstancesPath(path: string): Promise<void> {
    try {
      await Config.saveVSInstancesPath(path)
      this._vsInstancesPath = path
    } catch (err) {
      window.api.logger.error('There was an error saving the new VS Instances path!')
      window.api.logger.debug(`There was an error saving the new VS Instances path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new VS Instances path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Save a path for the VS Instances.
   * @param path - The path to save.
   * @throws A {@link RustoryConfigError} error.
   */
  private static async saveVSInstancesPath(path: string): Promise<void> {
    try {
      await window.api.db.config.setItem('vs-instances-path', path)
    } catch (err) {
      window.api.logger.error('There was an error saving the new Instances path!')
      window.api.logger.debug(`There was an error saving the new Instances path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new Instances path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Path where VS Versions will be saved.
   */
  public get vsVersionsPath(): string {
    return this._vsVersionsPath
  }

  /**
   * Set a new path for the VS Versions.
   * @param scale - The path to save.
   * @throws A {@link RustoryConfigError} error.
   */
  public async setVSVersionsPath(path: string): Promise<void> {
    try {
      await Config.saveVSVersionsPath(path)
      this._vsVersionsPath = path
    } catch (err) {
      window.api.logger.error('There was an error saving the new VS Versions path!')
      window.api.logger.debug(`There was an error saving the new VS Versions path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new VS Versions path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Save a path for the VS Versions.
   * @param path - The path to save.
   * @throws A {@link RustoryConfigError} error.
   */
  private static async saveVSVersionsPath(path: string): Promise<void> {
    try {
      await window.api.db.config.setItem('vs-versions-path', path)
    } catch (err) {
      window.api.logger.error('There was an error saving the new VS Versions path!')
      window.api.logger.debug(`There was an error saving the new VS Versions path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new VS Versions path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Path where VS Instance Backups will be saved.
   */
  public get vsInstanceBackupsPath(): string {
    return this._vsInstanceBackupsPath
  }

  /**
   * Set a new path for the VS Instance Backups.
   * @param scale - The path to save.
   * @throws A {@link RustoryConfigError} error.
   */
  public async setVSInstanceBackupsPath(path: string): Promise<void> {
    try {
      await Config.saveVSInstanceBackupsPath(path)
      this._vsInstanceBackupsPath = path
    } catch (err) {
      window.api.logger.error('There was an error saving the new VS Instance Backups path!')
      window.api.logger.debug(`There was an error saving the new VS Instance Backups path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new VS Instance Backups path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Save a path for the VS Instance Backups.
   * @param path - The path to save.
   * @throws A {@link RustoryConfigError} error.
   */
  private static async saveVSInstanceBackupsPath(path: string): Promise<void> {
    try {
      await window.api.db.config.setItem('vs-instance-backups-path', path)
    } catch (err) {
      window.api.logger.error('There was an error saving the new VS Instance Backups path!')
      window.api.logger.debug(`There was an error saving the new VS Instance Backups path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new VS Instance Backups path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }
}
