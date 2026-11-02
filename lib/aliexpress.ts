import type { UrlCleaner } from "./manager";

export const aliexpress: UrlCleaner = {
    matches(url: URL): boolean {
        const hostname = url.hostname.toLowerCase();
        return (
            hostname.endsWith('.aliexpress.com') ||
            hostname === 'aliexpress.com'
            );
    },

    clean(url: URL): URL {
        // Only /item/<ID>.html excluding trailing slash and trackings
        if (!url.pathname.match(/\/item\/(\d+)\.html$/i)) {
            throw new Error('Not a valid AliExpress product URL');
        }

        url.search = '';
        url.hash = '';

        return url;
    }

} satisfies UrlCleaner;
