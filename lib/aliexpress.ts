export function clean(input: string): string {
    const url = new URL(input);
    const hostname = url.hostname.toLowerCase();

    if (!hostname.endsWith('aliexpress.com')) {
        throw new Error('Not an AliExpress URL');
    }

    // Only /item/<ID>.html excluding trailing slash and trackings
    if (!url.pathname.match(/\/item\/(\d+)\.html$/i)) {
        throw new Error('Not a valid AliExpress product URL');
    }
    url.search = '';
    url.hash = '';

    return url.toString();
}
