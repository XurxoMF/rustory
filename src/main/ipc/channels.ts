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
    writeJSON: 'fs-write-json'
  },
  system: {
    getOSInfo: 'system-get-os-info',
    getCPUInfo: 'system-get-cpu-info',
    getRAMInfo: 'system-get-ram-info',
    getGPUsInfo: 'system-get-gpus-info',
    getVolumesInfo: 'system-get-volumes-info',
    getNETSDKsInfo: 'system-get-netsdks-info',
    getNETRuntimesInfo: 'system-get-netruntimes-info'
  }
}
