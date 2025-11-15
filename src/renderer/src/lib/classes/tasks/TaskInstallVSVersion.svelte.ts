import { Info } from '@renderer/lib/classes/Info.svelte'
import { TaskBase } from '@renderer/lib/classes/tasks/TaskBase.svelte'

/**
 * Task to install a VS Version.
 */
export class TaskInstallVSVersion implements TaskBase {
  /**
   * Type of the task.
   */
  public readonly type: TaskBase.Type = TaskBase.Type.VS_VERSION_INSTALL

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
   * URL to download the VS Version from.
   */
  private _url: string

  /**
   * Path to extract the VS Version to.
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
   * URL to download the VS Version from.
   */
  public get url(): string {
    return this._url
  }

  /**
   * Path to extract the VS Version to.
   */
  public get outputPath(): string {
    return this._outputPath
  }

  /**
   * Execute the task.
   * @returns The final status of the task.
   */
  public async execute(): Promise<TaskBase.Status> {
    window.api.logger.debug(`Adding event listeners for TaskInstallVSVersion for VS Version ${this._version}...`)

    const cleanDownloadProgressEvent = window.api.net.downloader.on.progress((_event, id, progress) => {
      if (id === this._id) {
        this._downloadProgress = progress
      }
    })
    const cleanExtractProgressEvent = window.api.zip.extractor.on.progress((_event, id, progress) => {
      if (id === this._id) {
        this._extractProgress = progress
      }
    })

    try {
      window.api.logger.info(`[${this._id}] Running Install Version task for VS Version ${this._version}...`)

      this._status = TaskBase.Status.RUNNING

      const downloadOutputPath = Info.instance.tempPath
      const downloadFileName = `${this._id}.zip`

      await window.api.net.downloader.download(this._id, this._url, downloadOutputPath, downloadFileName)

      const extractFlePath = await window.api.fs.join(downloadOutputPath, downloadFileName)

      await window.api.fs.deletePaths([this.outputPath])

      await window.api.zip.extractor.extract(this._id, extractFlePath, this._outputPath)

      await window.api.fs.deletePaths([extractFlePath])

      this._status = TaskBase.Status.COMPLETED
      this._downloadProgress = 100
      this._extractProgress = 100

      window.api.logger.info(`[${this._id}] Install Version task for VS Version ${this._version} completed successfully!`)
    } catch (err) {
      window.api.logger.error(`[${this._id}] There was an error installing the VS Version ${this._version}!`)
      window.api.logger.debug(`[${this._id}] There was an error installing the VS Version ${this._version}:\n${JSON.stringify(err)}`)
      this._status = TaskBase.Status.FAILED
    } finally {
      cleanDownloadProgressEvent()
      cleanExtractProgressEvent()
      return this._status
    }
  }

  /**
   * Cancel the task if it's still pending. Can't be cancelled once started.
   * @returns If the task was cancelled or not.
   */
  public async cancel(): Promise<boolean> {
    if (this._status !== TaskBase.Status.PENDING) return false
    this._status = TaskBase.Status.CANCELED
    this._downloadProgress = 0
    this._extractProgress = 0
    return true
  }
}
