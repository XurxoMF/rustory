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
    getPath: 'fs-get-path',
    changePerms: 'fs-change-perms'
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
    close: 'window-close'
  },
  rustory: {
    getName: 'rustory-get-name',
    getVersion: 'rustory-get-version',
    exit: 'app-exit'
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
  },
  zip: {
    extractor: {
      extract: 'zip-extractor-extract',
      on: {
        progress: 'zip-extractor-on-progress'
      }
    },
    compressor: {
      compress: 'zip-compressor-compress',
      on: {
        progress: 'zip-compressor-on-progress'
      }
    }
  },
  net: {
    request: 'net-request',
    downloader: {
      download: 'net-downloader-download',
      on: {
        progress: 'new-downloader-on-progress'
      }
    }
  },
  notifications: {
    notify: 'notifications-notify',
    on: {
      click: 'notifications-on-click'
    }
  }
}
