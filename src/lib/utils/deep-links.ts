import { RUser } from "$lib/classes/RUser.svelte";

import { rUser } from "$lib/stores/rustory.svelte";

import { log } from "$lib/utils//logger";

export function manageDeepLinks(urls: string[]) {
  for (const url of urls) {
    if (url.startsWith("rustory://auth/discord/callback?")) {
      log("info", "Opened a discord auth deep-link!");
      const tokens = RUser.getTokensFromDeepLink(url);
      rUser.setTokens(tokens);
    }
  }
}
