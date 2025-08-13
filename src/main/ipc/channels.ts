export const IPC_CHANNELS = {
  logger: {
    info: 'logger-info',
    warn: 'logger-warn',
    error: 'logger-error',
    debug: 'logger-debug',
    verbose: 'logger-verbose'
  },
  fs: {
    readJSON: 'fs-read-json',
    writeJSON: 'fs-write-json',
    showDialog: 'fs-show-dialog',
    join: 'fs-join',
    getPath: 'fs-get-path'
  },
  system: {
    getOSInfo: 'system-get-os-info',
    getCPUInfo: 'system-get-cpu-info',
    getRAMInfo: 'system-get-ram-info',
    getGPUsInfo: 'system-get-gpus-info',
    getVolumesInfo: 'system-get-volumes-info',
    getNETSDKsInfo: 'system-get-netsdks-info',
    getNETRuntimesInfo: 'system-get-netruntimes-info'
  },
  window: {
    minimize: 'window-minimize',
    maximize: 'window-maximize',
    hide: 'window-hide',
    close: 'window-close',
    getName: 'window-get-name'
  },
  rustory: {
    getName: 'rustory-get-name',
    getVersion: 'rustory-get-version'
  },
  shell: {
    openURL: 'shell-open-url',
    openPath: 'shell-open-path'
  },
  db: {
    config: {
      setItem: 'db-config-set-item',
      getItem: 'db-config-get-item'
    }
  }
}
