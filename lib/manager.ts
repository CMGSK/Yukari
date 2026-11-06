import { aliexpress } from "./aliexpress";
import { amazon } from "./amazon";

export interface UrlCleaner {
  matches(url: URL): boolean;
  clean(url: URL): URL;
}

const cleaners: readonly UrlCleaner[] = [aliexpress, amazon];

export function cleanUrl(input: string): string {
  const url = new URL(input);
  const cleaner = cleaners.find((cont) => cont.matches(url));
  if (!cleaner) {
    throw new Error("Yukari does not support this website");
  }
  return cleaner!.clean(url).toString();
}
