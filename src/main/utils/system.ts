import si from 'systeminformation'
import { execSync } from 'child_process'

import { logger } from '@main/utils/logger'
import { bytesToX } from '@shared/utils/math'
import { RustorySystemError } from '@shared/errors/RustorySystemError'

/**
 * Get the OS info.
 * @returns The OS info or undefined if this one could not be retrieved.
 * @throws A {@link RustorySystemError} error.
 */
export async function getOSInfo(): Promise<si.Systeminformation.OsData> {
  try {
    return await si.osInfo()
  } catch (err) {
    logger.warn('Error fetching OS info!')
    logger.debug(`Error fetching OS info\n${JSON.stringify(err)}`)
    throw new RustorySystemError('Error fetching OS info!', RustorySystemError.Codes.SYSTEM_ERROR)
  }
}

/**
 * Get the CPU info.
 * @returns The CPU info or undefined if this one could not be retrieved.
 * @throws A {@link RustorySystemError} error.
 */
export async function getCPUInfo(): Promise<si.Systeminformation.CpuData> {
  try {
    return await si.cpu()
  } catch (err) {
    logger.warn('Error fetching CPU info!')
    logger.debug(`Error fetching CPU info:\n${JSON.stringify(err)}`)
    throw new RustorySystemError('Error fetching CPU info!', RustorySystemError.Codes.SYSTEM_ERROR)
  }
}

/**
 * Get the RAM info.
 * @returns The RAM info or undefined if this one could not be retrieved.
 * @throws A {@link RustorySystemError} error.
 */
export async function getRAMInfo(): Promise<si.Systeminformation.MemData> {
  try {
    return await si.mem()
  } catch (err) {
    logger.warn('Error fetching RAM info!')
    logger.debug(`Error fetching RAM info:\n${JSON.stringify(err)}`)
    throw new RustorySystemError('Error fetching RAM info!', RustorySystemError.Codes.SYSTEM_ERROR)
  }
}

/**
 * Get the GPUs info.
 * @returns The GPUs info or undefined if this one could not be retrieved.
 * @throws A {@link RustorySystemError} error.
 */
export async function getGPUsInfo(): Promise<si.Systeminformation.GraphicsData> {
  try {
    return await si.graphics()
  } catch (err) {
    logger.warn('Error fetching GPUs info!')
    logger.debug(`Error fetching GPUs info:\n${JSON.stringify(err)}`)
    throw new RustorySystemError('Error fetching GPUs info!', RustorySystemError.Codes.SYSTEM_ERROR)
  }
}

/**
 * Get the Volumes info.
 * @returns The Volumes info or undefined if this one could not be retrieved.
 * @throws A {@link RustorySystemError} error.
 */
export async function getVolumesInfo(): Promise<si.Systeminformation.FsSizeData[]> {
  try {
    const volumes = await si.fsSize()
    return volumes.filter((v) => bytesToX(v.size, 'GB') > 0)
  } catch (err) {
    logger.warn('Error fetching volumes info!')
    logger.debug(`Error fetching volumes info:\n${JSON.stringify(err)}`)
    throw new RustorySystemError('Error fetching volumes info!', RustorySystemError.Codes.SYSTEM_ERROR)
  }
}

/**
 * Get the .NET SDKs info.
 * @returns The .NET SDKs info or undefined if this one could not be retrieved.
 * @throws A {@link RustorySystemError} error.
 */
export async function getNETSDKsInfo(): Promise<string[]> {
  try {
    return execSync('dotnet --list-sdks', { encoding: 'utf-8' }).trim().split('\n')
  } catch (err) {
    logger.warn('Error fetching .NET SDKs!')
    logger.debug(`Error fetching .NET SDKs:\n${JSON.stringify(err)}`)
    throw new RustorySystemError('Error fetching .NET SDKs!', RustorySystemError.Codes.SYSTEM_ERROR)
  }
}

/**
 * Get the .NET Runtimes info.
 * @returns The .NET Runtimes info or undefined if this one could not be retrieved.
 * @throws A {@link RustorySystemError} error.
 */
export async function getNETRuntimesInfo(): Promise<string[]> {
  try {
    return execSync('dotnet --list-runtimes', { encoding: 'utf-8' })
      .trim()
      .split('\n')
      .map((rt) => rt.replace('Microsoft.NETCore.App ', ''))
  } catch (err) {
    logger.warn('Error fetching .NET Runtimes!')
    logger.debug(`Error fetching .NET Runtimes:\n${JSON.stringify(err)}`)
    throw new RustorySystemError('Error fetching .NET Runtimes!', RustorySystemError.Codes.SYSTEM_ERROR)
  }
}
