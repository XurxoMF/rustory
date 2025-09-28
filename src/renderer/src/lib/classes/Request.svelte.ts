import { RustoryNetError } from '@shared/errors/RustoryNetError'

/**
 * Manage requests with cache.
 */
export class Request {
  /**
   * Singleton instance of the Request.
   */
  private static _instance: Request = new Request()

  /**
   * Get the instance of the Request.
   */
  public static get instance(): Request {
    return Request._instance
  }

  /**
   * Map to save cache. This is an url <-> data map.
   */
  private _cache: Map<string, string> = new Map()

  private constructor() {}

  /**
   * Makes a get request to the specified URL.
   * @param url The URL to request to.
   * @param cache Whether to get and set data to the cache or not.
   * @returns The data returned by the request.
   * @throws A {@link RustoryNetError} error.
   */
  public async get(url: string, cache: boolean | undefined = true): Promise<string> {
    if (cache) {
      const cachedData = this._cache.get(url)
      if (cachedData) return cachedData
    }

    try {
      const data = await window.api.net.request(url)
      if (cache) this._cache.set(url, data)
      return data
    } catch (err) {
      window.api.logger.error(`There was an error making the request to ${url}!`)
      window.api.logger.debug(`There was an error making the request to ${url}:\n${JSON.stringify(err)}`)
      throw new RustoryNetError(`There was an error making the request to ${url}!`, RustoryNetError.Codes.NET_ERROR)
    }
  }
}
