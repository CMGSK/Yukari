import { defineConfig } from 'wxt';

// See https://wxt.dev/api/reference/wxt/interfaces/inlineconfig.html
export default defineConfig({
    modules: ['@wxt-dev/module-react'],
    manifest: {
        name: "Yukari",
        description: "Copy URLs without annoying tracking parameters",
        permissions: ['activeTab', 'clipboardWrite'],
        action: {
            default_title: "Remove tracking params"
        },
    },
});
