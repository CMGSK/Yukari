import type { UrlCleaner } from "./manager";

// these are the main domains that i could think of
const DOMAINS: readonly string[] = [
  "amazon.com",
  "amazon.es",
  "amazon.co.jp",
  "amazon.co.uk",
  "amazon.ca",
  "amazon.com.mx",
  "amazon.com.br",
  "amazon.de",
  "amazon.fr",
  "amazon.it",
  "amazon.nl",
  "amazon.in",
  "amazon.pl",
  "amazon.eu",
  "amazon.cn",
  "amazon.com.au",
];

function matchDomain(hostname: string, domain: string): boolean {
  return hostname === domain || hostname === `www.${domain}`;
}

export const amazon: UrlCleaner = {
  matches(url: URL): boolean {
    const hostname = url.hostname.toLowerCase();
    return DOMAINS.some((dom) => matchDomain(hostname, dom));
  },

  clean(url: URL): URL {
    // Only /dp/<ID> excluding trailing slash and trackings
    const match = url.pathname.match(/\/dp\/[a-z0-9]{10}(?=\/|$)/i);
    if (match === null) {
      throw new Error("Not a valid Amazon product URL");
    }
    return new URL(match[0], url.origin);
  },
} satisfies UrlCleaner;
