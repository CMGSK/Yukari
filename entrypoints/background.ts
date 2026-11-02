import { clean } from "@/lib/aliexpress";

export default defineBackground(() => {
  browser.browserAction.onClicked.addListener(async (tab) => {
      if (!tab.url) {
          return;
      }
      try {
          const cleanUrl = clean(tab.url);
          await navigator.clipboard.writeText(cleanUrl);
      } catch (err) {
          console.error(err);
      }
  });
});
