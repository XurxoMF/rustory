import si from 'systeminformation'
import { execSync } from 'child_process'

import { logger } from '@main/utils/logger'
import { bytesToX } from '@shared/utils/math'

/**
 * Get the OS info
 *
 * @returns The OS info or null if this one could not be retrieved
 */
export async function getOSInfo(): Promise<si.Systeminformation.OsData | null> {
  try {
    return await si.osInfo()
  } catch (err) {
    logger.warn('Error fetching OS info!')
    logger.debug(`Error fetching OS info\n${JSON.stringify(err)}`)
    return null
  }
}

/**
 * Get the CPU info
 *
 * @returns The CPU info or null if this one could not be retrieved
 */
export async function getCPUInfo(): Promise<si.Systeminformation.CpuData | null> {
  try {
    return await si.cpu()
  } catch (err) {
    logger.warn('Error fetching CPU info!')
    logger.debug(`Error fetching CPU info:\n${JSON.stringify(err)}`)
    return null
  }
}

/**
 * Get the RAM info
 *
 * @returns The RAM info or null if this one could not be retrieved
 */
export async function getRAMInfo(): Promise<si.Systeminformation.MemData | null> {
  try {
    return await si.mem()
  } catch (err) {
    logger.warn('Error fetching RAM info!')
    logger.debug(`Error fetching RAM info:\n${JSON.stringify(err)}`)
    return null
  }
}

/**
 * Get the GPUs info
 *
 * @returns The GPUs info or null if this one could not be retrieved
 */
export async function getGPUsInfo(): Promise<si.Systeminformation.GraphicsData | null> {
  try {
    return await si.graphics()
  } catch (err) {
    logger.warn('Error fetching GPUs info!')
    logger.debug(`Error fetching GPUs info:\n${JSON.stringify(err)}`)
    return null
  }
}

/**
 * Get the Volumes info
 *
 * @returns The Volumes info or null if this one could not be retrieved
 */
export async function getVolumesInfo(): Promise<si.Systeminformation.FsSizeData[] | null> {
  try {
    const volumes = await si.fsSize()
    return volumes.filter((v) => bytesToX(v.size, 'GB') > 0)
  } catch (err) {
    logger.warn('Error fetching volumes info!')
    logger.debug(`Error fetching volumes info:\n${JSON.stringify(err)}`)
    return null
  }
}

/**
 * Get the .NET SDKs info
 *
 * @returns The .NET SDKs info or null if this one could not be retrieved
 */
export async function getNETSDKsInfo(): Promise<string[] | null> {
  try {
    return execSync('dotnet --list-sdks', { encoding: 'utf-8' }).trim().split('\n')
  } catch (err) {
    logger.warn('Error fetching .NET SDKs!')
    logger.debug(`Error fetching .NET SDKs:\n${JSON.stringify(err)}`)
    return null
  }
}

/**
 * Get the .NET Runtimes info
 *
 * @returns The .NET Runtimes info or null if this one could not be retrieved
 */
export async function getNETRuntimesInfo(): Promise<string[] | null> {
  try {
    return execSync('dotnet --list-runtimes', { encoding: 'utf-8' })
      .trim()
      .split('\n')
      .map((rt) => rt.replace('Microsoft.NETCore.App ', ''))
  } catch (err) {
    logger.warn('Error fetching .NET Runtimes!')
    logger.debug(`Error fetching .NET Runtimes:\n${JSON.stringify(err)}`)
    return null
  }
}
