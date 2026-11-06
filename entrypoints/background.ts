import { cleanUrl } from "@/lib/manager";

export default defineBackground(() => {
  browser.browserAction.onClicked.addListener(async (tab) => {
    if (!tab.url) {
      return;
    }
    try {
      const url: string = cleanUrl(tab.url);
      await navigator.clipboard.writeText(url);

      // Success feedback
      if (tab.id !== undefined) {
        await Promise.all([
          browser.browserAction.setBadgeText({
            tabId: tab.id,
            text: "✓",
          }),
          browser.browserAction.setBadgeBackgroundColor({
            tabId: tab.id,
            color: "#16803C",
          }),
        ]);

        setTimeout(() => {
          if (tab.id !== undefined) {
            void Promise.all([
              browser.browserAction.setBadgeText({
                tabId: tab.id,
                text: "",
              }),
            ]);
          }
        }, 600);
      }
    } catch (err) {
      console.error(err);
    }
  });
});
