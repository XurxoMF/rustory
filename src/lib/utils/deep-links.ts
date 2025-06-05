import { User } from "$lib/classes/Rustory";

export function manageDeepLinks(urls: string[]) {
  for (const url of urls) {
    if (url.startsWith("rustory://auth/discord/callback?")) User.instance.loginWithDiscord(url);
  }
}
