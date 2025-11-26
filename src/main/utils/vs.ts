import fse from 'fs-extra'
import { join } from 'path'
import { spawn } from 'child_process'

import { RustoryVSInstanceError } from '@shared/errors/RustoryVSInstanceError'

import { getOSInfo } from '@main/utils/system'
import { logger } from '@main/utils/logger'

/**
 * Look for the version installed on a path.
 * @param path Where to look for the executable to use.
 * @returns The version installed on that path.
 */
export async function getVSVersion(path: string): Promise<string | undefined> {
  logger.info('Looking for the Vintage Story version...')

  try {
    const { command, params } = await getVSExecutable(path)

    if (command.length < 1) return undefined

    params.push('-v')

    const version = await new Promise<string | undefined>((resolve, reject) => {
      logger.info('Running Vintage Story...')

      const externalApp = spawn(command!, params)

      let res: string | undefined

      externalApp.stdout.on('data', (data) => {
        res = data.toString().trim()
        logger.info(`Vintage Story version found: ${res}`)
        resolve(res)
      })

      externalApp.stderr.on('data', (data) => {
        logger.error(`Vintage Story threw an error!`)
        logger.debug(`Vintage Story threw an error:\n${JSON.stringify(data)}`)
        reject(res)
      })

      externalApp.on('close', (code) => {
        logger.info(`Vintage Story closed: ${code}`)
        resolve(res)
      })

      externalApp.on('error', (err) => {
        logger.error(`Vintage Story threw an error!`)
        logger.debug(`Vintage Story threw an error:\n${JSON.stringify(err)}`)
        reject(res)
      })
    })

    return version
  } catch (err) {
    return undefined
  }
}

/**
 * Look for the executable needed to run Vintage Story.
 * @param path Where to look for the executable to use.
 * @returns The command and parameters to run Vintage Story.
 */
export async function getVSExecutable(path: string): Promise<{ command: string; params: string[] }> {
  logger.info('Getting Vintage Story executable...')

  try {
    const os = await getOSInfo()

    const files = fse.readdirSync(path)

    let command: string = ''
    let params: string[] = []

    if (os.platform === 'linux') {
      logger.info('Linux platform detected.')

      if (files.includes('Vintagestory')) {
        logger.info('Vintagestory found.')

        command = join(path, 'Vintagestory')
        params = [`-v`]
      } else if (files.includes('Vintagestory.exe')) {
        logger.info('Vintagestory.exe found.')

        command = 'mono'
        params = [join(path, 'Vintagestory.exe'), `-v`]
      }
    } else if (os.platform === 'win32') {
      logger.info('Windows platform detected.')

      if (files.includes('Vintagestory.exe')) {
        logger.info('Vintagestory.exe found.')

        command = join(path, 'Vintagestory.exe')
        params = [`-v`]
      }
    } else if (os.platform === 'darwin') {
      logger.info('Mac platform detected.')

      if (files.includes('Vintagestory')) {
        logger.info('Vintagestory found.')

        command = join(path, 'Vintagestory')
        params = [`-v`]
      }
    } else {
      logger.error(`Platform ${os.platform} not supported!`)
      throw new RustoryVSInstanceError(`Platform ${os.platform} not supported!`, RustoryVSInstanceError.Codes.VSINSTANCE_ERROR)
    }

    return { command, params }
  } catch (err) {
    logger.error(`There was an error getting the Vintage Story executable!`)
    logger.debug(`There was an error getting the Vintage Story executable:\n${JSON.stringify(err)}`)
    throw new RustoryVSInstanceError(`There was an error getting the Vintage Story executable!`, RustoryVSInstanceError.Codes.VSINSTANCE_ERROR)
  }
}
