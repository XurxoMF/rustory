import si from 'systeminformation'
import { execSync } from 'child_process'

import { logger } from '@main/utils/logger'
import { bytesToX } from '@shared/utils/math'

/**
 * Get the OS info
 *
 * @returns The OS info or undefined if this one could not be retrieved
 */
export async function getOSInfo(): Promise<si.Systeminformation.OsData | undefined> {
  try {
    return await si.osInfo()
  } catch (err) {
    logger.warn('Error fetching OS info!')
    logger.debug(`Error fetching OS info\n${JSON.stringify(err)}`)
    return
  }
}

/**
 * Get the CPU info
 *
 * @returns The CPU info or undefined if this one could not be retrieved
 */
export async function getCPUInfo(): Promise<si.Systeminformation.CpuData | undefined> {
  try {
    return await si.cpu()
  } catch (err) {
    logger.warn('Error fetching CPU info!')
    logger.debug(`Error fetching CPU info:\n${JSON.stringify(err)}`)
    return
  }
}

/**
 * Get the RAM info
 *
 * @returns The RAM info or undefined if this one could not be retrieved
 */
export async function getRAMInfo(): Promise<si.Systeminformation.MemData | undefined> {
  try {
    return await si.mem()
  } catch (err) {
    logger.warn('Error fetching RAM info!')
    logger.debug(`Error fetching RAM info:\n${JSON.stringify(err)}`)
    return
  }
}

/**
 * Get the GPUs info
 *
 * @returns The GPUs info or undefined if this one could not be retrieved
 */
export async function getGPUsInfo(): Promise<si.Systeminformation.GraphicsData | undefined> {
  try {
    return await si.graphics()
  } catch (err) {
    logger.warn('Error fetching GPUs info!')
    logger.debug(`Error fetching GPUs info:\n${JSON.stringify(err)}`)
    return
  }
}

/**
 * Get the Volumes info
 *
 * @returns The Volumes info or undefined if this one could not be retrieved
 */
export async function getVolumesInfo(): Promise<si.Systeminformation.FsSizeData[] | undefined> {
  try {
    const volumes = await si.fsSize()
    return volumes.filter((v) => bytesToX(v.size, 'GB') > 0)
  } catch (err) {
    logger.warn('Error fetching volumes info!')
    logger.debug(`Error fetching volumes info:\n${JSON.stringify(err)}`)
    return
  }
}

/**
 * Get the .NET SDKs info
 *
 * @returns The .NET SDKs info or undefined if this one could not be retrieved
 */
export async function getNETSDKsInfo(): Promise<string[] | undefined> {
  try {
    return execSync('dotnet --list-sdks', { encoding: 'utf-8' }).trim().split('\n')
  } catch (err) {
    logger.warn('Error fetching .NET SDKs!')
    logger.debug(`Error fetching .NET SDKs:\n${JSON.stringify(err)}`)
    return
  }
}

/**
 * Get the .NET Runtimes info
 *
 * @returns The .NET Runtimes info or undefined if this one could not be retrieved
 */
export async function getNETRuntimesInfo(): Promise<string[] | undefined> {
  try {
    return execSync('dotnet --list-runtimes', { encoding: 'utf-8' })
      .trim()
      .split('\n')
      .map((rt) => rt.replace('Microsoft.NETCore.App ', ''))
  } catch (err) {
    logger.warn('Error fetching .NET Runtimes!')
    logger.debug(`Error fetching .NET Runtimes:\n${JSON.stringify(err)}`)
    return
  }
}
