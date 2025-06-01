import { rUser } from "$lib/stores/rustory.svelte";

export function manageDeepLinks(urls: string[]) {
  for (const url of urls) {
    if (url.startsWith("rustory://auth/discord/callback?")) rUser.loginWithDiscord(url);
  }
}
