import { cleanUrl } from "@/lib/manager";

export default defineBackground(() => {
  browser.browserAction.onClicked.addListener(async (tab) => {
      if (!tab.url) {
          return;
      }
      try {
          const url: string = cleanUrl(tab.url);
          await navigator.clipboard.writeText(url);
      } catch (err) {
          console.error(err);
      }
  });
});
