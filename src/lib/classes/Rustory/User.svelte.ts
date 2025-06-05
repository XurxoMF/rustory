import { openUrl } from "@tauri-apps/plugin-opener";
import { fetch as fetchPro } from "@tauri-apps/plugin-http";

import { API_BASE } from "$lib/globals";

import { log } from "$lib/utils/basics";

export class User {
  /**
   * Singleton instance of the User.
   */
  private static _instance: User | null = null;

  /**
   * Get the instance of the User.
   */
  static get instance(): User {
    if (User._instance === null) User._instance = new User();
    return User._instance;
  }

  /**
   * The URI where auth tokens will be redirected to.
   */
  static REDIRECT_URI = "rustory://auth/discord/callback";

  /**
   * The data of the user like Name, Avatar and ID.
   */
  private _data: User.DiscordUser | null = $state(null);

  /**
   * The access token. Used to autenticate requests.
   */
  private _accessToken: string | null = $state(null);

  /**
   * Token used to refresh the access token if this one expires.
   */
  private _refreshToken: string | null = $state(null);

  private constructor() {}

  /**
   * Loads all the user data and tokens on this instance.
   */
  async init(): Promise<void> {
    log("info", "[src/lib/classes/User.svelte.ts > init()] Loading Rustory User...");

    let refreshToken = localStorage.getItem("refreshToken");
    this.refreshToken = refreshToken;

    const refreshed = await this.refreshAccessToken();

    if (refreshed) {
      // TODO: Get the user data! First it needs the API implementation.
    }
  }

  /**
   * The data of the user.
   */
  get data(): User.DiscordUser | null {
    return this._data;
  }

  /**
   * Set the user data.
   *
   * @param data - The data of the user.
   */
  set data(data: User.DiscordUser | null) {
    this._data = data;
  }

  /**
   * The access token. Used to autenticate requests.
   */
  get accessToken(): string | null {
    return this._accessToken;
  }

  /**
   * Set the access token.
   *
   * @param accessToken - The access token.
   */
  set accessToken(accessToken: string | null) {
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
    } else {
      sessionStorage.removeItem("accessToken");
    }
    this._accessToken = accessToken;
  }

  /**
   * Token used to refresh the access token if this one expires.
   */
  get refreshToken(): string | null {
    return this._refreshToken;
  }

  /**
   * Set the refresh token.
   *
   * @param refreshToken - The refresh token.
   */
  set refreshToken(refreshToken: string | null) {
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      localStorage.removeItem("refreshToken");
    }
    this._refreshToken = refreshToken;
  }

  /**
   * Extracts the accessToken and refreshToken from the selected URL.
   *
   * @param url - The URL where params will be extracted from.
   * @returns null if no params were found or the accessToken and refreshToken.
   */
  static getTokensFromDeepLink(url: string): User.TokensType | null {
    log(
      "info",
      "[src/lib/classes/User.svelte.ts > getTokensFromDeepLink()] Extracting tokens from the URL..."
    );

    try {
      const parsedUrl = new URL(url);
      const params = new URLSearchParams(parsedUrl.search);

      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");

      if (!accessToken || !refreshToken) {
        log(
          "error",
          "[src/lib/classes/User.svelte.ts > getTokensFromDeepLink()] There is no access token or refresh token on that URL!"
        );
        return null;
      }

      log(
        "info",
        "[src/lib/classes/User.svelte.ts > getTokensFromDeepLink()] Tokens extracted successfully!"
      );

      return { accessToken, refreshToken };
    } catch (err) {
      log(
        "error",
        "[src/lib/classes/User.svelte.ts > getTokensFromDeepLink()] Something whent wrong while getting the access and refresh tokens!"
      );
      log("debug", JSON.stringify(err));
      return null;
    }
  }

  /**
   * If the deep-link url is passed it'll extract the tokens and log in, if not it'll start the login process.
   *
   * @param deepLinkUrl - The deep-link url with the session tokens.
   */
  async loginWithDiscord(deepLinkUrl?: string) {
    if (!deepLinkUrl) {
      log(
        "info",
        "[src/lib/classes/User.svelte.ts > loginWithDiscord()] User logging in with Discord..."
      );

      const loginUrl = `${API_BASE}/auth/discord?redirect_uri=${encodeURIComponent(User.REDIRECT_URI)}`;
      openUrl(loginUrl);
      return;
    }

    log(
      "info",
      "[src/lib/classes/User.svelte.ts > loginWithDiscord()] User logged in with Discord. Saving tokens..."
    );

    const tokens = User.getTokensFromDeepLink(deepLinkUrl);
    if (!tokens) {
      log("error", "[src/lib/classes/User.svelte.ts > loginWithDiscord()] No tokens provided!");
      return;
    }

    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;

    log(
      "info",
      "[src/lib/classes/User.svelte.ts > loginWithDiscord()] Tokens saved. Getting user info..."
    );

    // TODO: Get the user data! First it needs the API implementation.

    log(
      "info",
      "[src/lib/classes/User.svelte.ts > loginWithDiscord()] Saved user info. User logged in!"
    );
  }

  /**
   * Closes the session and removes all the tokens and user data.
   */
  logoutFromDiscord() {
    log("info", "[src/lib/classes/User.svelte.ts > logout()] User logging out...");

    this.accessToken = null;
    this.refreshToken = null;
    this.data = null;

    log("info", "[src/lib/classes/User.svelte.ts > logout()] User logged out!");
  }

  /**
   * Refreshes the access token if there is a refresh token available.
   *
   * @returns If the token was refreshed or not.
   */
  async refreshAccessToken(): Promise<boolean> {
    log(
      "info",
      "[src/lib/classes/User.svelte.ts > refreshAccessToken()] Refreshing the access token using the refresh token..."
    );

    if (!this._refreshToken) {
      log(
        "error",
        "[src/lib/classes/User.svelte.ts > refreshAccessToken()] No refresh token available to refresh the access token! Logging out!"
      );

      // If there is no refreshToken, ensure the user is not autenticated.
      this.logoutFromDiscord();
      return false;
    }

    try {
      const refreshRes = await fetchPro(`${API_BASE}/auth/discord/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: this._refreshToken }),
      });

      if (refreshRes.status === 401) {
        log(
          "error",
          "[src/lib/classes/User.svelte.ts > refreshAccessToken()] Refresh token is invalid or expired! Logging out!"
        );

        // If the token is invalid or expired, log out the user.
        this.logoutFromDiscord();
        return false;
      }

      if (!refreshRes.ok) {
        log(
          "error",
          "[src/lib/classes/User.svelte.ts > refreshAccessToken()] There was an error refreshing the access token!"
        );

        return false;
      }

      const { accessToken }: { accessToken: string } = await refreshRes.json();

      this.accessToken = accessToken;

      log(
        "info",
        "[src/lib/classes/User.svelte.ts > refreshAccessToken()] Access token refreshed succesfully!"
      );

      return true;
    } catch (err) {
      log(
        "error",
        "[src/lib/classes/User.svelte.ts > refreshAccessToken()] There was an error refreshing the access token!"
      );
      log("debug", JSON.stringify(err));

      return false;
    }
  }
}

export namespace User {
  export type DiscordUser = { id: string; name: string; avatar: string };
  export type TokensType = { accessToken: string | null; refreshToken: string | null };
}
