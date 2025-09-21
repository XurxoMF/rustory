import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  type BridgeAPI = {
    /**
     * Log messages to the log files with the selected level.
     */
    logger: {
      /**
       * Logs a message with info level.
       * @param message The message to log.
       */
      info: (message: string) => void
      /**
       * Logs a message with warn level.
       * @param message The message to log.
       */
      warn: (message: string) => void
      /**
       * Logs a message with error level.
       * @param message The message to log.
       */
      error: (message: string) => void
      /**
       * Logs a message with debug level.
       * @param message The message to log.
       */
      debug: (message: string) => void
      /**
       * Logs a message with verbose level.
       * @param message The message to log.
       */
      verbose: (message: string) => void
    }
    fs: {
      /**
       * Reads a file as JSON and returns the content.
       * @param filePath Path to the JSON file.
       * @returns The JSON content or undefined if the file does not exist or an error occurs.
       * @throws A RustoryFSError error.
       */
      readJSON: (filePath: string) => Promise<any | undefined>
      /**
       * Writes a JSON object to a file.
       * @param filePath Path to the JSON file.
       * @param content JSON to write to the file.
       * @returns If the operation was successful ro not.
       * @throws A RustoryFSError error.
       */
      writeJSON: (filePath: string, content: any) => Promise<boolean>
      /**
       * Open a file explorer dialog to select files or folders.
       * @param title Title to show on the dialog.
       * @param type Files or folders.
       * @param multiple Multiple items or single item.
       * @param extensions List of required file extensions.
       * @returns The selected files/folders or undefined if the users selected nothing or an error ocurred.
       * @throws A RustoryFSError error.
       */
      showDialog: (title: string, type: 'openFile' | 'openDirectory', multiple: boolean, extensions: string[]) => Promise<string[]>
      /**
       * Joins the path parts with the OS specific sepparator.
       * @param parts The segments of the path.
       * @returns The whole path.
       */
      join: (...parts: string[]) => Promise<string>
      /**
       * Get's the path of the passed key.
       * @param path Key of the path.
       * @returns The path.
       */
      getPath: (path: TPaths) => Promise<string>
      /**
       * Change permissions to the specified paths.
       * @param paths Paths to change perms to.
       * @param perms The permissions to change to. Example: `0o755`.
       * @throws A RustoryFSError error.
       */
      changePerms: (paths: string[], perms: number) => Promise<void>
      /**
       * Delete the specified paths.
       * @param paths Paths to change perms to.
       * @throws A RustoryFSError error.
       */
      deletePaths: (paths: string[]) => Promise<void>
    }
    /**
     * Get the system info of various hardware and software components.
     */
    system: {
      /**
       * Get the OS info.
       * @returns The OS info or undefined if this one could not be retrieved.
       * @throws A RustorySystemError error.
       */
      getOSInfo: () => Promise<Systeminformation.OsData>
      /**
       * Get the CPU info.
       * @returns The CPU info or undefined if this one could not be retrieved.
       * @throws A RustorySystemError error.
       */
      getCPUInfo: () => Promise<Systeminformation.CpuData>
      /**
       * Get the RAM info.
       * @returns The RAM info or undefined if this one could not be retrieved.
       * @throws A RustorySystemError error.
       */
      getRAMInfo: () => Promise<Systeminformation.MemData>
      /**
       * Get the GPUs info.
       * @returns The GPUs info or undefined if this one could not be retrieved.
       * @throws A RustorySystemError error.
       */
      getGPUsInfo: () => Promise<Systeminformation.GraphicsData>
      /**
       * Get the Volumes info.
       * @returns The Volumes info or undefined if this one could not be retrieved.
       * @throws A RustorySystemError error.
       */
      getVolumesInfo: () => Promise<Systeminformation.FsSizeData[]>
      /**
       * Get the .NET SDKs info.
       * @returns The .NET SDKs info or undefined if this one could not be retrieved.
       * @throws A RustorySystemError error.
       */
      getNETSDKsInfo: () => Promise<string[]>
      /**
       * Get the .NET Runtimes info.
       * @returns The .NET Runtimes info or undefined if this one could not be retrieved.
       * @throws A RustorySystemError error.
       */
      getNETRuntimesInfo: () => Promise<string[]>
    }
    /**
     * interact with the window and get info from it.
     */
    window: {
      /**
       * Minimize the window.
       */
      minimize: () => void
      /**
       * Maximize or window the window.
       */
      maximize: () => void
      /**
       * Hide the window to the tray.
       */
      hide: () => void
      /**
       * Close the window and, if it's the only window open, close the app.
       */
      close: () => void
    }
    /**
     * Interact with the app and get info from it.
     */
    rustory: {
      /**
       * Get the app name.
       * @returns The name of the app.
       */
      getName: () => Promise<string>
      /**
       * Get the app version.
       * @returns The app version.
       */
      getVersion: () => Promise<string>
      /**
       * Close the app inmediatly.
       * @param code The exit code. 0 means no errors, 1 means errors.
       */
      exit: (code: number) => void
    }
    /**
     * Execute programs and other shell action.
     */
    shell: {
      /**
       * Open the given URL on the appropiate app.
       * @param url The URL to open.
       */
      openURL: (url: string) => void
      /**
       * Open the given path on the appropiate app.
       * @param execPath path URL to open.
       */
      openPath: (path: string) => void
    }
    /**
     * Interact with the database.
     */
    db: {
      /**
       * Interact with the config table.
       */
      config: {
        /**
         * Search the DB for the pair key <-> value.
         * @param key The key to search.
         * @returns The value found.
         * @throws A RustoryDBError error.
         */
        getItem: (key: string) => Promise<string | undefined>
        /**
         * Add or update a pair key <-> value to the DB.
         * @param key The key to save.
         * @param value Thew value to save.
         * @returns If it was saved or not.
         * @throws A RustoryDBError error.
         */
        setItem: (key: string, value: string) => Promise<void>
      }
      /**
       * Interact with the vsVersion table.
       */
      vsVersion: {
        /**
         * Add or update a VS Version to the DB.
         * @param version The VS Version to save.
         * @returns If it was saved or not.
         * @throws A RustoryDBError error.
         */
        saveVSVersion: (version: TVSVersion) => Promise<void>
        /**
         * Delete a VS Version from the DB.
         * @param version The VS Version to delete.
         * @throws A RustoryDBError error.
         */
        deleteVSVersion: (version: TVSVersion) => Promise<void>
        /**
         * Get all the VS Versions from the DB.
         * @returns The VS Versions found.
         * @throws A RustoryDBError error.
         */
        getVSVersions: () => Promise<TVSVersion[]>
      }
      /**
       * Interact with the vsInstance table.
       */
      vsInstance: {
        /**
         * Add or update an VS Instance to the DB.
         * @param instance The VS Instance to save.
         * @returns If it was saved or not.
         * @throws A RustoryDBError error.
         */
        saveVSInstance: (instance: TVSInstance) => Promise<void>
        /**
         * Delete an VS Instance from the DB.
         * @param instance The VS Instance to delete.
         * @throws A RustoryDBError error.
         */
        deleteVSInstance: (instance: TVSInstance) => Promise<void>
        /**
         * Get all the VS Instances from the DB.
         * @returns The VS Instances found.
         * @throws A RustoryDBError error.
         */
        getVSInstances: () => Promise<TVSInstance[]>
      }
    }
    /**
     * Compress, extract, read... zip files.
     */
    zip: {
      /**
       * Extract zip files.
       */
      extractor: {
        /**
         * Extracts a zip to the selected path and reports the progress.
         * @param id ID of the process.
         * @param filePath Path of the zip to extract.
         * @param outputPath Path to extract the zip to.
         * @throws A RustoryZipError error.
         */
        extract: (id: string, filePath: string, outputPath: string) => Promise<void>
        /**
         * Subscribe to extraction events.
         */
        on: {
          /**
           * Executes a callback every time a new progress is reported.
           * @param callback The callback that will be executed.
           * @param callback.id The id of the task.
           * @param callback The progress reported.
           */
          progress: (callback: (event: Electron.IpcRendererEvent, id: string, progress: number) => void) => () => void
        }
      }
      /**
       * Compress zip files.
       */
      compressor: {
        /**
         * Compress a path as zip and reports the progress.
         * @param id ID of the process.
         * @param inputPath Path to compress as zip.
         * @param outputPath Path to compress to.
         * @param outputFileName Name of the zip file.
         * @param compressionLevel Compress level of the file.
         * @throws A RustoryZipError error.
         */
        compress: (id: string, inputPaths: string[], outputPath: string, outputFileName: string, compressionLevel: number | undefined) => Promise<void>
        /**
         * Subscribe to compression events.
         */
        on: {
          /**
           * Executes a callback every time a new progress is reported.
           * @param callback The callback that will be executed.
           * @param callback.id The id of the task.
           * @param callback The progress reported.
           */
          progress: (callback: (event: Electron.IpcRendererEvent, id: string, progress: number) => void) => () => void
        }
      }
    }
    /**
     * Make requests, downloads... avoiding CORS.
     */
    net: {
      /**
       * Request a URL and returns the data avoiding CORS.
       * @param url The URL to request.
       * @returns The string returned by the request.
       * @throws A RustoryNetError error.
       */
      request: (url: string) => Promise<string>
      /**
       * Download files avoiding CORS.
       */
      downloader: {
        /**
         * Download a file on the specified directory and reports the progress.
         * @param id ID of the process.
         * @param url URL to download.
         * @param outputPath Path to download the file to.
         * @param fileName Name of the resulting file.
         * @throws A RustoryNetError error.
         */
        download: (id: string, url: string, outputPath: string, fileName: string) => Promise<void>
        /**
         * Subscribe to download events.
         */
        on: {
          /**
           * Executes a callback every time a new progress is reported.
           * @param callback The callback that will be executed.
           * @param callback.id The id of the task.
           * @param callback The progress reported.
           */
          progress: (callback: (event: Electron.IpcRendererEvent, id: string, progress: number) => void) => () => void
        }
      }
    }
    /**
     * Send and interact with system notification.
     */
    notifications: {
      /**
       * Shows a notification to the user.
       * @param title Title of the notification.
       * @param body Body of the notification.
       * @param onClick Callback to execute when the notification is clicked.
       * @returns The id of the notification.
       * @throws A RustoryNotificationError error.
       */
      notify: (title: string, body: string) => Promise<string>
      /**
       * Subscribe to notification events.
       */
      on: {
        /**
         * Executes a callback every time a notification is clicked.
         * @param callback The callback that will be executed.
         * @param callback.id The id of the notification.
         */
        click: (callback: (event: Electron.IpcRendererEvent, id: string) => void) => () => void
      }
    }
  }

  interface Window {
    electron: ElectronAPI
    api: BridgeAPI
  }
}
