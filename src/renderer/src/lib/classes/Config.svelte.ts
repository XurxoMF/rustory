import { m } from '@renderer/paraglide/messages'
import { getLocale, isLocale, setLocale, type Locale } from '@renderer/paraglide/runtime'
import { RustoryConfigError } from '@shared/errors/RustoryConfigError'

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
    { key: 'dark', name: m.themes__dark(), color: 'bg-zinc-900' },
    { key: 'light', name: m.themes__light(), color: 'bg-zinc-100' },
    { key: 'rust', name: m.themes__rust(), color: 'bg-rust-900' },
    { key: 'midnight', name: m.themes__midnight(), color: 'bg-gray-900' }
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
  private _instancesPath: string

  /**
   * Path where Versions will be saved.
   */
  private _versionsPath: string

  /**
   * Path where Backups will be saved.
   */
  private _backupsPath: string

  private constructor(data: { theme: string; locale: Locale; scale: string; instancesPath: string; versionsPath: string; backupsPath: string }) {
    this._theme = $state(data.theme)
    this._locale = $state(data.locale)
    this._scale = $state(data.scale)
    this._instancesPath = $state(data.instancesPath)
    this._versionsPath = $state(data.versionsPath)
    this._backupsPath = $state(data.backupsPath)
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

      // Get and apply the instancesPath
      let instancesPath = await window.api.db.config.getItem('instances-path')
      if (!instancesPath) {
        instancesPath = await window.api.fs.join(defaultUserDataPath, 'Instances')
        Config.saveInstancesPath(instancesPath)
      }

      // Get and apply the versionsPath
      let versionsPath = await window.api.db.config.getItem('versions-path')
      if (!versionsPath) {
        versionsPath = await window.api.fs.join(defaultUserDataPath, 'Versions')
        Config.saveVersionsPath(versionsPath)
      }

      // Get and apply the backupsPath
      let backupsPath = await window.api.db.config.getItem('backups-path')
      if (!backupsPath) {
        backupsPath = await window.api.fs.join(defaultUserDataPath, 'Backups')
        Config.saveBackupsPath(backupsPath)
      }

      Config._instance = new Config({ theme, locale, scale, instancesPath, versionsPath, backupsPath })
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
   * @throws A {@link RustoryConfigError} if there was an error setting the new theme.
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
   * @throws A {@link RustoryConfigError} if there was an error saving the new theme.
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
   * @throws A {@link RustoryConfigError} if there was an error setting the new scale.
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
   * @throws A {@link RustoryConfigError} if there was an error saving the new scale.
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
   * Path where Instances will be saved.
   */
  public get instancesPath(): string {
    return this._instancesPath
  }

  /**
   * Set a new path for the Instances.
   * @param scale - The path to save.
   * @throws A {@link RustoryConfigError} if there was an error saving the new Instances path.
   */
  public async setInstancesPath(path: string): Promise<void> {
    try {
      await Config.saveInstancesPath(path)
      this._instancesPath = path
    } catch (err) {
      window.api.logger.error('There was an error saving the new Instances path!')
      window.api.logger.debug(`There was an error saving the new Instances path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new Instances path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Save a path for the Instances.
   * @param path - The path to save.
   * @throws A {@link RustoryConfigError} if there was an error saving the new Instances path.
   */
  private static async saveInstancesPath(path: string): Promise<void> {
    try {
      await window.api.db.config.setItem('instances-path', path)
    } catch (err) {
      window.api.logger.error('There was an error saving the new Instances path!')
      window.api.logger.debug(`There was an error saving the new Instances path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new Instances path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Path where Versions will be saved.
   */
  public get versionsPath(): string {
    return this._versionsPath
  }

  /**
   * Set a new path for the Versions.
   * @param scale - The path to save.
   * @throws A {@link RustoryConfigError} if there was an error saving the new Versions path.
   */
  public async setVersionsPath(path: string): Promise<void> {
    try {
      await Config.saveVersionsPath(path)
      this._versionsPath = path
    } catch (err) {
      window.api.logger.error('There was an error saving the new Versions path!')
      window.api.logger.debug(`There was an error saving the new Versions path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new Versions path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Save a path for the Versions.
   * @param path - The path to save.
   * @throws A {@link RustoryConfigError} if there was an error saving the new Versions path.
   */
  private static async saveVersionsPath(path: string): Promise<void> {
    try {
      await window.api.db.config.setItem('versions-path', path)
    } catch (err) {
      window.api.logger.error('There was an error saving the new Versions path!')
      window.api.logger.debug(`There was an error saving the new Versions path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new Versions path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Path where Backups will be saved.
   */
  public get backupsPath(): string {
    return this._backupsPath
  }

  /**
   * Set a new path for the Backups.
   * @param scale - The path to save.
   * @throws A {@link RustoryConfigError} if there was an error saving the new Backups path.
   */
  public async setBackupsPath(path: string): Promise<void> {
    try {
      await Config.saveBackupsPath(path)
      this._backupsPath = path
    } catch (err) {
      window.api.logger.error('There was an error saving the new Backups path!')
      window.api.logger.debug(`There was an error saving the new Backups path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new Backups path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Save a path for the Backups.
   * @param path - The path to save.
   * @throws A {@link RustoryConfigError} if there was an error saving the new Backups path.
   */
  private static async saveBackupsPath(path: string): Promise<void> {
    try {
      await window.api.db.config.setItem('backups-path', path)
    } catch (err) {
      window.api.logger.error('There was an error saving the new Backups path!')
      window.api.logger.debug(`There was an error saving the new Backups path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new Backups path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }
}
