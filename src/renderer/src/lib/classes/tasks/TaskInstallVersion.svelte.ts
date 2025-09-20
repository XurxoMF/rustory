import { Info } from '../Info.svelte'
import { TaskBase } from './TaskBase.svelte'

export class TaskInstallVersion implements TaskBase {
  /**
   * ID of the task.
   */
  private _id: string

  /**
   * Status of the task.
   */
  private _status: TaskBase.Status

  /**
   * Progress of the task download (0-100).
   */
  private _downloadProgress: number

  /**
   * Progress of the task extraction (0-100).
   */
  private _extractProgress: number

  /**
   * Version to install.
   */
  private _version: string

  /**
   * URL to download the version from.
   */
  private _url: string

  /**
   * Path to extract the version to.
   */
  private _outputPath: string

  public constructor(data: { version: string; url: string; outputPath: string }) {
    this._id = crypto.randomUUID()
    this._status = $state(TaskBase.Status.PENDING)
    this._downloadProgress = $state(0)
    this._extractProgress = $state(0)
    this._version = data.version
    this._url = data.url
    this._outputPath = data.outputPath
  }

  /**
   * ID of the task.
   */
  public get id(): string {
    return this._id
  }

  /**
   * Status of the task.
   */
  public get status(): TaskBase.Status {
    return this._status
  }

  /**
   * Progress of the task (0-100).
   */
  public get progress(): number {
    return Math.floor((this._downloadProgress + this._extractProgress) / 2)
  }

  /**
   * Version to install.
   */
  public get version(): string {
    return this._version
  }

  /**
   * URL to download the version from.
   */
  public get url(): string {
    return this._url
  }

  /**
   * Path to extract the version to.
   */
  public get outputPath(): string {
    return this._outputPath
  }

  /**
   * Execute the task.
   * @returns The final status of the task.
   */
  public async execute(): Promise<TaskBase.Status> {
    const downloadProgressEvent = window.api.net.downloader.on.progress((_event, _id, progress) => (this._downloadProgress = progress))
    const extractProgressEvent = window.api.zip.extractor.on.progress((_event, _id, progress) => (this._extractProgress = progress))

    try {
      // TODO: Add the new version to the list of versions. DON'T ADD IT TO THE DB YET.

      const downloadOutputPath = Info.instance.tempPath
      const downloadFileName = `${this._id}.zip`

      await window.api.net.downloader.download(this._id, this._url, downloadOutputPath, downloadFileName)

      const extractFlePath = await window.api.fs.join(downloadOutputPath, downloadFileName)

      await window.api.zip.extractor.extract(this._id, extractFlePath, this._outputPath)

      // TODO: Delete the zip after extracting it.

      // TODO: Add the version to the database.

      this._status = TaskBase.Status.COMPLETED
      this._downloadProgress = 100
      this._extractProgress = 100

      window.api.logger.info(`Version ${this._version} installed successfully!`)
    } catch (err) {
      window.api.logger.error('There was an error installing the version!')
      window.api.logger.error(`There was an error installing the version:\n${JSON.stringify(err)}`)
      this._status = TaskBase.Status.FAILED
    } finally {
      // Clear progress event listeners and return the status.
      downloadProgressEvent()
      extractProgressEvent()
      return this._status
    }
  }

  /**
   * Cancel the task if it's still pending. Can't be cancelled once started.
   * @returns True if the task was cancelled, false otherwise.
   */
  public async cancel(): Promise<boolean> {
    if (this._status !== TaskBase.Status.PENDING) return false
    this._status = TaskBase.Status.CANCELED
    this._downloadProgress = 0
    this._extractProgress = 0
    return true
  }
}
