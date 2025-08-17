import { m } from '@renderer/paraglide/messages'
import { getLocale, isLocale, setLocale, type Locale } from '@renderer/paraglide/runtime'
import { RustoryConfigError } from '../../../../shared/errors/RustoryConfigError'

export class Config {
  /**
   * Singleton instance of the Config.
   */
  private static _instance: Config | null = null

  /**
   * Get the instance of the Config.
   */
  static get instance(): Config {
    if (Config._instance === null) Config._instance = new Config()
    return Config._instance
  }

  /**
   * List of all the available themes.
   */
  static THEMES = [
    { key: 'dark', name: m.themes__dark(), color: 'bg-zinc-900' },
    { key: 'light', name: m.themes__light(), color: 'bg-zinc-100' },
    { key: 'rust', name: m.themes__rust(), color: 'bg-rust-900' },
    { key: 'midnight', name: m.themes__midnight(), color: 'bg-gray-900' }
  ] as const

  /**
   * List of all the available locales with their data.
   */
  static LANGUAGES = [
    { lang: 'en', name: 'English', credits: ['XurxoMF'] },
    { lang: 'es', name: 'Español', credits: ['XurxoMF'] }
  ] as const

  /**
   * List of scales for the UI.
   */
  static SCALES = [
    { scale: '50', name: '50%' },
    { scale: '75', name: '75%' },
    { scale: '100', name: '100%' },
    { scale: '125', name: '125%' },
    { scale: '150', name: '150%' }
  ] as const

  /**
   * Key of the current used theme.
   */
  private _theme: string = $state('dark')

  /**
   * Key of the selected language.
   */
  private _locale: Locale = $state('en')

  /**
   * Key of the selected scale.
   */
  private _scale: string = $state('100')

  /**
   * Path where Instances will be saved.
   */
  private _instancesPath: string = $state('')

  /**
   * Path where Versions will be saved.
   */
  private _versionsPath: string = $state('')

  /**
   * Path where Backups will be saved.
   */
  private _backupsPath: string = $state('')

  private constructor() {}

  /**
   * Loads all the configs on this instance.
   */
  async init(): Promise<void> {
    try {
      // Locale is loaded Paraglide on startup so just save the value
      this._locale = getLocale()

      // Get and apply the theme
      this._theme = localStorage.getItem('theme') || Config.THEMES[0].key
      Config.applyTheme(this._theme)

      // Get and apply the scale
      this._scale = localStorage.getItem('uiscale') || Config.SCALES[2].scale
      Config.applyScale(this._scale)

      const defaultUserDataPath = await window.api.fs.getPath('userData')

      // Get and apply the instancesPath
      const instancesPath = await window.api.db.config.getItem('instances-path')
      if (instancesPath) {
        this._instancesPath = instancesPath
      } else {
        const defaultInstancesPath = await window.api.fs.join(defaultUserDataPath, 'Instances')
        await this.setInstancesPath(defaultInstancesPath)
      }

      // Get and apply the versionsPath
      const versionsPath = await window.api.db.config.getItem('versions-path')
      if (versionsPath) {
        this._versionsPath = versionsPath
      } else {
        const defaultVersionsPath = await window.api.fs.join(defaultUserDataPath, 'Versions')
        await this.setVersionsPath(defaultVersionsPath)
      }

      // Get and apply the backupsPath
      const backupsPath = await window.api.db.config.getItem('backups-path')
      if (backupsPath) {
        this._backupsPath = backupsPath
      } else {
        const defaultBackupsPath = await window.api.fs.join(defaultUserDataPath, 'Backups')
        await this.setBackupsPath(defaultBackupsPath)
      }
    } catch (err) {
      window.api.logger.error('There was an error initializating the config! The app will be closed!')
      window.api.logger.error(`There was an error initializating the config:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error initializating the config!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Key of the current used theme.
   */
  get theme(): string {
    return this._theme
  }

  /**
   * Set a new theme.
   * @param theme - The key of the theme to apply.
   */
  async setTheme(theme: string): Promise<void> {
    try {
      localStorage.setItem('theme', theme)
      Config.applyTheme(theme)
      this._theme = theme
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
    document.body.setAttribute('data-theme', theme)
  }

  /**
   * Key of the selected language.
   */
  get locale(): Locale {
    return this._locale
  }

  /**
   * Set a new language.
   * @param locale - The key of the language to change to.
   */
  async setLocale(locale: Locale | string): Promise<void> {
    try {
      if (!locale) locale = 'en'
      if (isLocale(locale)) {
        setLocale(locale, { reload: false })
        this._locale = locale
      }
    } catch (err) {
      window.api.logger.error('There was an error saving the new locale!')
      window.api.logger.debug(`There was an error saving the new locale:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new locale!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Key of the selected scale.
   */
  get scale(): string {
    return this._scale
  }

  /**
   * Set a new UI scale.
   * @param scale - The key of the scale to apply.
   */
  setScale(scale: string): void {
    try {
      localStorage.setItem('uiscale', scale)
      Config.applyScale(scale)
      this._scale = scale
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
  get instancesPath(): string {
    return this._instancesPath
  }

  /**
   * Set a new path for the Instances.
   * @param scale - The path to save.
   */
  async setInstancesPath(path: string): Promise<void> {
    try {
      await window.api.db.config.setItem('instances-path', path)
      this._instancesPath = path
    } catch (err) {
      window.api.logger.error('There was an error saving the new Instances path!')
      window.api.logger.debug(`There was an error saving the new Instances path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new Instances path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Path where Versions will be saved.
   */
  get versionsPath(): string {
    return this._versionsPath
  }

  /**
   * Set a new path for the Versions.
   * @param scale - The path to save.
   */
  async setVersionsPath(path: string): Promise<void> {
    try {
      await window.api.db.config.setItem('versions-path', path)
      this._versionsPath = path
    } catch (err) {
      window.api.logger.error('There was an error saving the new Versions path!')
      window.api.logger.debug(`There was an error saving the new Versions path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new Versions path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }

  /**
   * Path where Backups will be saved.
   */
  get backupsPath(): string {
    return this._backupsPath
  }

  /**
   * Set a new path for the Backups.
   * @param scale - The path to save.
   */
  async setBackupsPath(path: string): Promise<void> {
    try {
      await window.api.db.config.setItem('backups-path', path)
      this._backupsPath = path
    } catch (err) {
      window.api.logger.error('There was an error saving the new Backups path!')
      window.api.logger.debug(`There was an error saving the new Backups path:\n${JSON.stringify(err)}`)
      throw new RustoryConfigError('There was an error saving the new Backups path!', RustoryConfigError.Codes.CONFIG_ERROR)
    }
  }
}
