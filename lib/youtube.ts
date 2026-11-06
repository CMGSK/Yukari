import type { UrlCleaner } from "./manager";

const DOMAINS: readonly string[] = [
  "m.youtube.com",
  "music.youtube.com",
  "youtu.be",
  "youtube.com",
];

function matchDomain(hostname: string, domain: string): boolean {
  return hostname === domain || hostname === `www.${domain}`;
}

export const youtube: UrlCleaner = {
  matches(url: URL): boolean {
    const hostname = url.hostname.toLowerCase();
    return DOMAINS.some((dom) => matchDomain(hostname, dom));
  },

  clean(url: URL): URL {
    // Get the v parameter or else match any youtube 11 char id pattern
    const id =
      url.pathname === "/watch"
        ? url.searchParams.get("v")
        : url.pathname.match(/^\/([\w-]{11})$/)?.[1];

    if (!id || !/^[\w-]{11}$/.test(id)) {
      throw new Error("Not a valid Youtube video URL");
    }

    return new URL(`https://youtu.be/${id}`);
  },
} satisfies UrlCleaner;
