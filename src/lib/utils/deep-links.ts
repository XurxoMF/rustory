import { RustoryUser } from "$lib/classes/RustoryUser.svelte";

import { rustory } from "$lib/stores/rustory";

import { log } from "$lib/utils//logger";

export function manageDeepLinks(urls: string[]) {
  for (const url of urls) {
    if (url.startsWith("rustory://auth/discord/callback?")) {
      log("info", "Opened a discord auth deep-link!");
      const tokens = RustoryUser.getTokensFromDeepLink(url);
      rustory.user.setTokens(tokens);
    }
  }
}
