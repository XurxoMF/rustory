import { openUrl } from "@tauri-apps/plugin-opener";
import { fetch as fetchPro } from "@tauri-apps/plugin-http";

import { API_BASE } from "$lib/GLOBALS";

import { log } from "$lib/utils/logger";

export class RUser {
  private static instance: RUser | null = null;

  static getInstance(): RUser {
    if (RUser.instance === null) {
      RUser.instance = new RUser();
    }
    return RUser.instance;
  }

  /**
   * The URI where auth tokens will be redirected to.
   */
  static REDIRECT_URI = "rustory://auth/discord/callback";

  /**
   * The data of the user like Name, Avatar and ID.
   */
  private _data: DiscordUser | null = $state(null);

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
   * The data of the user like Name, Avatar and ID.
   */
  get data(): DiscordUser | null {
    return this._data;
  }

  /**
   * Set the user data.
   *
   * @param data - The data of the user.
   */
  set data(data: DiscordUser | null) {
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
   * Loads all the user data and tokens on this instance of RustoryInfo.
   */
  async init(): Promise<void> {
    log("info", "[src/lib/classes/RustoryUser.svelte.ts > init()] Loading Rustory User...");

    let refreshToken = localStorage.getItem("refreshToken");
    this.refreshToken = refreshToken;
    this.refreshAccessToken();

    // TODO: Get the user data!
  }

  /**
   * Extracts the accessToken and refreshToken from the selected URL.
   *
   * @param url - The URL where params will be extracted from.
   * @returns null if no params were found or the accessToken and refreshToken.
   */
  static getTokensFromDeepLink(url: string): TOKENS_TYPE | null {
    log(
      "info",
      "[src/lib/classes/RustoryUser.svelte.ts > getTokensFromDeepLink()] Extracting tokens from the URL..."
    );

    try {
      const parsedUrl = new URL(url);
      const params = new URLSearchParams(parsedUrl.search);

      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");

      if (!accessToken || !refreshToken) {
        log(
          "error",
          "[src/lib/classes/RustoryUser.svelte.ts > getTokensFromDeepLink()] There is no access token or refresh token on that URL!"
        );
        return null;
      }

      log(
        "info",
        "[src/lib/classes/RustoryUser.svelte.ts > getTokensFromDeepLink()] Tokens extracted successfully."
      );

      return { accessToken, refreshToken };
    } catch (err) {
      log(
        "error",
        "[src/lib/classes/RustoryUser.svelte.ts > getTokensFromDeepLink()] Something whent wrong while getting the access and refresh tokens!"
      );
      log("debug", JSON.stringify(err));
      return null;
    }
  }

  /**
   * Opens the browser window to log in with Discord.
   */
  static startLoginWithDiscord() {
    log(
      "info",
      "[src/lib/classes/RustoryUser.svelte.ts > startLoginWithDiscord()] User logging in with Discord..."
    );
    const loginUrl = `${API_BASE}/auth/discord?redirect_uri=${encodeURIComponent(RUser.REDIRECT_URI)}`;
    openUrl(loginUrl);
  }

  /**
   * Closes the session and removes all the tokens and user data.
   */
  logout() {
    log("info", "[src/lib/classes/RustoryUser.svelte.ts > logout()] User logging out...");
    this.accessToken = null;
    this.refreshToken = null;
    this.data = null;
  }

  /**
   * Set the privided tokens.
   *
   * @param tokens - The tokens.
   */
  setTokens(tokens: TOKENS_TYPE | null | undefined): void {
    if (!tokens)
      return log(
        "error",
        "[src/lib/classes/RustoryUser.svelte.ts > setTokens()] No tokens provided!"
      );
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  }

  /**
   * Refreshes the access token if there is a refresh token available.
   *
   * @returns "ok" if the token was refreshed. "no-refresh-token" if no refresh token is available. "error" if there was an error.
   */
  async refreshAccessToken(): Promise<"ok" | "no-refresh-token" | "error"> {
    log(
      "info",
      "[src/lib/classes/RustoryUser.svelte.ts > refreshAccessToken()] Refreshing the access token using the refresh token..."
    );

    if (!this._refreshToken) {
      log(
        "error",
        "[src/lib/classes/RustoryUser.svelte.ts > refreshAccessToken()] No refresh token available to refresh the access token!"
      );
      return "no-refresh-token";
    }

    const refreshRes = await fetchPro(`${API_BASE}/auth/discord/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: this._refreshToken }),
    });

    if (!refreshRes.ok) {
      log(
        "error",
        "[src/lib/classes/RustoryUser.svelte.ts > refreshAccessToken()] There was an error refreshing the access token!"
      );
      return "error";
    }

    const { accessToken }: { accessToken: string } = await refreshRes.json();

    this.accessToken = accessToken;

    log(
      "info",
      "[src/lib/classes/RustoryUser.svelte.ts > refreshAccessToken()] Access token refreshed succesfully."
    );

    return "ok";
  }
}

type DiscordUser = {
  id: string;
  name: string;
  avatar: string;
};

type TOKENS_TYPE = { accessToken: string | null; refreshToken: string | null };
