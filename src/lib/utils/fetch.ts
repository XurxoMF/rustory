import { fetch as fetchPro } from "@tauri-apps/plugin-http";

import { API_BASE } from "$lib/globals";

import { User } from "$lib/classes/Rustory";

/**
 * Makes a fetch query. If the response is 401, refreshes the access token and tries again.
 *
 * It may throw 2 errors:
 * 1. There is no refresh token to use.
 * 2. The refresh token is not valid so the access token could not be refreshed.
 *
 * @param input - The URL to fetch. Only the path is needed, the base URL is set in the ENV file. Example: "/some/path"
 * @param init - Fetch parameters like headers, type...
 * @returns The data returned by the fetch.
 */
export async function rustoryAPIFetch(input: string, init: RequestInit = {}) {
  const token = User.instance.accessToken;
  const url = API_BASE + input;

  const res = await fetchPro(url, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 401) return res;

  // If the API returned a 401 Not autenticated.
  const refreshed = await User.instance.refreshAccessToken();

  if (!refreshed) throw new Error("The user is not autenticated!");

  return fetchPro(url, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${User.instance.accessToken}`,
    },
  });
}
